import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
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
  Grid 
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const theme = createTheme()

export default function Component() {
  const { control, handleSubmit, formState: { errors } } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    setIsSubmitting(true)
    console.log(data)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Agendar una Cita
          </Typography>
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
                  <InputLabel id="breed-label">Raza</InputLabel>
                  <Controller
                    name="Raza"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Este campo es requerido" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="breed-label"
                        id="breed"
                        label="Raza"
                        error={Boolean(errors.Raza)}
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
                <Controller
                  name="Fecha"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="date"
                      label="Fecha"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(errors.Fecha)}
                      helperText={errors.Fecha?.message}
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
                        id="serviceType"
                        label="Tipo de Servicio"
                        error={Boolean(errors["Tipo de Servicio"])}
                      >
                        <MenuItem value="Consulta">Consulta</MenuItem>
                        <MenuItem value="VacunacionDesparacitacion">Vacunación/Desparacitación</MenuItem>
                        <MenuItem value="Cirugia">Cirugía</MenuItem>
                        <MenuItem value="Peluqueria">Peluquería</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="Motivo de la cita"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Este campo es requerido" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      id="reason"
                      label="Motivo de la cita"
                      multiline
                      rows={4}
                      error={Boolean(errors["Motivo de la cita"])}
                      helperText={errors["Motivo de la cita"]?.message}
                    />
                  )}
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
              {isSubmitting ? "Enviando..." : "Agendar Cita"}
            </Button>
            <Button
              startIcon={<ArrowBackIcon />}
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
    </ThemeProvider>
  )
}