
import {useState, useEffect} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Grid, CircularProgress, Typography} from '@mui/material';
import { Semestre } from './Semestre';
import { getData } from '../services';
import { getMateria } from './helper';

export default function AgregarMateriasDialog({dialogOpen, setDialogOpen, materias, setMaterias}) {

    const [datos, setDatos] = useState({});
    const [creditos, setCreditos] = useState(0);

    useEffect(() => {
        async function fetchDatos() {
            const res = await getData('http://3.138.179.79:3001/materias');
            setDatos(res);
        }
        fetchDatos();
    }, []);



    const agregarMateria = (materiaId) => {
        if(!materias.includes(materiaId)) {
            materias.push(materiaId);
            setMaterias(materias);

            const dataMateria = getMateria(datos, materiaId);
            console.log('MATERIA AGREGADA', materiaId)
            setCreditos(creditos + Number(dataMateria.creditos));
        }
    }

    const quitarMateria = (materiaId) => {
        if(materias.includes(materiaId)) {
            const newMaterias = materias.filter((id) => id !== materiaId);
            setMaterias(newMaterias);
            console.log('MATERIA QUITADA', materiaId)
            const dataMateria = getMateria(datos, materiaId);
            setCreditos(creditos - Number(dataMateria.creditos));
        }
    }
    
    console.log({materias})
    return (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}  maxWidth='50%'>
                <DialogTitle style={{paddingBottom: '0'}}>Materias cursadas:</DialogTitle>
                <DialogTitle style={{fontSize: '.9rem', paddingTop: '0'}}>Selecciona todas las materias que ya realizaste en la carrera, omitiendo las que estás cursando en el semestre actual</DialogTitle>
                <DialogContent>
                <Grid container spacing={4}>
                {
                    Object.keys(datos).length > 0 ? 
                    Object.keys(datos).map((numSemestre) => {
                        return (
                            <Grid item xs={6} key={`grid-semestre-${numSemestre}`}>
                                <Semestre 
                                    key={`semestre-${numSemestre}`}
                                    semestre={datos[numSemestre]}
                                    numSemestre={numSemestre}
                                    agregarMateria={agregarMateria}
                                    quitarMateria={quitarMateria}
                                />
                            </Grid>
                        )
                    }) : 
                    <CircularProgress sx={{display: 'flex', justifyContent: 'center', padding:'2rem'}}/>
                }
                </Grid>
                </DialogContent>
                
                <hr style={{width:'96%'}}/>
                <DialogActions sx={{display: 'flex', justifyContent: 'space-between', padding:'.3rem 2rem'}}>
                    <Typography sx={{}}>Créditos: {creditos}/260</Typography>
                    <div>
                        <Button onClick={() => setDialogOpen(false)}>Guardar</Button>
                        <Button onClick={() => {
                            setDialogOpen(false);
                            setMaterias([]);
                        }}>Cancelar</Button>
                    </div>
                </DialogActions>
            </Dialog>
    )
}