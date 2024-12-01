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

 //  Ruth  Que me muestros Roles  que tiene la veterinaria */}
 import { GestionarRolesPage} from './components/servicios/pages/GestionarRolesPage';
 import { ExpedientePage} from './components/servicios/pages/ExpedientePage';
 import { UsuarioDatosPage } from './components/servicios/pages/UsuarioDatosPage';
 import { CitaPage} from './components/servicios/pages/CitaPage';
 import { HistoriaCitaPage} from './components/servicios/pages/HistoriaCitaPage';
 import UpdateRegisterPet from './components/UpdateRegisterPet';

//Gaby   rutas 
import AdminDashboard from "./components/AdminDashboard"; 
import RegisterPet from './components/RegisterPet';

//David rutas
import BuscarMascotas from './components/BuscarMascotas';
import CambioPasswordPage from './components/CambioPassword';


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
        <Route path='/admin/cita' element={< CitaPage/>}></Route>
        <Route path='/admin/historia' element={< HistoriaCitaPage/>}></Route>
        <Route path='/admin/updateregisterpet/:IdMascota' element={< UpdateRegisterPet/>}></Route>      







        {/* Gaby*/}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/mascotas" element={<RegisterPet />} />

        {/* David*/}
        <Route path='/buscar-mascotas' element={<BuscarMascotas/>}></Route>
        <Route path='/cambio-password' element={<CambioPasswordPage/>}></Route>
       
    

    </Routes>
    </BrowserRouter> 
    );  

    
}
export default App;

