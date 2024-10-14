import React from "react";

    
const Contactanos = () => {
    return (
        <div className="contact-page">
            <h1>CONTACTANOS</h1>
            <div className="contact-section">
                <div className="contact-card">
                    <h3>DIRECCION</h3>
                    <address>
                        <p>Grupo VetFolk</p>
                        <p>3 Calle Sur. </p>
                        <p>...</p>
                        <p>...</p>
                        <p>12101 </p>
                        <p>Las Lajas, Comayagua</p>
                    </address>
                </div>
                <div className="contact-card">
                    <h3>TELEFONO</h3>
                    <p>Llámanos: </p>
                    <p><a href="tel:+(504)22212010">+(504)2221-2010</a> Veterinaria</p>
                    <p><a href="tel:+(504)32472011">+(504)3247-2011</a> Estilistas</p>
                    <p>Servivio 24/7 Costo Especial</p>
                    <p><a href="tel:+(504)22212010">+(504)2221-2010</a> (Pressione 5 para emergencias)</p>
                </div>
                <div className="contact-card">
                    <h3>EMAIL Y REDES SOCIALES</h3>
                    <p>Información: <a href="mailto:info@vetfolkgroup.com">info@vetfolkgroup.com</a></p>
                    <p>Recepción: <a href="mailto:recepcion@vetfolkgroup.com">recepcion@vetfolkgroup.com</a></p>
                    <p>Negocios: <a href="mailto:service@vetfolkgroup.com">negocios@vetfolkgroup.com</a></p>
                    <p>Redes Sociales: <a href="https://www.instagram.com/vetfolkgroup.com">@vetfolkgroup</a></p>
                </div>
            </div>
        </div>
    );
};

export default Contactanos;
