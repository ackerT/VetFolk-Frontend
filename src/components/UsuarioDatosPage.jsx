import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AdminSideBar from './AdminSideBar';

export const UsuarioDatosPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [role, setRole] = useState('Cliente'); // Aquí "Cliente" es el rol inicial por defecto
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const usuarioData = {
      nombre1: data.PrimerNombre,
      nombre2: data.SegundoNombre,
      apellido1: data.PrimerApellido,
      apellido2: data.SegundoApellido,
      telefono: data.Telefono,
      correo: data.Correo,
      contrasena: data.Contraseña,
      idRol: role === 'Cliente' ? 1 : role === 'Administrador' ? 2 : role === 'Veterinario' ? 3 : role === 'Recepcionista' ? 4 : 5
    };

    try {
      const response = await fetch('http://18.221.225.5/personas/crearrol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
      });

      if (response.ok) {
        setShowSuccessAlert(true);

        // Redirige a la página de gestión de roles después de un pequeño retraso
        setTimeout(() => {
          navigate('/admin/gestionar-roles');
        }, 2000);
      } else {
        console.error("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const goToGestionarRoles = () => {
    navigate('/admin/gestionar-roles');
  };

  // Estilos de los inputs y botones (simplificados para claridad)
  const inputStyles = { color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontSize: '14px', marginBottom: '10px', padding: '12px', borderRadius: '1px', border: '1px solid #ccc', width: '90%' };
  const buttonStyles = { backgroundColor: '#2c6b6b', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', padding: '10px', width: '96%', marginTop: '25px', marginLeft: '14px', cursor: 'pointer', textTransform: 'capitalize',  };

  return (
    <>
      <AdminSideBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', position: 'relative', minHeight: '100vh', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '30px', color: '#ea3c3c', position: 'absolute', top: 50, left: 150 }}>Registrar Usuarios</h2>

          {/* Formulario de Registro */}
          <Box sx={{ width: '568px', bgcolor: 'background.paper', border: '1.5px solid #2c6b6b', borderRadius: '10px', boxShadow: 24, padding: '28px', alignContent: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-flow-col grid-rows-4 gap-4">
                {/* Campos del formulario */}
                <div><TextField label="Primer Nombre" variant="outlined" {...register("PrimerNombre", { required: "Primer nombre es requerido", maxLength: 50 })} error={!!errors.PrimerNombre} helperText={errors.PrimerNombre?.message} sx={{ marginBottom: '10px', input: { color: '#2c6b6b' }}} />
                <TextField label="Segundo Nombre" variant="outlined" {...register("SegundoNombre", { maxLength: 50 })} sx={{ marginBottom: '10px', marginLeft: '10px', input: { color: '#2c6b6b' }}} />
                <TextField label="Primer Apellido" variant="outlined" {...register("PrimerApellido", { required: "Primer apellido es requerido", maxLength: 50 })} error={!!errors.PrimerApellido} helperText={errors.PrimerApellido?.message} sx={{ marginBottom: '10px', input: { color: '#2c6b6b' }}} />
                <TextField label="Segundo Apellido" variant="outlined" {...register("SegundoApellido", { maxLength: 50 })} sx={{ marginBottom: '10px', marginLeft: '10px', input: { color: '#2c6b6b' }}} />
                <TextField label="Correo" variant="outlined" type="email" {...register("Correo", { required: "Correo es requerido", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de correo inválido" } })} error={!!errors.Correo} helperText={errors.Correo?.message} sx={{ marginBottom: '10px', input: { color: '#2c6b6b' }}} />
                <TextField label="Contraseña" variant="outlined" type="password" {...register("Contraseña", { required: "La contraseña es requerida", pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,}$/, message: "Debe tener 6 caracteres, al menos un dígito" } })} error={!!errors.Contraseña} helperText={errors.Contraseña?.message} sx={{ marginBottom: '10px', marginLeft: '10px', input: { color: '#2c6b6b' }}} />
                <TextField label="Teléfono" variant="outlined" type="text" {...register("Telefono", { required: true, pattern: /^[0-9]{8}$/ })} error={!!errors.Telefono} helperText={errors.Telefono?.message} sx={{ marginBottom: '10px', input: { color: '#2c6b6b' }}} />
                
                <FormControl fullWidth sx={{ marginBottom: '0px' }}>
                  <InputLabel style={{ color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '20px' }}>Rol</InputLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)} label="Asignar Rol" sx={{ marginBottom: '10px', color: '#2c6b6b', fontFamily: 'Poppins, sans-serif', fontSize: '16px', height: '50px', fontWeight: 'bold', padding: '10px', width: '200px', marginTop: '10px' }}>
                    <MenuItem value="Cliente">Cliente</MenuItem>
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Recepcionista">Recepcionista</MenuItem>
                    <MenuItem value="Veterinario">Veterinario</MenuItem>
                  </Select>
                </FormControl>
                </div>

                {/* Botón para registrar */}
                <Button type="submit" style={buttonStyles}>Registrar</Button>
              </div>
            </form>
          </Box>

          <Button onClick={goToGestionarRoles} style={buttonStyles}>Gestionar Roles</Button>
          {showSuccessAlert && <Alert severity="success" style={{ marginTop: '10px' }}>¡Usuario registrado exitosamente!</Alert>}
        </div>
      </div>
    </>
  );
};

export default UsuarioDatosPage;