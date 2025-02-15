import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminSideBar from './AdminSideBar';
import './ConsultaMedica.css';

export default function ActualizarExpediente() {
  const { idExpediente } = useParams(); // Obtener idExpediente desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idMascota: '',
    fechaApertura: '',
    alergias: '',
    condicionesCronicas: '',
    observaciones: '',
  });

  const [isLoading, setIsLoading] = useState(true); // Estado para mostrar el cargando
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el botón de enviar

  // Cargar datos del expediente desde el backend
  useEffect(() => {
    const fetchExpediente = async () => {
      try {
        const response = await axios.get(`http://localhost:3008/expedientes/find/${idExpediente}`);
        const expediente = response.data;

        // Establecer los datos en el formulario
        setFormData({
          idMascota: expediente.idMascota,
          fechaApertura: expediente.fechaApertura.split('T')[0], // Asegurar formato de fecha
          alergias: expediente.alergias || '',
          condicionesCronicas: expediente.condicionesCronicas || '',
          observaciones: expediente.observaciones || '',
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error al cargar el expediente:', error);
        setIsLoading(false);
      }
    };

    fetchExpediente();
  }, [idExpediente]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar la actualización del expediente
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:3008/expedientes/actualizar/${idExpediente}`, formData);
      alert('Expediente actualizado correctamente');
      navigate(`/admin/buscar-expediente/${formData.IdMascota}`);
    } catch (error) {
      console.error('Error al actualizar el expediente:', error);
      alert('Hubo un problema al actualizar el expediente. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
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
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        {isLoading ? (
          <p>Cargando expediente...</p>
        ) : (
          <>
            <h2 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#2c6b6b' }}>
              Actualizar Expediente
            </h2>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }}>
              <TextField
                label="ID Mascota"
                name="idMascota"
                value={formData.idMascota}
                disabled
                fullWidth
              />

              <TextField
                label="Fecha de Apertura"
                name="fechaApertura"
                value={formData.fechaApertura}
                onChange={handleChange}
                required
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Alergias"
                name="alergias"
                value={formData.alergias}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                className="custom-textfield"
              />

              <TextField
                label="Condiciones Crónicas"
                name="condicionesCronicas"
                value={formData.condicionesCronicas}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                className="custom-textfield"
              />

              <TextField
                label="Observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                className="custom-textfield"
              />
            </Box>

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
              {isSubmitting ? 'Guardando Expediente, Redireccionando...' : 'Actualizar Expediente'}
            </Button>
          </>
        )}
      </Box>
    </>
  );
}
