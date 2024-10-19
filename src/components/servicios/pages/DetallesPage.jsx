import React from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { serviData } from '../data/ServiData'; 

export const DetallesPage = () => {
    const { id } = useParams();
    const servicioEncontrado = serviData.find(servicio => servicio.id === parseInt(id));

    // Estilos
    const styles = {
        detallesPage: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#c9d4d4',
            minHeight: '100vh',
        },
        card: {
            backgroundColor: '#c9d4d4',
            width: '50vw',
            minHeight: '600px',
            maxWidth: '100%',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            marginTop: '20px',
            textAlign: 'center',
        },
        cardTitle: {
            fontFamily: 'Poppins, sans-serif', // Familia de la fuente
            fontWeight: '90%', // Grosor de la fuente
            fontSize: '60px', // Tamaño del h2
            color: '#2c6b6b', // Color personalizado
            marginBottom: '0px', // Separación con las cards
        },
        cardDescription: {
            padding: '20px 0',
            fontFamily: 'Poppins, sans-serif', // Familia de la fuente
            backgroundColor: '#c9d4d4',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            color: '#343434',
            marginBottom: '50px',
            lineHeight: '1.5',
        },
        // Nuevo estilo para contenedor de botones
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column', // Alinea los botones uno debajo del otro
            gap: '20px', // Espacio entre los botones
            width: '90%',
            alignItems: 'center', // Centra los botones horizontalmente
        },
        linkBack: {
            width: '80%',
            padding: '20px', // Tamaño del botón ajustado
            backgroundColor: '#00897b',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '15px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.6s ease',
        },
        vetImg: {
            width: '90%',
            maxWidth: '500px',
            borderRadius: '10px',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.detallesPage}>
            <div style={styles.card}>
                <h2 style={styles.cardTitle}>{servicioEncontrado.nombre}</h2>
                <p style={styles.cardDescription}>{servicioEncontrado.descripcion}</p>
                <img src={servicioEncontrado.imagen} alt={servicioEncontrado.nombre} style={styles.vetImg} />
            </div>
            {/* Contenedor de botones con separación */}
            <div style={styles.buttonContainer}>
                <Link to='/agendar-cita' style={styles.linkBack}>Agendar Cita</Link>
                <Link to='/servicio' style={styles.linkBack}>Atrás</Link>
            </div>
        </div>
    );
};
