import React, {useState} from 'react';
import {
    Card,
    Typography,
    Checkbox
} from '@mui/material';
import Materia from './Materia';


export function Semestre({semestre, numSemestre, agregarMateria, quitarMateria, materiasCursadas=null, bloqueado=false, materiasCursando=null}) {

    const numsMaterias = Object.keys(semestre);
    const EstadoSemestre = () => {
        if(materiasCursadas) {
            const materiasDelSemestre = Object.keys(semestre);

            if(materiasDelSemestre.every((mId) => materiasCursadas.includes(mId)))
                return(<Typography sx={{color: '#039A00'}}>Completado</Typography>)

            return(<Typography sx={{color: '#DAB700'}}>Materias Pendientes</Typography>)
        }

        return (<></>)
    };
    

    return (
        <Card
            sx={{
                minHeight: '65vh',
                padding: '1rem'
            }}
            elevation={3}
        >
            <Typography
                sx={{fontStyle: 'bold', fontSize:'1.5rem'}}
            >
                Semestre {numSemestre}
            </Typography>
            <EstadoSemestre/>
            {
                numsMaterias.map((numMateria) => {
                    let disabled = materiasCursadas && materiasCursadas.includes(numMateria);
                    let checked = disabled;
                    
                    if(bloqueado && !materiasCursando.includes(numMateria)){
                        disabled = true;
                    }

                    return (
                        <Materia 
                            key={`materia-${numSemestre}-${numMateria}`}
                            materias={semestre[numMateria]}
                            agregarMateria={agregarMateria}
                            quitarMateria={quitarMateria}
                            disabled={disabled}
                            checked={checked}
                        >
                        </Materia>
                    )
                })
            }
        </Card>
    );
}