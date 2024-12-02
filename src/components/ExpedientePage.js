import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { expedientes as mascotasExpedientes } from '../ExpedienteData';
import AdminSideBar from './AdminSideBar';
import './ExpedientePage.css';

export function ExpedientePage() {
  const { IdMascota } = useParams(); // Obtiene el IdMascota de la URL
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Filtra los datos para mostrar solo el IdMascota especificado
  const filteredExpedientes = mascotasExpedientes.filter(
    (mascota) => mascota.IdMascota === parseInt(IdMascota, 10)
  );
  const hasExpedientes = filteredExpedientes.some(
    (mascota) => mascota.Expedientes && mascota.Expedientes.length > 0
  );

  const expedienteRows = filteredExpedientes.flatMap((mascota) =>
    mascota.Expedientes.map((expediente) => ({
      id: `expediente-${mascota.IdMascota}-${expediente.IdExpediente}`,
      NombreMascota: mascota.NombreMascota,
      IdExpediente: expediente.IdExpediente,
      FechaApertura: expediente.FechaApertura,
      Alergias: expediente.Alergias,
      CondicionCronicas: expediente.CondicionCronicas,
      Observaciones: expediente.Observaciones,
    }))
  );

  const consultaRows = filteredExpedientes.flatMap((mascota) =>
    mascota.Expedientes.flatMap((expediente) =>
      expediente.Consultas.map((consulta) => ({
        id: `consulta-${consulta.IdConsulta}`,
        IdConsulta: consulta.IdConsulta,
        FechaConsulta: consulta.FechaConsulta,
        MotivoConsulta: consulta.MotivoConsulta,
        Diagnostico: consulta.Diagnostico,
        Tratamiento: consulta.Tratamiento,
        ImgdeExamenes: consulta.ImgdeExamenes,
      }))
    )
  );

  const expedienteColumns = [
    { field: 'NombreMascota', headerName: 'Mascota', width: 150 },
    { field: 'IdExpediente', headerName: 'ID Expediente', width: 100 },
    { field: 'FechaApertura', headerName: 'Fecha Apertura', width: 100 },
    { field: 'Alergias', headerName: 'Alergias', width: 200 },
    { field: 'CondicionCronicas', headerName: 'Condiciones Crónicas', width: 200 },
    { field: 'Observaciones', headerName: 'Observaciones', width: 250 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <Button
          className="register-button"
          variant="contained"
          color="primary"
          onClick={() => handleEditExpediente(params.row.IdExpediente)}
        >
          Editar
        </Button>
      ),
    },
  ];

  const consultaColumns = [
    { field: 'IdConsulta', headerName: 'ID Consulta', width: 90 },
    { field: 'FechaConsulta', headerName: 'Fecha Consulta', width: 150 },
    { field: 'MotivoConsulta', headerName: 'Motivo Consulta', width: 200 },
    { field: 'Diagnostico', headerName: 'Diagnóstico', width: 200 },
    { field: 'Tratamiento', headerName: 'Tratamiento', width: 250 },
    {
      field: 'ImgdeExamenes',
      headerName: 'Exámenes',
      width: 150,
      renderCell: (params) => (
        <Box>
          {params.value.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Examen ${index}`}
              style={{ width: '25px', height: '25px', cursor: 'pointer', marginRight: '5px' }}
              onClick={() => handleImageClick(img)}
            />
          ))}
        </Box>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Button
          className="register-button"
          variant="contained"
          color="primary"
          onClick={() => handleEditConsulta(params.row.IdConsulta)}
        >
          Editar
        </Button>
      ),
    },
  ];

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditExpediente = (idExpediente) => {
    console.log(`Editar expediente con ID: ${idExpediente}`);
    navigate(`/admin/expediente-update/${idExpediente}`); 
  };

  const handleEditConsulta = (idConsulta) => {
    console.log(`Editar consulta con ID: ${idConsulta}`);
    navigate(`/admin/consulta-medica-update/${idConsulta}`);
  };

  const handleNuevaConsulta = () => {
    if (filteredExpedientes.length > 0) {
      const primerExpediente = filteredExpedientes[0].Expedientes[0];
      console.log(`Crear nueva consulta para el expediente con ID: ${primerExpediente.IdExpediente}`);
      navigate(`/admin/consulta-medica/${IdMascota}/${primerExpediente.IdExpediente}`);
    }
  };

  return (
    <>
      <AdminSideBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '-350px' }}>
        <h2 className="h2-centrado">Expediente</h2>
        <Box sx={{ overflow: '', height: 90, width: '100%',
            marginBottom: 5  }}>
          <DataGrid
            rows={expedienteRows}
            columns={expedienteColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 1,
                },
              },
            }}
            rowsPerPageOptions={[1]}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNuevaConsulta}
          disabled={!hasExpedientes}
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
        <h2 className="h2-centrado">Consultas</h2>
        <Box sx={{ width: '100%', overflow: 'auto' }}>
          <DataGrid
            rows={consultaRows}
            columns={consultaColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 3,
                },
              },
            }}
            rowsPerPageOptions={[3]}
          />
        </Box>
      </Box>

      {/* Modal para mostrar la imagen ampliada */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Imagen de Examen</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Imagen Examen"
            style={{ width: '100%', height: 'auto', maxHeight: '600px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ExpedientePage;