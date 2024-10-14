import React from 'react';
import { Link, useParams } from 'react-router-dom'; // 
import { serviData} from '../data/ServiData'; // Verifica la ruta servidata
import {FormularioPage} from '../pages/FormularioPage'; 




export const DetallesPage = () => { 
    // 
    const { id } = useParams();
    const servicioEncontrado = serviData.find(servicio => servicio.id === parseInt(id));
    console.log(servicioEncontrado);

    // Estilos
    const styles = {
        detallesPage: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            marginTop: '20px',
            width: '100%',
            maxWidth: '600px',
            textAlign: 'center',
        },
        cardTitle: {
            fontSize: '24px',
            color: '#333',
            marginBottom: '15px',
        },
        cardDescription: {
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.5',
        },
        linkBack: {
            marginTop: '20px',
            fontSize: '16px',
            color: '#007bff',
            textDecoration: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            border: '1px solid #007bff',
            backgroundColor: '#ffffff',
            transition: 'background-color 0.3s ease',
        },
        linkBackHover: {
            backgroundColor: '#007bff',
            color: '#ffffff',
        },
        vetImg: {
            width: '100%',
            maxWidth: '500px',
            borderRadius: '10px',
            marginTop: '20px',
        },
    };

    

    return (
        <div style={styles.detallesPage}>  {/* Cambiar DetallesPage a detallesPage */}
            <Link to='/servicio' style={styles.linkBack}>Atrás</Link>
            <div style={styles.card}>
                <h2 style={styles.cardTitle}>{servicioEncontrado.nombre}</h2>
                <p style={styles.cardDescription}>{servicioEncontrado.descripcion}</p>
                {/* Descomentar para mostrar la imagen */}
                {/* <img src={vetImage} alt="Imagen de Veterinaria" style={styles.vetImg} /> */}

                 {/* Formulario falta consumirlo  
                 <FormularioPage/>   */} 
                  <Link to='/agendar-cita' style={styles.linkBack}>Agender Cita</Link>
            </div>
        </div>
    );
     
    

};
