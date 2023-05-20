
import {useEffect, useState} from 'react';
import {Card, Typography, CircularProgress} from '@mui/material';
import { postData, putData } from '../../services';
import {MateriaEnCurso} from './MateriaEnCurso';


export default function SemestreCursando({alumno, setAlumno}) {

    const [materiasCursando, setMateriasCursando] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await postData('https://appcool.link/materias', {
                ids: alumno.materias_cursando
            });

            setMateriasCursando(res);
        }

        fetchData();
    }, []);

    async function completarMateria(materiaId) {
        console.log('COMPLETAR MATERIA', materiaId)
        if(alumno.materias_cursando.includes(materiaId)){
            const newMateriasCursando = alumno.materias_cursando.filter(mat => mat !== materiaId);
            alumno.materias_cursadas.push(materiaId);
            const newAlumno = {
                ...alumno,
                materias_cursadas : alumno.materias_cursadas,
                materias_cursando : newMateriasCursando
            }
            setAlumno(newAlumno);
            setMateriasCursando(materiasCursando.filter(mat => mat.id !== materiaId));
            await putData('https://appcool.link/alumno/materiasCursando', {materiasCursando: newMateriasCursando, noCtrl: alumno.noctrl});
            await putData('https://appcool.link/alumno/materiasCursadas', {materiasCursadas: alumno.materias_cursadas, noCtrl: alumno.noctrl});

        }
    }

    async function bajaMateria(materiaId) {
        console.log('BAJA MATERIA', materiaId)
        if(alumno.materias_cursando.includes(materiaId)){
            const newMateriasCursando = alumno.materias_cursando.filter(mat => mat !== materiaId);
            const newAlumno = {
                ...alumno,
                materias_cursando : newMateriasCursando
            }
            setAlumno(newAlumno);
            setMateriasCursando(materiasCursando.filter(mat => mat.id !== materiaId));
            await putData('https://appcool.link/alumno/materiasCursando', {materiasCursando: newMateriasCursando, noCtrl: alumno.noctrl});
        }
    }

    console.log({materiasCursando});
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
                Semestre {alumno.semestre}
            </Typography>
            {
                materiasCursando.length > 0 ?
                materiasCursando.map((materia) => {
                    return (
                        <MateriaEnCurso 
                            materia={materia}
                            completarMateria={completarMateria}
                            bajaMateria={bajaMateria}
                        />
                    )
                })
                :
                <CircularProgress/>
            }
        </Card>
    )
}