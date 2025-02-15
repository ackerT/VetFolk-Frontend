import React, { useState, useEffect } from 'react';
import { TextField, Grid, Autocomplete, FormControl, Button } from '@mui/material';
import vetImage from '../img/vet.png';
import AdminSideBar from './AdminSideBar';
import './ExpedientesForm.css';

function ExpedientesForm() {
  const [fechaApertura, setFechaApertura] = useState('');
  const [nombreMascota, setNombreMascota] = useState(null); // Ahora almacenamos el objeto completo de la mascota
  const [alergias, setAlergias] = useState('');
  const [condicionesCronicas, setCondicionesCronicas] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [mascotas, setMascotas] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtener todas las mascotas desde el backend
  useEffect(() => {
    async function fetchMascotas() {
      try {
        const response = await fetch('http://localhost:3008/mascotas/obtener'); // URL de tu backend
        const data = await response.json();
        setMascotas(data); // Guardamos las mascotas en el estado
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    }

    fetchMascotas();
  }, []);

  const handleFechaChange = (event) => {
    setFechaApertura(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si se ha seleccionado una mascota
    const formData = {
      fechaApertura,
      idMascota: nombreMascota ? nombreMascota.idMascota : null, // Usamos el id de la mascota seleccionada
      alergias,
      condicionesCronicas,
      observaciones,
    };

    console.log("Datos del formulario:", formData);

    // Enviar los datos al backend para crear el expediente
    try {
      const response = await fetch('http://localhost:3008/expedientes/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Expediente creado exitosamente');
        setIsModalOpen(true);
      } else {
        console.error('Error al crear el expediente');
      }
    } catch (error) {
      console.error('Error al enviar los datos al backend:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra la modal
};

  return (
    <>
      <AdminSideBar />
      <div className="expediente-header">
          <h1 className='title-header'>Creación de Expedientes</h1>
      </div>

      <div className='expediente-container'>

        <div className='expedientes-form'>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth className="custom-text-field" style={{ marginBottom: '16px' }}>
                  <Autocomplete
                    options={mascotas}
                    getOptionLabel={(option) => option.nombreMascota} 
                    value={nombreMascota}
                    onChange={(event, newValue) => {
                      setNombreMascota(newValue); 
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Nombre de la Mascota" variant="outlined" />
                    )}
                    isOptionEqualToValue={(option, value) => option.idMascota === value.idMascota} // Compara por id
                    freeSolo
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Fecha de apertura"
                  variant="outlined"
                  fullWidth
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={fechaApertura}
                  onChange={handleFechaChange}
                  className="custom-text-field"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Alergias"
                  variant="outlined"
                  fullWidth
                  name="alergias"
                  value={alergias}
                  onChange={(e) => setAlergias(e.target.value)}
                  className="text-field"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Condiciones crónicas"
                  variant="outlined"
                  fullWidth
                  name="condicionesCronicas"
                  value={condicionesCronicas}
                  onChange={(e) => setCondicionesCronicas(e.target.value)}
                  className="text-field"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Observaciones"
                  variant="outlined"
                  fullWidth
                  name="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  className="text-field"
                />
              </Grid>

              <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16px' }}>
                <Button className='submit-button' variant="contained" type="submit">
                  Crear Expediente
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        
        {isModalOpen && (
    <div className="modal-expediente-overlay">
        <div className="modal-expediente">
            <h2 className='modal-expediente-title'>¡Éxito!</h2>
            <p className='modal-expediente-text'>El expediente se ha creado correctamente.</p>
            <button onClick={handleCloseModal} className="modal-close-expediente-button">
                Cerrar
            </button>
        </div>
    </div>
)}

      </div>
    </>
  );
}

export default ExpedientesForm;
