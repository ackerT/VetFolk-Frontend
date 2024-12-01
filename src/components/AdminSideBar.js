import React, { useEffect, useState } from "react";
import logo from "../img/vet.png";
import {
    FaUsers, FaPaw, FaCalendarAlt, FaBoxOpen, FaStethoscope, FaFileMedical, 
    FaSignOutAlt, FaChevronDown, FaCashRegister, FaHistory, FaPlusCircle 
} from "react-icons/fa";
import { BsSearchHeartFill } from "react-icons/bs";
import { LuFolderSearch } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import "./AdminSideBar.css";

function AdminSideBar() {
    const navigate = useNavigate(); 
    const [isMascotasOpen, setMascotasOpen] = useState(false);
    const [isExpedientesOpen, setExpedientesOpen] = useState(false);
    const [isVentasOpen, setVentasOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken"); 
        sessionStorage.removeItem("authToken"); 
        navigate('/login'); 
    };

    const toggleMascotas = () => {
        setMascotasOpen(!isMascotasOpen);
        setExpedientesOpen(false); // Cierra otros menús
        setVentasOpen(false);
    };

    const toggleExpedientes = () => {
        setExpedientesOpen(!isExpedientesOpen);
        setMascotasOpen(false); // Cierra otros menús
        setVentasOpen(false);
    };

    const toggleVentas = () => {
        setVentasOpen(!isVentasOpen);
        setMascotasOpen(false); // Cierra otros menús
        setExpedientesOpen(false);
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
                    
                    {/* Mascotas Desplegable */}
                    <li>
                        <a onClick={toggleMascotas}>
                            <FaPaw /> Mascotas <FaChevronDown style={{ marginLeft: 'auto', marginRight: '10px', transform: isMascotasOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </a>
                        {isMascotasOpen && (
                            <ul className="submenu">
                                <li><a href="/admin/mascotas"><FaPlusCircle /> Agregar Mascotas</a></li>
                                <li><a href="/admin/buscar-mascotas"><BsSearchHeartFill /> Buscar Mascotas</a></li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <a href="/agenda"><FaCalendarAlt /> Agenda</a>
                    </li>
                    
                    {/* Ventas Desplegable */}
                    <li>
                        <a onClick={toggleVentas}>
                            <FaCashRegister /> Ventas <FaChevronDown style={{ marginLeft: 'auto', marginRight: '10px', transform: isVentasOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </a>
                        {isVentasOpen && (
                            <ul className="submenu">
                                <li><a href="/admin/ventas/registrar"><FaPlusCircle /> Registrar Venta</a></li>
                                <li><a href="/admin/ventas/historial"><FaHistory /> Historial de Ventas</a></li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <a href="/admin/inventario"><FaBoxOpen /> Productos</a>
                    </li>
                    
                    {/* Expedientes Desplegable */}
                    <li>
                        <a onClick={toggleExpedientes}>
                            <FaFileMedical /> Expedientes <FaChevronDown style={{ marginLeft: 'auto', marginRight: '10px', transform: isExpedientesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </a>
                        {isExpedientesOpen && (
                            <ul className="submenu">
                                <li><a href="/admin/expedientes"><FaPlusCircle /> Crear Expediente</a></li>
                                <li><a href="/admin/buscar-expediente"><LuFolderSearch /> Buscar Expediente</a></li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <a href="/services"><FaStethoscope /> Servicios</a>
                    </li>
                </ul>

                <ul className="lastMenu">
                    <li>
                        <a href="/login" onClick={handleLogout}><FaSignOutAlt /> Salir</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AdminSideBar;