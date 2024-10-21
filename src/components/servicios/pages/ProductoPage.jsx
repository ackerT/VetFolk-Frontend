import React from 'react';
import { Link } from 'react-router-dom';
import { ProductData } from '../data/ProductData'; // Asegúrate de que la ruta sea correcta
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Container,
} from '@mui/material';

export const ProductoPage = () => {
    return (
        <Container
            sx={{
                padding: '40px',
                backgroundColor: '#f8f8f8',
                borderRadius: '10px',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            {/* Encabezado H2 con mayor margen superior */}
            <Typography
                variant="h2"
                gutterBottom
                align="center"
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '50',
                    fontSize: '50px',
                    color: '#2c6b6b',
                    marginBottom: '50px',
                    marginTop: '130px', // Se añade un margen superior para separar del borde superior
                }}
            >
              Nuestros Productos
            </Typography>

            {/* Descripción con color ajustado */}
            <Typography
                variant="body1"
                paragraph
                align="center"
                sx={{
                    marginBottom: '0px',
                    color: '#2c6b6b', // Se ajusta el color a #2c6b6b
                    fontFamily: 'Poppins, sans-serif', // Manteniendo la tipografía
                    fontWeight: '100', // Peso de la fuente
                    fontSize: '18px', // Tamaño de la fuente
                }}
            >
              En esta sección encontrarás productos de nuestro catálogo.
            </Typography>

            {/* Grid de productos */}
            <Grid container justifyContent="center" spacing={3}>
                {ProductData.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card
                            sx={{
                                height: '25em',
                                width: '18em',
                                border: '2px solid rgba(44, 107, 107, 0.5)', // Borde con color más claro
                                borderRadius: '1.5em',
                                backgroundColor: '#fff', // Fondo blanco
                                color: '#2c6b6b', // Color del texto en #2c6b6b
                                padding: '1em',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                marginTop: '10px', // Se añade un margen superior para separar del borde superio
                                gap: '0.75em',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 10,
                                },
                            }}
                        >
                            {/* Mostrar la imagen en la parte superior de la tarjeta */}
                            <CardMedia
                                component="img"
                                alt={item.nombre}
                                height="80"
                                image={item.imagen}
                                sx={{
                                    objectFit: 'cover',
                                    borderRadius: '15px 15px 0 0',
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '2em',
                                        fontWeight: '500',
                                        color: '#2c6b6b', // Color del texto en #2c6b6b
                                    }}
                                >
                                    {item.nombre}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.85em',
                                        color: '#2c6b6b', // Color del texto en #2c6b6b
                                    }}
                                >
                                    {item.descripcion}
                                </Typography>
                            </CardContent>

                            {/* Botón con tamaño más grande y estilos personalizados */}
                            <Link to={item.url} style={{ textDecoration: 'none', width: '100%' }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        width: '100%', // Hacemos que el botón ocupe todo el ancho
                                        padding: '0.75em 2em', // Aumentamos el tamaño del padding
                                        border: '1px solid #2c6b6b', // Borde en #2c6b6b
                                        borderRadius: '50px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5em',
                                        color: '#2c6b6b', // Color del texto en #2c6b6b
                                        fontSize: '1.1em', // Aumentar el tamaño de la fuente del botón
                                        transition: 'background-color 0.2s, color 0.2s',
                                        '&:hover': {
                                            backgroundColor: '#2c6b6b', // Fondo #2c6b6b al hacer hover
                                            color: '#fff', // Texto en blanco al hacer hover
                                        },
                                    }}
                                >
                                    <p style={{ margin: 0 }}>Ver Productos</p>
                                    <svg
                                        className="w-6 h-6"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor" // Color del icono en blanco
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ width: '1.5em', height: '1.5em', color: 'inherit' }} // Color del icono en #2c6b6b
                                    >
                                        <path
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </Button>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
