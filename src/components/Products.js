import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom'; 
import data from '../products.json';
import vetImage from '../img/vet.png';
import vetImageB from '../img/VetBlanco.png';
import { sliderSettings } from "../common.js";
import "swiper/css";
import './Products.css';

const Products = () => {
    const navigate = useNavigate();

    // Componente interno para los botones de navegación del Swiper
    const SliderButton = () => {
        const swiper = useSwiper();
        return (
            <div className='flexCenter s-button2'>
                <button onClick={() => swiper.slidePrev()}>&lt;</button>
                <button onClick={() => swiper.slideNext()}>&gt;</button>
            </div>
        );
    };

    return (
        <section className='s-wrapper2'>
            {/* Barra de navegación */}
            <section className='h-wrapper3'>
                <div className='h-container3 flexCenter paddings innerWidth'>
                    <Link to='/'>
                        <img src={vetImageB} alt='logo' width={60} className='logo' />
                    </Link>
                    <div className='h-menu3 flexCenter'>
                        <Link to="/home#servs" style={{ textDecoration: 'none', color: 'white' }}>Servicios</Link>
                        <Link to='/about-us' style={{ textDecoration: 'none', color: 'white' }}>Sobre Nosotros</Link>
                        <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>Productos en Tienda Física</Link>
                    </div>
                </div>
            </section>

            {/* Encabezado de productos */}
            <div className='s-head2 flexColStart'>
            <br></br>
                <h1>Productos que puedes encontrar en nuestra tienda física</h1>
            </div>

            {/* Contenido de productos */}
            <div className='paddings innerWidth s-container2' id='servs'>
                {data.map((category, index) => (
                    <div key={index}>
                        <div className='s-head2 flexColStart'>
                            <h2>{category.category}</h2>
                            <h3>{category.description}</h3>
                        </div>

                        <Swiper {...sliderSettings}>
                            <SliderButton />
                            {category.items.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className='flexColStart s-card2'>
                                        <img src={item.image} alt={item.name} />
                                        <span className='primaryText'>{item.name}</span>
                                        <span className='secondaryText'>{item.detail}</span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <section className='f-wrapper2' id='contacto'>
                <div className='paddings innerWidth flexCenter f-container2'>
                    {/* Izquierda */}
                    <div className='flexColStart f-left'>
                        <img src={vetImage} alt='logo' width={180} />
                    </div>

                    {/* Mitad */}
                    <div className='flexColStart f-middle'>
                        <span className='f-text2'><i className="fa-solid fa-location-dot f-icon" /> Barrio San Antonio, dos cuadras abajo de la estación de policía. <br />Las Lajas, Comayagua.</span> <br />
                        <span className='f-text2'><i className="fa-solid fa-clock f-icon" /> Horario de Atención:</span> <br /> 
                        <span className='f-text2'>   Lunes a Viernes 8:00 am - 5:00 pm</span> <br />   
                        <span className='f-text2'>   Sábados 9:00 am - 5:00 pm</span>
                    </div>

                    {/* Derecha */}
                    <div className='flexColStart f-right'>
                        <span className='f-text2'>Contacto:</span> <br />
                        <span className='f-text2'><i className="fa-solid fa-phone" /> +504 9978-0338</span> <br />
                        <span className='f-text2'><i className="fa-brands fa-facebook" /> Centro Veterinario VetFolk</span> <br />
                        <span className='f-text2'><i className="fa-brands fa-instagram" /> vetfolk</span> <br />
                        <span className='f-text2'><i className="fa-solid fa-envelope" /> cvetfolk@gmail.com</span> <br />
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Products;