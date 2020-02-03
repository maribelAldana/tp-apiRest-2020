const mongoose = require('mongoose');

const Alumno = require('./Schema/Alumno');

const Curso = new mongoose.Schema({
    anio: { type: Number},
    tema: { type: String },
    duracion: { type: Number},
    alumnos: { type: [Alumno], default: []}
}, {collection: 'cursos'});

module.exports = mongoose.model('Curso', Curso);
