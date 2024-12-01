import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './UserDatingHistory.css';

function CustomerProfile() {
  // Datos simulados con precio agregado
  const [appointments, setAppointments] = useState([
    {
      IdCita: 1,
      Fecha: '2024-11-20',
      Hora: '10:00 AM',
      Servicio: 'Vacunación',
      EstadoActual: 'Completada',
      Precio: 30, // Costo agregado
    },
    {
      IdCita: 2,
      Fecha: '2024-12-01',
      Hora: '02:00 PM',
      Servicio: 'Consulta general',
      EstadoActual: 'Pendiente',
      Precio: 50,
    },
    {
      IdCita: 3,
      Fecha: '2024-11-25',
      Hora: '03:30 PM',
      Servicio: 'Desparasitación',
      EstadoActual: 'Cancelada',
      Precio: 20,
    },
    {
      IdCita: 4,
      Fecha: '2024-11-27',
      Hora: '11:00 AM',
      Servicio: 'Cirugía menor',
      EstadoActual: 'Confirmada',
      Precio: 150,
    },
    {
      IdCita: 5,
      Fecha: '2024-10-15',
      Hora: '01:00 PM',
      Servicio: 'Corte de uñas',
      EstadoActual: 'Completada',
      Precio: 15,
    },
    {
      IdCita: 6,
      Fecha: '2024-10-15',
      Hora: '02:30 PM',
      Servicio: 'Corte de pelo',
      EstadoActual: 'Completada',
      Precio: 15,
    },    
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const cliente = 'Juan Pérez';

  const filteredAppointments = appointments.filter((appointment) =>
    (filterStatus ? appointment.EstadoActual === filterStatus : true) &&
    (searchTerm
      ? appointment.Servicio.toLowerCase().includes(searchTerm.toLowerCase())
      : true)
  );

  /*Orden por fecha*/
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.Fecha + ' ' + a.Hora);
    const dateB = new Date(b.Fecha + ' ' + b.Hora);
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

  // Define columas
  const columns = [
    { field: 'Fecha', headerName: 'Fecha', width: 100 },
    { field: 'Hora', headerName: 'Hora', width: 100 },
    { field: 'Servicio', headerName: 'Servicio', width: 300 },
    {
      field: 'EstadoActual',
      headerName: 'Estado',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: getStatusColor(params.value) }}>{params.value}</span>
      ),
    },
    {
      field: 'Precio',
      headerName: 'Costo',
      width: 120,
      valueFormatter: (params) => {
        // Check if Precio is defined and a number before calling toFixed
        return params.value !== undefined && params.value !== null
          ? `$${params.value.toFixed(2)}`
          : '$0.00'; // Default to $0.00 if Precio is undefined or null
      },
    },
  ];

  // Transform data into a format DataGrid understands
  const rows = filteredAppointments.map((appointment) => ({
    id: appointment.IdCita,
    Fecha: appointment.Fecha,
    Hora: appointment.Hora,
    Servicio: appointment.Servicio,
    EstadoActual: appointment.EstadoActual,
    Precio: appointment.Precio,
  }));

  return (
    <>
      <Navbar className="navbar" />
      <Box className="customer-profile" sx={{ padding: 2 }}>
        <Box sx={{ marginBottom: 2 }}>
          <h1>{cliente}</h1>
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
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Confirmada">Confirmada</MenuItem>
              <MenuItem value="Completada">Completada</MenuItem>
              <MenuItem value="Cancelada">Cancelada</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Use DataGrid to display the table */}
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
