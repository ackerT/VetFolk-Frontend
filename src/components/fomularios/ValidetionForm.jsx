import React  from 'react';

function create (){
    return (
        //crea foemulario
        <form>
            <input type="text" name="nombre" placeholder="Nombre" required />
            <input type="text" name="apellido" placeholder="Apellido" required />
            <input type="email" name="email" placeholder="Correo electrónico" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <input type="submit" value="Crear cuenta" />
        </form>
    );
}