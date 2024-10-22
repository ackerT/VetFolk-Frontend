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
        imageContainer: {
            width: '100%', // Ocupar todo el ancho
            maxWidth: '800px', // Aumentar la máxima anchura de la imagen
            height: 'auto', // Altura automática para mantener la proporción
            overflow: 'hidden',
            marginTop: '80px', // Espacio bajo la barra de navegación
            textAlign: 'center', // Centrar el contenido
        },
        image: {
            width: '100%', // Mantener el ancho del 100%
            height: 'auto', // Mantener proporción de la imagen
            objectFit: 'cover',
        },
        h2: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontSize: '48px',
            color: '#00897b',
            marginBottom: '0px',
        },
        h3Container: {
            display: 'flex',
            justifyContent: 'space-around', // Espacio alrededor de los elementos
            marginTop: '20px', // Espacio encima de los h3
        },
        h3: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontSize: '30px',
            color: '#00897b',
            margin: '0 10px', // Espacio entre los h3
        },
        p: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '19px', // Igualar el tamaño del texto del h3
            color: '#343434',
            margin: '20px 0', // Añadir margen alrededor del párrafo
            textAlign: 'center', // Centrar el texto del párrafo
        },
        button: {
            width: '80%',
            padding: '17px 0',
            backgroundColor: '#00897b',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '15px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            margin: '20px 0', // Añadir espacio alrededor del botón
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
            <div style={styles.imageContainer}>
                {/* Mostrar solo la imagen del primer servicio */}
                <p style={styles.p}>Ofrecen un diagnóstico preciso y cuidado personalizado para cada mascota. Nos aseguramos de que su mascota reciba la atención que merece.</p>
                <img src={serviData[1].imagen} alt={serviData[1].nombre} style={styles.image} />
                <div style={styles.h3Container}>
                    <h3 style={styles.h3}>Consultas</h3>
                    <h3 style={styles.h3}>Peluquería</h3>
                </div>
            </div>
            <Link to='/agendar-cita' style={styles.button}>Agendar cita</Link>
            {/* FOOTER */}
            <div style={styles.footer}>
                <div style={styles.footerText}>
                    © 2024 Centro Veterinario VetFolk. Todos los derechos reservados.
                </div>
            </div>
        </div>
    );
};
