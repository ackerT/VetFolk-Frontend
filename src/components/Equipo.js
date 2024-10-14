import React from "react";
import vetImage from '../img/vet.png';
import Veterinario1 from '../img/v1.jpg';
import Veterinario2 from '../img/v2.jpg';
import Estilista1 from '../img/e1.jpg';
import Estilista2 from '../img/e2.jpg';

const veterinariosData = [
    {
        id: 1,
        nombre: 'Dr. Ramon Schultz',
        especialidad: 'Veterinario',
        foto: Veterinario1,
        descripcion: 'Especialista en cirugía y emergencias veterinarias.',
    },
    {
        id: 2,
        nombre: 'Dra. Gabriela Cárcamo',
        especialidad: 'Veterinario',
        foto: Veterinario2,
        descripcion: 'Especialista Odontología veterinaria.',
    }


];

const estilistasData = [
    {
        id: 1,
        nombre: 'Génesis Moncada',
        especialidad: 'Groomer canino',
        foto: Estilista1,
        descripcion: 'Corte de pelo, lavado y peinado.',
    },
    {
        id: 2,
        nombre: 'Estefan Franco',
        especialidad: 'Groomer felino               ',
        foto: Estilista2,
        descripcion: 'Cepillar y preparar el manto del gato.',
    }
];
const Equipo = () => {
    return (
        <body class="container">
            <div class="card-container">
                <hr></hr>
                <img src={vetImage} alt="Imagen de Bienvenida" className="welcome-img" />
                <h1>Nuestro Equipo</h1>
                <h2>Veterinarios</h2>
                <hr></hr>
                <div className="team-container">
                    {veterinariosData.map((persona) => (
                        <div key={persona.id} className="card">
                            <img src={persona.foto} alt={persona.nombre} className="profile-pic" />
                            <h2>{persona.nombre}</h2>
                            <h3>{persona.especialidad}</h3>
                            <p>{persona.descripcion}</p>
                            <button className="button-sombra" 
                                onClick={() => alert(`Más información sobre ${persona.nombre}`)}>
                                Saber más
                            </button>
                        </div>
                    ))}
                </div>

                <hr></hr>
                <h2>Estilistas</h2>
                <div className="team-container">
                    {estilistasData.map((persona) => (
                        <div key={persona.id} className="card">
                            <img src={persona.foto} alt={persona.nombre} className="profile-pic" />
                            <h2>{persona.nombre}</h2>
                            <h3>{persona.especialidad}</h3>
                            <p>{persona.descripcion}</p>
                            <button className="button-sombra" 
                                onClick={() => alert(`Más información sobre ${persona.nombre}`)}>
                                Saber más
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </body>
    );
};

export default Equipo;