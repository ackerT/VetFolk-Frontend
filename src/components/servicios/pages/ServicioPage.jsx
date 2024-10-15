import React from 'react';
import { Link } from 'react-router-dom';
import { serviData} from '../data/ServiData'; // Verifica la ruta  si funciona aun este en rojo


export const ServicioPage = () => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marging:'10px',
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
            justifyContent: 'center',
            alignItems: 'center',      
            minHeight: '600px',
            width: '800px',
            backgroundColor: '#c9d4d4',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            gap: '20px', // Espacio entre las cards
            maxWidth: '1200px',
            margin: '3px', // Separación adicional entre las cards
            textAlign: 'center',
        },
        imageContainer: {
            width: '100%',
            height: '350px',
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '80%',
            objectFit: 'cover',
        },
        cardTitle: {
            padding: '20px ',
            backgroundColor: '#c9d4d4',
            fontSize: '25px',
            fontFamily: 'Poppins, sans-serif', // Aplicamos Poppins
            fontWeight: '50', // Peso de la fuente
            color: '#2c6b6b', // Color personalizado
            textWrap: 'pretty', //
            marginBottom: '0px', // Separación con las cards
            fontWeight: 'bold',
        },
        h2: {
            fontFamily: 'Poppins, sans-serif', // Aplicamos Poppins
            fontWeight: '600', // Peso de la fuente
            fontSize: '50px', // Tamaño del h2
            color: '#2c6b6b', // Color personalizado
            marginBottom: '50px', // Separación con las cards
        },
        button: {
            width: '100%', // El botón abarca todo el ancho de la card
            padding: '15px 0', // Tamaño más proporcionado
            backgroundColor: '#00897b',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            marginTop: 'auto', // Coloca el botón en la parte inferior de la card
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#004d40',
        },
        
    };

    return (
        <div style={styles.container}>
            <h2  style={styles.h2}>Nuestros servicios</h2>
            <div style={styles.cardContainer}>
                {serviData.map(({ url, id, nombre, imagen }) => ( // Cambiar servicios a serviData
                    <div key={id} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img src={imagen} alt={nombre} style={styles.image} />
                        </div>
                        <div style={styles.cardTitle}>{nombre}</div>
                        <Link to={url} style={styles.button}>
                            Leer mas
                        </Link>
                    </div>
                ))}
                    
            </div>
        </div>
    );
};
