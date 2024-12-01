import React, { useState, useEffect } from 'react';
import { FaUsers, FaPaw, FaCalendarAlt, FaBoxOpen, FaStethoscope, FaFileMedical, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import './RegisterPet.css';
import logo from '../img/vet.png';

function RegisterPet() {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    birthDate: '',
    observations: '',
    ownerId: '',
  });

  useEffect(() => {
    const mainMenuLi = document
      .getElementById("mainMenu")
      .querySelectorAll("li");

    function changeActive() {
      mainMenuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive));

    return () => {
      mainMenuLi.forEach((n) => n.removeEventListener("click", changeActive));
    };
  }, []);

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
    <div className="admin-dashboard">
      <div className="sidebar">
        <a href="/admin" className="logo-link">
          <img src={logo} alt="VetFolk Logo" />
        </a>

        <ul id="mainMenu">
          <li><a href="/clientes"><FaUsers /> Clientes y Personal</a></li>
          <li><a href="/mascotas"><FaPaw /> Mascotas</a></li>
          <li><a href="/agenda"><FaCalendarAlt /> Agenda</a></li>
          <li><a href="/products"><FaBoxOpen /> Productos</a></li>
          <li><a href="/services"><FaStethoscope /> Servicios</a></li>
          <li><a href="/expedientes"><FaFileMedical /> Expedientes</a></li>
        </ul>

        <ul className="lastMenu">
          <li><a href="#"><FaUserCircle /> Mi Cuenta</a></li>
          <li><a href="#"><FaSignOutAlt /> Salir</a></li>
        </ul>
      </div>

      <div className="content">
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
        </div>
      </div>
    </div>
  );
}

export default RegisterPet;