const Curso = require('../models/Curso');
const { validationResult } = require('express-validator');

const getCursos = (req, res, next) => {
  const query = req.query || {};

  Curso.find(query)
    .then(cursos => {
        res.status(200).json({
            code: 0,
            message: cursos
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Inconvenientes en el server"
        });
    })
};

//devuelve un curso
const getCurso = (req, res, next) => {
  const idCurso = req.params.id;
  
  Curso.findById(idCurso)
    .then(curso => {
      if(!curso){
        res.status(404).json({
          message: "No se encontro el curso"
        })
      }
      else{
        res.status(200).json({
          message: curso
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

const getCursosXanioYduracion = (req, res, next) => {
  const anio = req.query.anio;
  const duracion = req.query.duracion;

  Curso.findOne({anio: anio, duracion: duracion})
    .then(facturas => {
        res.status(200).json({
            message: facturas
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Inconvenientes en el server"
        });
    })
};

const deleteCurso = (req, res, next) => {
  const id = req.params.id;
  Curso.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        message: "Se elimino el curso"
      })
    })
    .catch(() => {
      res.status.json({
        message: "Inconvenientes en el server"
      })
    })
};

const postCurso = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const body = req.body;

  const nuevoCurso = new Curso({
    anio: body.anio,
    tema: body.tema,
    duracion: body.duracion
  });

  nuevoCurso.save()
    .then(created => {
        res.status(201).json({
            message: created
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
          message: "Inconvenientes en el server"
      });
  })

};

module.exports = { getCursos, getCurso, getCursosXanioYduracion, deleteCurso, postCurso };
