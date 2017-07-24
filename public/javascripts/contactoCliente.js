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
  var contactoUri = "http://localhost:3000/api/contacto";
  main.contactos = ko.observableArray([]);
  main.categorias = ko.observableArray([]);
  main.tareas = ko.observableArray([]);
  main.prioridades = ko.observableArray([]);
  main.citas = ko.observableArray([]);
  main.getContactos = function() {
    ajaxHelper(contactoUri, 'GET').done(function(data){
      main.contactos(data);
    });
  }
  main.error = ko.observable();
  main.staffs = ko.observableArray();
  main.cargado = ko.observable();
  main.cargadoCategoria = ko.observable();
  main.cargadoTarea = ko.observable();
  main.cargadoCita = ko.observable();
  main.nuevo = {
      nombre: ko.observable(),
      nombreCategoria: ko.observable(),
      apellido: ko.observable(),
      direccion: ko.observable(),
      telefono: ko.observable(),
      correo: ko.observable(),
      categoria: ko.observable()
  }
  main.nuevaCita = {
      lugar: ko.observable(),
      fecha: ko.observable(),
      contacto: ko.observable(),
      descripcion: ko.observable()
  }

  main.nuevoTarea = {
    nombre: ko.observable(),
    descripcion: ko.observable(),
    fecha: ko.observable(),
    prioridad: ko.observable()
  }
  main.cargar = function (item) {
      main.cargado(item);
      console.log(main.cargado());
  }
  main.cargarCategoria = function (item) {
      main.cargadoCategoria(item);
  }
  main.cargarTarea = function (item) {
      main.cargadoTarea(item);
  }
  main.editar = function (formElement) {
      var editado = {
        idContacto: main.cargado().idContacto,
        nombre: main.cargado().nombre,
        apellido: main.cargado().apellido,
        direccion: main.cargado().direccion ,
        telefono: main.cargado().telefono,
        correo: main.cargado().correo,
        idCategoria: main.nuevo.categoria().idCategoria
      }
      var uri = contactoUri+'/' + editado.idContacto;
      ajaxHelper(uri, 'PUT', editado)
          .done(function (data) {
              main.getContactos();
              main.getHistorial();
          })
  }

  main.eliminar = function (item) {
      var id = item.idContacto;
      var uri = contactoUri+'/' + id;
      ajaxHelper(uri, 'DELETE').done(function () {
          main.getContactos();
          main.getHistorial();
      });
  }
  main.eliminarCategoria = function (item) {
      var id = item.idCategoria;
      var uri = 'http://localhost:3000/api/categoria/' + id;
      ajaxHelper(uri, 'DELETE').done(function () {
          main.getCategorias();
          main.getHistorial();
      });
  }
  main.cancelar = function () {
      main.cargado('');
  }
  main.agregar =function () {
    var tipo = {
      nombre: main.nuevo.nombre(),
      apellido: main.nuevo.apellido(),
      direccion: main.nuevo.direccion() ,
      telefono: main.nuevo.telefono(),
      correo: main.nuevo.correo(),
      idCategoria: main.nuevo.categoria().idCategoria
        }
        ajaxHelper(contactoUri, 'POST', tipo)
            .done(function (data) {
                main.getContactos();
                main.getHistorial();
            });
  }
  main.agregarCategoria =function () {
    var tipo = {
      nombreCategoria: main.nuevo.nombreCategoria()
        }
        ajaxHelper('http://localhost:3000/api/categoria', 'POST', tipo)
            .done(function (data) {
              main.getCategorias();
              main.getHistorial();
            });
  }
  main.editarCategoria = function (formElement) {
      var editado = {
        idCategoria: main.cargadoCategoria().idCategoria,
        nombreCategoria: main.cargadoCategoria().nombreCategoria
      }
      var uri = 'http://localhost:3000/api/categoria'+'/' + editado.idCategoria;
      ajaxHelper(uri, 'PUT', editado)
          .done(function (data) {
              main.getCategorias();
              main.getHistorial();
          })
  }

  main.getCategorias = function() {
    ajaxHelper('http://localhost:3000/api/categoria/', 'GET').done(function(data){
      main.categorias(data);
    });
  }
  //Tareas
  main.agregarTarea =function () {
    var tipo = {
      nombre: main.nuevoTarea.nombre(),
      descripcion: main.nuevoTarea.descripcion(),
      fecha: main.nuevoTarea.fecha(),
      idPrioridad: main.nuevoTarea.prioridad().idPrioridad,
      idCategoria: main.nuevo.categoria().idCategoria
    }
    ajaxHelper('http://localhost:3000/api/tarea', 'POST', tipo)
      .done(function (data) {
      main.getTareas();
      main.getHistorial();
      });
  }
  main.eliminarTarea = function (item) {
      var id = item.idTarea;
      var uri = 'http://localhost:3000/api/tarea/' + id;
      ajaxHelper(uri, 'DELETE').done(function () {
          main.getTareas();
          main.getHistorial();
      });
  }
  main.editarTarea = function (formElement) {
      var editado = {
        idTarea: main.cargadoTarea().idTarea,
        nombre: main.cargadoTarea().nombre,
        descripcion: main.cargadoTarea().descripcion,
        fecha: main.cargadoTarea().fecha,
        idPrioridad: main.nuevoTarea.prioridad().idPrioridad,
        idCategoria: main.nuevo.categoria().idCategoria
      }
      var uri = 'http://localhost:3000/api/tarea/'+ editado.idCategoria;
      ajaxHelper(uri, 'PUT', editado)
          .done(function (data) {
              main.getTareas();
              main.getHistorial();
          })
  }
  main.getTareas = function() {
    ajaxHelper('http://localhost:3000/api/tarea/', 'GET').done(function(data){
      main.tareas(data);
    });
    ajaxHelper('http://localhost:3000/api/prioridad/', 'GET').done(function(data){
      main.prioridades(data);
      console.log(data);
    });
  }
  //citas
  main.agregarCita =function () {
    console.log(main.nuevaCita.contacto());
    var tipo = {
      lugar: main.nuevaCita.lugar(),
      fecha: main.nuevaCita.fecha(),
      descripcion: main.nuevaCita.descripcion(),
      idContacto: main.nuevaCita.contacto().idContacto
    }
    ajaxHelper('http://localhost:3000/api/cita', 'POST', tipo)
      .done(function (data) {
      main.getCitas();
      main.getHistorial();
      });
  }
  main.eliminarCita = function (item) {
      var id = item.idCita;
      var uri = 'http://localhost:3000/api/cita/' + id;
      ajaxHelper(uri, 'DELETE').done(function () {
          main.getCitas();
          main.getHistorial();
      });
  }
  main.editarCita = function (formElement) {
      var editado = {
        idCita: main.cargadoCita().idTarea,
        lugar: main.cargadoCita().lugar,
        descripcion: main.cargadoCita().descripcion,
        fecha: main.cargadoCita().fecha,
        idContacto: main.nuevaCita.contacto().idContacto
      }
      var uri = 'http://localhost:3000/api/cita/'+ editado.idCategoria;
      ajaxHelper(uri, 'PUT', editado)
          .done(function (data) {
              main.getCitas();
              main.getHistorial();
          })
  }
  main.getCitas = function() {
    ajaxHelper('http://localhost:3000/api/cita/', 'GET').done(function(data){
      main.citas(data);
    });
  }
//

  main.history = ko.observableArray();
  main.getHistorial = function() {
    ajaxHelper('http://localhost:3000/api/historial/', 'GET').done(function(data){
      main.history(data);
      console.log(data);
    });
  }
  main.getContactos();
  main.getCategorias();
  main.getHistorial();
  main.getTareas();
  main.cargado = ko.observable();
  main.cargar = function (item) {
      main.cargado(item);
  }

  main.cargarCita = function (item) {
      main.cargadoCita(item);
  }
  main.cancelar = function () {
      main.cargado('');
  }
}


$(document).ready(function() {
  var contacto = new Contacto();
  ko.applyBindings(contacto);
})
