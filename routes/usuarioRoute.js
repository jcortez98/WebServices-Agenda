var express = require('express');
var Usuario = require('../model/usuario');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs-extra');
var jwt = require('jsonwebtoken');

router.post('/api/usuario/autenticar', function(req, res) {
  var data = {
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }
  Usuario.autenticar(data, function(err, resultado) {
    if(resultado !== undefined) {
      console.log(resultado[0])
      var temp = {
				idUsuario: resultado[0],
				nick: resultado[0].nick,
				contrasena: resultado[0].contrasena
			}

      var token = 'Bearer ' + jwt.sign(temp, 'in6av',{ expiresIn: 60*60})
      resultado[0].estado = true;
			resultado[0].mensaje = "Se otorgo el acceso";
			resultado[0].token = token;

			res.json(resultado[0]);
    } else {
      res.json({"Mensaje": "Boom no paso"});
    }
  });
});
/*
router.post('/registrar', function(req, res, next) {
    var data = {
        'idUsuario': null,
        'nick': '',
        'contrasena': '',
        'stringFoto': ''
    };
    var named = '';

    var form = new formidable.IncomingForm();

 // parse a file upload
    form.parse(req, function(err, fields, files) {
      data.nick = fields.nick;
      data.contrasena = fields.contrasena;
      data.stringFoto = '';
      Usuario.insert(data, function(error, resultado) {
          if(resultado.insertId > 0) {
            res.cookie("idUsuario", resultado.insertId);
            res.cookie('nick', data.nick);
            res.redirect('/')
          } else {
              res.json({'Mensaje': 'No se pudo registrar'});
          }
      });
    });
 form.on('end', function(fields, files) {

        if (this.openedFiles[0].name !== '' ) {

             //el this a donde hace referencia?
             //Temporary location of our uploaded file
            var temp_path = this.openedFiles[0].path;
            // The file name of the uploaded file
            var file_name = this.openedFiles[0].name;
            // Location where we want to copy the uploaded file
            var new_location = './public/images/';
            named = new_location+ file_name;
            fs.copy(temp_path, new_location + file_name, function(err) {
                if (err) {
                    console.error(err);
                } else {
                  named = new_location+ file_name;
                }
            });
        } else {
          n(data);
        }

    });
    return;

});
*/
router.post('/api/usuario/registrar', function(req, res, next) {

    var form = new formidable.IncomingForm();
 // parse a file upload
    form.parse(req, function(err, fields, files) {
      //res.writeHead(200, {'content-type': 'text/plain'});
      //res.write('Upload received :\n');

    //console.log(files.foto.name);

      //res.end(util.inspect({fields: fields, files: files}));
      var imagePath = (files.archivo.name == undefined)
            ? '' : 'images/' + files.archivo.name;
      console.log()
      var data = {
          'nick': fields.nick,
          'contrasena': fields.contrasena,
          'stringFoto': imagePath
      }

      console.log(data)

      Usuario.insert(data, function(error, resultado) {
        console.log(resultado);
          if(resultado.insertId > 0) {
            res.cookie("idUsuario", resultado.insertId);
            res.cookie('nick', data.nick);
            res.redirect('/')
          } else {
              res.json({'Mensaje': 'No se pudo registrar'});
          }
      });
    });
 form.on('end', function(fields, files) {
        if (this.openedFiles[0].name !== '' ) {
             //el this a donde hace referencia?
             /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            /* Location where we want to copy the uploaded file */
            var new_location = './public/images/';
            fs.copy(temp_path, new_location + file_name, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('success');
                }
            });
        }

    });
});

router.post('/api/usuario/subirImagen/', function(req, res, next) {

    var form = new formidable.IncomingForm();
 // parse a file upload
    form.parse(req, function(err, fields, files) {
      //res.writeHead(200, {'content-type': 'text/plain'});
      //res.write('Upload received :\n');

    //console.log(files.foto.name);

      //res.end(util.inspect({fields: fields, files: files}));
      var imagePath = (files.archivo.name == undefined)
            ? '' : 'http://localhost:3000/images/' + files.archivo.name;
      console.log()
      var data = {
          'idUsuario': fields.idUsuario,
          'idContacto': fields.idContacto,
          'stringFoto': imagePath
      }

      console.log(data)

      Usuario.insert(data, function(error, resultado) {
        console.log(resultado);
          if(resultado) {
            res.json({'Mensaje': 'Se subio al servidor'})
          } else {
              res.json({'Mensaje': 'No se pudo subir'});
          }
      });
    });
 form.on('end', function(fields, files) {
        if (this.openedFiles[0].name !== '' ) {
             //el this a donde hace referencia?
             /* Temporary location of our uploaded file */
            var temp_path = this.openedFiles[0].path;
            /* The file name of the uploaded file */
            var file_name = this.openedFiles[0].name;
            /* Location where we want to copy the uploaded file */
            var new_location = './public/images/';
            fs.copy(temp_path, new_location + file_name, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('success');
                }
            });
        }

    });
});

router.get('/api/usuario/', function(req, res) {
  Usuario.selectAll(function(error, resultados){
    if(typeof resultados !== undefined) {
      res.json(resultados);
    } else {
      res.json({"Mensaje": "No hay Usuarios"});
    }
  });
});

router.get('/api/usuario/:idUsuario',
  function(req, res) {
    var idUsuario = req.params.idUsuario;
    Usuario.select(idUsuario,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay Usuarios"});
      }
  });
});

router.post('/api/usuario', function(req, res) {
  var data = {
    idUsuario : null,
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }
  Usuario.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.json({"Mensaje": "No se ingreso la Usuario"});
    } else {
      res.json({"Mensaje": "No se ingreso la Usuario"});
    }
  });
});

router.put('/api/usuario/:idUsuario', function(req, res) {
  var idUsuario = req.params.idUsuario;
  var data = {
    idUsuario : req.body.idUsuario,
    nick: req.body.nick,
    contrasena: req.body.contrasena
  }

  if(data.idUsuario === data.idUsuario) {
    Usuario.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la Usuario"});
      }
    });
  } else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }
});

router.delete('/api/usuario/:idUsuario',
  function(req, res) {
    var idUsuario = req.params.idUsuario;
    Usuario.delete(idUsuario,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/Usuario");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
