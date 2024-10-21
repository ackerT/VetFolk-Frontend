import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
<<<<<<< HEAD
import Landing from './components/Landing';
// Añadimos nuestras rutas en el App.js
import {ServicioPage }from './components/servicios/pages/ServicioPage';
import {DetallesPage} from './components/servicios/pages/DetallesPage';
import FormularioPage from './components/servicios/pages/FormularioPage';
import {ProductoPage} from './components/servicios/pages/ProductoPage';
import {HomePage} from './components/servicios/pages/HomePage';



function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/landing" element={<Landing />} />
=======
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Equipo from './components/Equipo';
import Contactanos from './components/Contactanos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/contactanos" element={<Contactanos />} />
      </Routes>
    </BrowserRouter>
  );
}
>>>>>>> a47dfd9af6b10cb8cf9a72ca3c9b6b415a0336f7

        {/*   Que me muestros servicio  que tiene la veterinaria */}
      <Route path='/servicio' element={<ServicioPage/>}></Route>
      <Route path='/servicio/:id' element={<DetallesPage/>}></Route>
      <Route path='/agendar-cita' element={<FormularioPage/>}></Route>
      <Route path='/producto' element={<ProductoPage/>}></Route>
      <Route path='/home' element={<HomePage/>}></Route>
       
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

