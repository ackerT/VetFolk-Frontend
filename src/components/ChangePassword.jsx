import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button, TextField, Box, Typography, Container, Alert, Collapse,
  ThemeProvider, createTheme, InputAdornment, IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    h5: {
      position: 'absolute',
      top: 180,
      left: 550,
      color: '#ea3c3c',
      fontWeight: '600',
      fontSize: '35px',
    },
  },
});

const textFieldEstilo = {
  '& label.Mui-focused': {
    color: "#2c6b6b", 
  },
  mt: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#2c6b6b', 
    },
    '&:hover fieldset': {
      borderColor: '#2c6b6b', 
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2c6b6b', 
    },
  },
};

const ButtonEstilo = {
  backgroundColor: "#2c6b6b", 
  color: "#f0ffff",
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: "#f0ffff", 
    color: "#2c6b6b",
  },
};

export default function ChangePassword() {
  const { control, handleSubmit, formState: { errors }, getValues, trigger } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const [showPassword, setShowPassword] = useState({
    actual: false,
    nuevo: false,
    confirmar: false,
  });

  const navigate = useNavigate();

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setShowNotification(false);
    setErrorNotification('');

    if (formData.NewPassword !== formData.ConfirmarPassword) {
      setErrorNotification('Las contraseñas no coinciden');
      setIsSubmitting(false);
      return;
    }

    try {
      // Obtener userID desde localStorage
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setErrorNotification("No se encontró el ID de usuario.");
        setIsSubmitting(false);
        return;
      }

      // Llamada a la API para cambiar la contraseña
      const response = await axios.put(
        `http://18.221.225.5/personas/${userId}/cambiar-contrasena`, // URL de la API
        {
          contrasenaActual: formData.PasswordActual,
          contrasenaNueva: formData.NewPassword,
        }
      );

      setShowNotification(true);
      setIsSubmitting(false);
      setFormVisible(false);
      console.log("Contraseña cambiada: ", response.data);
    } catch (error) {
      setErrorNotification("Ocurrió un error al cambiar la contraseña.");
      setIsSubmitting(false);
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  return (
    <><ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
      <Typography variant="h5">
            Cambiar Contraseña
          </Typography>
          <Box
  sx={{
    top: 250,
    left: 450,
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: '10px',
    width: '600px',
    border: "2px solid #2c6b6b",
    borderRadius: "8px",
    textAlign: "center",
  }}
>
          <Collapse in={showNotification}>
            <Alert severity="success" sx={{ mb: 2, mt: 2, width: '100%' }}>
              ¡Contraseña cambiada con éxito!
            </Alert>
          </Collapse>
          {errorNotification && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {errorNotification}
            </Alert>
          )}
          {formVisible && (
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                name="PasswordActual"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Contraseña actual"
                    type={showPassword.actual ? "text" : "password"}
                    error={Boolean(errors.PasswordActual)}
                    helperText={errors.PasswordActual?.message}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onMouseDown={() => handleClickShowPassword('actual')}
                            onMouseUp={() => handleClickShowPassword('actual')}
                            edge="end"
                          >
                            {showPassword.actual ? <Visibility sx={{ fontSize: 15 }} /> : <VisibilityOff sx={{ fontSize: 15 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2, ...textFieldEstilo }} />
                )} />
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-])(?=.*[0-9])/,
                    message: "La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula, un carácter especial (!@#$%^&*_-) y un número",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Nueva contraseña"
                    type={showPassword.nuevo ? "text" : "password"}
                    error={Boolean(errors.NewPassword)}
                    helperText={errors.NewPassword?.message}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onMouseDown={() => handleClickShowPassword('nuevo')}
                            onMouseUp={() => handleClickShowPassword('nuevo')}
                            edge="end"
                          >
                            {showPassword.nuevo ? <Visibility sx={{ fontSize: 15 }} /> : <VisibilityOff sx={{ fontSize: 15 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2, ...textFieldEstilo }}
                    onBlur={() => {
                      trigger("NewPassword");
                    }} />
                )} />
              <Controller
                name="ConfirmarPassword"
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
                    label="Confirmar nueva contraseña"
                    type={showPassword.confirmar ? "text" : "password"}
                    error={Boolean(errors.ConfirmarPassword)}
                    helperText={errors.ConfirmarPassword?.message}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onMouseDown={() => handleClickShowPassword('confirmar')}
                            onMouseUp={() => handleClickShowPassword('confirmar')}
                            edge="end"
                          >
                            {showPassword.confirmar ? <Visibility sx={{ fontSize: 15 }} /> : <VisibilityOff sx={{ fontSize: 15 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2, ...textFieldEstilo }}
                    onBlur={() => {
                      trigger("ConfirmarPassword");
                    }} />
                )} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ ...ButtonEstilo, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
              </Button>
            </Box>
          )}
          {!formVisible && (
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{ ...ButtonEstilo, mb: 2 }}
            >
              Volver al Inicio
            </Button>
          )}
        </Box>
      </Container>
    </ThemeProvider><Footer /></>
  );
}