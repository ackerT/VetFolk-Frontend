import React from 'react';
import { Link } from 'react-router-dom';
import { serviData } from '../data/ServiData'; // Verifica la ruta si funciona aun este en rojo

export const HomePage = () => {

    function enviarFormulario() {
        // Obtener el valor del primer formulario
        const valorNombre = document.getElementById('Consulta').value;
    
      }
      

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '20px',
            padding: '10px',
        },
        cardContainer: {
            display: 'flex',
            flexDirection: 'row', // Cambiado para que las tarjetas estén en una fila
            justifyContent: 'center', // Centramos las tarjetas horizontalmente
            alignItems: 'center', // Alineamos las tarjetas en el eje vertical
            flexWrap: 'wrap', // Permite que las tarjetas se vayan a la siguiente línea si no caben
            gap: '20px', // Espacio entre las tarjetas
            maxWidth: '100%', // Permitir que el contenedor ocupe todo el ancho disponible
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '600px',
            width: '260px',
            backgroundColor: '#fff', // Cambiado a blanco
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            textAlign: 'center',
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
            backgroundColor: '#fff', // Cambiado a blanco para que coincida con la tarjeta
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            color: '#2c6b6b',
            marginBottom: '0px',
        },
        h2: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontSize: '50px',
            color: '#2c6b6b',
            marginBottom: '50px',
        },
        button: {
            width: '100%',
            padding: '25px 0',
            backgroundColor: '#00897b',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            margin: '5px 0',
        },
        buttonHover: {
            backgroundColor: '#004d40',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.h2}> Nuestros Servicos </h2>
            <div style={styles.cardContainer}>
                {serviData.map(({ url, id, nombre, imagen }) => (
                    <div key={id} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img src={imagen} alt={nombre} style={styles.image} />
                        </div>
                        <div style={styles.cardTitle}>{nombre}</div>
                        <Link to='/agendar-cita' style={styles.button}> Agendar cita</Link>

                    </div>
                ))}
            </div>
        </div>
    );
};
