import React, { useState } from 'react';
import './UserMenu.css'; // Asegúrate de crear el archivo CSS también
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

  return (
    <div className="user-menu">
      <div className="user-icon" onClick={toggleMenu}>
      <i class="fa-solid fa-circle-user"></i>
      </div>
      {isOpen && (
        <div className="menu-options">
          <button onClick={handleEditProfile}>Editar perfil</button>
          <button onClick={() => alert('Cambiar contraseña')}>Cambiar contraseña</button>
          <button onClick={() => alert('Cerrar sesión')}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
