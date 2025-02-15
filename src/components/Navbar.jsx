import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import vetImageB from '../img/VetBlanco.png';
import UserMenu from './UserMenu';
import Notifications from './Notifications';

function Navbar() {
    const navigate = useNavigate();

    const goToServices = () => {
        navigate('/home'); 

        setTimeout(() => {
            const servicesSection = document.getElementById('servs');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };
    return (
        <section className='h-wrapper1'>
                <div className='h-container1 flexCenter paddings innerWidth'>
                    <a href='/home'>
                        <img src={vetImageB} alt='logo' width={60} className='logo' />
                    </a>
                    <span className='text1'>Centro Veterinario VetFolk</span>
                    <div className='h-menu1 flexCenter'>
                    <a href="#servicios" onClick={goToServices} style={{ textDecoration: 'none', color: 'white' }}>
                        Servicios
                    </a>
                        <Link to='/about-us' style={{ textDecoration: 'none', color: 'white' }}>
                            Sobre Nosotros
                        </Link>
                        <Link to='/userdatinghistory' style={{ textDecoration: 'none', color: 'white' }}>
                            Citas
                        </Link> 
                        <Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>
                            Productos en Tienda Física
                        </Link>
                    </div>
                    <Notifications />
                    <UserMenu />
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

.h-menu1>*:hover {
    cursor: pointer;
}

.h-container1 {
    justify-content: space-between;
    padding: 1rem 15rem;
}

.text1{
    font-family: 'Poppins';
    font-weight: 600;
    text-decoration: none;
    color: white;
}
`;

// Insert styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
