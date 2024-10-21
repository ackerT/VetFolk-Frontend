import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import vetImageB from '../img/VetBlanco.png';
import './Home.css'; 
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import data from '../slider.json';
import "swiper/css";
import {sliderSettings} from "../common.js";

function Home() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const SliderButton = ()=> {
        const swiper = useSwiper();
        return (
            <div className='flexCenter s-button1'>
                <button onClick={() => swiper.slidePrev()}>&lt;</button>
                <button onClick={() => swiper.slideNext()}>&gt;</button>
            </div>
        );
    };

    const openModal = (index) => {
        setSelectedService(index);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    const handleBackdropClick = (e) => {
        if (e.target.className === 'modal-backdrop') {
            closeModal();
        }
    };

    return (
        <>
            {/* Barra de Navegación */}
            <section className='h-wrapper1'>
                <div className='h-container1 flexCenter paddings innerWidth'>
                    <a href='/'>
                        <img src={vetImageB} alt='logo' width={60} className='logo' />
                    </a>
                    <div className='h-menu1 flexCenter'>
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

            {/* Encabezado */}
            <section className='hero-wrapper1'>
                <div className='paddings innerWidth flexCenter hero-container1'>
                    <div className='hero-left1'>
                        <h1 className='title'>¡Bienvenido a VetFolk!</h1>
                        <br />
                        <p className='descripcion1'>Cuidamos de tus mascotas con atención personalizada y profesional.
                            <br /> Ofrecemos servicios
                            médicos y grooming para asegurar su bienestar en todo momento.
                            <br /> ¡Tu mascota está en buenas manos!</p>
                        <div className='h-button1'>
                            <button className='button' onClick={() => navigate('/login')}>
                                Reservar cita
                            </button>
                        </div>
                    </div>

                    <div className='flexCenter hero-right1'>
                        <div className='image-container1'>
                            <img src="/vet4.png" alt="Vet Image" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Servicios */}
            <section className='s-wrapper1' id='servs'>
                <div className='paddings innerWidth s-container1'>
                    <div className='s-head1 flexColStart'>
                        <h1>Nuestros Servicios</h1>
                    </div>

                    <Swiper {...sliderSettings}>
                        <SliderButton />
                        {
                            data.map((card, i) => (
                                <SwiperSlide key={i}>
                                    <div className='flexColStart s-card1'>
                                        <img src={card.image} alt='servicios' />
                                        <span className='primaryText1'>{card.name}</span>
                                        <span className='secondaryText1'>{card.detail}</span>
                                        <button className='detail-btn' onClick={() => openModal(i)}>
                                            Más detalles
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
<br/>
                    <div className='sc-button1'>
                        <button className='c-button1' onClick={() => navigate('/login')}>
                            ¡Agendar Cita!
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal */}
            {showModal && selectedService !== null && (
                <div className="modal-backdrop" onClick={handleBackdropClick}>
                    <div className="modal-content">
                        <button className="modal-close" onClick={closeModal}>X</button>
                        <h2>{data[selectedService].name}</h2>
                        <p>{data[selectedService].fullDetail}</p>
                        <button className='close-btn' onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;