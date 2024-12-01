export const expedientes = [
  {
    IdMascota: 1,
    NombreMascota: "Firulais",
    Expedientes: [
      {
        IdExpediente: 1,
        FechaApertura: "2024-01-10",
        Alergias: "Polen",
        CondicionCronicas: "Artritis",
        Observaciones: "Mantenerse en ambiente controlado, evitar jardines.",
        Consultas: [
          {
            IdConsulta: 1,
            IdExpediente: 1,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-10",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Tratamiento actual ",
            ImgdeExamenes: [
              "https://www.vetelab.net/wp-content/uploads/2021/08/Formato-para-Solicitud-de-Analisis_page-0001-768x1113.jpg",
              "https://analiticaveterinaria.com/wp-content/uploads/2023/12/FICHA-SOLICITUD-DE-ANTIBIOGRAMAS-2024-724x1024.png",
              "https://example.com/imagen3.jpg"
            ]
          },
          {
            IdConsulta: 2,
            IdExpediente: 1,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-15",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Continuar con el tratamiento actual",
            ImgdeExamenes: [
              "https://example.com/imagen1.jpg",
              "https://example.com/imagen2.jpg",
              "https://analiticaveterinaria.com/wp-content/uploads/2023/12/FICHA-SOLICITUD-DE-ANTIBIOGRAMAS-2024-724x1024.png"
            ]
          } ,
          {
            IdConsulta: 3,
            IdExpediente: 1,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-15",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Continuar con el tratamiento actual",
            ImgdeExamenes: [
              "https://analiticaveterinaria.com/wp-content/uploads/2023/12/FICHA-SOLICITUD-DE-ANTIBIOGRAMAS-2024-724x1024.png",
              "https://example.com/imagen2.jpg",
              "https://example.com/imagen3.jpg"
            ]
          }    ,
          {
            IdConsulta: 4,
            IdExpediente: 1,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-15",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Continuar con el tratamiento actual",
            ImgdeExamenes: [
              "https://example.com/imagen1.jpg",
              "https://example.com/imagen2.jpg",
              "https://example.com/imagen3.jpg"
            ]
          }                                 
        ]
      }
    ]
  },
  {
    IdMascota: 2,
    NombreMascota: "Max",
    Expedientes: [
      {
        IdExpediente: 4,
        FechaApertura: "2024-01-18",
        Alergias: "Polvo",
        CondicionCronicas: "Insuficiencia renal",
        Observaciones: "Requiere hidratación continua y revisiones frecuentes.",
        Consultas: [
          {
            IdConsulta: 5,
            IdExpediente: 4,
            IdVeterinario: "VET-002",
            IdCita: "CITA-002",
            FechaConsulta: "2024-01-22",
            MotivoConsulta: "Consulta por insuficiencia renal",
            Diagnostico: "Insuficiencia renal leve",
            Tratamiento: "Medicación y control de líquidos",
            ImgdeExamenes: [
              "https://example.com/imagen4.jpg",
              "https://example.com/imagen5.jpg"
            ]
          }
        ]
      }
    ]
  },
  {
    IdMascota: 3,
    NombreMascota: "Luna",
    Expedientes: [
      {
        IdExpediente: 6,
        FechaApertura: "2024-03-10",
        Alergias: "Alimentos procesados",
        CondicionCronicas: "Obesidad",
        Observaciones: "Dieta controlada y ejercicio regular.",
        Consultas: [
          {
            IdConsulta: 6,
            IdExpediente: 6,
            IdVeterinario: "VET-003",
            IdCita: "CITA-003",
            FechaConsulta: "2024-03-12",
            MotivoConsulta: "Revisión por obesidad",
            Diagnostico: "Obesidad moderada",
            Tratamiento: "Dieta más estricta y ejercicio regular",
            ImgdeExamenes: [
              "https://example.com/imagen6.jpg",
              "https://example.com/imagen7.jpg"
            ]
          },
          {
            IdConsulta: 7,
            IdExpediente: 6,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-15",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Continuar con el tratamiento actual",
            ImgdeExamenes: [
              "https://example.com/imagen1.jpg",
              "https://example.com/imagen2.jpg",
              "https://example.com/imagen3.jpg"
            ]
          }    ,
          {
            IdConsulta: 8,
            IdExpediente: 6,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-15",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Continuar con el tratamiento actual",
            ImgdeExamenes: [
              "https://example.com/imagen1.jpg",
              "https://example.com/imagen2.jpg",
              "https://example.com/imagen3.jpg"
            ]
          }    ,
          {
            IdConsulta: 9,
            IdExpediente: 6,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-15",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Continuar con el tratamiento actual",
            ImgdeExamenes: [
              "https://example.com/imagen1.jpg",
              "https://example.com/imagen2.jpg",
              "https://example.com/imagen3.jpg"
            ]
          },
          {
            IdConsulta: 10,
            IdExpediente: 6,
            IdVeterinario: "VET-001",
            IdCita: "CITA-001",
            FechaConsulta: "2024-01-15",
            MotivoConsulta: "Revisión general",
            Diagnostico: "Sin novedades",
            Tratamiento: "Continuar con el tratamiento actual",
            ImgdeExamenes: [
              "https://example.com/imagen1.jpg",
              "https://example.com/imagen2.jpg",
              "https://example.com/imagen3.jpg"
            ]
          }                                                         
        ]
      }
    ]
  }
];
