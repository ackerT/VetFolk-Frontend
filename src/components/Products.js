import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useNavigate } from 'react-router-dom'; 
import data from '../products.json';
import { sliderSettings } from "../common.js";
import "swiper/css";
import './Products.css';

const Products = () => {
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
        <section className='s-wrapper'>7                    
        <div className='s-head flexColStart'>
        <h1>Productos que puedes encontrar en nuestra tienda física</h1> 
        </div>

            <div className='paddings innerWidth s-container' id='serv'>
                {
                    data.map((category, index) => (
                        <div key={index}>
                            <div className='s-head flexColStart'>
                                <h2>{category.category}</h2>
                                <h3>{category.description}</h3> {/* Mostrar descripción de la categoría */}
                            </div>

                            <Swiper {...sliderSettings}>
                            <SliderButton/>

                                {
                                    category.items.map((item, i) => (
                                        <SwiperSlide key={i}>
                                            <div className='flexColStart s-card'>
                                                <img src={item.image} alt={item.name} />
                                                <span className='primaryText'>{item.name}</span>
                                                <span className='secondaryText'>{item.detail}</span>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default Products;