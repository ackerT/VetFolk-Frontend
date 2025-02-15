import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Grid, Button } from '@mui/material';
import './EditProfile.css';
import vetImage from '../img/vet.png';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const EditProfile = () => {
    const [profileData, setProfileData] = useState({
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        correo: '',
        telefono: '',
        contrasenaActual: '',
        contrasenaNueva: '',
        genero: '',
        departamento: '',
        municipio: '',
        barrio: '',
        referencia: '',
    });

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = sessionStorage.getItem('userId'); // Obtener el ID del usuario desde el almacenamiento local

    // Función para obtener los datos de la persona por ID
    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:3008/personas/obtener/${userId}`); // Reemplaza con la URL correcta de tu backend
            const data = response.data;
            setProfileData({
                nombre1: data.nombre1,
                nombre2: data.nombre2,
                apellido1: data.apellido1,
                apellido2: data.apellido2,
                correo: data.correo,
                telefono: data.telefono,
                genero: data.genero || '',
                departamento: data.departamento || '',
                municipio: data.municipio || '',
                barrio: data.barrio || '',
                referencia: data.referencia || '',
            });
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchProfileData(); // Llamar a la API al cargar el componente si se tiene un ID de usuario
        }
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Validaciones
        switch (name) {
            case 'nombre1':
            case 'nombre2':
            case 'apellido1':
            case 'apellido2':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value) ? '' : 'Solo se permiten letras y espacios',
                }));
                break;
            case 'correo':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    correo: /\S+@\S+\.\S+/.test(value) ? '' : 'Correo inválido',
                }));
                break;
            case 'telefono':
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    telefono: /^\d{8}$/.test(value) ? '' : 'El teléfono debe tener 8 dígitos',
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

    const handleSubmit = async () => {
        let isValid = true;
        const newErrors = {};

        // Validaciones de los campos
        Object.keys(profileData).forEach((field) => {
            if (!profileData[field] && ['nombre1', 'apellido1', 'correo', 'telefono'].includes(field)) {
                newErrors[field] = 'Este campo es obligatorio';
                isValid = false;
            }
        });
        setErrors(newErrors);

        if (isValid) {
            try {
                const response = await axios.put(`http://localhost:3008/personas/actualizar/${userId}`, profileData);
                console.log("Datos actualizados:", response.data);
                setIsModalOpen(true);
            } catch (error) {
                console.error("Error actualizando los datos:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Cierra la modal
    };

    return (
        <><div className='edit-profile'>
            <Navbar />
            <div className="current-data-container">
                <div className='edit-icon-container'>
                    <FontAwesomeIcon icon={faCircleUser} />
                </div>
                <div className="text-container1">
                    <h3 className='edit-profile-welcome'>¡Hola, {profileData.nombre1}!</h3>
                    <div className="data-item">
                        <strong>Nombre Completo:</strong> {`${profileData.nombre1} ${profileData.nombre2} ${profileData.apellido1} ${profileData.apellido2}`}
                    </div>
                    <div className="data-item">
                        <strong>Correo Electrónico:</strong> {profileData.correo}
                    </div>
                    <div className="data-item">
                        <strong>Teléfono:</strong> {profileData.telefono}
                    </div>
                </div>
            </div>

            <div className="personal-info-container">
                <h1 className='edit-profile-title'>Información Personal</h1>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Primer Nombre"
                            variant="outlined"
                            fullWidth
                            name="nombre1"
                            value={profileData.nombre1}
                            onChange={handleChange}
                            error={Boolean(errors.nombre1)}
                            helperText={errors.nombre1}
                            className="text-field" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Segundo Nombre"
                            variant="outlined"
                            fullWidth
                            name="nombre2"
                            value={profileData.nombre2}
                            onChange={handleChange}
                            error={Boolean(errors.nombre2)}
                            helperText={errors.nombre2}
                            className="text-field" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Primer Apellido"
                            variant="outlined"
                            fullWidth
                            name="apellido1"
                            value={profileData.apellido1}
                            onChange={handleChange}
                            error={Boolean(errors.apellido1)}
                            helperText={errors.apellido1}
                            className="text-field" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Segundo Apellido"
                            variant="outlined"
                            fullWidth
                            name="apellido2"
                            value={profileData.apellido2}
                            onChange={handleChange}
                            error={Boolean(errors.apellido2)}
                            helperText={errors.apellido2}
                            className="text-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            name="correo"
                            value={profileData.correo}
                            onChange={handleChange}
                            error={Boolean(errors.correo)}
                            helperText={errors.correo}
                            className="text-field" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            name="telefono"
                            value={profileData.telefono}
                            onChange={handleChange}
                            error={Boolean(errors.telefono)}
                            helperText={errors.telefono}
                            className="text-field" />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            className="submit-button"
                            fullWidth
                        >
                            Guardar Cambios
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
        
        {isModalOpen && (
    <div className="modal-edit-overlay">
        <div className="modal-edit">
            <h2 className='modal-edit-title'>¡Éxito!</h2>
            <p className='modal-edit-text'>Tus cambios han sido guardados correctamente.</p>
            <button onClick={handleCloseModal} className="modal-close-button">
                Cerrar
            </button>
        </div>
    </div>
)}

        <section className='f-edit-wrapper' id='contacto'>
                <div className='paddings innerWidth flexCenter f-edit-container'>

                    {/*Izquierda*/}
                    <div className='flexColStart f-edit-left'>
                        <img src={vetImage} alt='logo' width={180}></img>
                    </div>

                    {/*Mitad*/}
                    <div className='flexColStart f-edit-middle'>
                        <span className='f-edit-text'><i className="fa-solid fa-location-dot f-icon" /> Barrio San Antonio, dos cuadras abajo de la estación de policía. <br />Las Lajas, Comayagua.</span> <br />
                        <span className='f-edit-text'><i class="fa-solid fa-clock f-icon" /> Horario de Atención:</span> <br />
                        <span className='f-edit-text'>   Lunes a Viernes 8:00 am - 5:00 pm</span> <br />
                        <span className='f-edit-text'>   Sábados 9:00 am - 5:00 pm</span>
                    </div>

                    {/*Derecha*/}
                    <div className='flexColStart f-edit-right'>
                        <span className='f-edit-text'>Contacto:</span> <br />
                        <span className='f-edit-text'><i class="fa-solid fa-phone" /> +504 9978-0338</span> <br />
                        <span className='f-edit-text'><i class="fa-solid fa-envelope" /> cvetfolk@gmail.com</span> <br />
                        <span className='f-edit-text'><i class="fa-brands fa-facebook" /> Centro Veterinario VetFolk</span> <br />
                        <span className='f-edit-text'><i class="fa-brands fa-instagram" /> vetfolk</span> <br />
                    </div>
                </div>
            </section></>
    );
};

export default EditProfile;
