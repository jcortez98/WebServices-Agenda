var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var contacto = require('../model/cita');
var auth = new Autenticacion();
var router = express.Router();

router.get('/api/cita/user/:id', function(req, res) {
  let id = req.params.id;
  contacto.selectAll(id, function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay citas"});
    }
  });
});

router.get('/api/cita/:id',
  function(req, res) {
    var id = req.params.id;
    contacto.select(id, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay cita"});
      }
  });
});

router.post('/api/cita', function(req, res) {
  var data = {
    idUsuario: req.body.idUsuario,
    fecha: req.body.fecha,
    lugar: req.body.lugar,
    descripcion: req.body.descripcion,
    idContacto: req.body.idContacto
  }
  contacto.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.json({'Mensaje': 'Se ingreso'});
    } else {
      res.json({"Mensaje": "No se ingreso la cita"});
    }
  });
});

router.put('/api/cita/:id', function(req, res) {
  var id = req.params.id;
  var data = {
    idCita : req.body.idCita,
    fecha: req.body.fecha,
    lugar: req.body.lugar,
    descripcion: req.body.descripcion,
    idContacto: req.body.idContacto
  }
  if(data.idCita === data.idCita) {
    contacto.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la cita"});
      }
    });
  } else {
    console.log('no se porque');
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/cita/:id', function(req, res) {
    var id = req.params.id;
    contacto.delete(id,function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.json(resultado)
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
