// Aca estoy trabajando el registro
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usuarios } from '../data/UsuarioData';
import { Modal, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export const UsuarioDatosPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [role, setRole] = useState('Cliente');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    usuarios.push({
      IdUsuario: usuarios.length + 1,
      contraseña: data.Contraseña,
      primerNombre: data.PrimerNombre,
      segundoNombre: data.SegundoNombre,
      primerApellido: data.PrimerApellido,
      segundoApellido: data.SegundoApellido,
      correo: data.Correo,
      nombreCliente: `${data.PrimerNombre} ${data.SegundoNombre} ${data.PrimerApellido} ${data.SegundoApellido}`,
      rol: role,
      contacto: data.Telefono
    });

    setShowSuccessAlert(true);
    setOpenModal(false);

    setTimeout(() => {
      navigate('/admin/gestionar-roles');
    }, 2000);
  };

  const handleCloseModal = () => setOpenModal(false);
  const goToGestionarRoles = () => {
    navigate('/admin/gestionar-roles');
  };

  const inputStyles = {
    color: '#00897b',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '10px',
    marginBottom: '1px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%'
  };

  const labelStyles = {
    color: '#00897b',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '15px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const buttonStyles = {
    backgroundColor: '#00897b',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    marginTop: '20px',
    padding: '12px',
    width: '100%',
    cursor: 'pointer'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#00897b', fontWeight: 'bold', textAlign: 'center' }}>
          Registro Roles
        </h2>

        <Button onClick={() => setOpenModal(true)} style={buttonStyles}>
          Registrar 
        </Button>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ ...modalStyles }}>
            <div style={{ padding: '30px', overflowY: 'auto', maxHeight: '400px' }}>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '80%' }}>
                {/* Primer Nombre */}
                <label style={labelStyles}>Primer Nombre</label>
                <input
                  type="text"
                  {...register("PrimerNombre", { required: "Primer nombre es requerido", maxLength: 50 })}
                  style={inputStyles}
                />
                {errors.PrimerNombre && <p style={{ color: 'red' }}>{errors.PrimerNombre.message}</p>}

                {/* Segundo Nombre */}
                <label style={labelStyles}>Segundo Nombre</label>
                <input
                  type="text"
                  {...register("SegundoNombre", { maxLength: 50 })}
                  style={inputStyles}
                />

                {/* Primer Apellido */}
                <label style={labelStyles}>Primer Apellido</label>
                <input
                  type="text"
                  {...register("PrimerApellido", { required: "Primer apellido es requerido", maxLength: 50 })}
                  style={inputStyles}
                />
                {errors.PrimerApellido && <p style={{ color: 'red' }}>{errors.PrimerApellido.message}</p>}

                {/* Segundo Apellido */}
                <label style={labelStyles}>Segundo Apellido</label>
                <input
                  type="text"
                  {...register("SegundoApellido", { maxLength: 50 })}
                  style={inputStyles}
                />

                {/* Correo */}
                <label style={labelStyles}>Correo</label>
                <input
                  type="email"
                  {...register("Correo", {
                    required: "Correo es requerido",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de correo inválido" }
                  })}
                  style={inputStyles}
                />
                {errors.Correo && <p style={{ color: 'red' }}>{errors.Correo.message}</p>}

                {/* Contraseña */}
                <label style={labelStyles}>Contraseña</label>
                <input
                  type="password"
                  {...register("Contraseña", {
                    required: "La contraseña es requerida",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,}$/,
                      message: "Debe tener 6 caracteres, una mayúscula y un dígito"
                    }
                  })}
                  style={inputStyles}
                />
                {errors.Contraseña && <p style={{ color: 'red' }}>{errors.Contraseña.message}</p>}

                {/* Teléfono */}
                <label style={labelStyles}>Teléfono</label>
                <input
                  type="text"
                  {...register("Telefono", { required: true, pattern: /^[0-9]{8}$/ })}
                  style={inputStyles}
                />
                {errors.Telefono && <p style={{ color: 'red' }}>El teléfono es obligatorio y debe tener 8 dígitos.</p>}

                {/* ROL */}
                <FormControl fullWidth sx={{ marginBottom: '5px' }}>
                  <InputLabel id="select-role-label" style={labelStyles}>Asignar Rol</InputLabel>
                  <Select
                    labelId="select-role-label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{
                      color: '#00897b',
                      height: '30px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '15px',
                      border: '1px solid #00897b',
                      borderRadius: '10px',
                      margin: '10px 0',
                      padding: '10px 0'
                    }}
                  >
                    <MenuItem value="Cliente">Cliente</MenuItem>
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Recepcionista">Recepcionista</MenuItem>
                    <MenuItem value="Veterinario">Veterinario</MenuItem>
                  </Select>
                </FormControl>

                <input type="submit" value="Registrar" 
                  style={{
                    ...inputStyles, 
                    backgroundColor: '#fff',
                    fontStyle: 'bold',
                    fontSize: '14px',
                    width: '235px',
                    height: '45px',
                    color: '#00897b',
                    cursor: 'pointer'
                  }}
                />
              </form>
            </div>
          </Box>
        </Modal>

        <Button onClick={goToGestionarRoles} style={buttonStyles}>
          Gestionar Roles
        </Button>

        {showSuccessAlert && (
          <Alert severity="success" onClose={() => setShowSuccessAlert(false)} 
          style={{ marginTop: '10px', fontFamily: 'Poppins, sans-serif' }}>
            ¡Registro exitoso! Redireccionando...
          </Alert>
        )}
      </div>
    </div>
  );
};

// Estilos de la modal
const modalStyles = {
  position: 'absolute',
  fontSize: '18px',
  textAlign: 'left',
  top: '15%',
  marginTop: '130px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '300px',
  bgcolor: 'background.paper',
  border: '3px solid #00897b',
  borderRadius: '10px',
  boxShadow: 30,
  outline: 'none'
};
