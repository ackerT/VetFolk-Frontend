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
            backgroundColor: '#c9d4d4',
            minHeight: '100vh',
        },
        card: {
            backgroundColor: '#c9d4d4',
            width: '50vw',
            minHeight: '600px',
            maxWidth: '100%',
            width: '600px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            marginTop: '20px',
            textAlign: 'center',
        },
        cardTitle: {
            padding: '20px 0',
            backgroundColor: '#c9d4d4',
            fontSize: '25px',
            fontFamily: 'Poppins, sans-serif', // Aplicamos Poppins
            fontWeight: '60', // Peso de la fuente
            color: '#', // Color personalizado
            marginBottom: '50px', // Separación con las cards
            fontWeight: 'bold',
        },
        cardDescription: {
            padding: '20px 0',
            backgroundColor: '#c9d4d4',
            fontSize: '20px',
            fontFamily: 'Poppins, sans-serif', // Aplicamos Poppins
            fontWeight: '60', // Peso de la fuente
            color: '#343434', // Color personalizado
            marginBottom: '50px', // Separación con las cards
            fontWeight: 'bold',
            lineHeight: '1.5',
        },
        linkBack: {
            marginTop: '20px',
            fontSize: '20px',
            color: '#2c6b6b',
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
           
            <div style={styles.card}>
                <h2 style={styles.cardTitle}>{servicioEncontrado.nombre}</h2>
                <p style={styles.cardDescription}>{servicioEncontrado.descripcion}</p>
                {/* Descomentar para mostrar la imagen */}
                {/* <img src={vetImage} alt="Imagen de Veterinaria" style={styles.vetImg} /> */}

                 {/* Formulario falta consumirlo  
                 <FormularioPage/>   */} 
                  
            </div>
            <Link to='/agendar-cita' style={styles.linkBack}>Agender Cita</Link>
            <Link to='/servicio' style={styles.linkBack}>Atrás</Link>
        </div>
    );
     
    

};
