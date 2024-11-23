import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';

export default function EditarCitaPage() {
  const { idCita } = useParams(); // Obtiene el id de la cita desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idCita: '',
    idUsuario: '',
    fecha: '',
    hora: '',
    idEstado: '',
    comentarios: '', // Cambiado a 'comentarios'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estados, setEstados] = useState([]); // Estados disponibles para seleccionar

  // Función para obtener la cita por idCita
  const fetchCitaById = async (idCita) => {
    try {
      const response = await axios.get(`http://18.221.225.5/citas/obtener/${idCita}`);
      setFormData({
        idCita: response.data.idCita,
        idUsuario: response.data.idUsuario,
        fecha: response.data.fecha,
        hora: response.data.hora,
        idEstado: response.data.idEstado,
        comentarios: response.data.comentarios || '', // Cambiado a 'comentarios'
      });
    } catch (error) {
      console.error('Error al obtener la cita:', error);
    }
  };

  // Función para obtener todos los estados desde el servicio
  const fetchEstados = async () => {
    try {
      const response = await axios.get('http://18.221.225.5/estados/obtener');
      setEstados(response.data); // Asume que la respuesta es un array de objetos con idEstado y nombre
    } catch (error) {
      console.error('Error al obtener los estados:', error);
    }
  };

  // Cargar los datos de la cita y los estados al montar el componente
  useEffect(() => {
    if (idCita) {
      fetchCitaById(idCita);
    }
    fetchEstados();
  }, [idCita]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Actualización de la cita
      const response = await axios.put(`http://18.221.225.5/citas/actualizar/${formData.idCita}`, {
        idEstado: formData.idEstado,
        comentarios: formData.comentarios, // Cambiado a 'comentarios'
      });

      if (response.status === 200) {
        setIsSubmitting(false);
        navigate('/admin/historiacita'); // Redirigir al historial de citas después de guardar
      } else {
        console.error('Error al actualizar la cita');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error al enviar los datos', error);
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
        <h2 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#2c6b6b' }}>
          Editar Cita
        </h2>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <TextField label="ID Cita" name="idCita" value={formData.idCita} disabled fullWidth />
          <TextField label="ID Usuario" name="idUsuario" value={formData.idUsuario} disabled fullWidth />
          <TextField label="Fecha" name="fecha" value={formData.fecha} disabled fullWidth />
          <TextField label="Hora" name="hora" value={formData.hora} disabled fullWidth />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            select
            label="Estado de la Cita"
            name="idEstado"
            value={formData.idEstado}
            onChange={handleChange}
            required
            fullWidth
          >
            {estados.map((estado) => (
              <MenuItem key={estado.idEstado} value={estado.idEstado}>
                {estado.estado} {/* Mostrar el nombre del estado */}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Comentarios"
            name="comentarios" // Cambiado a 'comentarios'
            value={formData.comentarios}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ backgroundColor: '#2c6b6b' }}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </Box>
    </>
  );
}
