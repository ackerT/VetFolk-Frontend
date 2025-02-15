import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton, Tooltip, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AdminSideBar from './AdminSideBar';
import './ExpedientePage.css';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es'; // Importamos la localización en español

export function ExpedientePage() {
  const { IdExpediente } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [expedientes, setExpedientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const [fechaFiltro, setFechaFiltro] = useState(null); // Para el filtro de fecha
  const [nombreFiltro, setNombreFiltro] = useState(''); // Para el filtro de nombre de mascota

  const fetchExpedientes = async () => {
    try {
      const response = await axios.get('http://localhost:3008/expedientes/obtener');
      setExpedientes(response.data);
    } catch (error) {
      console.error('Error al obtener los expedientes:', error);
    }
  };

  const fetchConsultas = async (idExpediente) => {
    try {
      const response = await axios.get(`http://localhost:3008/consultas/${idExpediente}`);
      setConsultas(response.data);
    } catch (error) {
      console.error('Error al obtener las consultas:', error);
    }
  };

  useEffect(() => {
    fetchExpedientes();
    if (IdExpediente) {
      const expediente = expedientes.find((e) => e.idExpediente === parseInt(IdExpediente));
      if (expediente) {
        setSelectedExpediente(expediente);
        fetchConsultas(IdExpediente);
      }
    } else {
      setSelectedExpediente(null);
      setConsultas([]);
    }
  }, [IdExpediente, expedientes]);

  const handleVerExpediente = (idExpediente) => {
    navigate(`/admin/buscar-expediente/${idExpediente}`);
  };

  const handleRegresar = () => {
    navigate('/admin/buscar-expediente');
  };

  const handleAgregarConsulta = () => {
    if (selectedExpediente) {
      navigate(`/admin/consulta-medica/${selectedExpediente.idExpediente}`);
    }
  };

  const handleEditarExpediente = (idExpediente) => {
    navigate(`/admin/uptexp/${idExpediente}`);
  };

  const handleEditarConsulta = (idConsulta) => {
    navigate(`/admin/consulta-medica-update/${idConsulta}`);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleClearFilters = () => {
    setFechaFiltro(null);
    setNombreFiltro('');
  };

  

  const expedienteRows = expedientes
    .filter((expediente) => {
      // Filtro por nombre de mascota
      if (
        fechaFiltro && 
        new Date(expediente.fechaApertura).toISOString().split('T')[0] !== 
        fechaFiltro.toISOString().split('T')[0]
      ) {
        return false;
      }
      
      return true;
    })
    .map((expediente) => ({
      id: expediente.idExpediente,
      NombreMascota: expediente.idMascota2?.nombreMascota,
      IdExpediente: expediente.idExpediente,
      FechaApertura: expediente.fechaApertura,
      Alergias: expediente.alergias,
      CondicionCronicas: expediente.condicionesCronicas,
      Observaciones: expediente.observaciones,
    }));

  const expedienteColumns = [
    { field: 'NombreMascota', headerName: 'Mascota', width: 150 },
    { field: 'IdExpediente', headerName: 'ID Expediente', width: 100 },
    { field: 'FechaApertura', headerName: 'Fecha Apertura', width: 100 },
    { field: 'Alergias', headerName: 'Alergias', width: 150 },
    { field: 'CondicionCronicas', headerName: 'Condiciones Crónicas', width: 150 },
    { field: 'Observaciones', headerName: 'Observaciones', width: 250 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <>
          <Tooltip title="Ver Expediente">
            <IconButton
              sx={{
                alignSelf: 'center',
                backgroundColor: '#2c6b6b',
                color: '#fff',
                marginRight: '10px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#2c6b6b',
                },
              }}
              onClick={() => handleVerExpediente(params.row.IdExpediente)}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Editar Expediente">
            <IconButton
              sx={{
                alignSelf: 'center',
                backgroundColor: '#2c6b6b',
                color: '#fff',
                marginRight: '10px',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#2c6b6b',
                },
              }}
              onClick={() => handleEditarExpediente(params.row.IdExpediente)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const consultaRows = consultas.map((consulta) => ({
    id: consulta.idConsultas,
    IdConsulta: consulta.idConsultas,
    FechaConsulta: consulta.fechaConsulta,
    MotivoConsulta: consulta.motivoConsulta,
    Diagnostico: consulta.diagnostico,
    Tratamiento: consulta.tratamiento,
    Imagenes: consulta.imagenes || [],
  }));

  const consultaColumns = [
    { field: 'Id', headerName: 'ID Consulta', width: 30 },
    { field: 'FechaConsulta', headerName: 'Fecha Consulta', width: 150 },
    { field: 'MotivoConsulta', headerName: 'Motivo Consulta', width: 150 },
    { field: 'Diagnostico', headerName: 'Diagnóstico', width: 200 },
    { field: 'Tratamiento', headerName: 'Tratamiento', width: 250 },
    {
      field: 'Imagenes',
      headerName: 'Imágenes',
      width: 200,
      renderCell: (params) =>
        params.value.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Consulta ${params.row.IdConsulta}`}
            style={{ width: 50, height: 50, margin: '0 5px', cursor: 'pointer' }}
            onClick={() => handleImageClick(imageUrl)}
          />
        )),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <Tooltip title="Editar">
          <IconButton
            sx={{
              alignSelf: 'center',
              backgroundColor: '#2c6b6b',
              color: '#fff',
              marginRight: '10px',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#2c6b6b',
              },
            }}
            onClick={() => handleEditarConsulta(params.row.IdConsulta)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <AdminSideBar />
      <Box className="container-expedientes">
        {!selectedExpediente ? (
          <>
            <h2 className="h2-centrado-ex">Expedientes</h2>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <TextField
                label="Buscar por nombre de mascota"
                variant="outlined"
                value={nombreFiltro}
                onChange={(e) => setNombreFiltro(e.target.value)}
                sx={{ width: '300px' }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                <DatePicker
                  label="Filtrar por fecha"
                  value={fechaFiltro}
                  onChange={(newDate) => setFechaFiltro(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                  inputFormat="YYYY-MM-DD" // Formato de año-mes-día
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClearFilters}
                sx={{
                  alignSelf: 'center',
                  backgroundColor: '#ea3c3c',
                  color: '#fff',
                  marginRight: '10px',
                }}
              >
                Limpiar Filtros
              </Button>
            </Box>
            <Box className="data-grid-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
              <DataGrid
                rows={expedienteRows}
                columns={expedienteColumns}
                getRowId={(row) => row.IdExpediente}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                rowsPerPageOptions={[5]}
              />
            </Box>
          </>
        ) : (
          <>
            <h2 className="h2-centrado-ex">Expediente de: {selectedExpediente.idMascota2?.nombreMascota}</h2>
            <Box className="expediente-info">
              <p><strong>Mascota:</strong> {selectedExpediente.idMascota2?.nombreMascota}</p>
              <p><strong>Fecha Apertura:</strong> {selectedExpediente.fechaApertura}</p>
              <p><strong>Alergias:</strong> {selectedExpediente.alergias}</p>
              <p><strong>Condiciones Crónicas:</strong> {selectedExpediente.condicionesCronicas}</p>
              <p><strong>Observaciones:</strong> {selectedExpediente.observaciones}</p>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAgregarConsulta}
              style={{ marginBottom: '20px' }}
              sx={{ alignSelf: 'center', backgroundColor: '#2c6b6b', color: '#fff' }}
            >
              Agregar Consulta
            </Button>
            <h2 className="h2-centrado-ex">Consultas</h2>
            <Box className="data-grid-container" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              <DataGrid
                rows={consultaRows}
                columns={consultaColumns}
                getRowId={(row) => row.IdConsulta}
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
            <Button
              variant="contained"
              onClick={handleRegresar}
              sx={{ alignSelf: 'center', backgroundColor: '#2c6b6b', color: '#fff' }}
            >
              Regresar
            </Button>
          </>
        )}
        <Modal
          open={!!selectedImage}
          onClose={handleCloseImage}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <img
              src={selectedImage}
              alt="Imagen de consulta"
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
            />
            <IconButton
              onClick={handleCloseImage}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Modal>
      </Box>
    </>
  );
}
export default ExpedientePage;
