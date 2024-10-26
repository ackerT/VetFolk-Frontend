import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Box, Typography, Container, Alert, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export default function CambioPassword() {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Nuevo estado para controlar la visibilidad del formulario
  const navigate = useNavigate(); // Inicializar useNavigate

  const onSubmit = (formData) => {
    setIsSubmitting(true);
    setShowNotification(false);
    setErrorNotification('');

    // Validación de las contraseñas
    if (formData.NewPassword !== formData.ConfirmPassword) {
      setErrorNotification('Las contraseñas no coinciden');
      setIsSubmitting(false);
      return;
    }

    // Aquí puedes agregar la lógica para actualizar la contraseña en el backend
    // enviar formData a tu API

    setShowNotification(true);
    setIsSubmitting(false);
    setFormVisible(false); // Oculta el formulario
    console.log("Contraseña cambiada: ", formData);
  };

  const textFieldStyles = {
    mt: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2c6b6b', // Color del borde en estado normal
      },
      '&:hover fieldset': {
        borderColor: 'darkgreen', // Color del borde al hacer hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green', // Color del borde en estado enfocado
      },
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: '10px',
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h5">
          Cambiar Contraseña:
        </Typography>
        <Collapse in={showNotification}>
          <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
            ¡Contraseña cambiada con éxito!
          </Alert>
        </Collapse>
        {errorNotification && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {errorNotification}
          </Alert>
        )}
        {formVisible && ( // Condicional para mostrar el formulario
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="CurrentPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Este campo es requerido" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Contraseña Actual"
                  type="password"
                  error={Boolean(errors.CurrentPassword)}
                  helperText={errors.CurrentPassword?.message}
                  size="small"
                  sx={{ mt: textFieldStyles}}

                />
              )}
            />
            <Controller
              name="NewPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "La nueva contraseña debe tener al menos 8 caracteres",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Nueva Contraseña"
                  type="password"
                  error={Boolean(errors.NewPassword)}
                  helperText={errors.NewPassword?.message}
                  size="small"
                  sx={{ mt: 3 }}

                />

              )}
            />
            <Controller
              name="ConfirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Este campo es requerido",
                validate: (value) => value === getValues("NewPassword") || "Las contraseñas no coinciden"
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  fullWidth
                  label="Confirmar Nueva Contraseña"
                  type="password"
                  error={Boolean(errors.ConfirmPassword)}
                  helperText={errors.ConfirmPassword?.message}
                  size="small"
                  sx={{ mt: 2 }}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
            </Button>
          </Box>
        )}
        {!formVisible && ( // Botón para volver al inicio
          <Button
            variant="outlined"
            onClick={() => navigate('/')} // Redirigir a la página de inicio  o Login
            sx={{ mt: 2, mb: 2 }}
          >
            Volver al Inicio
          </Button>
        )}
      </Box>
    </Container>
  );
}

