import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { expedientes as mascotasExpedientes } from '../ExpedienteData';
import AdminSideBar from './AdminSideBar';

export function ExpedientePage() {
  const { IdMascota } = useParams(); // Obtén el parámetro de la URL
  const [expandedRows, setExpandedRows] = useState({});

  // Filtra los datos para mostrar solo el IdMascota especificado
  const filteredExpedientes = mascotasExpedientes.filter(
    (mascota) => mascota.IdMascota === parseInt(IdMascota, 10)
  );

  // Verifica si hay al menos un expediente
  const hasExpedientes = filteredExpedientes.some(
    (mascota) => mascota.Expedientes && mascota.Expedientes.length > 0
  );

  const rows = filteredExpedientes.flatMap((mascota) => {
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
    { field: 'IdExpediente', headerName: 'ID Expediente', width: 130 },
    { field: 'FechaApertura', headerName: 'Fecha Apertura', width: 150 },
    { field: 'Alergias', headerName: 'Alergias', width: 200 },
    { field: 'CondicionCronicas', headerName: 'Condiciones Crónicas', width: 200 },
    { field: 'Observaciones', headerName: 'Observaciones', width: 250 },
  ];

  // Maneja la acción del botón "Nueva Consulta"
  const handleNuevaConsulta = () => {
    console.log('Nueva consulta creada');
    // Aquí puedes agregar la lógica para navegar o mostrar un formulario de nueva consulta
  };

  return (
    <>
      <AdminSideBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '200px' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '600',
          fontSize: '30px',
          color: '#2c6b6b',
          padding: '30px',
          margin: '0px'
        }}>
          Expediente
        </h2>

        {/* Botón Nueva Consulta */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNuevaConsulta}
            disabled={!hasExpedientes} // Deshabilitado si no hay expedientes
            sx={{
              backgroundColor: '#2c6b6b',
              '&:hover': { backgroundColor: '#1e4e4e' },
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',
              fontSize: '14px',
              textTransform: 'none',
            }}
          >
            Nueva Consulta
          </Button>
        </Box>

        {/* Tabla de expedientes */}
        <Box sx={{ height: 450, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>
    </>
  );
}

export default ExpedientePage;