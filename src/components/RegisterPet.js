import React, { useState } from 'react';
import "./RegisterPet.css";
import logo from '../img/vet.png';
import AdminSideBar from './AdminSideBar';

function RegisterPet() {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    birthDate: '',
    observations: '',
    ownerId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerPet = (e) => {
    e.preventDefault();
    alert('Mascota registrada con éxito');
    // lógica para enviar datos a la API
  };

  return (
    <><AdminSideBar />
        <div className="register-pet-container">
          <div className="register-pet-header">
            <img src={logo} alt="VetFolk Logo" className="logo" />
            <h1>Registro de Mascotas</h1>
            <p>Completa la información para agregar una nueva mascota al sistema.</p>
          </div>
          <form onSubmit={registerPet} className="register-pet-form">
            <label>Nombre de la mascota:</label>
            <input type="text" name="name" value={petData.name} onChange={handleChange} required />

            <label>Especie:</label>
            <select name="species" value={petData.species} onChange={handleChange} required>
              <option value="">Selecciona la especie</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>

            <label>Fecha de nacimiento:</label>
            <input type="date" name="birthDate" value={petData.birthDate} onChange={handleChange} required />

            <label>Observaciones:</label>
            <textarea name="observations" value={petData.observations} onChange={handleChange} />

            <label>Dueño:</label>
            <select name="ownerId" value={petData.ownerId} onChange={handleChange} required>
              <option value="">Selecciona el dueño</option>
              <option value="1">Ana</option>
              <option value="2">José</option>
            </select>

            <button type="submit" className="register-button">Guardar Mascota</button>
          </form>
        </div></>
  );
}

export default RegisterPet;