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
            fontWeight: '60%', // Grosor de la fuente
            fontSize: '36px', // Tamaño más pequeño
            color: '#2c6b6b', // Color personalizado
            marginTop: '30px',
            marginBottom: '0px', // Separación con las cards
        },
        cardDescription: {
            padding: '20px 0',
            fontFamily: 'Poppins, sans-serif', // Familia de la fuente
            backgroundColor: '#c9d4d4',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#343434',
            marginBottom: '50px',
            lineHeight: '1.5',
             maxWidth: '80%', // Limita el ancho máximo de la descripción
        textAlign: 'center', // Centra el texto
        margin: '0 auto', // Asegura que el texto esté centrado horizontalmente
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
            width: '60%',
            maxWidth: '500px',
            borderRadius: '10px',
            marginTop: '20px',
            height: 'auto',
            
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
            {/* bboton de agendar */}
            <div style={styles.buttonContainer}>
                <Link to='/agendar-cita' style={styles.linkBack}>Agendar Cita</Link>
                {/* Boton de atras  vamos a mandar un valor por defecto */}
                <Link to='/home' style={styles.linkBack}>Atrás</Link>
            </div>
        </div>
    );
};
