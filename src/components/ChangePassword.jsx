import React, { useState, useEffect } from 'react';
import './UpdateRegisterPet.css';
import logo from '../img/vet.png';
import AdminSideBar from './AdminSideBar';

function RegisterPet() {
  const [petData, setPetData] = useState({
    nombreMascota: '',
    idEspecie: '',
    fechaNacimiento: '',
    observaciones: '',
    idPropietario: '',
  });
  const [personas, setPersonas] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);  // Para deshabilitar los campos

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch('http://18.221.225.5/personas/obtener');
        const data = await response.json();

        if (Array.isArray(data)) {
          setPersonas(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener las personas:', error);
      }
    };

    fetchPersonas();
  }, []);

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

  const registerPet = async (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    try {
      const response = await fetch('http://18.221.225.5/mascotas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        alert('Mascota registrada con éxito');
        console.log(await response.json());
        setPetData({ nombreMascota: '', idEspecie: '', fechaNacimiento: '', observaciones: '', idPropietario: '' });
      } else {
        alert('Hubo un error al registrar la mascota');
      }
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      alert('Hubo un error al registrar la mascota');
    }
  };

  const updatePet = async (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    try {
      const response = await fetch('http://18.221.225.5/mascotas/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        setSuccessMessage('Datos de la mascota actualizados con éxito');
        setIsUpdating(false);  // Cambiar a no actualizando
        setIsDisabled(true);    // Deshabilitar los campos
      } else {
        alert('Hubo un error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Hubo un error al actualizar los datos');
    }
  };

  return (
    <>
      <AdminSideBar />
      <div className="register-pet-container">
        <div className="register-pet-header">
          <h1 className="register-pet-title">
            {isUpdating ? 'Actualizar Datos de Mascota' : 'Registro de Mascotas'}
          </h1>
          <p className="register-pet-text">
            {isUpdating ? 'Actualiza la información de la mascota.' : 'Completa la información para agregar una nueva mascota al sistema.'}
          </p>
        </div>

        {successMessage && !isDisabled && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={isUpdating ? updatePet : registerPet} className="register-pet-form">
          <label>Nombre de la mascota:</label>
          <input
            type="text"
            name="nombreMascota"
            value={petData.nombreMascota}
            onChange={handleChange}
            required
            disabled={isDisabled} // Deshabilitar el campo si está inhabilitado
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
          />

          <label>Dueño:</label>
          <select name="idPropietario" value={petData.idPropietario} onChange={handleChange} required disabled={isDisabled}>
            <option value="">Selecciona el dueño</option>
            {personas && Array.isArray(personas) && personas.length > 0 ? (
              personas.map((persona) => (
                <option key={persona.idPersona} value={persona.idPersona}>
                  {persona.nombre1} {persona.nombre2} {persona.apellido1} {persona.apellido2}
                </option>
              ))
            ) : (
              <option disabled>No hay dueños disponibles</option>
            )}
          </select>
          {errors.idPropietario && <span className="error">{errors.idPropietario}</span>}

          {!isDisabled && (
            <button type="submit" className="register-pet-button">
              {isUpdating ? 'Actualizar Datos' : 'Guardar Mascota'}
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default RegisterPet;
