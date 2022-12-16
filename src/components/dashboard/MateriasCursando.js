import {useState, useEffect} from 'react';
import { Card, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MateriasCursandoDialog from './MateriasCursandoDialog';
import SemestreCursando from './SemestreCursando';

export function MateriasCursando({alumno, setAlumno}) {

    const [dialogOpen, setDialogOpen] = useState(false)
    console.log({alumno})
    return (
        <>
            <Typography variant="h5" sx={{fontStyle: 'italic', fontWeight:'bold'}}>Materias Cursando</Typography>
            <br/>
            {
                Array.isArray(alumno.materias_cursando) && alumno.materias_cursando.length > 0 ? 
                    <SemestreCursando alumno={alumno} setAlumno={setAlumno}/>
                :
                <Card sx={{padding:'1rem'}}>
                    <Typography>No se han definido las materias que se están cursando actualmente, da click en el botón de abajo para comenzar a agregarlas</Typography>

                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem'}}>
                        <Fab color="primary" size='small' aria-label="add" onClick={() => setDialogOpen(!dialogOpen)}>
                            <AddIcon /> 
                        </Fab>
                        <span style={{paddingLeft: '1rem'}}>Agregar Materias</span>
                    </div>
                    <MateriasCursandoDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} materiasCursadas={alumno.materias_cursadas} alumno={alumno} setAlumno={setAlumno}/>
                </Card>
            }
        </>
    )
}