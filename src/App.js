import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import FormularioPage from './components/FormularioPage'
import Servicio from './components/Servicio'
import EditProfile from './components/EditProfile';
import ExpedientesForm from './components/ExpedientesForm';
import ChangePasswordPage from './components/ChangePassword';
import AdminDashboard from './components/AdminDashboard';
import RegisterPet from './components/RegisterPet';
import GestionarRolesPage from './components/GestionarRolesPage';
import ExpedientePage from './components/ExpedientePage';
import UsuarioDatosPage from './components/UsuarioDatosPage';
import BuscarMascotas from './components/BuscarMascotas';
import SalesModule from './components/SalesModule';
import SalesHistory from './components/SalesHistory';
import Inventory from './components/Inventory';
import ConsultaMedica from './components/ConsultaMedica';
import ConsultaMedicaUpdate from './components/ConsultaMedicaUpdate';
import Login from './components/Login';
import CitaPage from './components/CitaPage';
import HistoriaCitaPage from './components/HistoriaCitaPage';
import Notifications from './components/Notifications';
import UserDatingHistory from './components/UserDatingHistory';
import UpdateRegisterPet from './components/UpdateRegisterPet';
import ActualizarExpediente from './components/UpdateExp';
import ServicesAdmin from './components/ServicesAdmin'
import ProtectedRoute from './components/ProtectedRoute'; 


function App() {
  const token = sessionStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).rol : null; // Decodificar el rol del token
  const isAuth = !!token; // Comprobar si hay un token

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

       {/* Rutas protegidas para clientes */}
       <Route
        element={<ProtectedRoute isAuth={isAuth} allowedRoles={['Cliente']} userRole={userRole} />}
        >
          
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/agendar" element={<FormularioPage />} />
          <Route path="/servicio" element={<Servicio />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path='/change-password' element={<ChangePasswordPage/>}></Route>
          <Route path='/notications' element={Notifications}></Route>
          <Route path='/userdatinghistory' element={< UserDatingHistory/>}></Route>
        </Route>

        {/* Rutas protegidas para administradores */}
        <Route
          element={<ProtectedRoute isAuth={isAuth} allowedRoles={['Administrador']} userRole={userRole} />}
        >

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/mascotas" element={<RegisterPet />} />
          <Route path='/admin/gestionar-roles' element={< GestionarRolesPage/>}></Route>
          <Route path='/admin/crear-expediente' element={<ExpedientesForm />} />
          <Route path='/admin/buscar-expediente' element={< ExpedientePage/>}></Route>
          <Route path='/admin/usuario-datos' element={< UsuarioDatosPage/>}></Route>
          <Route path='/admin/buscar-mascotas' element={< BuscarMascotas/>}></Route>
          <Route path='/admin/ventas' element={< SalesModule/>}></Route>
          <Route path='/admin/ventas-historial' element={< SalesHistory/>}></Route>
          <Route path='/admin/inventario' element={< Inventory/>}></Route>
          <Route path='/admin/buscar-mascotas' element={<BuscarMascotas/>}></Route>
          <Route path="/admin/buscar-expediente/:IdExpediente" element={<ExpedientePage />} />
          <Route path='/admin/buscar-expediente' element={< ExpedientePage/>}></Route>
          <Route path="/admin/consulta-medica/:IdExpediente" element={<ConsultaMedica />} />
          <Route path="/admin/consulta-medica-update/:IdConsulta" element={<ConsultaMedicaUpdate />} />
          <Route path='/admin/cita/:idCita' element={< CitaPage/>}></Route>
          <Route path='/admin/historiacita' element={< HistoriaCitaPage/>}></Route>
          <Route path='/admin/updateregisterpet/:idMascota' element={< UpdateRegisterPet/>}></Route> 
          <Route path='/admin/uptexp/:idExpediente' element={< ActualizarExpediente/>}></Route> 
          <Route path='/admin/services' element={< ServicesAdmin/>}></Route> 
        </Route>
   </Routes>
   </BrowserRouter> 
  );
}

export default App;