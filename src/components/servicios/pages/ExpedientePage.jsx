import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { expedientes as mascotasExpedientes } from '../data/ExpedienteData';

export  function ExpedientePage() {
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
    color: '#2c6b6b', // Cambia este color si deseas otro tono
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
    { field: 'IdExpediente', headerName: 'ID Expediente', width: 130 },
    { field: 'FechaApertura', headerName: 'Fecha Apertura', width: 150 },
    { field: 'Alergias', headerName: 'Alergias', width: 200 },
    { field: 'CondicionCronicas', headerName: 'Condiciones Crónicas', width: 200 },
    { field: 'Observaciones', headerName: 'Observaciones', width: 250 },
  ];

  return (
    <Box sx={{ height: 520, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
      />
    </Box>
  );
}
