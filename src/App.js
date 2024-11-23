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



function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<LandingPage/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path="/home" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/agendar" element={<FormularioPage />} />
    <Route path="/servicio" element={<Servicio />} />
    <Route path="/edit-profile" element={<EditProfile />} />
    <Route path='/change-password' element={<ChangePasswordPage/>}></Route>

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
    <Route path="/admin/buscar-expediente/:IdMascota" element={<ExpedientePage />} />
    <Route path='/admin/buscar-expediente' element={< ExpedientePage/>}></Route>
    <Route path="/admin/consulta-medica/:IdMascota/:IdExpediente" element={<ConsultaMedica />} />
    <Route path="/admin/consulta-medica-update/:IdConsulta" element={<ConsultaMedicaUpdate />} />
    <Route path='/admin/cita/:idCita' element={< CitaPage/>}></Route>
    <Route path='/admin/historiacita' element={< HistoriaCitaPage/>}></Route>

   </Routes>
   </BrowserRouter> 
  );
}

export default App;