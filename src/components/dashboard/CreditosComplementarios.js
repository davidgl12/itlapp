import {useState, useEffect} from 'react';
import { Card, Typography, Button } from '@mui/material';
import { CreditoComplementario } from './CreditoComplementario';

export function CreditosComplementarios() {

    return (
        <>
            <Typography variant="h5" sx={{fontStyle: 'italic', fontWeight:'bold'}}>Creditos Complementarios</Typography>
            <br/>
            <Card sx={{padding:'1rem'}}>
                <CreditoComplementario numCredito={1}/>
                <CreditoComplementario numCredito={2}/>
                <CreditoComplementario numCredito={3}/>
                <CreditoComplementario numCredito={4}/>
                <CreditoComplementario numCredito={5}/>
                <br/>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Button variant='outlined'>Guardar</Button>
                </div>
            </Card>
        </>
    )
}