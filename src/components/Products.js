import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { sliderSettings } from "../common.js";
import "swiper/css";
import './Products.css';
import vetImage from '../img/vet.png';
import Navbar from './Navbar.jsx'


const Products = () => {
    const [categories, setCategories] = useState([]);

    const SliderButton = () => {
        const swiper = useSwiper();
        return (
            <div className='flexCenter s-button2'>
                <button onClick={() => swiper.slidePrev()}>&lt;</button>
                <button onClick={() => swiper.slideNext()}>&gt;</button>
            </div>
        );
    };

    useEffect(() => {
        const fetchCategoriesWithProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/categorias/obtener');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchCategoriesWithProducts();
    }, []);

    return (

        <><Navbar />
        <section className='s-wrapper2'>

            <div className='s-head2 flexColStart'>
                <h1>Productos que puedes encontrar en nuestra tienda física</h1>
            </div>
            <div className='paddings innerWidth s-container2' id='serv'>
                {categories.map((category, index) => (
                    <div key={index}>
                        <div className='s-head2 flexColStart'>
                            <h2>{category.nombre}</h2> {/* Cambia 'category.category' por 'category.nombre' */}
                            <h3>{category.descripcion}</h3> {/* Cambia 'category.description' por 'category.descripcion' */}
                        </div>

                        <Swiper {...sliderSettings}>
                            <SliderButton />

                            {category.productos.map((item, i) => ( // Cambia 'category.items' por 'category.productos'
                                <SwiperSlide key={i}>
                                    <div className='flexColStart s-card2'>
                                        <img src={item.foto_url} alt={item.nombre} /> {/* Cambia 'item.image' por 'item.foto_url' */}
                                        <span className='primaryText'>{item.nombre}</span>
                                        <span className='secondaryText'>{item.descripcion}</span> {/* Cambia 'item.detail' por 'item.descripcion' */}
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
        </section></>
    );
}

export default Products;
