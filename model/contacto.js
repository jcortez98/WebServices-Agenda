var database = require('./database');
var contacto = {};

contacto.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM contacto_usuario WHERE idUsuario = ?",
    idUsuario,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.selectAllHistorial = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM historial WHERE idUsuario = ? ORDER BY fecha DESC",
    idUsuario,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.select = function(idContacto, callback) {
  if(database) {
    var sql = "SELECT * FROM Contacto WHERE idContacto = ?";
    database.query(sql, idContacto,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.insert = function(data, callback) {
  if(database) {
    database.query("call add_contacto(?,?,?,?,?,?,?); ", [data.nombre,data.apellido,
    data.direccion,data.telefono,data.correo, data.idCategoria, ''],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {

        var mi = (resultado)
        var oo = mi[0];
        var os = oo[0]
        var ddd = {
          idUsuario: data.idUsuario,
          idContacto: os.idContacto
        }
        database.query("INSERT INTO detalleUsuario(idUsuario,idContacto) values (?,?);",[ddd.idUsuario,ddd.idContacto],function(error, resultado) {
          if(error) {
            throw error;
          } else {
            callback(null, {"insertId": resultado.idDetalleUsuario});
          }
        });
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.update = function(data, callback) {
  if(database) {
    var sql = "call set_contacto(?,?,?,?,?,?,?,?,?);";
    database.query(sql,
    [data.idUsuario, data.idContacto, data.nombre, data.apellido, data.direccion, data.telefono, data.correo, data.stringFoto,data.idCategoria],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.delete = function(idContacto, callback) {
  if(database) {
    var sql = "call delete_contacto (?)";
    database.query(sql, idContacto,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = contacto;
