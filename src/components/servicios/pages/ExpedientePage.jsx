import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { expedientes as mascotasExpedientes } from '../data/ExpedienteData';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate si no lo tienes

export function ExpedientePage() {
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();

  const rows = mascotasExpedientes.flatMap((mascota) => {
    const mainRow = {
      id: `mascota-${mascota.IdMascota}`,
      NombreMascota: mascota.NombreMascota,
      tipo: 'mascota',
      expanded: expandedRows[mascota.IdMascota] || false,
    };

    const expedienteRows = mascota.Expedientes.map((expediente) => ({
      id: `expediente-${mascota.IdMascota}-${expediente.IdExpediente}`,
      IdExpediente: expediente.IdExpediente,
      FechaApertura: expediente.FechaApertura,
      Alergias: expediente.Alergias,
      CondicionCronicas: expediente.CondicionCronicas,
      Observaciones: expediente.Observaciones,
      tipo: 'expediente',
      NombreMascota: "",
    }));

    return expandedRows[mascota.IdMascota] ? [mainRow, ...expedienteRows] : [mainRow];
  });

  const columns = [
    { field: 'NombreMascota', headerName: 'Mascota', width: 150, renderCell: (params) => (params.row.tipo === 'mascota' ? <strong onClick={() => setExpandedRows((prev) => ({ ...prev, [params.row.id.split('-')[1]]: !prev[params.row.id.split('-')[1]] }))} style={{ cursor: 'pointer', fontWeight: 'bold', color: '#2c6b6b' }}>{params.value}</strong> : null) },
    { field: 'IdExpediente', headerName: 'ID Expediente', width: 130, renderCell: (params) => <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'FechaApertura', headerName: 'Fecha Apertura', width: 150, renderCell: (params) => <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'Alergias', headerName: 'Alergias', width: 200, renderCell: (params) => <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'CondicionCronicas', headerName: 'Condiciones Crónicas', width: 200, renderCell: (params) => <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'Observaciones', headerName: 'Observaciones', width: 250, renderCell: (params) => <span style={{ color: '#00897b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
  ];

  const handleCreateExpediente = () => {
    alert('Crear nuevo expediente');
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {/* Barra de Navegación Personalizada */}
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', 
        width: '100%', height: '10%', margin: '17px' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              color: '#00897b',
              fontFamily: 'Poppins, sans-serif', 
              fontWeight: 'bold',
              fontSize: '24px',
              padding: '25px',
              margin: '0px'
            }}
          >
            VetFolk
          </Typography>
          <Button 
            color="inherit"
            onClick={() => navigate('/Landing')}
            sx={{ color: '#00897b', 
              fontFamily: 'Poppins, sans-serif',
               fontWeight: 'bold' }}
          >
            Inicio
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/admin/usuario-datos')}
            sx={{ color: '#00897b', fontFamily: 'Poppins, sans-serif',
               fontWeight: 'bold' }}
          >
            Registro de Usuarios
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/admin/expediente')}
            sx={{ color: '#00897b', fontFamily: 'Poppins, sans-serif',
               fontWeight: 'bold' }}
          >
            Expediente
          </Button>
        </Toolbar>
      </AppBar>

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
      <Box sx={{ display: 'flex', 
      justifyContent: 'center', 
      marginTop :'auto',
        padding: '1px',
        marginBottom:'10px',
        }}>
        <Button
          variant="contained"
          color="#00897b"
          onClick={handleCreateExpediente}
          sx={{ backgroundColor: '#00897b',
             color: '#ffffff', 
             }}
        >
          Crear Expediente
        </Button>
      </Box>
    </Box>
  );
}
