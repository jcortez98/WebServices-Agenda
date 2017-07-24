var mysql = require("mysql");
var parametros = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'AgendaIn6av'
};
var connection = mysql.createConnection(parametros);

module.exports = connection;
