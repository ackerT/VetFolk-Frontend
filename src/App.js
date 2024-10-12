import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<LandingPage/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path="/home" element={<Home />} />
   </Routes>
   </BrowserRouter> 
  );
}

export default App;
