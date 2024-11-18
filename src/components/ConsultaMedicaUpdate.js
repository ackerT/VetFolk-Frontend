import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdminSideBar from './AdminSideBar';
import { expedientes } from '../ExpedienteData'; // Importa los datos
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './ConsultaMedica.css';

export default function CrearConsultaMedica({ citas = [], idVeterinarioPredeterminado }) {
  const { IdConsulta } = useParams(); // Obtiene el parámetro de la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    IdExpediente: '',
    IdMascota: '',
    IdVeterinario: idVeterinarioPredeterminado || '',
    IdCita: '',
    FechaConsulta: '',
    MotivoConsulta: '',
    Diagnostico: '',
    Tratamiento: '',
    ImgdeExamenes: [] // Aquí almacenaremos los archivos de imagen cargados
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newImage, setNewImage] = useState(null); // Estado para almacenar la nueva imagen seleccionada

  // Cargar los datos de la consulta médica por IdConsulta
  useEffect(() => {
    let consultaEncontrada = null;

    for (let i = 0; i < expedientes.length; i++) {
      const mascota = expedientes[i];
      for (let j = 0; j < mascota.Expedientes.length; j++) {
        const expediente = mascota.Expedientes[j];
        consultaEncontrada = expediente.Consultas.find(consulta => consulta.IdConsulta === parseInt(IdConsulta));

        if (consultaEncontrada) {
          setFormData({
            IdExpediente: expediente.IdExpediente,
            IdMascota: mascota.IdMascota,
            IdVeterinario: consultaEncontrada.IdVeterinario,
            IdCita: consultaEncontrada.IdCita,
            FechaConsulta: consultaEncontrada.FechaConsulta,
            MotivoConsulta: consultaEncontrada.MotivoConsulta,
            Diagnostico: consultaEncontrada.Diagnostico,
            Tratamiento: consultaEncontrada.Tratamiento,
            ImgdeExamenes: consultaEncontrada.ImgdeExamenes,
          });
          break;
        }
      }
      if (consultaEncontrada) break;
    }
  }, [IdConsulta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Datos actualizados de la consulta médica:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/admin/buscar-expediente/${formData.IdMascota}`);
    }, 2000);
  };

  // Función para abrir el diálogo de imágenes
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo de imágenes
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewImage(null);
  };

  // Función para agregar una nueva imagen
  const handleAddImage = () => {
    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage); // Crear una URL para la imagen cargada
      setFormData({
        ...formData,
        ImgdeExamenes: [...formData.ImgdeExamenes, imageUrl] // Añadir la imagen al array
      });
      setNewImage(null);
      handleCloseDialog();
    }
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (imageUrl) => {
    setFormData({
      ...formData,
      ImgdeExamenes: formData.ImgdeExamenes.filter(url => url !== imageUrl)
    });
  };

  // Función para manejar la selección de archivo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file); // Establece la imagen seleccionada en el estado
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
          minHeight: '100vh', // Esto asegura que el formulario ocupe al menos toda la altura de la pantalla
          overflowY: 'auto', // Permite el desplazamiento si el contenido es más grande que la pantalla
        }}
      >
        <h2 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#2c6b6b' }}>
          Editar Consulta Médica
        </h2>

        {/* Fila de los primeros campos */}
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <TextField
            label="ID Expediente"
            name="IdExpediente"
            value={formData.IdExpediente}
            disabled
            fullWidth
          />

          <TextField
            label="ID Mascota"
            name="IdMascota"
            value={formData.IdMascota}
            disabled
            fullWidth
          />

          <TextField
            label="ID Veterinario"
            name="IdVeterinario"
            value={formData.IdVeterinario}
            disabled
            fullWidth
          />

          <TextField
            select
            label="ID Cita"
            name="IdCita"
            value={formData.IdCita}
            onChange={handleChange}
            required
            fullWidth
            className="custom-textfield"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'darkgreen',
              },
            }}
          >
            <MenuItem value="">Seleccionar cita</MenuItem>
            {citas && citas.length > 0 ? (
              citas.map((cita) => (
                <MenuItem key={cita.IdCita} value={cita.IdCita}>
                  {`ID: ${cita.IdCita} - Fecha: ${cita.FechaCita}`}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No hay citas disponibles</MenuItem>
            )}
          </TextField>

          <TextField
            label="Fecha de Consulta"
            name="FechaConsulta"
            value={formData.FechaConsulta}
            disabled
            fullWidth
          />
        </Box>

        {/* Fila de los campos largos */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Motivo de Consulta"
            name="MotivoConsulta"
            value={formData.MotivoConsulta}
            onChange={handleChange}
            required
            multiline
            rows={3}
            fullWidth
            className="custom-textfield"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'darkgreen',
              },
            }}
          />

          <TextField
            label="Diagnóstico"
            name="Diagnostico"
            value={formData.Diagnostico}
            onChange={handleChange}
            required
            multiline
            rows={3}
            fullWidth
            className="custom-textfield"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'darkgreen',
              },
            }}
          />

          <TextField
            label="Tratamiento"
            name="Tratamiento"
            value={formData.Tratamiento}
            onChange={handleChange}
            required
            multiline
            rows={3}
            fullWidth
            className="custom-textfield"
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'darkgreen',
              },
            }}
          />
        </Box>

        {/* Apartado para las imágenes */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenDialog}
            sx={{ backgroundColor: '#2c6b6b', marginTop: 2 }}
          >
            Agregar Imagen
          </Button>

          <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
            {formData.ImgdeExamenes.length > 0 ? (
              <ul>
                {formData.ImgdeExamenes.map((image, index) => (
                  <li key={index}>
                    <img src={image} alt={`Examen ${index + 1}`} width="100" />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveImage(image)}
                      sx={{ marginLeft: 2, maxHeight: '15px', fontSize: '10px' }}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay imágenes cargadas</p>
            )}
          </Box>
        </Box>

        {/* Botón de Enviar */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{
            backgroundColor: '#2c6b6b',
            '&:hover': { backgroundColor: '#1e4e4e' },
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {isSubmitting ? 'Guardando Consulta, Redireccionando al Expediente...' : 'Actualizar Consulta Médica'}
        </Button>
      </Box>

      {/* Diálogo para agregar imagen */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Agregar Imagen</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddImage} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

