var database = require('./database');
var tarea = {};

tarea.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM citas_user WHERE idUsuario = ?",
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

tarea.select = function(id, callback) {
  if(database) {
    var sql = "SELECT * FROM cita WHERE idCita = ?";
    database.query(sql, id,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tarea.insert = function(data, callback) {
  if(database) {
    database.query("call add_cita(?,?,?,?,?); ", [data.fecha,data.lugar,
    data.descripcion,data.idContacto,data.idUsuario],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": 12});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tarea.update = function(data, callback) {
  if(database) {
    var sql = "call set_cita(?,?,?,?,?);";
    database.query(sql,
    [data.idCita, data.fecha, data.lugar, data.descripcion, data.idContacto],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tarea.delete = function(id, callback) {
  if(database) {
    var sql = "call delete_cita (?)";
    database.query(sql, id,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = tarea;
