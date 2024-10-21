import React from 'react';
import { Link } from 'react-router-dom';
import { serviData } from '../data/ServiData'; // Verifica la ruta si funciona aun este en rojo

export const HomePage = () => {
    // Establecer el color de fondo del body
    React.useEffect(() => {
        document.body.style.backgroundColor = '#ffffff';
        return () => {
            document.body.style.backgroundColor = ''; // Restablecer al desmontar
        };
    }, []);

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '0', // Eliminar márgenes para que el fondo tome todo el ancho
            padding: '10px',
            minHeight: '100vh', // Para que el fondo ocupe toda la altura
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            padding: '10px 20px',
            backgroundColor: '#ffffff', // Color más oscuro para la barra de navegación
            color: '#00897b',
            position: 'absolute', // Mantener la barra en la parte superior
            top: '0',
            left: '0',
            fontSize: '30px', // Aumentar el tamaño de la letra
        },
        navLink: {
            textDecoration: 'none',
            color: '#ffffff',
            margin: '0 10px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
        },
        cardContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            maxWidth: '100%',
            marginTop: '80px', // Para dar espacio bajo la barra de navegación
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '500px',
            width: '260px',
            backgroundColor: '#ffffff', // Color de la tarjeta
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
            transition: 'transform 0.3s ease', // Transición para el efecto hover
            color: '#00897b', // Color de texto en la tarjeta
        },
        imageContainer: {
            width: '100%',
            height: '250px',
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        cardTitle: {
            padding: '10px',
            backgroundColor: 'transparent', // Hacer el fondo del título transparente
            fontSize: '28px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            color: '#00897b', // Cambiar el color del texto del título a blanco
            marginBottom: '0px',
        },
        h2: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontSize: '50px',
            color:  '#00897b',
            marginBottom: '30px',
        },
        button: {
            width: '100%',
            padding: '25px 0',
            backgroundColor: '#00897b',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '15px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            margin: '5px 0',
        },
        footer: {
            display: 'flex',
            justifyContent: 'center', // Centrar el contenido del footer
            alignItems: 'center',
            width: '100%',
            padding: '20px',
            backgroundColor: '#ffffff',
            color: '#00897b',
            position: 'absolute', // Posición absoluta para que esté al final de la página
            bottom: '0',
            left: '0',
            fontSize: '40px', // Aumentar el tamaño de la letra
        },
        footerText: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px', // Aumentar tamaño de letra del footer
            textAlign: 'center',
        },
        socialIcons: {
            display: 'flex',
            gap: '15px',
        },
        socialIcon: {
            color: '#00897b',
            textDecoration: 'none',
        },
        cardHover: {
            transform: 'scale(1.05)', // Escalar la tarjeta al pasar el mouse
        },
    };

    return (
        <div style={styles.container}>
            {/* BARRA DE NAVEGACIÓN */}
            <div style={styles.nav}>
                  {/* 
                <Link to='/' style={styles.navLink}>Inicio</Link>
                <Link to='/conocenos' style={styles.navLink}>Conócenos</Link>
                <Link to='/servicios' style={styles.navLink}>Servicios</Link>
                <Link to='/contacto' style={styles.navLink}>Contacto</Link>
                */}
            </div>
            <h2 style={styles.h2}>Nuestros Servicios</h2>
            <div style={styles.cardContainer}>
                {serviData.map(({ url, id, nombre, imagen }) => (
                    <div 
                        key={id} 
                        style={{ ...styles.card, transition: 'transform 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = styles.cardHover.transform}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={styles.imageContainer}>
                            <img src={imagen} alt={nombre} style={styles.image} />
                        </div>
                        <div style={styles.cardTitle}>{nombre}</div>
                        <Link to='/agendar-cita' style={styles.button}>Agendar cita</Link>
                    </div>
                ))}
            </div>
            {/* FOOTER */}
            <div style={styles.footer}>
                <div style={styles.footerText}>
                    © 2024 Centro Veterinario VetFolk. Todos los derechos reservados.
                </div>
                
            </div>
        </div>
    );
};
