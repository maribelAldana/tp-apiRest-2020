const cursoRouter = require('express').Router();

const { getCursos, getCurso, getCursosXanioYduracion, deleteCurso, postCurso } = require('./cursoController');

const { getAlumnos, getMejorAlumno, postAlumno } = require('../clienteCRUD/alumnosController');

const {validarCurso, validarAlumno} = require('./validatorCurso');
//devuelve los cursos
cursoRouter.get('/', getCursos);
//busca un curso por _id
cursoRouter.get('/:id', getCurso);
//elimino un curso
cursoRouter.delete('/:id', deleteCurso);
//busca un curso por duracion y año
cursoRouter.get('/:anio & :duracion', getCursosXanioYduracion);
//insertar nuevo cliente
cursoRouter.post('/', validarCurso, postCurso);


//devuelve los alumnos de un curso
cursoRouter.get('/:id/alumnos', getAlumnos);
//devuelve el mejor alumno
cursoRouter.get('/:id/mejoralumno', getMejorAlumno);
//agrego un alumno a un curso
cursoRouter.post('/:id/alumnos', validarAlumno, postAlumno);

module.exports = cursoRouter;
