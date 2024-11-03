import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Importa el botón
import { DataGrid } from '@mui/x-data-grid';
import { expedientes as mascotasExpedientes } from '../data/ExpedienteData';

export function ExpedientePage() {
  const [expandedRows, setExpandedRows] = useState({});

  // Generar las filas de la tabla principal con expedientes como subfilas
  const rows = mascotasExpedientes.flatMap((mascota) => {
    const mainRow = {
      id: `mascota-${mascota.IdMascota}`,
      NombreMascota: mascota.NombreMascota,
      tipo: 'mascota',
      expanded: expandedRows[mascota.IdMascota] || false,
    };

    // Subfilas de expedientes, sólo visibles si la mascota está expandida
    const expedienteRows = mascota.Expedientes.map((expediente) => ({
      id: `expediente-${mascota.IdMascota}-${expediente.IdExpediente}`,
      IdExpediente: expediente.IdExpediente,
      FechaApertura: expediente.FechaApertura,
      Alergias: expediente.Alergias,
      CondicionCronicas: expediente.CondicionCronicas,
      Observaciones: expediente.Observaciones,
      tipo: 'expediente',
      NombreMascota: "", // Campo vacío para alineación
    }));

    return expandedRows[mascota.IdMascota] ? [mainRow, ...expedienteRows] : [mainRow];
  });

  // Configuración de las columnas de DataGrid
  const columns = [
    {
      field: 'NombreMascota',
      headerName: 'Mascota',
      width: 150,
      renderCell: (params) => {
        if (params.row.tipo === 'mascota') {
          return (
            <strong>
              <div
                onClick={() =>
                  setExpandedRows((prev) => ({
                    ...prev,
                    [params.row.id.split('-')[1]]: !prev[params.row.id.split('-')[1]],
                  }))
                }
                style={{
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: '#2c6b6b', // Color
                }}
              >
                {params.value}
              </div>
            </strong>
          );
        }
        return null;
      },
    },
    {
      field: 'IdExpediente',
      headerName: 'ID Expediente',
      width: 130,
      renderCell: (params) => (
        <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'FechaApertura',
      headerName: 'Fecha Apertura',
      width: 150,
      renderCell: (params) => (
        <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'Alergias',
      headerName: 'Alergias',
      width: 200,
      renderCell: (params) => (
        <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'CondicionCronicas',
      headerName: 'Condiciones Crónicas',
      width: 200,
      renderCell: (params) => (
        <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
          {params.value}
        </span>
      ),
    },
    {
      field: 'Observaciones',
      headerName: 'Observaciones',
      width: 250,
      renderCell: (params) => (
        <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
          {params.value}
        </span>
      ),
    },
  ];

  // Manejador para el clic del botón "Crear Expediente"
  const handleCreateExpediente = () => {
    // agregar la lógica para crear un nuevo expediente
    alert('Crear nuevo expediente');
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* Barra de Navegación */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#00897b' }}>
            VetlFolk
          </Typography>
          <Button sx={{ color: '#00897b', fontSize: '13px' }}>Inicio</Button>
          <Button sx={{ color: '#00897b', fontSize: '13px' }}>Usuarios</Button>
          <Button sx={{ color: '#00897b', fontSize: '13px' }}>Configuraciones</Button>
        </Toolbar>
      </AppBar>

      {/* Agrega margen superior para espacio debajo de la navbar */}
      <Box sx={{ height: 450, width: '100%', marginTop: '0px' }}>
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
          Expediente
        </h2>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>

      {/* Botón "Crear Expediente" al final */}
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateExpediente}
          sx={{ backgroundColor: '#00897b', color: '#ffffff' }}
        >
          Crear Expediente
        </Button>
      </Box>
    </Box>
  );
}
