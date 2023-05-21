import { useState, useEffect } from 'react';
import { TextField, Paper, Select, MenuItem, Button, InputLabel, Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoTec from '../logos/LogoTec.png';
import LoginFormStyles from './LoginFormStyles.css';
import AgregarMateriasDialog from './AgregarMateriasDialog';
import { useCookies } from 'react-cookie';
import { getData, postData } from '../services';

 export function LoginForm() {

    const [loginData, setLoginData] = useState({
        noCtrl : '',
        contrasenia: ''
    });
    const [newData, setNewData] = useState({
        nombre: '',
        noCtrl: '',
        contrasenia: '',
        semestre: 1,
        carrera: '',
        materias: []
    });

    const [semestre, setSemestre] = useState(1);
    const [materias, setMaterias] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [disabledLogin, setDisabledLogin] = useState(true);
    const [disabledNew, setDisabledNew] = useState(true);

    const [cookies, setCookies] = useCookies();

    function comprobarLleno(objeto) {
        const keys = Object.keys(objeto);
        return keys.some((key) => objeto[key] === '' || objeto[key] === []);
    }

    useEffect(() => {
        let newNewData = newData;

        newNewData.semestre =  semestre;
        newNewData.materias =  materias;
        console.log(newData);
        setNewData(newNewData);
    }, [semestre, materias])

    const handleLoginChange = (key, value, isNewAccount) => {
        if(isNewAccount){
            let newNewData = newData;
            newNewData[key] = value
            setNewData(newNewData);
            console.log({newData});
        } else {
            let newLogin = loginData;
            newLogin[key] = value;
            setLoginData(newLogin);
            console.log({loginData});
        }
        setDisabledLogin(comprobarLleno(loginData));
        setDisabledNew(comprobarLleno(newData));
    }

    const handleLogin = async () => {
        const user = await postData('https://appcool.link/alumno', loginData);
        console.log({user});
        if(user) {
            console.log('in')
            setCookies('itlappNoctrl', loginData.noCtrl);
            setCookies('itlappContrasenia', loginData.contrasenia);
            window.location.assign('https://master.d3vbd9wfgkadre.amplifyapp.com/dashboard');
        } else {
            console.log('out')
            alert('No existe el usuario, intenta nuevamente');
        }
    }

    const handleCrearCuenta = async () => {
        console.log('AAAAAAAAAAA')
        const user = await postData('https://appcool.link/alumno/crear', {
            ...newData,
            materias
        });

        if(user) {
            console.log('in')
            console.log({user});
            setCookies('itlappNoctrl', newData.noCtrl);
            setCookies('itlappContrasenia', newData.contrasenia);
            window.location.assign('https://master.d3vbd9wfgkadre.amplifyapp.com/dashboard');
        } else {
            console.log('out')
            alert('No existe el usuario, intenta nuevamente');
        }
    }

    return (
        <>
        <div className='logo-container'>
            <img src={LogoTec} className='logo-tec'></img>
            <h1>ITLApp</h1>
            <span style={{fontStyle: 'italic'}}>Administra tus materias</span>
        </div>
        
        <div className='login-container'>
            <Paper elevation={3} className='login-form'>
                <h2 style={{margin:0}}>Iniciar Sesión</h2>
                <TextField
                    required
                    id="lno-ctrl"
                    label="Número de control"
                    multiline
                    variant="standard"
                    onChange={(event) => {handleLoginChange('noCtrl', event.target.value, false)}}
                    style={{width:'100%'}}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <TextField
                    required
                    id="cont"
                    label="Contraseña"
                    type="password"
                    variant="standard"
                    onChange={(event) => {handleLoginChange('contrasenia', event.target.value, false)}}
                    style={{width:'100%'}}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Button 
                        variant='outlined'
                        disabled={disabledLogin}
                        style={{backgroundColor: '#FBDF7D', color: 'black', justifyContent:'center'}}
                        onClick={handleLogin}
                    >
                        Iniciar Sesión
                    </Button>
                </div>
            </Paper>


            <Paper elevation={3}  className='login-form'>
                <h2 style={{margin:0}}>Crear cuenta</h2>
                <TextField
                    required
                    id="cont"
                    label="Nombre completo"
                    multiline
                    variant="standard"
                    onChange={(event) => {handleLoginChange('nombre', event.target.value, true)}}
                    style={{width:'100%'}}
                />
                <br/>
                <TextField
                    required
                    id="no-ctrls"
                    label="Número de control"
                    multiline
                    variant="standard"
                    onChange={(event) => {handleLoginChange('noCtrl', event.target.value, true)}}
                    style={{width:'100%'}}
                />
                <TextField
                    required
                    id="cont"
                    label="Contraseña"
                    type="password"
                    variant="standard"
                    onChange={(event) => {handleLoginChange('contrasenia', event.target.value, true)}}
                    style={{width:'100%'}}
                />
                <br/>
                <br/>

                <InputLabel id="semestreLabel" >Semestre</InputLabel>
                <Select
                    labelId="semestreLabel"
                    id="semestre"
                    label="Semestre"
                    variant='standard'
                    value={semestre}
                    onChange={(event) => {setSemestre(event.target.value)}}
                    style={{width:'100%'}}
                    // onChange={handleChange}
                >
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
                </Select>
                <br/>
                <br/>
                <InputLabel id="carreraLabel">Carrera</InputLabel>
                <Select
                    labelId="carreraLabel"
                    id="carrera"
                    label="Carrera"
                    variant='standard'
                    value={''}
                    onChange={(event) => {handleLoginChange('carrera', event.target.value, true)}}
                    style={{width:'100%'}}
                    // onChange={handleChange}
                >
                    <MenuItem value={'Ingeniería en Sistemas'}>Ingeniería En Sistemas</MenuItem>
                </Select>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem'}}>
                    <Fab color="primary" size='small' aria-label="add" onClick={() => setDialogOpen(!dialogOpen)}>
                        <AddIcon /> 
                    </Fab>
                    <span style={{paddingLeft: '1rem'}}>Agregar Materias</span>
                </div>
               <br/>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem'}}>
                    <Button
                        variant='outlined'
                        disabled={disabledNew}
                        style={{backgroundColor: 'white', borderColor: '#BDA563', color: '#BDA563', margin:'auto'}}
                        onClick={handleCrearCuenta}
                    >
                        Crear Cuenta
                    </Button>
                </div>
            </Paper>

            <AgregarMateriasDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} materias={materias} setMaterias={setMaterias}/>
            
        </div>
        </>
    )
 }