import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vetImage from '../img/vet.png';
import vetImageB from '../img/VetBlanco.png';
import gv from '../img/gv.jpg';
import hero1 from '../img/hero.jpg';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faHeart, faEye, faShieldDog } from '@fortawesome/free-solid-svg-icons';
import "swiper/css";
import { sliderSettings } from "../common.js";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]); // Estado para almacenar los datos de los servicios
    const SliderButton = () => {
        const swiper = useSwiper();

        return (
            <div className='flexCenter s-button'>
                <button onClick={() => swiper.slidePrev()}>&lt;</button>
                <button onClick={() => swiper.slideNext()}>&gt;</button>
            </div>
        );
    };

    const valuesData = [
        {
          icon: <FontAwesomeIcon icon={faHeart} />,
          heading: "Compasión",
          detail:
            "Nos dedicamos a cuidar de cada mascota como si fuera parte de nuestra familia, brindando atención amorosa y respetuosa.",
        },
        {
          icon: <FontAwesomeIcon icon={faEye} />,
          heading: "Transparencia",
          detail:
            "Creemos en la comunicación abierta con nuestros clientes, proporcionando información clara sobre diagnósticos, tratamientos y costos.",
        },
        {
          icon: <FontAwesomeIcon icon={faShieldDog} />,
          heading: "Responsabilidad",
          detail:
            "Asumimos la responsabilidad de proporcionar atención ética y profesional, priorizando siempre el bienestar animal.",
        },
      ];


    // Fetch para obtener los datos del backend
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://18.221.225.5/servicios'); // Cambia la URL por la correcta
                const data = await response.json();
                
                // Verifica si el dato devuelto es un array
                if (Array.isArray(data)) {
                    setServices(data);
                } else {
                    console.error('La respuesta del servidor no es un array:', data);
                    setServices([]); // Asegúrate de que sea un array vacío en caso de error
                }
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
                setServices([]); // Asegúrate de que sea un array vacío en caso de error
            }
        };
    
        fetchServices();
    }, []);// Solo se ejecuta una vez al montar el componente

    return (
        <>
            {/* BARRA DE NAVEGACION */}
            <section className='h-wrapper'>
                <div className='h-container flexCenter paddings innerWidth'>
                    <a href='/'>
                        <img src={vetImageB} alt='logo' width={60} className='logo' />
                    </a> <span className='text1'>Centro Veterinario VetFolk</span>
                    <div className='h-menu flexCenter'>
                        <a href='/' style={{ textDecoration: 'none', color: 'white' }}>Inicio</a>
                        <a href='#serv' style={{ textDecoration: 'none', color: 'white' }}>Servicios</a>
                        <a href='#contacto' style={{ textDecoration: 'none', color: 'white' }}>Contacto</a>
                        <button className='h-landing-boton' onClick={() => navigate('/login')}>
                            ¡Comencemos!
                        </button>
                    </div>
                </div>
            </section>

            {/* ENCABEZADO */}
            <section className='hero-wrapper'>
                <div className='paddings innerWidth flexCenter hero-container'>
                    {/* Izquierda */}
                    <div className='flexColStart hero-left'>
                        <div className='hero-title'>
                            <div className='red-circle' />
                            <h1 className='hero-landing-title'>
                                Tu mascota <br /> en las mejores <br /> manos
                            </h1>
                        </div>

                        <div className='hero-description'>
                            <span className='hero-landing-text'>Servicios veterinarios, estéticos y farmacia para asegurar la felicidad de tu amigo peludo.</span> <br />
                            <span className='hero-landing-text'>En VetFolk, tu mascota recibe el mejor cuidado y atención.</span>
                        </div>
                        <div className='hero-button'>
                            <button className='hero-landing-boton' onClick={() => navigate('/login')}>
                                ¡Iniciar Ahora!
                            </button>
                        </div>
                    </div>

                    {/* Derecha */}
                    <div className='flexCenter hero-right'>
                        <div className='image-container'>
                            <img src={hero1} alt='' />
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICIOS */}
            <section className='s-wrapper'>
                <div className='paddings innerWidth s-container' id='serv'>
                    <div className='s-head flexColStart'>
                        <h1>Nuestros Servicios</h1>
                    </div>
                    <Swiper {...sliderSettings}>
                        <SliderButton />
                        {
                            services.map((service, i) => (
                                <SwiperSlide key={i}>
                                    <div className='flexColStart s-card'>
                                        <img src={service.imagenUrl} alt='servicio' />
                                        <span className='primaryText'>{service.tipoServicio}</span>
                                        <span className='secondaryText'>{service.descripcion}</span>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                    <div className='sc-button'>
                        <button className='c-button' onClick={() => navigate('/login')}>
                            ¡Agendar Cita!
                        </button>
                    </div>
                </div>
            </section>

            {/*VALORES*/}
            <section className='v-wrapper'>
                <div className='paddings innerWidth flexCenter v-container'>

                    {/*Izquierda*/}
                    <div className='v-left'>
                        <div className='v-image-container'>
                            <img src={gv} alt='gato'/>
                        </div>
                    </div>

                    {/*Derecha*/}
                    <div className='flexColStart v-right'>
                        <span className='v-title'>Nuestros Valores</span>
                        <span className='v-text'>Nos guiamos por la compasión y la responsabilidad para ofrecer siempre el mejor cuidado a cada mascota, trabajando con transparencia y dedicación en todo lo que hacemos.</span>
                    
                        <Accordion className='accordion' allowMultipleExpanded={false} preExpanded={[0]}>
                        {valuesData.map((item, a) => {
                            return (
                                <AccordionItem className='accordionItem' key={a} uuid={a}>
                                    <AccordionItemHeading>
                                    <AccordionItemButton className='flexCenter accordionButton'>
                                        <div className='flexCenter icon'>
                                        {item.icon}
                                        </div>
                                         <span className='v-title'>
                                            {item.heading}
                                         </span>
                                        <div className='flexCenter icon'>
                                        <FontAwesomeIcon icon={faArrowDown} size='20px'/>
                                        </div>
                                    </AccordionItemButton> 
                                </AccordionItemHeading>  
                                <AccordionItemPanel>
                                    <p className='v-text'>
                                    {item.detail}
                                    </p>
                                 </AccordionItemPanel>
                                </AccordionItem>
                                )
                            })
                            }
                        </Accordion>

                    </div>
                </div>       
            </section>
           
           {/*COMIENZA AQUI*/}
            <section className='g-wrapper'>
                <div className='paddings innerWidthg-container'>
                   <div className='flexColCenter inner-container'>
                    <span className='g-title'>¡Comienza a cuidar de tu mascota con VetFolk!</span> <br/>
                    <span className='g-text'>Agenda una cita con nuestros profesionales expertos y descubre todos los servicios que ofrecemos para garantizar la salud y bienestar de tu compañero peludo. 
                        <br/>
                        ¡Estamos aquí para ayudarte!</span> <br/> <br/>
                        <button className='g-landing-boton' onClick={() => navigate('/login')}>
                                ¡Comienza Aquí!
                        </button>
                    </div> 
                </div>
            </section>

            {/*FOOTER*/}
            <section className='f-wrapper' id='contacto'>
                <div className='paddings innerWidth flexCenter f-container'>

                    {/*Izquierda*/}
                    <div className='flexColStart f-left'>
                       <img src={vetImage} alt='logo' width={180}></img> 
                    </div>

                    {/*Mitad*/}
                    <div className='flexColStart f-middle'>
                       <span className='f-text'><i className="fa-solid fa-location-dot f-icon"/> Barrio San Antonio, dos cuadras abajo de la estación de policía. <br/>Las Lajas, Comayagua.</span> <br/>
                       <span className='f-text'><i class="fa-solid fa-clock f-icon"/> Horario de Atención:</span> <br/> 
                       <span className='f-text'>   Lunes a Viernes 8:00 am - 5:00 pm</span> <br/>   
                       <span className='f-text'>   Sábados 9:00 am - 5:00 pm</span>
                    </div>

                    {/*Derecha*/}
                    <div className='flexColStart f-right'>
                       <span className='f-text'>Contacto:</span> <br/>
                       <span className='f-text'><i class="fa-solid fa-phone"/> +504 9978-0338</span> <br/>
                       <span className='f-text'><i class="fa-solid fa-envelope"/> cvetfolk@gmail.com</span> <br/>
                       <span className='f-text'><i class="fa-brands fa-facebook"/> Centro Veterinario VetFolk</span> <br/>
                       <span className='f-text'><i class="fa-brands fa-instagram"/> vetfolk</span> <br/>
                    </div>
                </div>
            </section>
            </>
    );
}
export default LandingPage;
