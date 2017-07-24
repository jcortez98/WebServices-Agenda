var mysql = require("mysql");
var parametros = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'AgendaIn6avCortez'
};
var connection = mysql.createConnection(parametros);

module.exports = connection;
