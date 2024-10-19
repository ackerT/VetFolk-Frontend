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

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Asegúrate de que esto envuelva todo */}
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5">
              Agendar una Cita
            </Typography>

            <Collapse in={showNotification}>
              <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
                ¡Cita agendada con éxito!
              </Alert>
            </Collapse>

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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="Nombre de la Mascota"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="petName"
                        label="Nombre de la Mascota"
                        error={Boolean(errors["Nombre de la Mascota"])}
                        helperText={errors["Nombre de la Mascota"]?.message}
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
                <Grid item xs={6}>
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Ingresar fecha (YYYY-MM-DD)"
                    value={textValue}
                    onChange={handleTextChange}
                    fullWidth
                    error={!dayjs(textValue).isValid()}
                    helperText={!dayjs(textValue).isValid() ? "Fecha no válida" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DateCalendar
                    value={fecha}
                    onChange={cambiarFecha}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                  >
                    Volver
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Cargando..." : "Agendar Cita"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Fecha y Hora no Disponibles</DialogTitle>
            <DialogContent>
              <Typography>La fecha y hora seleccionadas no están disponibles. Por favor, elige otra fecha o hora.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="blue">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
