import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Grid, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './EditProfile.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
    const [profileData, setProfileData] = useState({
        firstName: 'Jessica',
        secondName: 'Alejandra',
        lastName: 'Hernández',
        secondLastName: 'Raudales',
        email: 'jessica.raudales@example.com',
        phone: '88008445',
        currentPassword: '',
        newPassword: '',
        genero: '',
        departamento: '',
        municipio: '',
        barrio: '',
        referencia: '',
    });

    const [errors, setErrors] = useState({});
    const [municipios, setMunicipios] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Validaciones
        switch (name) {
            case 'firstName':
            case 'secondName':
            case 'lastName':
            case 'secondLastName':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value) ? '' : 'Solo se permiten letras y espacios',
                }));
                break;
            case 'email':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: /\S+@\S+\.\S+/.test(value) ? '' : 'Correo inválido',
                }));
                break;
            case 'phone':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    phone: /^\d{8}$/.test(value) ? '' : 'El teléfono debe tener 8 dígitos',
                }));
                break;
            case 'municipio':
            case 'barrio':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: value.length <= 50 ? '' : 'Máximo 50 caracteres',
                }));
                break;
            default:
                break;
        }
    };

    const handleDepartamentoChange = (e) => {
        const { name, value } = e.target;

        if (name === 'departamento') {
            setMunicipios(municipiosPorDepartamento[value] || []);
            setProfileData((prevData) => ({
                ...prevData,
                municipio: '', // Resetear el municipio al cambiar de departamento
                [name]: value,
            }));
        } else {
            setProfileData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = () => {
        let isValid = true;
        const newErrors = {};
        Object.keys(profileData).forEach((field) => {
            if (!profileData[field] && ['firstName', 'lastName', 'email', 'phone'].includes(field)) {
                newErrors[field] = 'Este campo es obligatorio';
                isValid = false;
            }
        });
        setErrors(newErrors);
        if (isValid) {
            console.log("Datos guardados:", profileData);
            // Lógica para enviar el formulario
        }
    };

    const departamentos = [
        { value: 'departamento1', label: 'Departamento 1' },
        { value: 'departamento2', label: 'Departamento 2' },
        // Agrega más departamentos según sea necesario
    ];

    const municipiosPorDepartamento = {
        departamento1: [
            { value: 'municipio1', label: 'Municipio 1' },
            { value: 'municipio2', label: 'Municipio 2' },
        ],
        departamento2: [
            { value: 'municipio3', label: 'Municipio 3' },
            { value: 'municipio4', label: 'Municipio 4' },
        ],
        // Agrega más municipios según sea necesario
    };

    return (
        <div className='edit-profile'>
            <Navbar />
            <div className="current-data">
                <div className='icon-container'>
                    <FontAwesomeIcon icon={faIdBadge} className="icon" />
                </div>
                <div className="text-container">
                    <h3>¡Hola, {profileData.firstName}!</h3>
                    <div className="data-item">
                        <strong>Nombre Completo:</strong> {`${profileData.firstName} ${profileData.secondName} ${profileData.lastName} ${profileData.secondLastName}`}
                    </div>
                    <div className="data-item">
                        <strong>Correo Electrónico:</strong> {profileData.email}
                    </div>
                    <div className="data-item">
                        <strong>Teléfono:</strong> {profileData.phone}
                    </div>
                </div>
            </div>
            <div className="accordion-container">
                <Accordion className='accordion-info' >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="accordion-header">Información personal</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Primer Nombre"
                                    variant="outlined"
                                    fullWidth
                                    name="firstName"
                                    value={profileData.firstName}
                                    onChange={handleChange}
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName}
                                    className="text-field"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Segundo Nombre"
                                    variant="outlined"
                                    fullWidth
                                    name="secondName"
                                    value={profileData.secondName}
                                    onChange={handleChange}
                                    error={Boolean(errors.secondName)}
                                    helperText={errors.secondName}
                                    className="text-field"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Primer Apellido"
                                    variant="outlined"
                                    fullWidth
                                    name="lastName"
                                    value={profileData.lastName}
                                    onChange={handleChange}
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName}
                                    className="text-field"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Segundo Apellido"
                                    variant="outlined"
                                    fullWidth
                                    name="secondLastName"
                                    value={profileData.secondLastName}
                                    onChange={handleChange}
                                    error={Boolean(errors.secondLastName)}
                                    helperText={errors.secondLastName}
                                    className="text-field"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Correo Electrónico"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    className="text-field"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Teléfono"
                                    variant="outlined"
                                    fullWidth
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                    error={Boolean(errors.phone)}
                                    helperText={errors.phone}
                                    className="text-field"
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion className='accordion-pass' >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="accordion-header">Configuraciones de cuenta</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Contraseña Actual"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    name="currentPassword"
                                    value={profileData.currentPassword}
                                    onChange={handleChange}
                                    error={Boolean(errors.currentPassword)}
                                    helperText={errors.currentPassword}
                                    className="text-field"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Nueva Contraseña"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    name="newPassword"
                                    value={profileData.newPassword}
                                    onChange={handleChange}
                                    error={Boolean(errors.newPassword)}
                                    helperText={errors.newPassword}
                                    className="text-field"
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion className="accordion-completar-cuenta">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="accordion-header">Completar cuenta</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <h5 className="section-title">Género</h5>
                                <RadioGroup
                                    name="genero"
                                    value={profileData.genero}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel value="Femenino" control={<Radio className='custom-radio-button' />} label="Femenino" className='radio-label-text' />
                                    <FormControlLabel value="Masculino" control={<Radio className='custom-radio-button' />} label="Masculino" className='radio-label-text' />
                                    <FormControlLabel value="Otro" control={<Radio className='custom-radio-button' />} label="Otro" className='radio-label-text' />
                                </RadioGroup>
                            </Grid>

                            <Grid item xs={6}>
                                <h5 className="section-title">Dirección</h5>
                                <FormControl variant="outlined" fullWidth className="custom-text-field" style={{ marginBottom: '16px' }}>
                                <InputLabel id="departamento-label">Departamento</InputLabel>
                            <Select
                                labelId="departamento-label"
                                label="Departamento"
                                name="departamento"
                                value={profileData.departamento}
                                onChange={handleChange}
                            >
                        <MenuItem value=""><em>Seleccione un departamento</em></MenuItem>
                        {departamentos.map(departamento => (
                        <MenuItem key={departamento.value} value={departamento.value}>
                            {departamento.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth className="custom-text-field" style={{ marginBottom: '16px' }}>
                <InputLabel id="municipio-label">Municipio</InputLabel>
                <Select
                    labelId="municipio-label"
                    label="Municipio"
                    name="municipio"
                    value={profileData.municipio}
                    onChange={handleChange}
                    error={Boolean(errors.municipio)}
                >
                    <MenuItem value=""><em>Seleccione un municipio</em></MenuItem>
                    {municipios.map(municipio => (
                        <MenuItem key={municipio.value} value={municipio.value}>
                            {municipio.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

                                <TextField
                                    label="Barrio"
                                    variant="outlined"
                                    fullWidth
                                    name="barrio"
                                    value={profileData.barrio}
                                    onChange={handleChange}
                                    error={Boolean(errors.barrio)}
                                    helperText={errors.barrio}
                                    className="custom-text-field"
                                    style={{ marginBottom: '16px' }}
                                />

                                <TextField
                                    label="Referencia"
                                    variant="outlined"
                                    fullWidth
                                    name="referencia"
                                    value={profileData.referencia}
                                    onChange={handleChange}
                                    className="custom-text-field"
                                    style={{ marginBottom: '16px' }}
                                />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Button variant="contained" onClick={handleSubmit} className="submit-button" style={{ marginTop: '16px' }}>
                    Guardar Cambios
                </Button>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;