import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';

export const GestionarRolesPage = () => {
    const [personas, setPersonas] = useState([]); // Estado para almacenar las personas con roles
    const [roles, setRoles] = useState([]); // Estado para almacenar los roles
    const [rolesSeleccionados, setRolesSeleccionados] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [nuevoRol, setNuevoRol] = useState(''); // Estado para el rol seleccionado en el select
    const navigate = useNavigate();

    // Función para consumir el servicio de obtener personas con roles
    const obtenerPersonas = async () => {
        try {
            const response = await fetch('http://18.221.225.5/personas/conroles'); // Reemplaza con la URL correcta de tu servicio
            if (response.ok) {
                const data = await response.json();
                setPersonas(data);
            } else {
                console.error('Error al obtener personas:', response.status);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    // Función para obtener los roles disponibles
    const obtenerRoles = async () => {
        try {
            const response = await fetch('http://18.221.225.5/roles'); // Reemplaza con la URL de tu servicio para obtener los roles
            if (response.ok) {
                const data = await response.json();
                setRoles(data);
            } else {
                console.error('Error al obtener roles:', response.status);
            }
        } catch (error) {
            console.error('Error en la solicitud de roles:', error);
        }
    };

    // Ejecutamos la función cuando el componente se monta
    useEffect(() => {
        obtenerPersonas();
        obtenerRoles();
    }, []);

    // Función para manejar el clic en "Editar"
    const manejarClickEditar = (idPersona) => {
        const persona = personas.find(p => p.idPersona === idPersona);
        if (persona) {
            setUsuarioSeleccionado(persona);
            setRolesSeleccionados(persona.roles);
            setOpenDialog(true);
        }
    };

    // Función para manejar el cambio de rol
    const manejarCambiarRol = async () => {
        if (nuevoRol) {
            try {
                const response = await fetch(`http://18.221.225.5/personas/${usuarioSeleccionado.idPersona}/actrol`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idRol: nuevoRol }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Rol actualizado:', data);
                    setOpenDialog(false);
                    // Actualizar la lista de personas con los roles actualizados
                    obtenerPersonas();
                } else {
                    console.error('Error al actualizar el rol:', response.status);
                }
            } catch (error) {
                console.error('Error en la solicitud de cambio de rol:', error);
            }
        }
    };

    // Configuración de columnas para DataGrid
    const columns = [
        { field: 'Nombre', headerName: 'Nombre', width: 150 },
        { field: 'Apellido', headerName: 'Apellido', width: 150 },
        { field: 'DNI', headerName: 'DNI', width: 150 },
        { field: 'Telefono', headerName: 'Teléfono', width: 150 },
        { field: 'Correo', headerName: 'Correo', width: 200 },
        {
            field: 'Rol',
            headerName: 'Rol',
            width: 200,
            renderCell: (params) => (
                <span style={{ color: '#2c6b6b', fontFamily: 'Poppins, sans-serif' }}>
                    {params.value}
                </span>
            )
        },
        {
            field: 'Editar',
            headerName: 'Editar',
            width: 200,
            renderCell: (params) => (
                <Button 
                    sx={{ 
                        backgroundColor: '#2c6b6b', 
                        width: '100%',  
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 'normal',
                        fontSize: '14px'
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => manejarClickEditar(params.row.id)}
                >
                    Editar
                </Button>
            )
        }
    ];

    // Mapeamos las personas al formato necesario para DataGrid
    const rows = personas.map(persona => ({
        id: persona.idPersona,
        Nombre: persona.nombre1,
        Apellido: persona.apellido1,
        DNI: persona.dni,
        Telefono: persona.telefono,
        Correo: persona.correo,
        Rol: persona.roles.join(', ') // Concatenamos los roles para mostrarlos en una sola columna
    }));

    return (
        <div style={{ display: 'flex' }}>
            <AdminSideBar />
            <div style={{ padding: '20px', width: '100%' }}>
                <h2 style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    color: '#ea3c3c',
                    padding: '30px',
                    margin: '0px',
                }}>
                    Gestionar roles de usuarios
                </h2>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    sx={{
                        backgroundColor: '#ffffff',
                        '& .MuiDataGrid-cell': {
                            color: '#2c6b6b',
                        },
                        '& .MuiDataGrid-footerCell, .MuiDataGrid-columnHeader': {
                            backgroundColor: '#ffffff',
                        }
                    }}
                    style={{ height: 500, width: '100%' }}
                />
                <Dialog 
                    open={openDialog} 
                    onClose={() => setOpenDialog(false)}
                    maxWidth="md" 
                    fullWidth={true} 
                >
                    <DialogTitle sx={{
                        textAlign: 'center',
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        fontSize: '30px',
                        color: '#2c6b6b',
                    }}>
                        Editar Roles de {usuarioSeleccionado ? usuarioSeleccionado.nombre1 : ''}
                    </DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <InputLabel>Seleccionar Rol</InputLabel>
                            <Select
                                value={nuevoRol}
                                onChange={(e) => setNuevoRol(e.target.value)}
                                label="Seleccionar Rol"
                            >
                                {roles.map((rol) => (
                                    <MenuItem key={rol.idRol} value={rol.idRol}>
                                        {rol.nombreRol}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => setOpenDialog(false)} 
                            color="primary"
                            sx={{
                                backgroundColor: '#2c6b6b',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'normal',
                                color:'#ffffff'
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            onClick={manejarCambiarRol} 
                            color="primary"
                            sx={{
                                backgroundColor: '#2c6b6b',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'normal',
                                color:'#ffffff'
                            }}
                        >
                            Cambiar rol
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default GestionarRolesPage;
