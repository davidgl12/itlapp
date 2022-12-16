import React, {useState, useEffect} from 'react'
import {Checkbox, Typography, Select, MenuItem, InputLabel, Tooltip, Grid} from '@mui/material';
import {Info} from '@mui/icons-material';
import { HtmlTooltip } from './HtmlTooltip';

export default function Materia({materias, agregarMateria, quitarMateria, checked, disabled = false}) {

    const [variante, setVariante] = useState(materias[0].id);
    const [isChecked, setIsChecked] = useState(false);

    const color = disabled ? '#bdbdbd' : 'black';

    useEffect(() => {
        // console.log('Dentro de useEffect',isChecked,variante);
        if(isChecked) {
            agregarMateria(variante);
        } else {
            quitarMateria(variante);
        }
    }, [isChecked, variante]);

    const handleCheckedChange = (event) => {
        setIsChecked(event.target.checked);
    }

    const handleSelectChange = (event) => {
        setVariante(event.target.value);
    }


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

    //
    return (
        <Grid container spacing={3} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '.5rem'
        }}>
            {disabled ?
                <Grid item>
                    <Checkbox checked={true} disabled checked={checked}/> 
                </Grid> 
                :
                <Grid item>
                    <Checkbox onChange={handleCheckedChange} checked={isChecked}/> 
                </Grid>
            }
            <Grid item>
                <Typography  sx={{paddingRight:'1rem', width: '6rem', fontSize:'.70rem', fontWeight:'bold', color}} disabled={disabled}>
                    {materias[0].nombre}
                </Typography>
            </Grid>
            <Grid item>
                <Select 
                    label='Hora/Docente' sx={{width:'10rem', fontSize:'.7rem'}} 
                    value={variante}
                    onChange={handleSelectChange}
                    disabled={disabled}
                >
                    {
                        materias.map((variante) => {
                            return (
                                <MenuItem value={variante.id} key={`materia-${variante.id}`}>
                                    <div style={{textOverflow:'ellipsis', overflow:'hidden'}}>
                                        {variante.lunes}
                                    </div>
                                    <div style={{textOverflow:'ellipsis', overflow:'hidden'}}>
                                        {variante.docente}
                                    </div>
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </Grid>
            
            <Grid item>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            {
                                generateTable(materias.find((mat) => mat.id === variante))
                            }
                        </React.Fragment>
                    }
                >
                    <Info sx={{paddingLeft:'.5rem'}} fontSize='small' color='primary'/>
                </HtmlTooltip>
            </Grid>
        </Grid>
    )
}