const { check } = require('express-validator');


const validarCurso = [
    check('tema').isString().withMessage("No se acceptan caracteres especiales"),
    check('anio').isNumeric().withMessage("El anio debe ser de tipo numerico"),
    check('duracion').isNumeric().withMessage("El anio debe ser de tipo numerico")
];

const validarAlumno = [
    check('nombre').isString().withMessage("No se acceptan caracteres especiales"),
    check('apellido').isString().withMessage("No se acceptan caracteres especiales"),
    check('dni').isNumeric().withMessage("El DNI debe ser de tipo numerico"),
    check('direccion').exists().withMessage("La direccion debe ser completada"),
    check('nota').isNumeric().withMessage("La nota debe ser de tipo numerico")
];

module.exports = {validarCurso, validarAlumno};