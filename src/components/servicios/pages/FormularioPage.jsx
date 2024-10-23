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
  DialogTitle,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const availableHours = [
  "08:00 a.m.", "09:00 a.m.", "10:00 a.m.", "11:00 a.m.",
  "12:00 p.m.", "01:00 p.m.", "02:00 p.m.", "03:00 p.m.",
  "04:00 p.m.", "05:00 p.m."
];

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h5: {
      color: '#00897b',
      fontSize: '1.6rem',
      fontWeight: 'bold',
    },
    button: {
      fontSize: '1rem',
      fontFamily: 'Poppins, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#00897b',
    },
    text: {
      primary: '#000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '6px 12px', // Tamaño más pequeño del botón
          '&:hover': {
            backgroundColor: '#00796b',
          },
          transition: 'background-color 0.3s',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#e8f0fe',
          borderRadius: '8px',
          padding: '20px',
          width: '80%',
          maxWidth: '400px', // Modal más pequeña
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

  const cambiarFecha = (nuevaFecha) => {
    setFecha(nuevaFecha);
  };

  const onSubmit = (formData) => {
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

  const isDateOccupied = (date) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return existingAppointments.some(appointment => appointment.fecha === formattedDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main" maxWidth="xs"> {/* MaxWidth reducido a xs */}
          <Box 
            sx={{ 
              marginTop: 6, // Espacio reducido en la parte superior
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              padding: '10px', // Espacio reducido dentro del formulario
              width: '100%',
              maxWidth: '500px' // reducido el formulario
            }}s
          >
            <Typography component="h1" variant="h5">
              Agendar una Cita
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
                        error={Boolean(errors["Nombre Completo"])}
                        helperText={errors["Nombre Completo"]?.message}
                        size="small" // Hacer el campo de texto más pequeño
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
                        size="small" // Hacer el campo de texto más pequeño
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
                        size="small" // Hacer el campo de texto más pequeño
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="service-type-label">Tipo de Servicio</InputLabel>
                    <Controller
                      name="Tipo de Servicio"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Este campo es requerido" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="service-type-label"
                          id="service-type"
                          label="Tipo de Servicio"
                          error={Boolean(errors["Tipo de Servicio"])}
                          size="small" // Hacer el select más pequeño
                        >
                          <MenuItem value="Consulta">Consulta</MenuItem>
                          <MenuItem value="Peluqueria">Cirugía</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="Hora"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="hour-label">Hora</InputLabel>
                        <Select
                          {...field}
                          labelId="hour-label"
                          id="hour"
                          label="Hora"
                          error={Boolean(errors.Hora)}
                          size="small" // Hacer el select más pequeño
                        >
                          {availableHours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Seleccione la Fecha</Typography>
                  <DateCalendar 
                    value={fecha} 
                    onChange={cambiarFecha}
                    shouldDisableDate={isDateOccupied} 
                    sx={{
                      '& .MuiPaper-root': {
                        '&:hover': {
                          backgroundColor: '#00897b',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Agendando..." : "Agendar Cita"}
              </Button>
              <Button
                onClick={handleGoBack}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Regresar
              </Button>
            </Box>
          </Box>
        </Container>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Cita Ocupada</DialogTitle>
          <DialogContent>
            La fecha y hora seleccionadas ya están ocupadas. Por favor, seleccione otra fecha u hora.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
