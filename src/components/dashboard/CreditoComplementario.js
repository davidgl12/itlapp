import React from 'react';
import {Card, Grid, Typography, IconButton, Select, MenuItem, TextField, InputLabel} from '@mui/material';
import { CheckCircle, Cancel, Info} from '@mui/icons-material';
import { HtmlTooltip } from '../HtmlTooltip';


export function CreditoComplementario({numCredito}) {
    return (
        <Grid container spacing={1} sx={{margin:'.6rem', padding:'.3rem', justifyContent:'center', display:'flex', alignItems:'center'}}>
            <Grid item xs={1}>
                <CheckCircle color='success'></CheckCircle>
            </Grid>
            <Grid item xs={3}>
                <Typography sx={{fontSize: '1rem', fontWeight: 'bold'}}>Crédito {numCredito}:</Typography>
            </Grid>

            <Grid item xs={2}>
                <InputLabel id="selectHoras">Horas</InputLabel>
                <Select label='Horas' id='selectHoras' variant='standard'>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={17}>17</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={19}>19</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </Grid>

            <Grid item xs={4}>
                <InputLabel id="selectHoras">Actividad</InputLabel>
                <TextField variant='standard'></TextField>
            </Grid>

            
        </Grid>
)
}