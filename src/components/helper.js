//Funciones de ayuda

export function getMateria(materias, id, semestre=null) {
    const subId = id.slice(0, -1);
    if(semestre) {
        return materias[semestre][subId].find(variante => variante.id === id);
    } else {
        const semestres = Object.keys(materias);
        const _semestre = semestres.find((numSem) => materias[numSem][subId]);
        return materias[_semestre][subId].find(variante => variante.id === id);
    }
}

function tieneDuplicados(arr) {
    return (new Set(arr)).size !== arr.length;
}

export function estanEmpalmadas(materias, horarios) {
    console.log({materias}, {horarios});
    horarios = horarios.filter(hora => materias.includes(hora.id));
    console.log({horarios})
    const horasInicio = horarios.map(horario => horario.horaInicio);
    console.log({horasInicio});
    const horasFin = horarios.map(horario => horario.horaFin);
    console.log({horasFin});

    return tieneDuplicados(horasInicio) || tieneDuplicados(horasFin);
}

export function calcularAlerta(alumno) {
    const materiasCursadas = alumno.materias_cursadas.length;
    const semestre = alumno.semestre;

    if(materiasCursadas >= semestre*6)
        return 'success';
    else if (materiasCursadas < semestre*6 && materiasCursadas >= semestre*4)
        return 'warning';
    else 
        return 'error';
}