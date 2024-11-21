import React, { useState } from "react";
import { citas, estados, usuarios, servicios, especies } from '../data/CitaData';
import { Box, Typography, MenuItem, Select, TextField, Button } from '@mui/material';
import { format, isSameDay, isSameWeek, isSameMonth } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../AdminSideBar';

export const CitaPage = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedCliente, setSelectedCliente] = useState('');
    const [selectedEstado, setSelectedEstado] = useState('');
    const [estadoEdicion, setEstadoEdicion] = useState(null); // Estado para la edición del estado

    const styles = {
        container: { 
            color: '#00897b', 
            height: '100vh', 
            marginTop:'40px',
            fontFamily: 'Poppins, sans-serif', 
            marginRight: '250px', 
            padding: '10px', 
            borderRadius: '05px', 
            backgroundColor: '#FFff', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '150%', // Ancho completo por defecto
        },
        header: { 
            color: '#00897b', 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '24px', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '16px' 
        },
        filterBox: { 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '12px', 
            marginBottom: '16px' 
        },
        citaBox: { 
            border: '1px solid #ddd', 
            padding: '12px', 
            backgroundColor:'#fff',
            borderRadius: '6px', 
            marginBottom: '16px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
        },
        button: { 
            backgroundColor: '#00897b', 
            width:'auto',
            color: '#fff', 
            marginTop: '1px', 
            fontFamily: 'Poppins, sans-serif', 
            fontSize: '15px',  
            borderRadius: '6px', 
            padding: '10px', 
            '&:hover': { backgroundColor: '#006f5f' } 
        },
    };

    const filteredCitas = citas.filter(cita => {
        const citaDate = new Date(cita.Fecha);
        return (!selectedDay || isSameDay(citaDate, new Date(selectedDay))) &&
               (!selectedWeek || isSameWeek(citaDate, new Date(selectedWeek))) &&
               (!selectedMonth || isSameMonth(citaDate, new Date(selectedMonth))) &&
               (!selectedCliente || cita.IdUsuario === Number(selectedCliente)) &&
               (!selectedEstado || cita.IdEstado === Number(selectedEstado));
    });

    const handleEditarEstado = (citaId) => {
        setEstadoEdicion(citaId);
    };

    const handleCambiarEstado = (citaId) => {
        const nuevaCita = citas.map(cita => 
            cita.idCita === citaId ? { ...cita, IdEstado: selectedEstado } : cita
        );
        console.log("Estado actualizado:", nuevaCita);
        setEstadoEdicion(null);  
    };

    return (
        <Box 
            sx={{
                ...styles.container,
                '@media (max-width: 100px)': {
                    padding: '16px',
                    maxWidth: '200%',
                },
                '@media (min-width: 101px)': {
                    padding: '40px',
                    maxWidth: '700px',
                },
            }}
        >
            <AdminSideBar />
            <Typography sx={styles.header}>Gestión de Citas</Typography>
            
            <Box sx={styles.filterBox}>
                <TextField 
                    label="Día" 
                    type="date" 
                    value={selectedDay} 
                    onChange={e => setSelectedDay(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                />
                <TextField 
                    label="Semana" 
                    type="date" 
                    value={selectedWeek} 
                    onChange={e => setSelectedWeek(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                />
                <TextField 
                    label="Mes" 
                    type="month" 
                    value={selectedMonth} 
                    onChange={e => setSelectedMonth(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                />
                <Select 
                    label="Cliente" 
                    value={selectedCliente} 
                    onChange={e => setSelectedCliente(e.target.value)} 
                    displayEmpty
                >
                    <MenuItem value="">Todos los Clientes</MenuItem>
                    {usuarios.map(user => (
                        <MenuItem key={user.IdUsuario} value={user.IdUsuario}>
                            {user.nombre} {user.apellido}
                        </MenuItem>
                    ))}
                </Select>
                <Select 
                    label="Estado" 
                    value={selectedEstado} 
                    onChange={e => setSelectedEstado(e.target.value)} 
                    displayEmpty
                >
                    <MenuItem value="">Todos los Estados</MenuItem>
                    {estados.map(estado => (
                        <MenuItem key={estado.IdEstado} value={estado.IdEstado}>
                            {estado.Estado}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {filteredCitas.length > 0 ? (
                filteredCitas.map(cita => (
                    <Box key={cita.idCita} sx={styles.citaBox}>
                        <Typography variant="body1">
                            Fecha: {format(new Date(cita.Fecha), 'dd/MM/yyyy')}
                        </Typography>
                        <Typography variant="body1">
                            Cliente: {usuarios.find(u => u.IdUsuario === cita.IdUsuario)?.nombre || 'Cliente no encontrado'}
                        </Typography>
                        <Typography variant="body1">
                            Mascota: {especies.find(e => e.IdEspecie === cita.IdEspecie)?.nombre || 'Especie no encontrada'}
                        </Typography>
                        <Typography variant="body1">
                            Servicio: {servicios.find(s => s.IdServicio === cita.IdServicio)?.nombre || 'Servicio no encontrado'}
                        </Typography>
                        <Typography variant="body1">
                            Estado: {estados.find(e => e.IdEstado === cita.IdEstado)?.Estado || 'Estado no encontrado'}
                        </Typography>
                        <Typography variant="body1">
                            Comentario: {cita.comentario || 'Sin comentario'}
                        </Typography>

                        <Button 
                            sx={styles.button} 
                            onClick={() => handleEditarEstado(cita.idCita)}
                        >
                            Editar Estado
                        </Button>

                        {estadoEdicion === cita.idCita && (
                            <Box sx={{ marginTop: '10px' }}>
                                <Select 
                                    label="Nuevo Estado" 
                                    value={selectedEstado} 
                                    onChange={e => setSelectedEstado(e.target.value)} 
                                    displayEmpty
                                >
                                    {estados.map(estado => (
                                        <MenuItem key={estado.IdEstado} value={estado.IdEstado}>
                                            {estado.Estado}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button 
                                    sx={styles.button} 
                                    onClick={() => handleCambiarEstado(cita.idCita)}
                                >
                                    Guardar Cambios
                                </Button>
                            </Box>
                        )}
                    </Box>
                ))
            ) : (
                <Typography variant="body1" color="textSecondary">
                    No hay citas para mostrar.
                </Typography>
            )}
        </Box>
    );
};

export default CitaPage;
