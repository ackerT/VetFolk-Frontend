import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './UserDatingHistory.css';

function CustomerProfile() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [cliente, setCliente] = useState(''); // Estado para almacenar el nombre completo del cliente

  useEffect(() => {
    // Obtener el idUsuario del sessionStorage
    const idUsuario = sessionStorage.getItem('userId');

    if (idUsuario) {
      // Llamada a la API para obtener el nombre y apellido del cliente
      fetchNombreCliente(idUsuario);
      fetchCitas(idUsuario);
    }
  }, []);

  // Función para obtener el nombre y apellido del cliente
  const fetchNombreCliente = async (idUsuario) => {
    try {
      const response = await fetch(`http://localhost:3008/personas/obtener/${idUsuario}`);
      const data = await response.json();
      setCliente(`${data.nombre1} ${data.apellido1}`); // Concatenamos el nombre y apellido
    } catch (error) {
      console.error('Error fetching nombre del cliente:', error);
    }
  };

  // Función para obtener las citas
  const fetchCitas = async (idUsuario) => {
    try {
      const response = await fetch(`http://localhost:3008/citas/usuario/${idUsuario}`); // Ajusta la URL a tu backend
      const data = await response.json();
      
      const formattedAppointments = data.map((cita) => ({
        id: cita.citas_IdCita,
        Fecha: new Date(cita.citas_Fecha).toLocaleDateString(),
        Hora: cita.citas_Hora,
        Servicio: cita.servicio_TipoServicio,
        EstadoActual: cita.Estado,
        NombreMascota: cita.citas_NombreMascota || 'No especificada', // Mostrar el nombre de la mascota si está disponible
      }));

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching citas:', error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    (filterStatus ? appointment.EstadoActual === filterStatus : true) &&
    (searchTerm
      ? appointment.Servicio.toLowerCase().includes(searchTerm.toLowerCase())
      : true)
  );

  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.Fecha);
    const dateB = new Date(b.Fecha);
    return dateB - dateA; // Ordena de más reciente a más antigua
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completada':
        return 'green';
      case 'Pendiente':
        return 'orange';
      case 'Cancelada':
        return 'red';
      case 'Confirmada':
        return 'blue';
      default:
        return 'black';
    }
  };

  const columns = [
    { field: 'Fecha', headerName: 'Fecha', width: 100 },
    { field: 'Hora', headerName: 'Hora', width: 100 },
    { field: 'Servicio', headerName: 'Servicio', width: 300 },
    { field: 'NombreMascota', headerName: 'Nombre de la Mascota', width: 200 },
    {
      field: 'EstadoActual',
      headerName: 'Estado',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: getStatusColor(params.value) }}>{params.value}</span>
      ),
    },
  ];

  const rows = sortedAppointments.map((appointment) => ({
    id: appointment.id,
    Fecha: appointment.Fecha,
    Hora: appointment.Hora,
    Servicio: appointment.Servicio,
    NombreMascota: appointment.NombreMascota,
    EstadoActual: appointment.EstadoActual,
  }));

  return (
    <>
      <Navbar className="navbar" />
      <Box className="customer-profile" sx={{ padding: 2 }}>
        <Box sx={{ marginBottom: 2 }}>
          <h1>{cliente}</h1> {/* Aquí mostramos el nombre completo del cliente */}
          <h2>Historial de Citas</h2>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <Input
            placeholder="Buscar por servicio"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ padding: '2px' }}
          />
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              label="Estado"
            >
              <MenuItem value="">Todos los estados</MenuItem>
              <MenuItem value="Programada">Programada</MenuItem>
              <MenuItem value="En Proceso">En Proceso</MenuItem>
              <MenuItem value="Finalizada">Finalizada</MenuItem>
              <MenuItem value="Cancelada">Cancelada</MenuItem>
              <MenuItem value="No Presentado">No Presentado</MenuItem>
              <MenuItem value="Reprogramada">Reprogramada</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ height: 250, width: '100%' }}>
          <DataGrid
            columnHeaderHeight={30}
            rowHeight={25}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
              },
            }}
          />
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default CustomerProfile;
