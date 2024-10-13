import { useNavigate } from 'react-router-dom'; 
import vetImageB from '../img/VetBlanco.png';
import hero1 from '../img/hero.jpg';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import data from '../slider.json';
import "swiper/css";
import {sliderSettings} from "../common.js";
import "./LandingPage.css";



function LandingPage(){
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

    return(
        <><section className='h-wrapper'>
            <div className='h-container flexCenter paddings innerWidth'>
                <a href='/'>
                    <img src={vetImageB} alt='logo' width={60} className='logo' />
                </a>
                <div className='h-menu flexCenter'>
                    <a href='/' style={{ textDecoration: 'none', color: 'white' }}>Inicio</a>
                    <a href='#serv' style={{ textDecoration: 'none', color: 'white' }}>Servicios</a>
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
                 <div className='paddings innerWidth s-container'  id='serv'>
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
export default LandingPage;