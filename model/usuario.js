var database = require('./database');
var Usuario = {};

Usuario.selectAll = function(callback) {
  if(database) {
    database.query("SELECT * FROM Usuario",
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Usuario.editarImagen = function(data, callback){
  if (data.idContacto !== undefined) {
    var sql = "UPDATE contacto SET stringFoto = ? WHERE idContacto = ?";
    database.query(sql,[data.stringFoto,data.idContacto], function(error,resultado){
      if(error){
        throw error;
      }else {
        callback(null,resultado);
      }
    });
  }else {
    var sql = "UPDATE Usuario SET stringFoto = ? WHERE idUsuario = ?";
    database.query(sql,[data.stringFoto,data.idUsuario], function(error,resultado){
      if(error){
        throw error;
      }else {
        callback(null,resultado);
      }
    });
  }
}

Usuario.select = function(idUsuario, callback) {
  if(database) {
    var sql = "SELECT * FROM Usuario WHERE idUsuario = ?";
    database.query(sql, idUsuario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Usuario.autenticar = function(data, callback) {
  if(database) {
    var sql = "SELECT * FROM Usuario WHERE nick = ? AND contrasena = ?";
    database.query(sql, [data.nick, data.contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Usuario.insert = function(data, callback) {
  if(database) {
    database.query("call add_usuario (?,?,?) ", [data.nick,data.contrasena,data.stringFoto],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        var mi = (resultado)
        var oo = mi[0];
        console.log(oo);
        var os = oo[0]
        callback(null, {"insertId": os.idUsuario});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Usuario.update = function(data, callback) {
  if(database) {
    var sql = "call set_usuario (?,?,?)";
    database.query(sql,
    [data.idUsuario, data.nick, data.contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": "Se modifico"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

Usuario.delete = function(idUsuario, callback) {
  if(database) {
    database.query('Delete from detalleUsuario Where idUsuario = ?', idUsuario,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        database.query('DELETE from detalleCategoria Where idUsuario = ?', idUsuario,
        function(error, resultado) {
          if(error) {
            throw error;
          } else {
            var sql = "call delete_usuario (?)";
            database.query(sql, idUsuario,
            function(error, resultado) {
              if(error) {
                throw error;
              } else {
                callback(null, {"Mensaje": "Eliminado"});
              }
            });
          }
        });
      }
    });
    //Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = Usuario;
