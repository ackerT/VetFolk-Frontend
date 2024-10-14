import React from 'react';
import { Link } from 'react-router-dom';
import { serviData} from '../data/ServiData'; // Verifica la ruta servidata


export const ServicioPage = () => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '100px',
        },
        cardContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '1200px',
        },
        card: {
            width: '450px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
        },
        imageContainer: {
            width: '100%',
            height: '350px',
            overflow: 'hidden',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        cardTitle: {
            padding: '20px 0',
            backgroundColor: '#fff',
            color: '#000',
            fontSize: '20px',
            fontWeight: 'bold',
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#00897b',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            display: 'inline-block',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#004d40',
        },
        
    };

    return (
        <div style={styles.container}>
            <h2  class="subpixel-antialiased  " >Nuestros servicios</h2>
            <div style={styles.cardContainer}>
                {serviData.map(({ url, id, nombre, imagen }) => ( // Cambiar servicios a serviData
                    <div key={id} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img src={imagen} alt={nombre} style={styles.image} />
                        </div>
                        <div style={styles.cardTitle}>{nombre}</div>
                        <Link to={url} style={styles.button}>
                            Conocer servicios
                        </Link>
                    </div>
                ))}
                    
            </div>
        </div>
    );
};
