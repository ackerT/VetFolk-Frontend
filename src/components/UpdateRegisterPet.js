import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams
import "./RegisterPet.css";
import AdminSideBar from './AdminSideBar';

function RegisterPet() {
  const { idMascota } = useParams(); // Obtener el idMascota de la URL
  const navigate = useNavigate();
  
  const [petData, setPetData] = useState({
    nombreMascota: '',
    idEspecie: '',
    fechaNacimiento: '',
    observaciones: '',
    idPropietario: '',
  });

  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    // Fetch datos de la mascota usando idMascota
    const fetchPetData = async () => {
      try {
        const response = await fetch(`http://localhost:3008/mascotas/obtener/${idMascota}`);
        const data = await response.json();
        setPetData(data); // Llenar el formulario con los datos de la mascota
      } catch (error) {
        console.error('Error al obtener datos de la mascota:', error);
      }
    };

    // Fetch lista de personas
    const fetchPersonas = async () => {
      try {
        const response = await fetch('http://localhost:3008/personas/obtener');
        const data = await response.json();
        if (Array.isArray(data)) setPersonas(data);
      } catch (error) {
        console.error("Error al obtener las personas:", error);
      }
    };

    fetchPetData();
    fetchPersonas();
  }, [idMascota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const updatePet = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos actualizados al backend
      const response = await fetch(`http://localhost:3008/mascotas/act/${idMascota}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        alert('Mascota actualizada con éxito');
        navigate('/admin/buscar-mascotas'); // Redirige al listado de mascotas
      } else {
        alert('Hubo un error al actualizar la mascota');
      }
    } catch (error) {
      console.error("Error al actualizar la mascota:", error);
      alert('Hubo un error al actualizar la mascota');
    }
  };

  return (
    <>
      <AdminSideBar />
      <div className="register-pet-container">
        <div className="register-pet-header">
          <h1 className='register-pet-title'>Editar Mascota</h1>
        </div>
        <form onSubmit={updatePet} className="register-pet-form">
          <label>Nombre de la mascota:</label>
          <input type="text" name="nombreMascota" value={petData.nombreMascota} onChange={handleChange} required />

          <label>Especie:</label>
          <select name="idEspecie" value={petData.idEspecie} onChange={handleChange} required>
            <option value="">Selecciona la especie</option>
            <option value="1">Perro</option>
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
            {personas.map((persona) => (
              <option key={persona.idPersona} value={persona.idPersona}>
                {persona.nombre1} {persona.nombre2} {persona.apellido1} {persona.apellido2}
              </option>
            ))}
          </select>

          <button type="submit" className="register-pet-button">Guardar Mascota</button>
        </form>
      </div>
    </>
  );
}

export default RegisterPet;
