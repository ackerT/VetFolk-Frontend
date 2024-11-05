import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/LandingPage';
// Añadimos nuestras rutas en el App.js
import {ServicioPage }from './components/servicios/pages/ServicioPage';
import {DetallesPage} from './components/servicios/pages/DetallesPage';
import FormularioPage from './components/servicios/pages/FormularioPage';
import {ProductoPage} from './components/servicios/pages/ProductoPage';
import {HomePage} from './components/servicios/pages/HomePage';

 //   Que me muestros Roles  que tiene la veterinaria */}
 import { GestionarRolesPage} from './components/servicios/pages/GestionarRolesPage';
 import { ExpedientePage} from './components/servicios/pages/ExpedientePage';
 import { UsuarioDatosPage } from './components/servicios/pages/UsuarioDatosPage';






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

         {/*   Que me muestros Roles  que tiene la veterinaria */}
    <Route path='/admin/gestionar-roles' element={< GestionarRolesPage/>}></Route>
    <Route path='/admin/expediente' element={< ExpedientePage/>}></Route>
    <Route path='/admin/usuario-datos' element={< UsuarioDatosPage/>}></Route>

      
    
    

    </Routes>
    </BrowserRouter> 
    );  

    
}
export default App;

