import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>Sobre Nosotros</h1>
      <p>En VetFolk, nos dedicamos a brindar atención médica y grooming de calidad para tus mascotas.</p>

      <div className="mission-vision-values">
        <div className="card mission">
          <h2>Misión</h2>
          <p>
            Nuestra misión es ofrecer un cuidado integral, compasivo y de alta calidad para todas las mascotas que llegan a nuestra clínica...
          </p>
        </div>

        <div className="card vision">
          <h2>Visión</h2>
          <p>
            Nuestra visión es ser reconocidos como líderes en el campo de la medicina veterinaria a nivel local y regional...
          </p>
        </div>

        <div className="card values">
          <h2>Valores</h2>
          <p>
            Compromiso con el bienestar animal, respeto y empatía hacia las mascotas y sus dueños...
          </p>
        </div>
      </div>

      <div className="team-section">
        <h2>Conoce a Nuestro Equipo</h2>
        <div className="team">
          <div className="team-member">
            <img src="grooming.jpg" alt="Miembro del equipo 1" />
            <h3>Javi</h3>
            <p>Veterinario especializado en cuidados médicos</p>
          </div>
          <div className="team-member">
            <img src="grooming.jpg" alt="Miembro del equipo 2" />
            <h3>Xiomi</h3>
            <p>Especialista en grooming y cuidado animal</p>
          </div>
          {/* Agregar más miembros del equipo aquí */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
