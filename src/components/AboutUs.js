import React from 'react';
import { Link } from 'react-router-dom';
import vetImage from '../img/vet.png';
import vetImageB from '../img/VetBlanco.png';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      {/* Barra de Navegación */}
      <section className='h-wrapper2'>
        <div className='h-container2 flexCenter paddings innerWidth'>
          <a href='/'>
            <img src={vetImageB} alt='logo' width={60} className='logo' />
          </a>
          <div className='h-menu2 flexCenter'>
            <a href='#servs' style={{ textDecoration: 'none', color: 'white' }}>Servicios</a>
            <Link to='/about-us' style={{ textDecoration: 'none', color: 'white' }}>
              Sobre Nosotros
            </Link>
            <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
              Productos en Tienda Física
            </Link>
          </div>
        </div>
      </section>
<br></br><br></br><br></br><br></br><br></br>
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
            {/* Agregar más*/}
          </div>
        </div>
      </div>

                {/*FOOTER*/}
                <section className='f-wrapper1' id='contacto'>
                <div className='paddings innerWidth flexCenter f-container1'>

                    {/*Izquierda*/}
                    <div className='flexColStart f-left'>
                       <img src={vetImage} alt='logo' width={180}></img> 
                    </div>

                    {/*Mitad*/}
                    <div className='flexColStart f-middle'>
                       <span className='f-text1'><i className="fa-solid fa-location-dot f-icon"/> Barrio San Antonio, dos cuadras abajo de la estación de policía. <br/>Las Lajas, Comayagua.</span> <br/>
                       <span className='f-text1'><i class="fa-solid fa-clock f-icon"/> Horario de Atención:</span> <br/> 
                       <span className='f-text1'>   Lunes a Viernes 8:00 am - 5:00 pm</span> <br/>   
                       <span className='f-text1'>   Sábados 9:00 am - 5:00 pm</span>
                    </div>

                    {/*Derecha*/}
                    <div className='flexColStart f-right'>
                       <span className='f-text1'>Contacto:</span> <br/>
                       <span className='f-text1'><i class="fa-solid fa-phone"/> +504 9978-0338</span> <br/>
                       <span className='f-text1'><i class="fa-brands fa-facebook"/> Centro Veterinario VetFolk</span> <br/>
                       <span className='f-text1'><i class="fa-brands fa-instagram"/> vetfolk</span> <br/>
                       <span className='f-text1'><i class="fa-solid fa-envelope"/> cvetfolk@gmail.com</span> <br/>
                    </div>
                </div>
            </section>
            </>
  );
};

export default AboutUs;

