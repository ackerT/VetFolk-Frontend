import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Para capturar el ID de la mascota de la URL
import './UpdateRegisterPet.css';
import AdminSideBar from './AdminSideBar';

function RegisterPet() {
  const { IdMascota } = useParams();  // Capturamos el IdMascota de la URL
  const navigate = useNavigate();  // Para redirigir después de ver los datos
  const [petData, setPetData] = useState({
    nombreMascota: '',
    idEspecie: '',
    fechaNacimiento: '',
    observaciones: '',
    idPropietario: '',
  });
  const [personas, setPersonas] = useState([]);  // Lista de personas (propietarios)
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);  // Para deshabilitar los campos
  const [isSubmitted, setIsSubmitted] = useState(false);  // Estado para saber si se ha enviado el formulario

  // JSON de prueba para las personas (propietarios)
  const samplePersonas = [
    { idPersona: 1, nombre1: "Juan", nombre2: "", apellido1: "Pérez", apellido2: "González" },
    { idPersona: 2, nombre1: "Ana", nombre2: "María", apellido1: "Gómez", apellido2: "López" },
    { idPersona: 3, nombre1: "Carlos", nombre2: "", apellido1: "Martínez", apellido2: "Fernández" },
    { idPersona: 4, nombre1: "Luisa", nombre2: "Elena", apellido1: "Rodríguez", apellido2: "Sánchez" },
    { idPersona: 5, nombre1: "José", nombre2: "", apellido1: "Ramírez", apellido2: "Vázquez" }
  ];

  // JSON de prueba para las mascotas
  const samplePets = [
    {
      IdMascota: 1,
      nombreMascota: "Rex",
      idEspecie: "1",
      fechaNacimiento: "2020-05-01",
      observaciones: "Mascota tranquila, buena salud.",
      idPropietario: 2
    },
    {
      IdMascota: 2,
      nombreMascota: "Luna",
      idEspecie: "2",
      fechaNacimiento: "2019-07-10",
      observaciones: "Le gusta jugar y correr mucho.",
      idPropietario: 3
    },
    {
      IdMascota: 3,
      nombreMascota: "Pelusa",
      idEspecie: "2",
      fechaNacimiento: "2021-11-20",
      observaciones: "Muy cariñosa, le gusta dormir todo el día.",
      idPropietario: 1
    },
    {
      IdMascota: 4,
      nombreMascota: "Toby",
      idEspecie: "1",
      fechaNacimiento: "2022-03-15",
      observaciones: "Activo, siempre quiere estar afuera.",
      idPropietario: 4
    },
    {
      IdMascota: 5,
      nombreMascota: "Maya",
      idEspecie: "3",
      fechaNacimiento: "2018-08-22",
      observaciones: "Muy juguetona, especialmente con pelotas.",
      idPropietario: 5
    }
  ];

  // Cargar los datos de la mascota si estamos en modo de actualización
  useEffect(() => {
    // Simulamos la carga de datos de las personas
    setPersonas(samplePersonas);

    // Si hay un id de mascota, buscamos los datos de la mascota
    if (IdMascota) {
      const pet = samplePets.find(pet => pet.IdMascota === parseInt(IdMascota));
      if (pet) {
        setPetData({
          nombreMascota: pet.nombreMascota,
          idEspecie: pet.idEspecie,
          fechaNacimiento: pet.fechaNacimiento,
          observaciones: pet.observaciones,
          idPropietario: pet.idPropietario,
        });
        setIsDisabled(false); // Habilitar campos si se encuentran los datos
      }
    }
  }, [IdMascota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    const validationErrors = {};

    if (!petData.nombreMascota) validationErrors.nombreMascota = 'El nombre de la mascota es obligatorio.';
    if (!petData.idEspecie) validationErrors.idEspecie = 'Selecciona una especie.';
    if (!petData.fechaNacimiento) {
      validationErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
    } else {
      const today = new Date();
      const birthDate = new Date(petData.fechaNacimiento);
      if (birthDate > today) {
        validationErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser mayor a la fecha actual.';
      }
    }
    if (!petData.idPropietario) validationErrors.idPropietario = 'Selecciona un dueño.';

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    // Simular el envío de datos
    setIsSubmitted(true);
    setTimeout(() => {
      //alert('Datos actualizados correctamente');
      navigate(`/admin`);  // Redirigir después de la actualización
    }, 1500);
  };

  return (
    <>
      <AdminSideBar />
      <div className="register-pet-container">
        <div className="register-pet-header">
          <h1 className="register-pet-title">
            Actualizar Datos de Mascota
          </h1>
          <p className="register-pet-text">
            Aquí puedes ver los datos de la mascota y editarlos si es necesario.
          </p>
        </div>

        {isSubmitted ? (
          <div className="success-message">
            <h2>Datos actualizados correctamente</h2>
            <p>La mascota ha sido actualizada exitosamente.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="register-pet-form">
            <label>Nombre de la mascota:</label>
            <input
              type="text"
              name="nombreMascota"
              value={petData.nombreMascota}
              onChange={handleChange}
              required
              disabled={isDisabled} // Deshabilitar si está inhabilitado
            />
            {errors.nombreMascota && <span className="error">{errors.nombreMascota}</span>}

            <label>Especie:</label>
            <select name="idEspecie" value={petData.idEspecie} onChange={handleChange} required disabled={isDisabled}>
              <option value="">Selecciona la especie</option>
              <option value="1">Perro</option>
              <option value="2">Gato</option>
              <option value="3">Otro</option>
            </select>
            {errors.idEspecie && <span className="error">{errors.idEspecie}</span>}

            <label>Fecha de nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={petData.fechaNacimiento}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
            {errors.fechaNacimiento && <span className="error">{errors.fechaNacimiento}</span>}

            <label>Observaciones:</label>
            <textarea
              name="observaciones"
              value={petData.observaciones}
              onChange={handleChange}
              disabled={isDisabled}
            ></textarea>

            <label>Propietario:</label>
            <select
              name="idPropietario"
              value={petData.idPropietario}
              onChange={handleChange}
              required
              disabled={isDisabled}
            >
              <option value="">Selecciona el propietario</option>
              {personas.map((persona) => (
                <option key={persona.idPersona} value={persona.idPersona}>
                  {persona.nombre1} {persona.apellido1}
                </option>
              ))}
            </select>
            {errors.idPropietario && <span className="error">{errors.idPropietario}</span>}

            <button type="submit" className="update-button" disabled={isDisabled}>
              Confirmar Cambios
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default RegisterPet;
