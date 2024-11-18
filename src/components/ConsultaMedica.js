import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdminSideBar from './AdminSideBar';
import './ConsultaMedica.css'; 

const Citasdata = [
  { IdCita: 1, FechaCita: '2024-11-16 10:00' },
  { IdCita: 2, FechaCita: '2024-11-16 11:00' }
];

export default function CrearConsultaMedica({ citas = Citasdata, idVeterinarioPredeterminado }) {
  const { IdExpediente, IdMascota } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    IdExpediente: IdExpediente || '',
    IdMascota: IdMascota || '',
    IdVeterinario: idVeterinarioPredeterminado || '',
    IdCita: '',
    FechaConsulta: new Date().toISOString().split('T')[0],
    MotivoConsulta: '',
    Diagnostico: '',
    Tratamiento: '',
    Imagenes: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, Imagenes: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Datos de la consulta médica:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/admin/buscar-expediente/${IdMascota}`);
    }, 2000);
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
        }}
      >
        <h2 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif', color: '#2c6b6b' }}>
          Nueva Consulta Médica
        </h2>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(5, 1fr)' }}>
          <TextField
            label="ID Expediente"
            name="IdExpediente"
            value={formData.IdExpediente}
            disabled
            fullWidth
            className="custom-textfield"
          />

          <TextField
            label="ID Mascota"
            name="IdMascota"
            value={formData.IdMascota}
            disabled
            fullWidth
            className="custom-textfield"
          />

          <TextField
            label="ID Veterinario"
            name="IdVeterinario"
            value={formData.IdVeterinario}
            disabled
            fullWidth
            className="custom-textfield" 
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
            {citas.map((cita) => (
              <MenuItem key={cita.IdCita} value={cita.IdCita}>
                {`ID: ${cita.IdCita} - Fecha: ${cita.FechaCita}`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Fecha de Consulta"
            name="FechaConsulta"
            value={formData.FechaConsulta}
            disabled
            fullWidth
            className="custom-textfield"
          />
        </Box>

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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            type="file"
            name="Imagenes"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ padding: '10px' }}
          />
          {formData.Imagenes.length > 0 && (
            <div>
              <h4>Imágenes seleccionadas:</h4>
              <ul>
                {formData.Imagenes.map((img, index) => (
                  <li key={index}>{img.name}</li>
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
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {isSubmitting ? 'Guardando Consulta, Redireccionando al Expediente...' : 'Agregar Consulta al Expediente'}
        </Button>
      </Box>
    </>
  );
}
