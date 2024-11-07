import React, { useState } from 'react';
import './UserMenu.css';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); 
    setIsOpen(false); 
  };

  const handleChangePassword = () => {
    navigate('/change-password'); 
    setIsOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    sessionStorage.removeItem('authToken');
    
    
    navigate('/'); 

    setIsOpen(false);
  };

  return (
    <div className="user-menu">
      <div className="user-icon" onClick={toggleMenu}>
        <i className="fa-solid fa-circle-user"></i>
      </div>
      {isOpen && (
        <div className="menu-options">
          <button onClick={handleEditProfile}>Editar perfil</button>
          <button onClick={handleChangePassword}>Cambiar contraseña</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
