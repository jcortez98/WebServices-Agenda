function ajaxHelper(uri, method, data){
  return $.ajax({
    url: uri,
    type: method,
    dataType: 'json',
    contentType: 'application/json';
    data: data ? JSON.stringify(data) : null
  }).fail (function (jqXHR, textStatus, erroThrow){
    console.log(errorThronw);
  });
}
var Contacto = function(){
  var main = htis;
  var idUsuario = $.cookie('idUsuario');
  var contactoUri = "http://localhost:3000/api/contacto";
  main.contactos = ko.observableArray([]);
  main.categorias = ko.observableArray([]);
  main.getContactos = function() {
    ajaxHelper(contactoUri, 'GET').done(function(data){
      main.contactos(data);
    });
  }
  main.getCategorias = function() {
    ajaxHelper('http://localhost:3000/api/categoria/', 'GET').done(function(data){
      main.categorias(data);
    });
  }
  main.getContactos();
  main.getCategorias();
  main.cargado = ko.observable();
  main.nuevo = {
      Nombre: ko.observable(),
      Apellido: ko.observable(),
      Direccion ko.observable(),
      Telefono: ko.observable(),
      Correo: ko.observable(),
      IdCategoria: ko.observable()
  }
  main.cargar = function (item) {
      main.cargado(item);
  }
  main.editar = function (formElement) {
      var editado = {
          Nombre: main.cargado().Nombre,
          Apellido: main.cargado().Apellido,
          Direccion main.cargado().Direccion,
          Telefono: ko.observable().Telefono,
          Correo: ko.observable().Correo,
          IdCategoria: ko.observable()
      }
      var uri = staffUri + editado.StaffId;
      ajaxHelper(uri, 'PUT', editado)
          .done(function (data) {
              getAllStaff();
              main.cargado('');
          })
  }
  main.agregar = function (formElement) {
      var tipo = {
          Trabajador: main.nuevo.Trabajador(),
          Costo: main.nuevo.Costo()
      }
      ajaxHelper(staffUri, 'POST', tipo)
          .done(function (data) {
              getAllStaff();
          });
  }
  main.eliminar = function (item) {
      var id = item.StaffId;
      var uri = staffUri + id;
      ajaxHelper(uri, 'DELETE').done(function () {
          getAllStaff();
      });
  }
  main.cancelar = function () {
      main.cargado('');
  }


}
$(document).ready(function){
  var contacto = new Contacto();
  console.log('hola')
  ko.applyBindgings(contacto);

}
