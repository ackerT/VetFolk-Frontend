import React from "react";
import "./AdminDashboard.css";
import adminImage from "../img/admin-image.jpg";
import AdminSideBar from './AdminSideBar';
function AdminDashboard() {

  return (
    <>
    <AdminSideBar />
      <div className="welcome-section">
        <div className="text-section">
          <h1>¡Bienvenido!</h1>
          <p>Elige un módulo y empieza a administrar VetFolk.</p>
        </div>
        <div className="image-section">
          <img src={adminImage} alt="Administración VetFolk" />
        </div>
      </div></>
  );
}

export default AdminDashboard;