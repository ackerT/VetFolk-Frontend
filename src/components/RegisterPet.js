import React, { useState, useEffect } from 'react';
import "./RegisterPet.css";
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
  const [personas, setPersonas] = useState([]); // Almacenará las personas obtenidas del backend

  // Fetch personas desde el backend cuando el componente se monte
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch('http://localhost:3008/personas/obtener'); // Cambia esta URL según tu API
        const data = await response.json();

        // Verificar si la respuesta es un array
        if (Array.isArray(data)) {
          setPersonas(data); // Asignar personas si es un array
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error("Error al obtener las personas:", error);
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

  const registerPet = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos de la mascota a la API
      const response = await fetch('http://localhost:3008/mascotas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        alert('Mascota registrada con éxito');
        console.log(await response.json()); // Mostrar respuesta del backend
      } else {
        alert('Hubo un error al registrar la mascota');
      }
    } catch (error) {
      console.error("Error al registrar la mascota:", error);
      alert('Hubo un error al registrar la mascota');
    }
  };

  return (
    <>
      <AdminSideBar />
      <div className="register-pet-container">
        <div className="register-pet-header">
          <h1 className='register-pet-title'>Registro de Mascotas</h1>
          <p className='register-pet-text'>Completa la información para agregar una nueva mascota al sistema.</p>
        </div>
        <form onSubmit={registerPet} className="register-pet-form">
          <label>Nombre de la mascota:</label>
          <input type="text" name="nombreMascota" value={petData.nombreMascota} onChange={handleChange} required />

          <label>Especie:</label>
          <select name="idEspecie" value={petData.idEspecie} onChange={handleChange} required>
            <option value="">Selecciona la especie</option>
            <option value="1">Perro</option> {/* Cambia los valores según tus especies */}
            <option value="2">Gato</option>
            <option value="3">Otro</option>
          </select>

          <label>Fecha de nacimiento:</label>
          <input type="date" name="fechaNacimiento" value={petData.fechaNacimiento} onChange={handleChange} required />

          <label>Observaciones:</label>
          <textarea name="observaciones" value={petData.observaciones} onChange={handleChange} />

          <label>Dueño:</label>
          <select name="idPropietario" value={petData.idPropietario} onChange={handleChange} required>
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

          <button type="submit" className="register-pet-button">Guardar Mascota</button>
        </form>
      </div>
    </>
  );
}

export default RegisterPet;
