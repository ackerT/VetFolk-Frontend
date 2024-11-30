import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Container,
  Grid,
  Alert,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Navbar from './Navbar';

// Horas disponibles de 8:00 a.m. a 5:00 p.m.
const availableHours = [
  "08:00 a.m.", "09:00 a.m.", "10:00 a.m.", "11:00 a.m.",
  "12:00 p.m.", "01:00 p.m.", "02:00 p.m.", "03:00 p.m.",
  "04:00 p.m.", "05:00 p.m."
];

// Estilo personalizado para los botones
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    h5: {
      color: '#ea3c3c', 
      fontSize: '1.6rem', 
      fontWeight: 'bold', 
      marginBottom: '20px',
    },
    button: {
      fontSize: '1rem', // Aumentar tamaño de letra para botones
      fontFamily: 'Poppins',
    },
  },
  palette: {
    primary: {
      main: '#2c6b6b',
    },
    text: {
      primary: '#2c6b6b' 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Bordes redondeados
          padding: '8px 16px', // Espaciado para botones
          '&:hover': {
            backgroundColor: '#f0ffff',
            color: '#2c6b6b', 
          },
          transition: 'background-color 0.3s', // Suavizar la transición del hover
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          fontFamily: 'Poppins',
          backgroundColor: '#e8f0fe', // Color de fondo de la modal
          borderRadius: '8px', // Esquinas redondeadas
          padding: '20px', // Espaciado interno
          width: '80%', // Ancho de la modal
          maxWidth: '500px', // Ancho máximo de la modal
        },
      },
    },
  },
});

export default function Component() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fecha, setFecha] = useState(dayjs());
  const [existingAppointments, setExistingAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetch("http://18.221.225.5/citas/obtener");
        const citas = await response.json();
        setExistingAppointments(citas.map(cita => ({
          fecha: cita.fecha,
          hora: cita.hora,
        })));
      } catch (error) {
        console.error("Error al obtener citas: ", error);
      }
    };

    fetchCitas();
  }, []);

  const cambiarFecha = (nuevaFecha) => {
    setFecha(nuevaFecha);
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    const hora = formData.Hora;
    const idServicio = formData["Tipo de Servicio"] === 'Consulta Veterinaria' ? 1 :
                       formData["Tipo de Servicio"] === 'Baño y Peluqueria' ? 4 : 5;
  
    const nuevaFechaFormateada = fecha.format('YYYY-MM-DD');
  
    // Verifica si ya existe una cita antes de crearla
    const response = await fetch(`http://18.221.225.5/citas/verificar?fecha=${nuevaFechaFormateada}&hora=${hora}&idServicio=${idServicio}`);
    const { disponible } = await response.json();
  
    if (!disponible) {
      setOpenModal(true); // Mostrar modal si ya existe una cita
      setIsSubmitting(false);
      return;
    }
  
    const idUsuario = sessionStorage.getItem('userId');
  
    // Crear la cita si no existe
    const citaData = {
      idUsuario,
      nombreMascota: formData["Nombre de su Mascota"],
      idServicio,
      fecha: nuevaFechaFormateada,
      hora,
    };
  
    try {
      const createResponse = await fetch("http://18.221.225.5/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(citaData),
      });
  
      if (!createResponse.ok) {
        throw new Error('Error creando la cita');
      }
  
      setShowNotification(true);
      setExistingAppointments([...existingAppointments, { fecha: nuevaFechaFormateada, hora }]);
      console.log("Cita agendada: ", citaData);
    } catch (error) {
      console.error("Error al crear la cita: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const isDateOccupied = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return existingAppointments.some(appointment => appointment.fecha === formattedDate);
  };

  return (
    <ThemeProvider theme={theme}>
        <Navbar />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main" maxWidth="sm">
          <Box 
            sx={{ 
              marginTop: 40, 
              marginLeft: '-100px',
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              padding: '20px',
              width: '100%',
              maxWidth: '600px' 
            }}
          >
            <Typography component="h1" variant="h5">
              Agendar una cita
            </Typography>
            <Collapse in={showNotification}>
              <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                ¡Cita agendada con éxito!
              </Alert>
            </Collapse>
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="Nombre de su mascota"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="petName"
                        label="Nombre de su mascota"
                        error={Boolean(errors["Nombre de la Mascota"])}
                        helperText={errors["Nombre de la Mascota"]?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="service-type-label">Tipo de servicio</InputLabel>
                  <Controller
                    name="Tipo de servicio"
                    control={control}
                    defaultValue="" // Valor inicial
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <Select
                        {...field} // Enlazar automáticamente valor y onChange de react-hook-form
                        labelId="service-type-label"
                        id="service-type"
                        label="Tipo de Servicio"
                        error={Boolean(errors["Tipo de Servicio"])}
                      >
                        <MenuItem value="Consulta Veterinaria">Consulta Veterinaria</MenuItem>
                        <MenuItem value="Baño y Peluquería">Baño y Perruquería</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

                <Grid item xs={12}>
                  <DateCalendar value={fecha} onChange={cambiarFecha} disablePast />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="hour-label">Hora</InputLabel>
                    <Controller
                      name="Hora"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Este campo es requerido" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="hour-label"
                          id="hour"
                          label="Hora"
                          error={Boolean(errors.Hora)}
                        >
                          {availableHours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Agendando...' : 'Agendar Cita'}
              </Button>
            </Box>
            <Button onClick={handleGoBack} fullWidth color="primary" sx={{ mt: 1 }}>
              Regresar
            </Button>
          </Box>
        </Container>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>{"Error al crear la cita"}</DialogTitle>
          <DialogContent>
            <Typography>Ya existe una cita para esta fecha y hora. Por favor, selecciona otra.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">Aceptar</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
