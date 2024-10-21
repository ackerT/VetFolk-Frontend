// src/components/page/servicioPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { serviData } from '../data/ServiData'; // Verifica la ruta si funciona aun este en rojo

export const ServicioPage = () => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '20px',
            padding: '100px',
        },
        cardContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '300%',
            maxWidth: '1200px',
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Cambiar a space-between para distribuir el contenido
            alignItems: 'center',
            minHeight: '600px',
            width: '260px', // Ajustar el ancho de las cards
            backgroundColor: '#c9d4d4',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            gap: '10px', // Espacio entre las cards
            margin: '10px', // Separación adicional entre las cards
            textAlign: 'center',
        },
        imageContainer: {
            width: '100%',
            height: '250px', // Ajustar la altura de la imagen
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%', // Ajustar para ocupar todo el espacio
            objectFit: 'cover',
        },
        cardTitle: {
            padding: '10px',
            backgroundColor: '#c9d4d4',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif', // Aplicamos Poppins
            fontWeight: 'bold', // Peso de la fuente
            color: '#2c6b6b', // Color personalizado
            marginBottom: '0px', // Separación con las cards
        },
        h2: {
            fontFamily: 'Poppins, sans-serif', // Aplicamos Poppins
            fontWeight: '600', // Tamaño de la fuente
            fontSize: '50px', // Tamaño del h2
            color: '#2c6b6b', // Color personalizado
            marginBottom: '50px', // Separación con las cards
        },
        button: {
            width: '100%', // Ancho consistente
            padding: '25x 0', // Tamaño más proporcionado
            backgroundColor: '#00897b',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            margin: '5px 0', // Espaciado de 1 píxel entre botones
        },
        buttonHover: {
            backgroundColor: '#004d40',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.h2}>Nuestros servicios</h2>
            <div style={styles.cardContainer}>
                {serviData.map(({ url, id, nombre, imagen }) => (
                    <div key={id} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img src={imagen} alt={nombre} style={styles.image} />
                        </div>
                        <div style={styles.cardTitle}>{nombre}</div>
                        <Link to={url} style={styles.button}>
                            Leer más
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
