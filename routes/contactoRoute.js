var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var contacto = require('../model/contacto');
var auth = new Autenticacion();
var router = express.Router();

router.get('/api/contacto/:id', function(req, res) {
  var id = req.params.id
  contacto.selectAll(id,function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay contactos"});
    }
  });
});
router.get('/api/historial/:id', function(req, res) {
  var id = req.params.id;
  contacto.selectAllHistorial(id, function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay historial"});
    }
  });
});

router.get('/api/contacto/buscar/:idContacto',
  function(req, res) {
    var idContacto = req.params.idContacto;
    contacto.select(idContacto, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay contactos"});
      }
  });
});

router.post('/api/contacto', function(req, res) {
  let data = {
    idUsuario: req.body.idUsuario,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria
  }

  contacto.insert(data, function(err, resultado) {
    if(resultado !== undefined) {
      res.json({"Mensaje": "Se ingreso el contacto"});
    } else {
      res.json({"Mensaje": "No se ingreso el contacto"});
    }
  });
});

router.put('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;
  var data = {
    idUsuario: req.body.idUsuario,
    idContacto : req.body.idContacto,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria,
    stringFoto: req.body.stringFoto
  }

  if(data.idContacto === data.idContacto) {
    contacto.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json({'Mensaje': 'Se modifico'});
      } else {
        res.json({"Mensaje": "No se modifico la contacto"});
      }
    });
  } else {
    console.log('no se porque');
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/contacto/:idContacto', function(req, res) {
    var idContacto = req.params.idContacto;
    contacto.delete(idContacto,function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.json({'Mensaje': 'Se elimino el contacto'})
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
