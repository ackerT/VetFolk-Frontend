//CitaData.js
export const citas = [
    {
      idCita: 1,
      IdEspecie: 101,
      IdUsuario: 201,
      IdServicio: 301,
      IdEstado: 1,
      Fecha: "2024-11-15",
      Hora: "10:30",
      comentario: "Revisión general programada" // Añadir el campo de comentario vacío
    },
    {
      idCita: 2,
      IdEspecie: 102,
      IdUsuario: 202,
      IdServicio: 302,
      IdEstado: 2,
      Fecha: "2024-11-16",
      Hora: "12:00",
      comentario: "Cita de vacunación" // Añadir el campo de comentario vacío
    },
    {
      idCita: 3,
      IdEspecie: 103,
      IdUsuario: 203,
      IdServicio: 303,
      IdEstado: 3,
      Fecha: "2024-11-17",
      Hora: "09:00",
      comentario: "Cita de vacunación" // Añadir el campo de comentario vacío
    },
    {
      idCita: 4,
      IdEspecie: 104,
      IdUsuario: 204,
      IdServicio: 304,
      IdEstado: 4,
      Fecha: "2024-11-18",
      Hora: "09:00",
      comentario: "Cita de vacunación" // Añadir el campo de comentario vacío
    }


    
  ];

  //esatdos 
  export const estados = [
    {
      IdEstado: 1,
      Estado: "Pendiente",
      Descripcion: "Cita programada y pendiente de atención"
    },
    {
      IdEstado: 2,
      Estado: "Completada",
      Descripcion: "Cita atendida y completada"
    },
    {
      IdEstado: 3,
      Estado: "Cancelada",
      Descripcion: "Cita cancelada por el usuario o el sistema"
    }, 
    {
      IdEstado: 4,
      Estado: "Completada",
      Descripcion: "Cita programada y pendiente de atención"
    },
  ];
  
  //usuarios
  export const usuarios = [
    {
      IdUsuario: 201,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juanperez@example.com"
    },
    {
      IdUsuario: 202,
      nombre: "María",
      apellido: "López",
      email: "marialopez@example.com"
    },
    {
      IdUsuario: 203,
      nombre: "Carlos",
      apellido: "Ruiz",
      email: "carlosruiz@example.com"
    },
    {
      IdUsuario: 204,
      nombre: "Kike",
      apellido: "Ruiz",
      email: "liosruiz@example.com"
    }
  ];
  
  //comentarios 

  export const messege = [
    {
        idCita: 1,
        idcomentario:1,
         Descripcion: "Cita cancelada por el usuario o el sistema"
    },
    {    
        idCita: 2,
        idcomentario:2,
      Descripcion: "Cita  por el usuario o el sistema"
    },
    {   
        idCita: 3,
        idcomentario:3,
      Descripcion: "Cita  por el usuario o el sistema"
    },
    {   
      idCita: 4,
      idcomentario:4,
    Descripcion: "Cita  por el usuario o el sistema"
  }
  ];
  


  export const comentarios = [
    { idComentario: 1, idCita: 1, comentario: "Comentario sobre la cita 1" },
    { idComentario: 2, idCita: 2, comentario: "Comentario sobre la cita 2" },
    // Otros comentarios...
  ];
  

  // Servicios
export const servicios = [
  { IdServicio: 301, nombre: "Consulta General", Descripcion: "Consulta de revisión general para la mascota" },
  { IdServicio: 302, nombre: "Vacunación", Descripcion: "Aplicación de vacunas" },
  // Otros servicios...
];

// Especies
export const especies = [
  { IdEspecie: 101, nombre: "Perro" },
  { IdEspecie: 102, nombre: "Gato" },
  // Otras especies...
];


export const citasHistoria = [
  { idCita: 1, IdEspecie: 101, IdUsuario: 201, IdServicio: 301, IdEstado: 1, Fecha: "2024-11-15", Hora: "10:30", comentario: "" },
  { idCita: 2, IdEspecie: 102, IdUsuario: 202, IdServicio: 302, IdEstado: 2, Fecha: "2024-11-16", Hora: "12:00", comentario: "" },
  { idCita: 3, IdEspecie: 103, IdUsuario: 203, IdServicio: 303, IdEstado: 3, Fecha: "2024-11-17", Hora: "09:00", comentario: "" },
  { idCita: 4, IdEspecie: 101, IdUsuario: 204, IdServicio: 301, IdEstado: 2, Fecha: "2024-11-18", Hora: "11:00", comentario: "" },
  { idCita: 5, IdEspecie: 102, IdUsuario: 205, IdServicio: 302, IdEstado: 2, Fecha: "2024-11-19", Hora: "13:30", comentario: "" },
  { idCita: 6, IdEspecie: 103, IdUsuario: 206, IdServicio: 303, IdEstado: 2, Fecha: "2024-11-20", Hora: "15:00", comentario: "" },
  { idCita: 7, IdEspecie: 101, IdUsuario: 207, IdServicio: 301, IdEstado: 2, Fecha: "2024-11-21", Hora: "10:00", comentario: "" },
  { idCita: 8, IdEspecie: 102, IdUsuario: 208, IdServicio: 302, IdEstado: 2, Fecha: "2024-11-22", Hora: "14:00", comentario: "" },
  { idCita: 9, IdEspecie: 103, IdUsuario: 209, IdServicio: 303, IdEstado: 2, Fecha: "2024-11-23", Hora: "09:30", comentario: "" },
  { idCita: 10, IdEspecie: 101, IdUsuario: 210, IdServicio: 301, IdEstado: 2, Fecha: "2024-11-24", Hora: "11:00", comentario: "" },
  { idCita: 11, IdEspecie: 102, IdUsuario: 211, IdServicio: 302, IdEstado: 2, Fecha: "2024-11-25", Hora: "13:30", comentario: "" },
];