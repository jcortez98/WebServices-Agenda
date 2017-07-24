var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var categoria = require('../model/categoria');
var router = express.Router();
var auth = new Autenticacion();

router.get('/api/categoria/user/:id', function(req, res) {
  let id = req.params.id;
  categoria.selectAll(id, function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay categorias"});
    }
  });

});

router.get('/api/categoria/:idCategoria',
  function(req, res) {
    var idCategoria = req.params.idCategoria;
    categoria.select(idCategoria,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay categorias"});
      }
  });
});

router.post('/api/categoria', function(req, res) {

  var data = {
    idUsuario: req.body.idUsuario,
    idCategoria : null,
    nombreCategoria: req.body.nombreCategoria
  }
  categoria.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.json({"Mensaje": "se ingreso la categoria"});
    } else {
      res.json({"Mensaje": "No se ingreso la categoria"});
    }
  });
});

router.put('/api/categoria/:idCategoria', function(req, res) {
  var idCategoria = req.params.idCategoria;
  var data = {
    idCategoria : req.body.idCategoria,
    nombreCategoria: req.body.nombreCategoria
  }

  if(data.idCategoria === data.idCategoria) {
    categoria.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la categoria"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/categoria/:idCategoria',
  function(req, res) {
    var idCategoria = req.params.idCategoria;
    categoria.delete(idCategoria,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.json({"Mensaje": "se elimino"});
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
