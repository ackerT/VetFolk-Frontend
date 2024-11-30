import React, { useEffect, useState } from "react";  
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, TextField, MenuItem } from '@mui/material';
import AdminSideBar from './AdminSideBar';
import { useNavigate } from 'react-router-dom';

export const HistoriaCitaPage = () => {
    const [citas, setCitas] = useState([]);
    const [filteredCitas, setFilteredCitas] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [estados, setEstados] = useState([]);
    const [servicios, setServicios] = useState([]);  // Nuevo estado para los servicios
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroCliente, setFiltroCliente] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');

    const navigate = useNavigate();

    const styles = {
        container: { width: '100vw', height: '100vh', backgroundColor: '#f9f9f9', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
        header: { color: '#ea3c3c', fontFamily: 'Poppins, sans', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' },
        tableHeader: { backgroundColor: '#2c6b6b', color: '#fff', fontWeight: 'bold' },
        button: { backgroundColor: '#ea3c3c', color: 'white', textTransform: 'capitalize' }, 
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [responseCitas, responsePersonas, responseEstados, responseServicios] = await Promise.all([
                    fetch('http://18.221.225.5/citas/obtener'),
                    fetch('http://18.221.225.5/personas/obtenerus'),
                    fetch('http://18.221.225.5/estados/obtener'),
                    fetch('http://18.221.225.5/servicios')  // Fetch para obtener los servicios
                ]);

                if (!responseCitas.ok) throw new Error('Error al obtener las citas');
                if (!responsePersonas.ok) throw new Error('Error al obtener las personas');
                if (!responseEstados.ok) throw new Error('Error al obtener los estados');
                if (!responseServicios.ok) throw new Error('Error al obtener los servicios');

                const dataCitas = await responseCitas.json();
                const dataPersonas = await responsePersonas.json();
                const dataEstados = await responseEstados.json();
                const dataServicios = await responseServicios.json();  // Datos de los servicios

                setCitas(dataCitas);
                setFilteredCitas(dataCitas);
                setPersonas(dataPersonas);
                setEstados(dataEstados);
                setServicios(dataServicios);  // Set los servicios
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const aplicarFiltros = () => {
        let filtered = [...citas];

        if (filtroFecha) {
            const hoy = new Date();
            if (filtroFecha === 'día') {
                filtered = filtered.filter(cita => new Date(cita.fecha).toDateString() === hoy.toDateString());
            } else if (filtroFecha === 'semana') {
                const inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
                const finSemana = new Date(hoy.setDate(hoy.getDate() + 6));
                filtered = filtered.filter(cita => {
                    const fechaCita = new Date(cita.fecha);
                    return fechaCita >= inicioSemana && fechaCita <= finSemana;
                });
            } else if (filtroFecha === 'mes') {
                const mesActual = hoy.getMonth();
                const anioActual = hoy.getFullYear();
                filtered = filtered.filter(cita => {
                    const fechaCita = new Date(cita.fecha);
                    return fechaCita.getMonth() === mesActual && fechaCita.getFullYear() === anioActual;
                });
            }
        }

        if (filtroCliente) {
            filtered = filtered.filter(cita => getPersonaNombre(cita.idUsuario).includes(filtroCliente));
        }

        if (filtroEstado) {
            filtered = filtered.filter(cita => cita.idEstado === parseInt(filtroEstado, 10));
        }

        setFilteredCitas(filtered);
    };

    const getPersonaNombre = (idUsuario) => {
        const persona = personas.find(persona => persona.usuarios?.idUsuario === idUsuario);
        return persona ? `${persona.nombre1} ${persona.apellido1}` : 'Persona no encontrada';
    };

    const getEstadoNombre = (idEstado) => {
        const estado = estados.find(estado => estado.idEstado === idEstado);
        return estado ? estado.estado : 'Estado no encontrado';
    };

    const getServicioNombre = (idServicio) => {
        const servicio = servicios.find(servicio => servicio.idServicio === idServicio);
        return servicio ? servicio.tipoServicio : 'Servicio no encontrado';
    };

    const handleEditClick = (idCita) => {
        navigate(`/admin/cita/${idCita}`);
    };

    if (loading) {
        return (
            <Box style={styles.container}>
                <CircularProgress />
                <Typography>Cargando citas...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box style={styles.container}>
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box style={styles.container}>
            <AdminSideBar />
            <Typography variant="h4" style={{ ...styles.header, marginTop: '40px' }}>
                Historial de Citas
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginBottom: 4, justifyContent: 'center' }}>
                <TextField
                    select
                    label="Filtrar por Fecha"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    style={{ minWidth: '150px' }}
                >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="día">Hoy</MenuItem>
                    <MenuItem value="semana">Esta Semana</MenuItem>
                    <MenuItem value="mes">Este Mes</MenuItem>
                </TextField>
                <TextField
                    label="Filtrar por Cliente"
                    value={filtroCliente}
                    onChange={(e) => setFiltroCliente(e.target.value)}
                    style={{ minWidth: '200px' }}
                />
                <TextField
                    select
                    label="Filtrar por Estado"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    style={{ minWidth: '150px' }}
                >
                    <MenuItem value="">Todos</MenuItem>
                    {estados.map((estado) => (
                        <MenuItem key={estado.idEstado} value={estado.idEstado}>
                            {estado.estado}
                        </MenuItem>
                    ))}
                </TextField>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={styles.button} 
                    onClick={aplicarFiltros}>
                    Aplicar Filtros
                </Button>
            </Box>

            <TableContainer component={Paper} style={{ width: '80%', height: '100%', overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.tableHeader}>Cliente</TableCell>
                            <TableCell style={styles.tableHeader}>Estado</TableCell>
                            <TableCell style={styles.tableHeader}>Servicio</TableCell>
                            <TableCell style={styles.tableHeader}>Nombre de la mascota</TableCell>
                            <TableCell style={styles.tableHeader}>Hora</TableCell>
                            <TableCell style={styles.tableHeader}>Fecha</TableCell>
                            <TableCell style={styles.tableHeader}>Comentarios</TableCell>
                            <TableCell style={styles.tableHeader}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCitas.map(cita => (
                            <TableRow key={cita.idCita}>
                                <TableCell>{getPersonaNombre(cita.idUsuario)}</TableCell>
                                <TableCell>{getEstadoNombre(cita.idEstado)}</TableCell>
                                <TableCell>{getServicioNombre(cita.idServicio)}</TableCell>
                                <TableCell>{cita.nombreMascota || 'N/A'}</TableCell>
                                <TableCell>{cita.hora}</TableCell>
                                <TableCell>{cita.fecha}</TableCell>
                                <TableCell>{cita.comentarios || 'No disponible'}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        style={styles.button} 
                                        onClick={() => handleEditClick(cita.idCita)}>
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default HistoriaCitaPage;
