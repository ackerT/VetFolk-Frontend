import React, { useEffect } from "react";
import { FaUsers, FaPaw, FaCalendarAlt, FaBoxOpen, FaStethoscope, FaFileMedical, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./AdminDashboard.css";
import logo from "../img/vet.png";
import adminImage from "../img/admin-image.jpg";

function AdminDashboard() {
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

  return (
    <div className="admin-dashboard">
<div className="sidebar">
  <a href="/admin" className="logo-link">
    <img src={logo} alt="VetFolk Logo" />
  </a>

  <ul id="mainMenu">
    <li>
      <a href="/clientes"><FaUsers /> Clientes y Personal</a>
    </li>
    <li>
    <a href="/mascotas"><FaPaw /> Mascotas</a>
    </li>
    <li>
      <a href="/agenda"><FaCalendarAlt /> Agenda</a>
    </li>
    <li>
      <a href="/products"><FaBoxOpen /> Productos</a>
    </li>
    <li>
      <a href="/services"><FaStethoscope /> Servicios</a>
    </li>
    <li>
      <a href="/expedientes"><FaFileMedical /> Expedientes</a>
    </li>
  </ul>

  <ul className="lastMenu">
    <li>
      <a href="#"><FaUserCircle /> Mi Cuenta</a>
    </li>
    <li>
      <a href="#"><FaSignOutAlt /> Salir</a>
    </li>
  </ul>
</div>

      <div className="content">
        <div className="welcome-section">
          <div className="text-section">
            <h1>¡Bienvenido!</h1>
            <p>Elige un módulo y empieza a administrar VetFolk.</p>
          </div>
          <div className="image-section">
            <img src={adminImage} alt="Administración VetFolk" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;