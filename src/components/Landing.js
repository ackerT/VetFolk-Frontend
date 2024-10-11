import React from 'react';
import vetImage from './vet.png';

function Landing() {
  return (
    <div className="landing-page">
        <img src={vetImage} alt="Imagen de Bienvenida" className="welcome-img" />
      <h1>Pronto Estará Listo</h1>
      <p>¡Seguimos trabajando para ofrecerte lo mejor para tus mascotas!</p>
    </div>
  );
}

export default Landing;