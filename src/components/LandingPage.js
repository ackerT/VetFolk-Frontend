import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import vetImage from '../img/vet.png';
import vetImageB from '../img/VetBlanco.png';
import hero1 from '../img/hero.jpg';
import consultaVet from '../img/consulta.jpg';
import consultaVet2 from '../img/consulta2.jpg';
import grooming from '../img/grooming.jpg';
import cirugias from '../img/cirugias.jpg';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import "swiper/css";
import "./LandingPage.css";



function LandingPage(){
    const navigate = useNavigate();

    return(
        <><section className='h-wrapper'>
            <div className='h-container flexCenter paddings innerWidth'>
                <a href='/'>
                    <img src={vetImageB} alt='logo' width={60} className='logo' />
                </a>
                <div className='h-menu flexCenter'>
                    <a>Inicio</a>
                    <a>Servicios</a>
                    <a>Contacto</a>
                    <button className='button' onClick={() => navigate('/login')}>
                        Comencemos
                    </button>
                </div>
            </div>
        </section>
        <section className='hero-wrapper'>
                <div className='paddings innerWidth flexCenter hero-container'>

                    {/*Izquierda*/}
                    <div className='flexColStart hero-left'>
                        <div className='hero-title'>
                            <div className='red-circle' />
                            <h1>
                                Tu mascota <br /> en las mejores <br /> manos
                            </h1>
                        </div>

                        <div className='hero-description'>
                            <span>Servicios veterinarios, estéticos y farmacia para asegurar la felicidad de tu amigo peludo.</span> <br />
                            <span>En VetFolk, tu mascota recibe el mejor cuidado y atención.</span>
                        </div>
                        <div className='h-button'>
                            <button className='button' onClick={() => navigate('/login')}>
                                Iniciar Ahora
                            </button>
                            <br /> <br /> <br /> <br />
                        </div>
                    </div>

                    {/*Derecha*/}
                    <div className='flexCenter hero-right'>
                        <div className='image-container'>
                            <img src={hero1} alt=''></img>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className='s-wrapper'>
                <div className='paddings innerWidth s-container'>
                    <div className='s-head flexColStart'>
                       <h1>Nuestros Servicios</h1> 
                    </div>
                </div>
            </section>

            </>
    );
}
export default LandingPage;