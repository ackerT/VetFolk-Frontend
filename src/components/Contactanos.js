import React from "react";

const direccionData =[
    {
        id: 1,
        nombreSucursal:'Grupo VetFolk',
        calle:'...',
        direccion:'dos cuadras abajo de la estación de policía',
        municipio:'Las Lajas',
        departamento:'Comayagua'
    }
];

const telefonosData =[
    {
        id: 1,
        nombreSucursal:'Grupo VetFolk Contactos',
        telefono1:'+(504)2221-2010',
        telefono2:'+(504)3247-2011',
        telefonoe:'+(504)2221-2010 '
    }
];

const redessocialesData =[
    {
        id: 1,
        nombreSucursal:'Grupo VetFolk Redes',
        instagram:'VetFolkIg',
        facebook:'VetFolk',
        email:'info@vetfolkgroup.com'
    }
];

const Contactanos = () => {
    return (
        <div className="contact-page">
            <h1>CONTACTANOS</h1>
            <div className="contact-section">
                <div className="contact-card"> 
                    <h3>DIRECCION</h3>
                    <i className="fas fa-fw fa-2xl fa-location-dot"/>
                    {direccionData.map((direcc) =>(
                    <address key={direcc.id}>
                        <h5>{direcc.nombreSucursal}</h5>
                        <p>{direcc.calle}</p>
                        <p>{direcc.direccion}</p>                        
                        <p>{direcc.municipio}, Comayagua</p>
                    </address>
                 ))}
                </div>
                <div className="contact-card">
                    <h3>TELEFONO</h3>
                    <i class="fas fa-fw fa-2xl fa-phone"/>
                    {telefonosData.map((telefono) =>(
                        <phone key={telefono.id}>
                        <h5>{telefono.nombreSucursal}</h5>
                        <p><a href={`tel:${telefono.telefono1}`}>{telefono.telefono1}</a> teléfono veterinaria</p>
                        <p><a href={`tel:${telefono.telefono2}`}>{telefono.telefono2}</a> teléfono estilistas</p>
                        <p><a href={`tel:${telefono.telefonoe}`}>{telefono.telefonoe}</a> teléfono para emergencias</p>                        
                        </phone>
                    ))}
                </div>
                <div className="contact-card">
                    <h3>REDES SOCIALES</h3>
                    <i class="fas fa-fw fa-2xl fa-envelope"></i>
                    {redessocialesData.map((redes)=>(
                        <social key={redes.id}>
                            <h5>{redes.nombreSucursal}</h5>
                            <p>E-Mail: <i class="fa fa-envelope"/> <a href={`mailto:${redes.email}`}>{redes.email}</a></p>
                            <p>Instagram: <i class="fa-brands fa-instagram"/> <a href={`https://www.instaagram.com/${redes.instagram}`}>{redes.instagram}</a></p>
                            <p>Facebook: <i class="fa-brands fa-facebook"/> <a href={`https://www.facebook.com/${redes.facebook}`}>{redes.facebook}</a></p>
                        </social>    
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contactanos;
