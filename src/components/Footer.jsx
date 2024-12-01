// Footer.jsx
import vetImage from '../img/vet.png';

function Footer() {
    const styles = {
        wrapper: {
            position: 'absolute',
            top: '95%',
            left: 0,
            width: '100%',
            background: '#f0ffff',
        },
        container: {
            justifyContent: 'space-between',
            display: 'flex',
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        text: {
            color: '#2c6b6b',
            fontFamily: 'Nunito',
            fontSize: '1rem',
            fontWeight: 500,
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
        },
        middle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '0.5rem',
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: '0.5rem',
        },
        icon: {
            marginRight: '0.5rem',
        },
    };

    return (
        <section style={styles.wrapper} id='contacto'>
            <div style={styles.container}>

                {/* Izquierda */}
                <div style={styles.left}>
                    <img src={vetImage} alt='logo' width={180} />
                </div>

                {/* Mitad */}
                <div style={styles.middle}>
                    <span style={styles.text}>
                        <i className="fa-solid fa-location-dot" style={styles.icon} /> 
                        Barrio San Antonio, dos cuadras abajo de la estación de policía.
                        <br />
                        Las Lajas, Comayagua.
                    </span> 
                    <span style={styles.text}>
                        <i className="fa-solid fa-clock" style={styles.icon} /> 
                        Horario de Atención:
                    </span>
                    <span style={styles.text}>Lunes a Viernes 8:00 am - 5:00 pm</span>   
                    <span style={styles.text}>Sábados 9:00 am - 5:00 pm</span>
                </div>

                {/* Derecha */}
                <div style={styles.right}>
                    <span style={styles.text}>Contacto:</span>
                    <span style={styles.text}>
                        <i className="fa-solid fa-phone" style={styles.icon} /> +504 9978-0338
                    </span>
                    <span style={styles.text}>
                        <i class="fa-solid fa-envelope" style={styles.icon} /> cvetfolk@gmail.com
                    </span>
                    <span style={styles.text}>
                        <i className="fa-brands fa-facebook" style={styles.icon} /> Centro Veterinario VetFolk
                    </span>
                    <span style={styles.text}>
                        <i className="fa-brands fa-instagram" style={styles.icon} /> vetfolk
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Footer;