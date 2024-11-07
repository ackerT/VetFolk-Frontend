import React, { useEffect } from "react";
import { MdFindInPage } from "react-icons/md";
import { FaUsers,
     FaPaw,
     FaCalendarAlt, 
     FaBoxOpen, 
     FaStethoscope,
      FaFileMedical,
      FaUserCircle, 
      FaSignOutAlt,
      FaLock,
      FaWpforms } from "react-icons/fa";
import "./AdminDashboard.css";

//import logo from "../img/vet.png";
//import adminImage from "../img/admin-image.jpg";

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
        <img src={'logo'} alt="VetFolk Logo" />  
    </a>
  

  <ul id="mainMenu">
    <li>
    {/*Roles cliente , la imagen se agrega cualquere */} 
    <a href="/admin/gestionar-roles"><FaUsers /> Gestionar Clientes  </a></li>
    {/*Roles cliente , asignar roles  */} 
    <li><a href="/admin/usuario-datos">< FaWpforms/> Gegistro Roles</a></li>
    <li><a href="/mascotas"><FaPaw /> Mascotas</a></li>
    {/*Buscar Mascotas  */} 
    <li><a href="/buscar-mascotas"><MdFindInPage/>Busqueda  de Mascota</a></li>
    <li><a href="/agenda"><FaCalendarAlt /> Agenda</a></li>
    <li><a href="/products"><FaBoxOpen /> Productos</a></li>
    <li><a href="/services"><FaStethoscope /> Servicios</a></li>
     {/*Expedinetes */} 
    <li><a href="/admin/expediente"><FaFileMedical />Expediente</a></li>
  </ul>
    
  <ul className="lastMenu">
        <li><a href="# "><FaUserCircle /> Mi Cuenta</a></li>
        {/*Cambio de contraseña */} 
      <li><a href="/cambio-password"><FaLock/>Cambio contraseña </a></li>
        <li><a href="# "><FaSignOutAlt /> Salir</a></li>
    </ul>
</div>

      <div className="content">
        <div className="welcome-section">
          <div className="text-section">
            <h1  className="color: '#00897b', 
            fontFamily: 'Poppins, sans-serif', fontSize: '13px'">
                ¡Bienvenido!</h1>
            <p className="color: '#00897b',
             fontFamily: 'Poppins, sans-serif', 
             fontSize: '13px'">Elige un módulo y empieza a administrar VetFolk.</p>
          </div>
          <div className="image-section">
            <img src={'adminImage'} alt="Administración VetFolk" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;