import { useNavigate, Link } from 'react-router-dom'; 
import vetImageB from '../img/VetBlanco.png';
import './Home.css'; // Archivo CSS para estilos
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import data from '../slider.json';
import "swiper/css";
import {sliderSettings} from "../common.js";

function Home() {
    const navigate = useNavigate();
    
    const SliderButton = ()=>{
        const swiper = useSwiper();
    return (
        <div className='flexCenter s-button'>
            <button onClick={()=> swiper.slidePrev()}>&lt;</button>
            <button onClick={()=> swiper.slideNext()}>&gt;</button>
        </div>
    );
    };
    
    return (
        <>
            {/* Barra de Navegación */}
            <section className='h-wrapper'>
                <div className='h-container flexCenter paddings innerWidth'>
                    <a href='/'>
                        <img src={vetImageB} alt='logo' width={60} className='logo' />
                    </a>
                    <div className='h-menu flexCenter'>
                        <a href='#serv' style={{ textDecoration: 'none', color: 'white' }}>Servicios</a>
                        <Link to='/about-us' style={{ textDecoration: 'none', color: 'white' }}>
                            Sobre Nosotros
                        </Link>
                        <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                            Productos en Tienda Física
                        </Link>
                    </div>
                </div>
            </section>

            {/* Encabezado */}
            <section className='hero-wrapper'>
                <div className='paddings innerWidth flexCenter hero-container'>
                    <div className='hero-left'>
                <h1>¡Bienvenido a VetFolk!</h1>
                <br></br>
                <p className='descripcion'>Cuidamos de tus mascotas con atención personalizada y profesional.
                <br></br> Ofrecemos servicios
                médicos y grooming para
                     asegurar su bienestar en todo momento. ¡Tu mascota está en buenas manos!</p>
                     <div className='h-button'>
                            <button className='button' onClick={() => navigate('/login')}>
                                Reservar cita
                            </button>
                            <br /> <br /> <br /> <br />
                        </div>
                        </div>

                        <div className='flexCenter hero-right'>
                        <div className='image-container'>
                        <img src="/vet4.png" alt="Vet Image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Servicios */}
            <section className='s-wrapper' id='serv'>
                <div className='paddings innerWidth s-container'>
                    <div className='s-head flexColStart'>
                        <h1>Nuestros Servicios</h1> 
                    </div>

                    <Swiper {...sliderSettings}>
                        <SliderButton/>
                        {
                        data.map((card, i)=> (
                            <SwiperSlide key={i}>
                                <div className='flexColStart s-card'>
                                    <img src={card.image} alt='servicios'/>
                                    <span className='primaryText'>{card.name}</span>
                                    <span className='secondaryText'>{card.detail}</span>
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

        </>
    );
}

export default Home;