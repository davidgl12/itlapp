import React from 'react';
import {Card, Grid, Typography, IconButton, Tooltip} from '@mui/material';
import { CheckCircle, Cancel, Info} from '@mui/icons-material';
import { HtmlTooltip } from '../HtmlTooltip';

export function MateriaEnCurso({materia, completarMateria, bajaMateria}) {

    const generateTable = (variante) => {
        return (
            <table>
            <tbody>
            <tr>
                <td>Lunes:</td>
                <td>{variante.lunes ?? '-/'}</td>
            </tr>
            <tr>
                <td>Martes:</td>
                <td>{variante.martes ?? '-/'}</td>
            </tr>
            <tr>
                <td>Miércoles:</td>
                <td>{variante.miercoles ?? '-/'}</td>
            </tr>
            <tr>
                <td>Jueves:</td>
                <td>{variante.jueves ?? '-/'}</td>
            </tr>
            <tr>
                <td>Viernes:</td>
                <td>{variante.viernes ?? '-/'}</td>
            </tr>
            </tbody>
            </table>
        );
    }

    return (
            <Grid container spacing={2} sx={{margin:'.6rem', padding:'.3rem', justifyContent:'center', display:'flex', alignItems:'center'}}>
                <Grid item xs={1}>
                    <HtmlTooltip
                            title={
                                <React.Fragment>
                                    {
                                        generateTable(materia)
                                    }
                                </React.Fragment>
                            }
                        >
                            <Info sx={{paddingLeft:'.5rem'}} fontSize='small' color='primary'/>
                    </HtmlTooltip>
                </Grid>
                <Grid item xs={3}>
                    <Typography sx={{fontSize: '.8rem', fontWeight: 'bold'}}>{materia.nombre}</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography sx={{fontSize: '.8rem'}}>{materia.docente}</Typography>
                </Grid>

                <Grid item xs={4}>
                    <Tooltip title='Marcar como completada'><IconButton color='success' onClick={() => completarMateria(materia.id)}><CheckCircle/></IconButton></Tooltip>
                    <Tooltip title='Dar de baja'><IconButton color='error' onClick={() => bajaMateria(materia.id)}><Cancel/></IconButton></Tooltip>
                </Grid>
            </Grid>
    )
}