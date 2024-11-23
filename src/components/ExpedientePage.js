import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import AdminSideBar from './AdminSideBar';
import './ExpedientePage.css';
import axios from 'axios'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function ExpedientePage() {
  const { IdMascota } = useParams(); // Obtiene el IdMascota de la URL
  const navigate = useNavigate();

  const [expedientes, setExpedientes] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [open, setOpen] = useState(false);


  // Llamada para obtener los expedientes
  const fetchExpedientes = async () => {
    try {
      let url = '';
      if (IdMascota) {
        // Si hay un IdMascota, obtenemos los expedientes de esa mascota
        url = `http://18.221.225.5/expedientes/${IdMascota}`;
      } else {
        // Si no hay un IdMascota, obtenemos todos los expedientes
        url = `http://18.221.225.5/expedientes/obtener`;
      }
      const response = await axios.get(url);
      setExpedientes(response.data); // Suponiendo que la respuesta tiene los expedientes en `data`
    } catch (error) {
      console.error('Error al obtener los expedientes:', error);
    }
  };

  // Llamada para obtener las consultas (solo si hay un IdMascota)
  const fetchConsultas = async () => {
    try {
      if (IdMascota && expedientes.length > 0) {
        const consultasData = await Promise.all(
          expedientes.map((expediente) =>
            axios.get(`http://18.221.225.5/consultas/${expediente.idExpediente}`)
          )
        );
        setConsultas(consultasData.map((consulta) => consulta.data).flat());
      }
    } catch (error) {
      console.error('Error al obtener las consultas:', error);
    }
  };

  // Cargar los expedientes cuando el componente se monta o cambia el IdMascota
  useEffect(() => {
    fetchExpedientes();
  }, [IdMascota]);

  // Cargar las consultas cuando los expedientes cambian y hay un IdMascota
  useEffect(() => {
    if (IdMascota) {
      fetchConsultas();
    }
  }, [expedientes, IdMascota]);

  // Extrae las filas de expediente para el DataGrid
  const expedienteRows = expedientes.map((expediente) => ({
    id: expediente.idExpediente, // Asegúrate de usar el campo único
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
    { field: 'Alergias', headerName: 'Alergias', width: 200 },
    { field: 'CondicionCronicas', headerName: 'Condiciones Crónicas', width: 200 },
    { field: 'Observaciones', headerName: 'Observaciones', width: 250 },
  ];

  // Extrae las filas de consulta para el DataGrid (solo si hay consultas)
  const consultaRows = consultas.map((consulta) => ({
    id: consulta.idConsultas,
    IdConsulta: consulta.idConsultas,
    FechaConsulta: consulta.fechaConsulta,
    MotivoConsulta: consulta.motivoConsulta,
    Diagnostico: consulta.diagnostico,
    Tratamiento: consulta.tratamiento,
    ImgdeExamenes: consulta.imagenes || [], 
  }));

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
          {params.value && params.value.length > 0 ? (
            params.value.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Examen ${index}`}
                style={{ width: '25px', height: '25px', cursor: 'pointer', marginRight: '5px' }}
                onClick={() => handleImageClick(img)}
              />
            ))
          ) : (
            <span>No hay imágenes</span>
          )}
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


  const handleNuevaConsulta = () => {
    if (expedientes.length > 0) {
      const primerExpediente = expedientes[0];
      navigate(`/admin/consulta-medica/${IdMascota}/${primerExpediente.idExpediente}`);
    }
  }; 

  const handleEditConsulta = (IdConsulta) => {
    console.log(`Editar consulta con ID: ${IdConsulta}`);
    navigate(`/admin/consulta-medica-update/${IdConsulta}`);
  };

  return (
    <>
      <AdminSideBar />
      <Box className="expedientes-container">
        <h2 className="h2-centrado">Expedientes</h2>
        <Box className="data-grid-container">
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
        
        {IdMascota && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNuevaConsulta}
              disabled={expedientes.length === 0}
              className="register-button"
            >
              Nueva Consulta
            </Button>
            <h2 className="h2-centrado">Consultas</h2>
            <Box className="data-grid-container">
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
          </>
        )}
      </Box>
  
      {/* Modal para mostrar la imagen seleccionada */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Imagen de Examen</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Examen seleccionado"
            className="dialog-img"
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
