import React, { useState } from "react";
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
  DialogTitle
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h5: {
      color: '#00897b', // Cambiar el color del título "Agendar Cita"
      fontSize: '1.6rem', // Ajustar tamaño de letra del título
      fontWeight: 'bold',// En negrita el h5
    },
    button: {
      fontSize: '1rem', // Aumentar tamaño de letra para botones
    },
  },
  palette: {
    primary: {
      main: '#00897b', // Color principal para botones
    },
    text: {
      primary: '#000', // Color del texto en botones y modal
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Bordes redondeados
          padding: '8px 16px', // Espaciado para botones
          '&:hover': {
            backgroundColor: '#00796b', // Color del fondo al hacer hover
          },
          transition: 'background-color 0.3s', // Suavizar la transición del hover
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
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
  const [textValue, setTextValue] = useState(fecha.format('YYYY-MM-DD'));
  const [existingAppointments, setExistingAppointments] = useState([]);
  const navigate = useNavigate();

  const cambiarFecha = (nuevaFecha) => {
    setFecha(nuevaFecha);
    setTextValue(nuevaFecha.format('YYYY-MM-DD'));
  };

  const handleTextChange = (event) => {
    const nuevaFecha = dayjs(event.target.value);
    setTextValue(event.target.value);
    if (nuevaFecha.isValid()) {
      setFecha(nuevaFecha);
    }
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    const hora = formData.Hora;
    const nuevaFechaFormateada = fecha.format('YYYY-MM-DD');

    const existingAppointment = existingAppointments.some(item => 
      item.fecha === nuevaFechaFormateada && item.hora === hora
    );

    if (existingAppointment) {
      setOpenModal(true);
      setIsSubmitting(false);
      return;
    }

    setExistingAppointments([...existingAppointments, { fecha: nuevaFechaFormateada, hora }]);
    setShowNotification(true);
    console.log("Cita agendada: ", { ...formData, fecha: nuevaFechaFormateada, hora });
    setIsSubmitting(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para verificar si la fecha está ocupada
  const isDateOccupied = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return existingAppointments.some(appointment => appointment.fecha === formattedDate);
  };

  return ( 
     
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* editar  el tamaño máximo del contenedor del formulario */}
        <Container component="main" maxWidth="sm" sx={{ width: '90%', maxWidth: '400px' }}>
          <Box 
            sx={{ 
              marginTop: 10, 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              padding: '20px',
              width: '100%',
              maxWidth: '600px' // Limitar el ancho máximo del formulario
            }}
            >

              {/* editar imagen */}
              
               {/* editar el tamaña del h5 */}
            <Typography component="h1" variant="h5">
              Agendar una Cita
            </Typography>
              {/* Muestra la notificacion */}
            <Collapse in={showNotification}>
              <Alert severity="success" sx={{ mt: 2, width: '100%', fontSize: '1.5rem' }}>
                ¡Cita agendada con éxito!
              </Alert>
            </Collapse>
                   {/*  formulario */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="Nombre Completo"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="fullName"
                        label="Nombre Completo"
                        autoFocus
                        error={Boolean(errors["Nombre Completo"])}
                        helperText={errors["Nombre Completo"]?.message}
                        InputProps={{
                          style: { fontSize: '1.2rem' } // Cambiar tamaño de letra del formulario
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="Telefono"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="phone"
                        label="Teléfono"
                        error={Boolean(errors.Telefono)}
                        helperText={errors.Telefono?.message}
                        InputProps={{
                          style: { fontSize: '1.3rem' } // Cambiar tamaño de letra del formulario
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="Nombre de su Mascota"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="petName"
                        label="Nombre de su Mascota"
                        error={Boolean(errors["Nombre de la Mascota"])}
                        helperText={errors["Nombre de la Mascota"]?.message}
                        InputProps={{
                          style: { fontSize: '1.2rem' } // Cambiar tamaño de letra del formulario
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="breed-label">Especie</InputLabel>
                    <Controller
                      name="Especie"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Este campo es requerido" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="breed-label"
                          id="breed"
                          label="Especie"
                          error={Boolean(errors.Especie)}
                          InputProps={{
                            style: { fontSize: '1.2rem' } // Cambiar tamaño de letra del formulario
                          }}
                        >
                          <MenuItem value="Perro">Perro</MenuItem>
                          <MenuItem value="Gato">Gato</MenuItem>
                          <MenuItem value="Caballo">Caballo</MenuItem>
                          <MenuItem value="Otro">Otro</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Controller
                    name="Hora"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="time"
                        label="Hora"
                        type="time"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        error={Boolean(errors.Hora)}
                        helperText={errors.Hora?.message}
                        InputProps={{
                          style: { fontSize: '1.2rem', textAlign: 'center' } // Cambiar tamaño de letra del input de hora
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Controller
                    name="Fecha"
                    control={control}
                    defaultValue={textValue}
                    render={({ field }) => (
                      <DateCalendar
                        {...field}
                        value={fecha}
                        onChange={(newValue) => cambiarFecha(newValue)}
                        renderDay={(day, _value, _utils) => {
                          const isOccupied = isDateOccupied(day);
                          return (
                            <span style={{ color: isOccupied ? 'red' : 'inherit' }}>
                              {day.date()}
                            </span>
                          );
                        }}
                        sx={{
                          '& .MuiCalendarPicker-day.Mui-selected': {
                            backgroundColor: '#00897b', // Color de fondo de la fecha seleccionada
                          },
                          '& .MuiCalendarPicker-day:hover': {
                            backgroundColor: '#00897b', // Color de fondo al hacer hover en la fecha
                          },
                          '& .MuiTypography-root': {
                            fontSize: '1.3rem', // Cambiar tamaño de letra del calendario
                          },
                          width: '80%', // Hacer el calendario más ancho
                          maxWidth: '400px', // Limitar el ancho máximo del calendario
                          margin: '0 auto', // Centrar el calendario
                        }}
                      />
                    )}
                  />
                </Grid>
                 {/* iditar botones del  formulario */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Agendar Cita
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: '#00897b', '&:hover': { backgroundColor: '#00796b' } }} // Cambiar color a #00897b
                    onClick={handleGoBack}
                    startIcon={<ArrowBackIcon />}
                  >
                    Atrás
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
           {/* Editar el modalel  */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle sx={{ fontSize: '1.5rem', color: '#00897b' }}>¡Hola!</DialogTitle>
            <DialogContent>
              <Typography sx={{ color: '#000', fontSize: '1.5rem' }}>
                Ya existe una cita para esta fecha y hora.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} variant="contained" sx={{ color: '#fff' }}>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
