import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AdminSideBar from './AdminSideBar';
import './ConsultaMedica.css';

const idUsuario = sessionStorage.getItem('userId');

export default function CrearConsultaMedica() {
  const { IdExpediente, IdMascota } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idExpediente: IdExpediente || '',
    idVeterinario: idUsuario || '',
    fechaConsulta: new Date().toISOString().split('T')[0],
    motivoConsulta: '',
    diagnostico: '',
    tratamiento: '',
    observaciones: '',
    imagenes: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await fetch('http://18.221.225.5/personas/obtenerus');
        const personas = await response.json();
        const personaEncontrada = personas.find((persona) => persona.usuarios?.idUsuario === idUsuario);
        setPersona(personaEncontrada);
      } catch (error) {
        console.error('Error al obtener los datos de la persona:', error);
      }
    };

    fetchPersona();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convertir a array
    const validImages = files.filter(file => file.size <= 10000000); // Limitar el tamaño a 5MB
    if (validImages.length !== files.length) {
      alert('Algunas imágenes son demasiado grandes (máximo 5MB)');
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      imagenes: validImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'imagenes') {
        value.forEach((file) => dataToSubmit.append('imagenes', file)); // Nombre del campo debe coincidir con el backend
      } else {
        dataToSubmit.append(key, value);
      }
    });

    try {
      const response = await axios.post('http://18.221.225.5/consultas/crear', dataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Consulta médica guardada:', response.data);
      navigate(`/admin/buscar-expediente/${IdMascota}`);
    } catch (error) {
      console.error('Error al guardar la consulta médica:', error);
      alert('Hubo un error al guardar la consulta. Inténtalo de nuevo.');
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
          maxHeight: 'calc(100vh - 100px)', // Ajusta el valor según lo que necesites
          overflowY: 'auto',
        }}
      >
        <h2 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#2c6b6b' }}>
          Nueva Consulta Médica
        </h2>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <TextField label="ID Expediente" name="idExpediente" value={formData.idExpediente} disabled fullWidth />
          <TextField label="ID Veterinario" name="idVeterinario" value={formData.idVeterinario} fullWidth disabled />
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
            rows={2}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            type="file"
            name="imagenes"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ padding: '10px' }}
          />
          {formData.imagenes.length > 0 && (
            <div>
              <h4>Imágenes seleccionadas:</h4>
              <ul>
                {formData.imagenes.map((img, index) => (
                  <li key={index}>
                    <span>{img.name}</span>
                    <img src={URL.createObjectURL(img)} alt={img.name} style={{ width: 50, height: 50 }} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{
            backgroundColor: '#2c6b6b',
            '&:hover': { backgroundColor: '#1e4e4e' },
          }}
        >
          {isSubmitting ? 'Guardando Consulta...' : 'Agregar Consulta al Expediente'}
        </Button>
      </Box>
    </>
  );
}
