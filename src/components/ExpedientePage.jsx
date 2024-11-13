import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { expedientes as mascotasExpedientes } from '../ExpedienteData';
import { useNavigate } from 'react-router-dom'; 
import AdminSideBar from './AdminSideBar';

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
    { field: 'IdExpediente', headerName: 'ID Expediente', width: 130, renderCell: (params) => <span style={{ color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'FechaApertura', headerName: 'Fecha Apertura', width: 150, renderCell: (params) => <span style={{ color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'Alergias', headerName: 'Alergias', width: 200, renderCell: (params) => <span style={{ color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'CondicionCronicas', headerName: 'Condiciones Crónicas', width: 200, renderCell: (params) => <span style={{ color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
    { field: 'Observaciones', headerName: 'Observaciones', width: 250, renderCell: (params) => <span style={{ color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>{params.value}</span> },
  ];

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
  
        <Box sx={{ height: 450, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
            getRowId={(row) => row.id} />
        </Box>
      </Box>
    </>
  );
}
export default ExpedientePage;