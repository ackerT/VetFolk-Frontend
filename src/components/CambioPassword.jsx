import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button, TextField, Box, Typography, Container, Alert
  , Collapse
  , ThemeProvider
  , createTheme
  , InputAdornment
  , IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Importar useNavigate



const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h5:{
      color:'#2c6b6b',
      fontWeight:'bold',

      margin: '20px',
      fontWeight: '600',
    },
  },
}
);

const textFieldEstilo = {
  '& label.Mui-focused': {
    color: "darkgreen", // Color de la etiqueta al enfocar
  },
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

const ButtonEstilo = {
  backgroundColor: "rgba(44, 107, 107, 0.2)", // Color de la etiqueta al enfocar
  border: "1px solid #2c6b6b",
  // color: "#2c6b6b",
  color: "#2c6b6b",
}

export default function CambioPassword() {
  const { control, handleSubmit, formState: { errors }, getValues, trigger } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Nuevo estado para controlar la visibilidad del formulario
  const [showPassword, setShowPassword] = useState({ //Para Mostrrar icono de Password
    actual: false,
    nuevo: false,
    confirmar: false,
  });

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const onSubmit = (formData) => {
    setIsSubmitting(true);
    setShowNotification(false);
    setErrorNotification('');

    // Validación de las contraseñas
    if (formData.NewPassword !== formData.ConfirmarPassword) {
      setErrorNotification('Las contraseñas no coinciden');
      setIsSubmitting(false);
      return;
    }

    //  agregar la lógica para actualizar la contraseña en el backend
    // enviar formData a tu API

    setShowNotification(true);
    setIsSubmitting(false);
    setFormVisible(false); // Oculta el formulario
    console.log("Contraseña cambiada: ", formData);
  };



  return (
    <ThemeProvider theme={theme}>
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
          <Typography variant="h5" >
            Cambiar Contraseña:
          </Typography>
          <Collapse in={showNotification}>
            <Alert severity="success" sx={{ mb:2, mt: 2, width: '100%' }}>
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
                name="PasswordActual"
                control={control}
                defaultValue=""
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <TextField component="MuiTextField"
                    {...field}
                    required
                    fullWidth
                    label="Contraseña Actual"
                    // type="password"
                    type={showPassword.actual ? "text" : "password"} //mostrar password 
                    error={Boolean(errors.PasswordActual)}
                    helperText={errors.PasswordActual?.message}
                    size="small"
                    InputProps={{ //Inicio Icono Password
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
                    }}               // fin Icono Password    
                    sx={{ mb: 2, mt: textFieldEstilo }}
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-])(?=.*[0-9])/,
                    message: "La nueva contraseña debe contener al menos una letra mayúscula, una letra minúscula y un carácter especial (!@#$%^&*_-) y un número ",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Nueva Contraseña"
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
                    sx={{ mb: 2, mt: textFieldEstilo }}
                    onBlur={()=>{
                      trigger("NewPassword")
                    }}
                  />
                )}
              />
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
                    label="Confirmar Nueva Contraseña"
                    type={showPassword.confirmar ? "text" : "password"}
                    error={Boolean(errors.ConfirmarPassword)}
                    helperText={errors.ConfirmarPassword?.message}
                    size="small"
                    InputProps={{ //Inicio Icono Password
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onMouseUp={() => handleClickShowPassword('confirmar')}
                            onMouseDown={() => handleClickShowPassword('confirmar')}
                            edge="end"
                          >
                            {showPassword.confirmar ? <Visibility sx={{ fontSize: 15 }} /> : <VisibilityOff sx={{ fontSize: 15 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}               // fin Icono Password    
                    sx={{ mb: 2, mt: textFieldEstilo }}
                    onBlur={() => {
                      trigger("ConfirmarPassword")
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                
                fullWidth
                variant="contained"
                sx={{ mb: 2, mt: ButtonEstilo }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
              </Button>
            </Box>
          )}
          {!formVisible && ( // volver al inicio
            <Button
              variant="outlined"
              onClick={() => navigate('/admin')} //  de inicio  
              sx={{  mb: 2 ,mt: ButtonEstilo}}
            >
              Volver al Inicio
            </Button>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
} 