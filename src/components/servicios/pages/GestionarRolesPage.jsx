// solo veo los Roles que tenemos y visalizan las tabla 
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox, FormControlLabel, FormGroup, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Usuarios, Personas, Roles } from '../data/RolesData';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export const GestionarRolesPage = () => {
    const [rolesSeleccionados, setRolesSeleccionados] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate(); // Inicializa useNavigate

    const obtenerRoles = (rolesIds) => {
        return rolesIds.map(roleId => {
            const rol = Roles.find(r => r.IdRol === roleId);
            return rol ? rol.NombreRol : "Sin Rol";
        });
    };

    const manejarClickEditar = (idPersona) => {
        const usuario = Usuarios.find(u => u.IdPersona === idPersona);
        if (usuario) {
            const roles = obtenerRoles(usuario.Roles || []);
            setRolesSeleccionados(usuario.Roles);
            setUsuarioSeleccionado(usuario);
            setOpenDialog(true);
        }
    };

    const manejarGuardarRoles = () => {
        if (usuarioSeleccionado) {
            const usuarioActualizado = {
                ...usuarioSeleccionado,
                Roles: rolesSeleccionados
            };
            console.log("Usuario actualizado:", usuarioActualizado);
            setOpenDialog(false);
        }
    };

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
                <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif' }}>
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
                        backgroundColor: '#00897b', 
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

    const rows = Personas.map(persona => {
        const usuario = Usuarios.find(u => u.IdPersona === persona.IdPersona);
        return {
            id: persona.IdPersona,
            Nombre: persona.Nombre1,
            Apellido: persona.Apellido1,
            DNI: persona.DNI,
            Telefono: persona.Telefono,
            Correo: persona.Correo,
            Rol: obtenerRoles(usuario?.Roles || []).join(', ')
        };
    });

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#00897b' }}>
                        VetlFolk
                    </Typography>
                    <Button sx={{ color: '#00897b', fontSize: '13px' }}>Inicio</Button>
                    <Button sx={{ color: '#00897b', fontSize: '13px' }} onClick={() => navigate('/admin/usuariodatos')}>
                        Registro de Usuarios
                    </Button>
                    <Button sx={{ color: '#00897b', fontSize: '13px' }} onClick={() => navigate('/admin/expediente')}>
                        Expediente
                    </Button>
                    <Button sx={{ color: '#00897b', fontSize: '13px' }}>Configuraciones</Button>
                </Toolbar>
            </AppBar>

            <div style={{ height: 500, width: '100%' }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    width: '50%', 
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: '600',
                    fontSize: '30px',
                    color: '#00897b',
                    padding: '30px',
                    margin: '0px'
                }}>
                    Gestionar Roles
                </h2>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    sx={{
                        backgroundColor: '#ffffff',
                        '& .MuiDataGrid-selectedRowCount': {
                            color: 'yellow',
                        },
                        '& .MuiDataGrid-root .MuiDataGrid-cell': {
                            color: 'black',
                        },
                        '& .MuiDataGrid-footerCell': {
                            backgroundColor: '#ffffff',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#ffffff',
                        }
                    }}
                />
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Editar Roles de {usuarioSeleccionado ? usuarioSeleccionado.Nombre1 : ''}</DialogTitle>
                    <DialogContent>
                        <FormGroup>
                            {Roles.map(rol => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rolesSeleccionados.includes(rol.IdRol)}
                                            onChange={(event) => {
                                                const newRoles = event.target.checked
                                                    ? [...rolesSeleccionados, rol.IdRol]
                                                    : rolesSeleccionados.filter(id => id !== rol.IdRol);
                                                setRolesSeleccionados(newRoles);
                                            }}
                                        />
                                    }
                                    label={rol.NombreRol}
                                    key={rol.IdRol}
                                    style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif' }}
                                />
                            ))}
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={manejarGuardarRoles} color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};