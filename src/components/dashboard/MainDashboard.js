import { useEffect, useState } from 'react';
import {
    AppBar, Box, Toolbar, Typography, Button, Icon, Alert, Grid, CircularProgress
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import LogoTec from '../../logos/LogoTec.png';
import { useCookies } from 'react-cookie';
import { postData } from '../../services';

import { MateriasCursando } from './MateriasCursando';
import { CreditosComplementarios } from './CreditosComplementarios';
import { calcularAlerta } from '../helper';

export function MainDashboard() {

    const [alumno, setAlumno] = useState(null);
    const [cookies] = useCookies();

    useEffect(() => {
        async function fetchData() {
            const res = await postData('http://3.138.179.79:3001/alumno', {
                noCtrl: cookies.itlappNoctrl,
                contrasenia: cookies.itlappContrasenia
            });
            const alerta = calcularAlerta(res);
            let alertaTexto = 'Vas al corriente con tus materias, bien hecho!';

            if(alerta === 'warning') {
                alertaTexto = 'Vas un poco atrasado con tus materias, adminístralas bien'
            } else if (alerta === 'error') {
                alertaTexto = 'Vas muy atrasado con tus materias, te recomendamos hablar con el coordinador de tu carrera de la situación'
            }

            setAlumno({...res, alerta, alertaTexto});
        }
        
        fetchData();
    }, [])

    return (
        <>

        {alumno ? 
        <>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{backgroundColor: 'white', borderColor: '#BDA563', borderBottomStyle: 'solid'}}>
                <Toolbar>
                    <Icon sx={{fontSize:'2rem'}}>
                        <img src={LogoTec} height={30} width={30}/>
                    </Icon>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontStyle: 'italic'}}>
                        ITLApp
                    </Typography>
                        <Typography variant="h6" component="div" sx={{ fontStyle: 'italic', fontWeight:'bold', paddingRight: '2rem'}}>Semestre {alumno.semestre}</Typography>
                        <Typography variant="h6" sx={{ fontStyle: 'italic', paddingRight: '1rem'}}>{alumno.nombre}</Typography>
                        <Alert severity={alumno.alerta}>{alumno.alertaTexto}</Alert>
                </Toolbar>
            </AppBar>
        </Box>
        <Grid container spacing={10} sx={{padding: '2rem'}}>
            <Grid item xs={7}>
                <MateriasCursando alumno={alumno} setAlumno={setAlumno}/>
            </Grid>

            <Grid item xs={5}>
                <CreditosComplementarios/>
            </Grid>
        </Grid>
        </>
        :
        <CircularProgress/>
        }

        </>
    )
}