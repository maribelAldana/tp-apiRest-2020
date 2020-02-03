const Curso = require('../models/Curso');
const { validationResult } = require('express-validator');

const getAlumnos = (req, res, next) =>{
    const uncurso = req.curso;
    Curso.find(uncurso)
        .then(curso => {
            if(!curso){
            res.status(404).json({
                message: "No se encontro el curso"
            })
            }
            else{
            res.status(200).json({
                message: curso.alumnos
            })
            req.curso = curso;
            next();
            }
  
        })
        .catch(err => {
            console.log(err);
              res.status(500).json({
                  message: "Inconvenientes en el server"
              });
        });
};

const getMejorAlumno = (req, res, next) => {
    console.log(req.curso);
    const curso = req.curso;

    Curso.aggregate([
            {$unwind: "$alumnos"},
            {$group:
                {_id:{nombre:"$alumnos.nombre",
                    apellido:"$alumnos.apellido",
                    nota:"$alumnos.nota"}
                }
            },
            {$project:{
                nombre:"$_id.nombre",
                apellido:"$_id.apellido",
                nota:"$_id.nota",
                _id:0
            }},
            {$sort: {nota: -1}},
            {$limit: 1}
        ])
        .then(alumno => {
            if(!alumno){
            res.status(404).json({
                message: "No se encontro el curso"
            })
            }
            else{
            res.status(200).json({
                message: alumno
            })
            }
  
        })
        .catch(err => {
            console.log(err);
              res.status(500).json({
                  message: "Inconvenientes en el server"
              });
        });
};

const postAlumno = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const unCurso = req.params.id;
    const body = req.body;

    
    Curso.findById(unCurso)
        .then((curso) => {
            if(!curso){
                return res.status(400).json({
                    message:"No se encontro el curso"
                });
            }

            const alumno = {
                nombre: body.nombre,
                apellido: body.apellido,
                dni: body.dni,
                direccion: body.direccion,
                nota:body.nota
            };
            
            curso.alumnos.push(alumno);
            curso.save()
                .then(
                    modificado => {
                        res.status(201).json({
                            message: modificado
                        });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Inconvenientes en el server"
            });
        })
};

module.exports = { getAlumnos, getMejorAlumno, postAlumno };