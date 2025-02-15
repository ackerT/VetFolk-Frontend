import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';

export default function EditarConsultaMedica() {
  const { IdConsulta } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idConsulta: '',
    idExpediente: '',
    fechaConsulta: '',
    motivoConsulta: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    imagenes: [] // Almacenará imágenes como URLs o objetos File
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const fetchConsultaById = async (idConsulta) => {
    try {
      const response = await axios.get(`http://localhost:3008/consultas/getby/${idConsulta}`);
      setFormData({
        idConsulta: response.data.idConsultas,
        idExpediente: response.data.idExpediente,
        fechaConsulta: response.data.fechaConsulta,
        motivoConsulta: response.data.motivoConsulta,
        diagnostico: response.data.diagnostico,
        tratamiento: response.data.tratamiento,
        observaciones: response.data.observaciones,
        imagenes: response.data.imagenes || [] // Imágenes del backend
      });
    } catch (error) {
      console.error('Error al obtener la consulta:', error);
    }
  };

  useEffect(() => {
    if (IdConsulta) {
      fetchConsultaById(IdConsulta);
    }
  }, [IdConsulta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('motivoConsulta', formData.motivoConsulta);
      formDataToSubmit.append('diagnostico', formData.diagnostico);
      formDataToSubmit.append('tratamiento', formData.tratamiento);
      formDataToSubmit.append('observaciones', formData.observaciones);

      // Agregar las imágenes (si son archivos)
      formData.imagenes.forEach((image) => {
        if (image instanceof File) {
          formDataToSubmit.append('imagenes', image);
        }
      });

      const response = await axios.put(
        `http://localhost:3008/consultas/actualizar/${formData.idConsulta}`,
        formDataToSubmit,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        const expedienteResponse = await axios.get(`http://localhost:3008/expedientes/obtener/${formData.idExpediente}`);
        const idExpediente = expedienteResponse.data[0]?.idExpediente;
        if (idExpediente) {
          setIsSubmitting(false);
          navigate(`/admin/buscar-expediente/${idExpediente}`);
        } else {
          console.error('No se encontró el idExpediente');
          setIsSubmitting(false);
        }
      } else {
        console.error('Error al actualizar la consulta');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error al enviar los datos', error);
      setIsSubmitting(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewImage(null);
  };

  const handleAddImage = () => {
    if (newImage) {
      setFormData({
        ...formData,
        imagenes: [...formData.imagenes, newImage] // Agrega la nueva imagen al array
      });
      setNewImage(null);
      handleCloseDialog();
    }
  };

  const handleRemoveImage = (image) => {
    // Elimina la imagen del array 'imagenes'
    const updatedImages = formData.imagenes.filter((img) => img !== image);
    setFormData({
      ...formData,
      imagenes: updatedImages // Actualiza el estado sin la imagen eliminada
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
    }
  };
  

  return (
    <>
      <AdminSideBar />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: 3,
          maxWidth: '800px',
          margin: 'auto',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: '#2c6b6b',
            color: '#fff',
            ':hover': { backgroundColor: '#245a5a' },
            alignSelf: 'start',
          }}
        >
          Regresar
        </Button>

        <h2 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#2c6b6b' }}>
          Editar Consulta Médica
        </h2>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <TextField label="ID Consulta" name="idConsulta" value={formData.idConsulta} disabled fullWidth />
          <TextField label="ID Expediente" name="idExpediente" value={formData.idExpediente} disabled fullWidth />
          <TextField label="Fecha de Consulta" name="fechaConsulta" value={formData.fechaConsulta} disabled fullWidth />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Motivo de Consulta"
            name="motivoConsulta"
            value={formData.motivoConsulta}
            onChange={handleChange}
            required
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Diagnóstico"
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleChange}
            required
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Tratamiento"
            name="tratamiento"
            value={formData.tratamiento}
            onChange={handleChange}
            required
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
        </Box>

        <Box>
          <h3>Imágenes:</h3>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {formData.imagenes.length > 0 ? (
              formData.imagenes.map((image, index) => (
                <Box key={index} sx={{ position: 'relative', width: '120px' }}>
                  <img
                    src={image instanceof File ? URL.createObjectURL(image) : image}
                    alt={`Imagen ${index + 1}`}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveImage(image)}
                    sx={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '20px',
                      height: '20px',
                      minWidth: '20px',
                      padding: 0,
                      fontSize: '12px',
                      lineHeight: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    X
                  </Button>
                </Box>
              ))
            ) : (
              <p>No hay imágenes cargadas</p>
            )}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            sx={{ backgroundColor: '#2c6b6b', color: '#fff' }}
          >
            Agregar Imagen
          </Button>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ alignSelf: 'center'  , backgroundColor: '#2c6b6b', color: '#fff' }}
          disabled={isSubmitting}
        >
          Guardar Cambios
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Agregar Imagen</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleImageChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ backgroundColor: '#2c6b6b', color: '#fff'}}>
            Cancelar
          </Button>
          <Button onClick={handleAddImage} sx={{ backgroundColor: '#2c6b6b', color: '#fff'}} disabled={!newImage}>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
