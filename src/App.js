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
import CambioPasswordPage from './components/CambioPassword';
import BuscarMascotas from './components/BuscarMascotas';
import ExpedientePage from './components/ExpedientePage';
import ExpedientesForm from './components/ExpedientesForm';

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
      <Route path='/cambio-password' element={<CambioPasswordPage/>}></Route>
      <Route path='/admin/buscar-mascotas' element={<BuscarMascotas/>}></Route>

      <Route path='/admin/expedientes' element={<ExpedientesForm />} /> 
      <Route path='/admin/buscar-expediente' element={< ExpedientePage/>}></Route>
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

