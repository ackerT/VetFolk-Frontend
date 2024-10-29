import React from 'react';
import { Link } from 'react-router-dom';
import vetImageB from '../img/VetBlanco.png';

function Navbar() {
    return (
        <section className='h-wrapper1'>
            <div className='h-container1 flexCenter paddings innerWidth'>
                <a href='/'>
                    <img src={vetImageB} alt='logo' width={60} className='logo' />
                </a>
                <div className='h-menu1 flexCenter'>
                <Link to='/home'  style={{ textDecoration: 'none', color: 'white' }} href='#servs'>
                        Servicios
                    </Link>
                    <Link to='/about-us' style={{ textDecoration: 'none', color: 'white' }}>
                        Sobre Nosotros
                    </Link>
                    <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                        Productos en Tienda Física
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Navbar;

// CSS in JS
const styles = `
    .h-wrapper1 {
        background: linear-gradient(to right, #2c6b6b, #3f8e8e);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        color: white;
    }

    .h-menu1 {
        gap: 2rem;
    }

    .h-menu1 > *:hover {
        cursor: pointer;
    }

    .h-container1 {
        justify-content: space-between;
        padding: 1rem 15rem;
    }
`;

// Insert styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
