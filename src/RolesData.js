export const Personas = [
    {
        IdPersona: 1,
        IdDireccion: 101,
        Nombre1: "Juan",
        Nombre2: "Carlos",
        Apellido1: "Pérez",
        Apellido2: "Rodríguez",
        DNI: "0801198712345",
        RTN: "12345678901234",
        FechaNac: "1987-05-12",
        Telefono: "987654321",
        Correo: "juan.perez@example.com"
    },
    {
        IdPersona: 2,
        IdDireccion: 102,
        Nombre1: "Maria",
        Nombre2: "Elena",
        Apellido1: "Lopez",
        Apellido2: "Hernandez",
        DNI: "0801199009876",
        RTN: "98765432109876",
        FechaNac: "1990-08-25",
        Telefono: "912345678",
        Correo: "maria.lopez@example.com"
    },
    {
        IdPersona: 3,
        IdDireccion: 103,
        Nombre1: "Carlos",
        Nombre2: "Eduardo",
        Apellido1: "Martinez",
        Apellido2: "Ortiz",
        DNI: "0801200006789",
        RTN: "56789012345678",
        FechaNac: "2000-01-15",
        Telefono: "901234567",
        Correo: "carlos.martinez@example.com"
    },
    {
        IdPersona: 4,
        IdDireccion: 103,
        Nombre1: "Carlos",
        Nombre2: "Eduardo",
        Apellido1: "Martinez",
        Apellido2: "Ortiz",
        DNI: "0801200006789",
        RTN: "56789012345678",
        FechaNac: "2000-01-15",
        Telefono: "901234567",
        Correo: "carlos.martinez@example.com"
    },
    {
        IdPersona: 5,
        IdDireccion: 103,
        Nombre1: "Carlos",
        Nombre2: "Eduardo",
        Apellido1: "Martinez",
        Apellido2: "Ortiz",
        DNI: "0801200006789",
        RTN: "56789012345678",
        FechaNac: "2000-01-15",
        Telefono: "901234567",
        Correo: "carlos.martinez@example.com"
    },
    {
        IdPersona: 6,
        IdDireccion: 103,
        Nombre1: "Carlos",
        Nombre2: "Eduardo",
        Apellido1: "Martinez",
        Apellido2: "Ortiz",
        DNI: "0801200006789",
        RTN: "56789012345678",
        FechaNac: "2000-01-15",
        Telefono: "901234567",
        Correo: "carlos.martinez@example.com"
    },
];

export const Usuarios = [
    {
        IdUsuario: 1,
        IdPersona: 1, // Juan
        Contrasena: "hashed_password_juan",
        FechaRegistro: "2024-01-15T10:00:00Z",
        Roles: [1, 2] // Juan tiene roles de Administrador y Veterinario
    },
    {
        IdUsuario: 2,
        IdPersona: 2, // Maria
        Contrasena: "hashed_password_maria",
        FechaRegistro: "2024-02-20T12:00:00Z",
        Roles: [2, 3] // Maria tiene roles de Veterinario y Cliente
    },
    {
        IdUsuario: 3,
        IdPersona: 3, // Carlos
        Contrasena: "hashed_password_carlos",
        FechaRegistro: "2024-03-10T14:30:00Z",
        Roles: [3] // Carlos tiene rol de Cliente
    }
];


export const Roles = [
    {
        IdRol: 1,
        NombreRol: "Administrador",
        Descripcion: "Acceso total al sistema"
    },
    {
        IdRol: 2,
        NombreRol: "Recepcionista",
        Descripcion: "Acceso para gestionar consultas y pacientes"
    },
    {
        IdRol: 3,
        NombreRol: "Clientes",
        Descripcion: "Acceso para gestionar su perfil y ver información de servicios"
    }
];
