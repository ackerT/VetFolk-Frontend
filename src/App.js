import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/LandingPage';

// Ruth Añadimos nuestras rutas en el App.js
import {ServicioPage }from './components/servicios/pages/ServicioPage';
import {DetallesPage} from './components/servicios/pages/DetallesPage';
import FormularioPage from './components/servicios/pages/FormularioPage';
import {ProductoPage} from './components/servicios/pages/ProductoPage';
import {HomePage} from './components/servicios/pages/HomePage';
import ChangePasswordPage from './components/ChangePassword';
import BuscarMascotas from './components/BuscarMascotas';
import ExpedientePage from './components/ExpedientePage';
import RegisterPet from './components/RegisterPet';
import ConsultaMedica from './components/ConsultaMedica';
import ConsultaMedicaUpdate from './components/ConsultaMedicaUpdate';
import {CitaPage}  from './components/CitaPage';
import { HistoriaCitaPage } from './components/HistoriaCitaPage';
import EditProfile from './components/EditProfile';
import AdminDashboard from './components/AdminDashboard';
import UserDatingHistory from './components/UserDatingHistory';
import UpdateRegisterPet from './components/UpdateRegisterPet';



function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/landing" element={<Landing />} />

        {/*   Que me muestros servicio  que tiene la veterinaria */}
      <Route path='/servicio' element={<ServicioPage/>}></Route>
      <Route path='/servicio/:id' element={<DetallesPage/>}></Route>
      <Route path='/agendar-cita' element={<FormularioPage/>}></Route>
      <Route path='/producto' element={<ProductoPage/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
      <Route path='/change-password' element={<ChangePasswordPage/>}></Route>
      <Route path='/edit-profile' element={<EditProfile/>}></Route>
      <Route path='/userdatinghistory' element={< UserDatingHistory/>}></Route>
      
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/mascotas" element={<RegisterPet />} />
      <Route path='/admin/buscar-mascotas' element={<BuscarMascotas/>}></Route>
      <Route path="/admin/buscar-expediente/:IdMascota" element={<ExpedientePage />} />
      <Route path='/admin/buscar-expediente' element={< ExpedientePage/>}></Route>
      <Route path="/admin/consulta-medica/:IdMascota/:IdExpediente" element={<ConsultaMedica />} />
      <Route path="/admin/consulta-medica-update/:IdConsulta" element={<ConsultaMedicaUpdate />} />
      <Route path="/admin/mascotas" element={<RegisterPet />} />
      <Route path='/admin/cita' element={< CitaPage/>}></Route>
      <Route path='/admin/historiacita' element={< HistoriaCitaPage/>}></Route>      
      <Route path='/admin/updateregisterpet/:IdMascota' element={< UpdateRegisterPet/>}></Route>  
          

    {/* 
    //Rutas de las url 
  <Route path='/servicio/ConsultasVeterinarias' element={<Servicio/>}></Route>
  <Route path='/servicio/Vacunación' element={<Servicio/>}></Route>
  <Route path='/servicio/Desparasitación' element={<Servicio/>}></Route>
  <Route path='/servicio/Cirugías' element={<Servicio/>}></Route>
  <Route path='/servicio/BañoPeluquería' element={<Servicio/>}></Route>
  <Route path='/servicio/VentaProductos' element={<Servicio/>}></Route>

     */}
    

    </Routes>
    </BrowserRouter> 
    );  

    
}
export default App;

