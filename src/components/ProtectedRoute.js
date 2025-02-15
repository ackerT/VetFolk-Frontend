import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ requiredRole }) => {
  // Obtener el token y decodificarlo
  const token = sessionStorage.getItem('token');
  const userRole = token ? jwtDecode(token).rol : null;
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    // Redirige al login si no está autenticado
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirige si no tiene el rol adecuado
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
