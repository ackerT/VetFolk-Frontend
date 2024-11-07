import React, { useState } from 'react';
import { TextField, Grid, Button, RadioGroup, FormControlLabel, Radio, Autocomplete } from '@mui/material';
import './EditProfile.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import vetImage from '../img/vet.png';

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

    const handleMunicipioChange = (event, newValue) => {
        if (newValue) {
            setProfileData((prevData) => ({
                ...prevData,
                municipio: newValue.value, // Asegúrate de que esta propiedad existe en el objeto de nuevo valor
            }));
        } else {
            setProfileData((prevData) => ({
                ...prevData,
                municipio: '', // Limpiar el campo si no hay selección
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
                <FontAwesomeIcon icon={faCircleUser} />
                </div>
                <div className="text-container1">
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

            <div className="personal-info-container">
                <h1>Información Personal</h1>
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
            </div>

            <div className='complete-profile-container'>
                <h1>Completar Perfil</h1>

                <Grid container spacing={2}>
                {/* Sección de Género */}
                <Grid item xs={12}>
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

            {/* Sección de Dirección */}
            <Grid item xs={12}>
                <h5 className="section-title">Dirección</h5>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Autocomplete
                        options={departamentos}
                        getOptionLabel={(option) => option.label}
                        onChange={handleDepartamentoChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Departamento"
                                variant="outlined"
                                error={Boolean(errors.departamento)}
                                helperText={errors.departamento}
                                
                                className='custom-text-field'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        options={municipios}
                        getOptionLabel={(option) => option.label}
                        onChange={handleMunicipioChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Municipio"
                                variant="outlined"
                                error={Boolean(errors.municipio)}
                                helperText={errors.municipio}
                                sx={{ marginBottom: '16px' }}
                                className='custom-text-field'
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
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
                        
                    />
                </Grid>
                <Grid item xs={6}>
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
        </Grid>
        </div>
        <div className='button'>
                <Button variant="contained" onClick={handleSubmit} className="submit-button" style={{ marginTop: '16px' }}>
                    Guardar Cambios
                </Button>  
        </div>

<section className="footer-wrapper-e" id="contacto">
<div className="footer-container-e">

    {/* Izquierda */}
    <div className="footer-left-e">
        <img src={vetImage} alt="logo-e" width={180} />
    </div>

    {/* Mitad */}
    <div className="footer-middle-e">
        <span className="footer-text-e">
            <i className="fa-solid fa-location-dot footer-icon-e" /> 
            Barrio San Antonio, dos cuadras abajo de la estación de policía.
            <br />
            Las Lajas, Comayagua.
        </span> 
        <span className="footer-text-e">
            <i className="fa-solid fa-clock footer-icon-e" /> 
            Horario de Atención:
        </span>
        <span className="footer-text-e">Lunes a Viernes 8:00 am - 5:00 pm</span>   
        <span className="footer-text-e">Sábados 9:00 am - 5:00 pm</span>
    </div>

    {/* Derecha */}
    <div className="footer-right-e">
        <span className="footer-text-e">Contacto:</span>
        <span className="footer-text-e">
            <i className="fa-solid fa-phone footer-icon-e" /> +504 9978-0338
        </span>
        <span className="footer-text-e">
            <i className="fa-solid fa-envelope footer-icon-e" /> cvetfolk@gmail.com
        </span>
        <span className="footer-text-e">
            <i className="fa-brands fa-facebook footer-icon-e" /> Centro Veterinario VetFolk
        </span>
        <span className="footer-text-e">
            <i className="fa-brands fa-instagram footer-icon-e" /> vetfolk
        </span>
    </div>
</div>
</section>
</div>
    );
};

export default EditProfile;