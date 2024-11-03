// src/components/page/servicioPage.jsx

import React from 'react';

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
        h2: {
            fontFamily: 'Poppins, sans-serif', // Aplicamos Poppins
            fontWeight: '600', // Tamaño de la fuente
            fontSize: '50px', // Tamaño del h2
            color: '#2c6b6b', // Color personalizado
            marginBottom: '50px', // Separación con las cards
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.h2}>Nuestros servicios</h2>
        </div>
    );
};
