var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var contacto = require('../model/tarea');
var auth = new Autenticacion();
var router = express.Router();

router.get('/api/tarea/:id', function(req, res) {
  let id = req.params.id;
  contacto.selectAll(id, function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay tareas"});
    }
  });
});

router.get('/api/prioridad/', function(req, res) {
    contacto.selectAllProridades(function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay prioridades"});
      }
    });

});

router.get('/api/tarea/:idTarea',
  function(req, res) {
    var idTarea = req.params.idTarea;
    contacto.select(idTarea, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay tarea"});
      }
  });
});

router.post('/api/tarea', function(req, res) {
  var data = {
    idUsuario: req.body.idUsuario,
    descripcion : req.body.descripcion,
    fecha: req.body.fecha,
    nombre: req.body.nombre,
    idPrioridad: req.body.idPrioridad,
    idCategoria: req.body.idCategoria
  }
  contacto.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.json({ "Mensaje" : "Se elimino"})
    } else {
      res.json({"Mensaje": "No se ingreso la tarea"});
    }
  });
});

router.put('/api/tarea/:idTarea', function(req, res) {
  var idTarea = req.params.idTarea;
  var data = {
    idUsuario: req.body.idUsuario,
    idTarea : req.body.idTarea,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    idPrioridad: req.body.idPrioridad,
    idCategoria: req.body.idCategoria
  }
  if(data.idTarea === data.idTarea) {
    contacto.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la tarea"});
      }
    });
  } else {
    console.log('no se porque');
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/tarea/:idTarea', function(req, res) {
    var idTarea = req.params.idTarea;
    contacto.delete(idTarea,function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.json(resultado)
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
