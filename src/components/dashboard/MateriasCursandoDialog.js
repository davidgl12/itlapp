
import {useState, useEffect} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Grid, CircularProgress, Typography, Alert} from '@mui/material';
import { Semestre } from '../Semestre';
import { getData, putData } from '../../services';
import { getMateria, estanEmpalmadas } from '../helper';

export default function MateriasCursandoDialog({dialogOpen, setDialogOpen, materiasCursadas, alumno, setAlumno}) {

    const [datos, setDatos] = useState({});
    const [materias, setMaterias] = useState([]);
    const [creditos, setCreditos] = useState(0);
    const [empalmadas, setEmpalmadas] = useState(false);
    const [horarios, setHorarios] = useState([]);
    // const [bloqueado, setBloqueado] = useState(false);


    useEffect(() => {
        async function fetchDatos() {
            const resDatos = await getData('http://localhost:3001/materias');
            const resHorarios = await getData('http://localhost:3001/horarios');
            setDatos(resDatos);
            setHorarios(resHorarios)
        }

        fetchDatos();
    }, []);

    const materiasCursadasSubIds = materiasCursadas.map(mId => mId.slice(0, -1));

    let color = '#ef5350'
    if(creditos > 20 && creditos < 26){
        color = '#ff9800';
    } else if(creditos >= 26) {
        color = '#4caf50';
    }

    
    const agregarMateria = (materiaId) => {
        const materiasSubIds = materias.map(mat => mat.slice(0,-1))
        const materiaSubId = materiaId.slice(0,-1);
        
        let newMaterias = materias;

        //En caso de cambiar de variante, elimina la materia con el subId que ya tenía adentro
        if(materiasSubIds.includes(materiaSubId)){
            newMaterias = materias.filter((mat) => mat.slice(0,-1) !== materiaSubId);
        }

        if(!newMaterias.includes(materiaId)) {
            newMaterias.push(materiaId);
            setMaterias(newMaterias);

            const dataMateria = getMateria(datos, materiaId);
            console.log({dataMateria});
            setCreditos(creditos + Number(dataMateria.creditos));

            setEmpalmadas(estanEmpalmadas(newMaterias, horarios));
        }
    }

    const quitarMateria = (materiaId) => {
        if(materias.includes(materiaId)) {
            const newMaterias = materias.filter((id) => id !== materiaId);
            setMaterias(newMaterias);

            const dataMateria = getMateria(datos, materiaId);
            setCreditos(creditos - Number(dataMateria.creditos));

            setEmpalmadas(estanEmpalmadas(newMaterias, horarios));
        }
    }

    function guardarMateriasCursando() {
        putData('http://localhost:3001/alumno/materiasCursando', {
            materiasCursando: materias,
            noCtrl: alumno.noctrl
        })
        .then(res => setDialogOpen(false));
    }

    const bloqueado = materias.length >= 7;
    return (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}  maxWidth='50%'>
                <DialogTitle style={{paddingBottom: '0'}}>Materias cursando</DialogTitle>
                <DialogTitle style={{fontSize: '.9rem', paddingTop: '0'}}>Selecciona las materias que estás cursando en el periodo actual</DialogTitle>
                {
                    empalmadas &&
                    <Alert severity="error">Tienes materias empalmadas, quítalas antes de continuar</Alert>
                }
                {
                    bloqueado && 
                    <Alert severity="warning">No puedes seleccionar más de 7 materias por periodo</Alert>
                }
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
                                    materiasCursadas={materiasCursadasSubIds}
                                    materiasCursando={materias.map(mat => mat.slice(0, -1))}
                                    bloqueado={bloqueado}
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
                    <Typography sx={{}}>Créditos Seleccionados: <span style={{color}}>{creditos}</span></Typography>
                    <Typography sx={{}}>Créditos Recomendados: 30</Typography>
                    <div>
                        <Button disabled={empalmadas} onClick={() => guardarMateriasCursando()}>Guardar</Button>
                        <Button onClick={() => {
                            setDialogOpen(false);
                            setMaterias([]);
                        }}>Cancelar</Button>
                    </div>
                </DialogActions>
            </Dialog>
    )
}