const mongoose = require('mongoose');

const Direccion = require('./Direccion');

const Alumno = new mongoose.Schema({
    nombre: { type: String },
    apellido: { type: String },
    dni: { type: Number } ,
    direccion: { type: Direccion },
    nota: { type: Number }
}, { _id: false });

module.exports = Alumno;
