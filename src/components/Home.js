import React from 'react';
import vetImage from '../img/vet.png';

function Home() {
  return (
    <div className="home-page">
        <img src={vetImage} alt="Imagen de Bienvenida" className="welcome-img" />
      <h1>Pronto Estará Listo</h1>
      <p>¡Seguimos trabajando para ofrecerte lo mejor para tus mascotas!</p>
    </div>
  );
}

export default Home;