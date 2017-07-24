function ajaxHelper(uri, method, data) {
  return $.ajax({
    url: uri,
    type: method,
    dataType: 'json',
    contentType: 'application/json',
    data: data ? JSON.stringify(data) : null
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log('algo paso');
  });
}

var Contacto = function() {
  var main = this;
  main.idUsuario = ko.observable(0)
  var contactoUri = "http://localhost:3000/api/usuario";
  main.usuarios = ko.observableArray([]);
  main.getUsuarios = function() {
    ajaxHelper(contactoUri, 'GET').done(function(data){
      main.usuarios(data);
    });
  }
  main.error = ko.observable();
  main.cargado = ko.observable();
  main.nuevo = {
      nick: ko.observable(),
      contrasena: ko.observable()
  }
  main.editar = function (formElement) {
      var editado = {
        idUsuario: main.cargado().idUsuario,
        nick: main.cargado().nick,
        contrasena: main.cargado().contrasena
      }
      var uri = contactoUri+'/' + editado.idUsuario;
      ajaxHelper(uri, 'PUT', editado)
          .done(function (data) {
              main.getUsuarios();
          })
  }

  main.eliminar = function (item) {
      var id = item.idUsuario;
      var uri = contactoUri+'/' + id;
      ajaxHelper(uri, 'DELETE').done(function () {
          main.getUsuarios();
      });
  }
  main.agregar =function () {
    var tipo = {
      nick: main.nuevo.nick(),
      contrasena: main.nuevo.contrasena()
        }
        ajaxHelper(contactoUri, 'POST', tipo)
            .done(function (data) {
                main.getUsuarios();

            });
  }

  main.getUsuarios();
  main.cargado = ko.observable();
  main.cargar = function (item) {
      main.cargado(item);
  }

  main.cancelar = function () {
      main.cargado('');
  }
}


$(document).ready(function() {
  var usuario = new Contacto();
  ko.applyBindings(usuario);
})
