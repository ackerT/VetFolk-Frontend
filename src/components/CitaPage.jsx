import React, { useState } from "react";
import { citas, estados, usuarios, comentarios, servicios, especies } from './servicios/data/CitaData';
import { Box, Typography, MenuItem, Select, TextField, Button } from '@mui/material';
import { format, isSameDay, isSameWeek, isSameMonth } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';

export const CitaPage = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedCliente, setSelectedCliente] = useState('');
    const [selectedEstado, setSelectedEstado] = useState('');
    const [selectedCita, setSelectedCita] = useState(null);
    const [citasState, setCitasState] = useState(citas);

    const styles = {
        container: { color: '#00897b', fontFamily: 'Poppins, sans-serif' },
        header: { color: '#00897b', fontFamily: 'Poppins, sans-serif', padding: '15px', fontSize: '25px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' },
        button: { backgroundColor: '#00897b', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: '17px', '&:hover': { backgroundColor: '#006f5f' } },
        citaBox: { border: '1px solid #ddd', padding: '27px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', '&:hover': { borderColor: '#00897b' } },
        commentSection: { backgroundColor: '#fff', padding: '16px', width: '100%', fontSize: '30px', marginTop: '30px', marginBottom: '20px', fontWeight: 'bold', borderRadius: '4px' },
        footerButton: { marginTop: '20px', backgroundColor: '#00897b', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: '17px', '&:hover': { backgroundColor: '#006f5f' } }
    };

    const filteredCitas = citasState.filter(cita => {
        const citaDate = new Date(cita.Fecha);
        return (!selectedDay || isSameDay(citaDate, new Date(selectedDay))) &&
               (!selectedWeek || isSameWeek(citaDate, new Date(selectedWeek))) &&
               (!selectedMonth || isSameMonth(citaDate, new Date(selectedMonth))) &&
               (!selectedCliente || cita.IdUsuario === Number(selectedCliente)) &&
               (!selectedEstado || cita.IdEstado === Number(selectedEstado));
    });

    const cambiarEstado = (idCita, nuevoEstado) => {
        setCitasState(citasState.map(cita => 
            cita.idCita === idCita ? { ...cita, IdEstado: nuevoEstado } : cita
        ));
    };

    const handleCitaClick = (cita) => {
        setSelectedCita(cita);
    };

    const handleRedirection = () => {
        navigate('/admin/historiacita');
    };

    return (
        <Box display="flex" flexDirection="column" sx={{ marginLeft: '200px' }} padding={2} style={styles.container}>
            <AdminSideBar />
            <Box display="flex" gap={2}>
                <Box flex={1} borderRight="1px solid #00897b">
                    <Typography variant="h4" gutterBottom style={styles.header}>
                        Gestión de Citas
                    </Typography>

                    <Box display="flex" gap={2} marginBottom={2}>
                        <TextField label="Día" type="date" value={selectedDay} onChange={e => setSelectedDay(e.target.value)} InputLabelProps={{ shrink: true }} />
                        <TextField label="Semana" type="date" value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)} InputLabelProps={{ shrink: true }} />
                        <TextField label="Mes" type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} InputLabelProps={{ shrink: true }} />
                        <Select label="Cliente" value={selectedCliente} onChange={e => setSelectedCliente(e.target.value)} displayEmpty>
                            <MenuItem value="">Todos los Clientes</MenuItem>
                            {usuarios.map(user => (
                                <MenuItem key={user.IdUsuario} value={user.IdUsuario}>
                                    {user.nombre} {user.apellido}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select label="Estado" value={selectedEstado} onChange={e => setSelectedEstado(e.target.value)} displayEmpty>
                            <MenuItem value="">Todos los Estados</MenuItem>
                            {estados.map(estado => (
                                <MenuItem key={estado.IdEstado} value={estado.IdEstado}>
                                    {estado.Estado}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {filteredCitas.length > 0 ? (
                        <Box>
                            {filteredCitas.map(cita => {
                                const usuario = usuarios.find(u => u.IdUsuario === cita.IdUsuario);
                                const estado = estados.find(e => e.IdEstado === cita.IdEstado);
                                return (
                                    <Box 
                                        key={cita.idCita}
                                        style={styles.citaBox}
                                        onClick={() => handleCitaClick(cita)}
                                    >
                                        <Typography>{cita.Fecha} - {usuario?.nombre} {usuario?.apellido} - {estado?.Estado}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            No hay resultados para los filtros seleccionados.
                        </Typography>
                    )}
                </Box>

                <Box flex={1} padding={2}>
                    {selectedCita ? (
                        <Box style={styles.commentSection}>
                            <Typography variant="h5" gutterBottom style={styles.header}>
                                Comentarios de la Cita
                            </Typography>
                            <Typography variant="body1">
                                Cliente: {usuarios.find(u => u.IdUsuario === selectedCita.IdUsuario)?.nombre}
                            </Typography>
                            <Typography variant="body1">
                                Estado: {estados.find(e => e.IdEstado === selectedCita.IdEstado)?.Estado}
                            </Typography>
                            <Typography variant="body1">
                                Servicio: {servicios.find(s => s.IdServicio === selectedCita.IdServicio)?.nombre}
                            </Typography>
                            <Typography variant="body1">
                                Especie: {especies.find(es => es.IdEspecie === selectedCita.IdEspecie)?.nombre}
                            </Typography>

                            <Typography variant="body1" gutterBottom>
                                <strong>Comentario:</strong> {comentarios.find(e => e.idCita === selectedCita.idCita)?.comentario || 'No hay comentario disponible'}
                            </Typography>

                            <TextField label="Comentario" variant="outlined" multiline rows={4} fullWidth />
                            <Button variant="contained" style={styles.button} fullWidth>
                                Enviar Comentario
                            </Button>
                        </Box>
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            Selecciona una cita para ver los comentarios.
                        </Typography>
                    )}
                </Box>
            </Box>
                    
<Box display="flex" justifyContent="center" width="100%" marginTop={2}>
  <Button 
    variant="contained" 
    sx={{ ...styles.footerButton, width: '50%' }} 
    onClick={handleRedirection}
  >
    Ir al Historial de Citas
  </Button>
</Box>

        </Box>
    );
};
