import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/Landing';
// Añadimos nuestras rutas en el App.js
import {ServicioPage }from './components/servicios/pages/ServicioPage';
import {DetallesPage} from './components/servicios/pages/DetallesPage';
import FormularioPage from './components/servicios/pages/FormularioPage';


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

