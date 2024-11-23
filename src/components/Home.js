import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css'; 
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import "swiper/css";
import { sliderSettings } from "../common.js"; 
import Navbar from './Navbar.jsx';

function Home() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://18.221.225.5/servicios');
                if (!response.ok) {
                    throw new Error('Error al obtener los servicios');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchServices();
    }, []);

    const SliderButton = () => {
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
            <div className='home-page'>
            {/* Barra de Navegación */}
                    <Navbar/>

            {/* Encabezado */}
            <section className='hero-wrapper1'>
                <div className='paddings innerWidth flexCenter hero-container1'>
                    <div className='hero-left1'>
                        <h1 className='title'>¡Bienvenido a VetFolk!</h1>
                        <br />
                        <p className='descripcion1'>Cuidamos de tus mascotas con atención personalizada y profesional.
                            <br /> Ofrecemos servicios médicos y grooming para asegurar su bienestar
                            <br /> en todo momento. ¡Tu mascota está en buenas manos!</p>
                        <div className='h-button1'>
                            <button className='button' onClick={() => navigate('/agendar')}>
                                Reservar cita
                            </button>
                        </div>
                    </div>

                    <div className='flexCenter hero-right1'>
                        <div className='image-container1'>
                            <img src="/vet4.png" alt="pets" />
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
                            services.map((card, i) => (
                                <SwiperSlide key={i}>
                                    <div className='flexColStart s-card1'>
                                        <img src={card.imagenUrl} alt='servicios' />
                                        <span className='primaryText1'>{card.tipoServicio}</span>
                                        <span className='secondaryText1'>{card.descripcion}</span>
                                        <button className='detail-btn' onClick={() => openModal(i)}>
                                            Más detalles
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <br />
                    <div className='sc-button1'>
                        <button className='c-button1' onClick={() => navigate('/agendar')}>
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
                        <h2>{services[selectedService].tipoServicio}</h2>
                        <p>{services[selectedService].detalles}</p>
                        <button className='close-btn' onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            )}
            </div>
        </>
    );
}

export default Home;
