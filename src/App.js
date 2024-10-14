import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
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

export default App;
