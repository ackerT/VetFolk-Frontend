import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import data from '../slider.json'; // Puedes usar datos de otro archivo si lo prefieres
import "swiper/css";
import './AboutUs.css'; // Asegúrate de crear y utilizar este archivo CSS

const AboutUs = () => {
    return (
        <>
            <section className='aboutus-wrapper'>
                <div className='aboutus-container paddings innerWidth'>
                    <div className='aboutus-header flexColStart'>
                        <h1>Sobre Nosotros</h1>
                    </div>

                    {/* Carrusel de Misión, Visión, y Valores */}
                    <div className='aboutus-carousel'>
                        <Swiper spaceBetween={30} slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
                            {data.map((card, i) => (
                                <SwiperSlide key={i}>
                                    <div className='flexColStart about-slide'>
                                        <h2>{card.title}</h2>
                                        <p>{card.description}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Sección para Conocer al Equipo */}
                    <div className='aboutus-team'>
                        <h2>Conoce a Nuestro Equipo</h2>
                        <div className='team-container'>
                            <div className='team-member'>
                                <img src='/equipo1.jpg' alt='Dr. Juan Pérez' className='team-image' />
                                <h3>Dr. Juan Pérez</h3>
                                <p>Veterinario Especialista en Animales Exóticos</p>
                            </div>

                            <div className='team-member'>
                                <img src='/equipo2.jpg' alt='Dra. Ana Martínez' className='team-image' />
                                <h3>Dra. Ana Martínez</h3>
                                <p>Especialista en Medicina Felina y Canina</p>
                            </div>

                            <div className='team-member'>
                                <img src='/equipo3.jpg' alt='Luis Gómez' className='team-image' />
                                <h3>Luis Gómez</h3>
                                <p>Asistente Veterinario y Técnico en Grooming</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;