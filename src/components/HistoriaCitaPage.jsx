
import React, { useState } from "react";  
import { citas, estados, usuarios, comentarios, servicios, especies, citasHistoria } from './servicios/data/CitaData';
import { Box, Typography, Button, AppBar, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AdminSideBar from './AdminSideBar';


export const HistoriaCitaPage = () => {
    const styles = {
        container: { width: '100vw', height: '100vh', backgroundColor: '#f9f9f9', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
        header: { color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' },
        button: { color: '#00897b', marginRight: '10px', fontSize: '17px' },
        tableHeader: { backgroundColor: '#00897b', color: '#fff', fontWeight: 'bold' },
    };

    const usuariosActualizados = [
        ...usuarios,
        { IdUsuario: 4, nombre: 'Laura', apellido: 'Méndez'  },
        { IdUsuario: 5, nombre: 'Andrés', apellido: 'Hernández' },
        { IdUsuario: 6, nombre: 'Carolina', apellido: 'Ruiz' },
        { IdUsuario: 7, nombre: 'Ricardo', apellido: 'Gómez' },
        { IdUsuario: 8, nombre: 'Sofía', apellido: 'Martínez' },
        { IdUsuario: 9, nombre: 'Miguel', apellido: 'Fernández' }
    ];

    const citasActualizadas = [
        ...citas,
        { idCita: 7, Fecha: '2024-11-01', Hora: '09:00', IdUsuario: 4, IdEstado: 2, IdServicio: 1, IdEspecie: 1 },
        { idCita: 8, Fecha: '2024-11-05', Hora: '11:00', IdUsuario: 5, IdEstado: 2, IdServicio: 3, IdEspecie: 2 },
        { idCita: 9, Fecha: '2024-11-08', Hora: '15:00', IdUsuario: 6, IdEstado: 2, IdServicio: 2, IdEspecie: 3 },
        { idCita: 10, Fecha: '2024-11-10', Hora: '10:00', IdUsuario: 7, IdEstado: 2, IdServicio: 4, IdEspecie: 4 },
        { idCita: 11, Fecha: '2024-11-12', Hora: '14:30', IdUsuario: 8, IdEstado: 2, IdServicio: 5, IdEspecie: 1 },
        { idCita: 12, Fecha: '2024-11-14', Hora: '16:00', IdUsuario: 9, IdEstado: 2, IdServicio: 2, IdEspecie: 2 }
    ];

    const filteredCitas = citasActualizadas.filter(cita => {
        const estado = estados.find(e => e.IdEstado === cita.IdEstado);
        return estado?.Estado === 'Completada';
    });

    return (
        <Box style={styles.container} sx={{ marginLeft: '200px' }} >
            <AdminSideBar />

            {/* Ajuste: Moví el encabezado más abajo cambiando el margen */}
            <Typography variant="h4" style={{ ...styles.header, marginTop: '40px' }}>
                Historial de Citas
            </Typography>

            {/* Tabla de citas */}
            <TableContainer component={Paper} style={{ width: '80%', height: '100%', overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={styles.tableHeader}>Cliente</TableCell>
                            <TableCell style={styles.tableHeader}>Estado</TableCell>
                            <TableCell style={styles.tableHeader}>Servicio</TableCell>
                            <TableCell style={styles.tableHeader}>Especie</TableCell>
                            <TableCell style={styles.tableHeader}>Hora</TableCell>
                            <TableCell style={styles.tableHeader}>Fecha</TableCell>
                            <TableCell style={styles.tableHeader}>Comentario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCitas.map(cita => {
                            const usuario = usuariosActualizados.find(u => u.IdUsuario === cita.IdUsuario);
                            const estado = estados.find(e => e.IdEstado === cita.IdEstado);
                            const servicio = servicios.find(s => s.IdServicio === cita.IdServicio);
                            const especie = especies.find(es => es.IdEspecie === cita.IdEspecie);
                            const comentario = comentarios.find(c => c.idCita === cita.idCita)?.comentario || 'No disponible';

                            return (
                                <TableRow key={cita.idCita}>
                                    <TableCell>{usuario?.nombre} {usuario?.apellido}</TableCell>
                                    <TableCell>{estado?.Estado}</TableCell>
                                    <TableCell>{servicio?.nombre}</TableCell>
                                    <TableCell>{especie?.nombre}</TableCell>
                                    <TableCell>{cita.Hora}</TableCell>
                                    <TableCell>{cita.Fecha}</TableCell>
                                    <TableCell>{comentario}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};