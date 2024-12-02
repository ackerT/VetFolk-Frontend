import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Grid, Autocomplete, FormControl, Button } from '@mui/material';
import vetImage from '../img/vet.png';
import AdminSideBar from './AdminSideBar';
import './ExpedientesForm.css';
import { expedientes } from '../ExpedienteData'; // Importar datos estáticos

function ExpedientesForm() {
    const { IdExpediente } = useParams(); // Obtener IdExpediente de la URL
    const navigate = useNavigate(); // Hook para redirigir
    const [fechaApertura, setFechaApertura] = useState('');
    const [nombreMascota, setNombreMascota] = useState(null); // Ahora es un objeto
    const [alergias, setAlergias] = useState('');
    const [condicionesCronicas, setCondicionesCronicas] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const mascotas = expedientes.map((m) => ({ label: m.NombreMascota, id: m.IdMascota }));

    // Función para cargar datos del expediente
    useEffect(() => {
        if (IdExpediente) {
            const expediente = expedientes
                .flatMap((mascota) => mascota.Expedientes)
                .find((exp) => exp.IdExpediente === parseInt(IdExpediente, 10));

            if (expediente) {
                setFechaApertura(expediente.FechaApertura || '');
                const mascota = expedientes.find((m) => m.Expedientes.includes(expediente));
                setNombreMascota(mascota ? { label: mascota.NombreMascota, id: mascota.IdMascota } : null);
                setAlergias(expediente.Alergias || '');
                setCondicionesCronicas(expediente.CondicionCronicas || '');
                setObservaciones(expediente.Observaciones || '');
            }
        }
    }, [IdExpediente]);

    const handleFechaChange = (event) => {
        setFechaApertura(event.target.value);
    };

    const handleUpdate = () => {
        // Redirigir a la nueva URL con el IdExpediente
        if(nombreMascota)
        navigate(`/admin/buscar-expediente/${nombreMascota.id}`);
    };

    return (
        <>
            <AdminSideBar />
            <div className='expediente-container'>
                <div className="expediente-header">
                    <img src={vetImage} alt="Vet Folk Logo" className="logo" />
                    <h1 className='title-header'>Actualizar Expediente</h1>
                    <p className='description-header'>Edita la información del expediente seleccionado.</p>
                </div>

                <div className='expedientes-form'>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth className="custom-text-field" style={{ marginBottom: '16px' }}>
                                    <Autocomplete
                                        options={mascotas}
                                        getOptionLabel={(option) => option.label}
                                        value={nombreMascota}
                                        onChange={(event, newValue) => {
                                            setNombreMascota(newValue || null);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Nombre de la Mascota" variant="outlined" />
                                        )}
                                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Fecha de Apertura"
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
                                    label="Condiciones Crónicas"
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
                                <Button className='submit-button' variant="contained" onClick={handleUpdate}>
                                    Actualizar Expediente
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ExpedientesForm;
