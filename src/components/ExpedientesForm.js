import React, { useState } from 'react';
import { TextField, Grid, Autocomplete, FormControl, Button } from '@mui/material';
import vetImage from '../img/vet.png';
import AdminSideBar from './AdminSideBar';
import './ExpedientesForm.css';

function ExpedientesForm() {

    const [fechaApertura, setFechaApertura] = useState('');
    const [nombreMascota, setNombreMascota] = useState('');
    const [alergias, setAlergias] = useState('');
    const [condicionesCronicas, setCondicionesCronicas] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const mascotas = [
        { label: 'Fido', id: 1 },
        { label: 'Luna', id: 2 },
        { label: 'Max', id: 3 },
        { label: 'Bella', id: 4 },
    ];

    const handleFechaChange = (event) => {
        setFechaApertura(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            fechaApertura,
            nombreMascota,
            alergias,
            condicionesCronicas,
            observaciones,
        };
        console.log("Datos del formulario:", formData);
        // Aquí podrías agregar la lógica para enviar los datos a un backend o API
    };

    return (
        <>
        <AdminSideBar />
        <div className='expediente-container'>
        <div className="expediente-header">
        <img src={vetImage} alt="Vet Folk Logo" className="logo" />
        <h1 className='title-header'>Creación de Expedientes</h1>
        <p className='description-header'>Completa la información para agregar un nuevo expediente al sistema.</p>
        </div>

        <div className='expedientes-form'>
        <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl variant="outlined" fullWidth className="custom-text-field" style={{ marginBottom: '16px' }}>
                            <Autocomplete
                                options={mascotas}
                                getOptionLabel={(option) => option.label}
                                value={nombreMascota}
                                onChange={(event, newValue) => {
                                    setNombreMascota(newValue ? newValue.label : '');
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Nombre de la Mascota" variant="outlined" />
                                )}
                                freeSolo
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
                        <Button className='submit-button' variant="contained" type="submit">
                            Crear Expediente
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