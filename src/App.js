import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Products from './components/Products';
import AboutUs from './components/AboutUs';
import FormularioPage from './components/FormularioPage'
import Servicio from './components/Servicio'
import AdminDashboard from "./components/AdminDashboard"; 
import RegisterPet from './components/RegisterPet';

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/admin" element={<AdminDashboard />} />
   <Route path="/mascotas" element={<RegisterPet />} />
   <Route path='/' element={<LandingPage/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path="/home" element={<Home />} />
    <Route path="/products" element={<Products />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/agendar" element={<FormularioPage />} />
    <Route path="/servicio" element={<Servicio />} />
   </Routes>
   </BrowserRouter> 
  );
}

export default App;