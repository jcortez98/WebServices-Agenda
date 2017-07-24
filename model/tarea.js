var database = require('./database');
var tarea = {};

tarea.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM tareas_user WHERE idUsuario = ?",
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

tarea.selectAllProridades = function(callback) {
  if(database) {
    database.query("SELECT * FROM prioridad",
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
    var sql = "SELECT * FROM tarea WHERE idTarea = ?";
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
    database.query("call add_tarea(?,?,?,?,?,?); ", [data.nombre,data.descripcion,
    data.fecha,data.idUsuario,data.idPrioridad, data.idCategoria],
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
    var sql = "call set_tarea(?,?,?,?,?,?);";
    database.query(sql,
    [data.idTarea, data.nombre, data.descripcion, data.fecha, data.idPrioridad, data.idCategoria],
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
    var sql = "call delete_tarea (?)";
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
