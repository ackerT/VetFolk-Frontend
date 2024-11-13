import React, { useEffect } from "react";
import logo from "../img/vet.png";
import { FaUsers, FaPaw, FaCalendarAlt, FaBoxOpen, FaStethoscope, FaFileMedical, FaSignOutAlt } from "react-icons/fa";
import { BsSearchHeartFill } from "react-icons/bs";
import { LuFolderSearch } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import "./AdminSideBar.css";

function AdminSideBar(){
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem("authToken"); 
        sessionStorage.removeItem("authToken"); 
        
        navigate('/login'); 
    };

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
    <div className="side-menu">
        <div className="sidebar">
            <a href="/admin" className="logo-link">
                <img src={logo} alt="VetFolk Logo" />
            </a>

            <ul id="mainMenu">
                <li>
                    <a href="/admin/usuario-datos"><FaUsers /> Clientes y Personal</a>
                </li>
                <li>
                    <a href="/admin/mascotas"><FaPaw /> Mascotas</a>
                </li>
                <li>
                    <a href="/admin/buscar-mascotas"><BsSearchHeartFill /> Buscar Mascotas</a>
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
                    <a href="/admin/expedientes"><FaFileMedical /> Expedientes</a>
                </li>
                <li>
                    <a href="/admin/buscar-expediente"><LuFolderSearch /> Buscar Expedientes</a>
                </li>
            </ul>

            <ul className="lastMenu">
              { /* <li>
                    <a href="#"><FaUserCircle /> Mi Cuenta</a>
                </li>*/}
                <li>
                    <a href="/login" onClick={handleLogout}><FaSignOutAlt /> Salir</a>
                </li>
            </ul>
        </div>
    </div>
    );
}
export default AdminSideBar;