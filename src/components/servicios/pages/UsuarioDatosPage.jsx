import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { usuarios } from '../data/UsuarioData';
import { Modal, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UsuarioDatosPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState('Cliente');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    usuarios.push({
      IdUsuario: usuarios.length + 1,
      contraseña: data.Contraseña,
      nombre: data["Nombre Completo"].split(' ')[0],
      apellido: data["Nombre Completo"].split(' ')[1] || '',
      nombreCliente: data["Nombre Completo"],
      rol: role,
      contacto: data.Telefono
    });

    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const goToGestionarRoles = () => {
    navigate('/admin/gestionar-roles');
  };

  const inputStyles = {
    color: '#00897b',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '15px',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '0px',
    border: '1px solid #ccc',
    width: '98%'
  };

  const labelStyles = {
    color: '#00897b',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const labelRoll = {
    color: '#00897b',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '5px',
    paddingTop:'15px'
  };


  const selectStyles = {
    color: '#00897b',
    height: '49px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '15px',
    border: '1px solid #00897b',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px',
  };

  const buttonStyles = {
    color: '#00897b',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    backgroundColor: '#fff',
    border: '1px solid #00897b',
    cursor: 'pointer',
    marginTop: '10px',
    padding: '6px 12px',
    borderRadius: '4px',
    width: '98%',
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#00897b' , fontWeight: 'bold', }}> Registro de Usuarios </h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '300px', margin: 'auto' }}>
        <label style={labelStyles}>Nombre Completo</label>
        <input
          type="text"
          placeholder="Nombre Completo"
          {...register("Nombre Completo", { required: true, maxLength: 100 })}
          style={inputStyles}
        />
        {errors["Nombre Completo"] && <p style={{ color: 'red' }}>El nombre completo es obligatorio y debe tener máximo 100 caracteres.</p>}

        <label style={labelStyles}>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("Contraseña", {
            required: true,
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8}$/,
              message: "La contraseña debe tener entre 8 caracteres, al menos un dígito, una minúscula y una mayúscula, sin símbolos."
            }
          })}
          style={inputStyles}
        />
        {errors.Contraseña && <p style={{ color: 'red' }}>{errors.Contraseña.message}</p>}

        <label style={labelStyles}>Teléfono</label>
        <input
          type="text"
          placeholder="Teléfono"
          {...register("Telefono", { required: true, pattern: /^[0-9]{8}$/ })}
          style={inputStyles}
        />
        {errors.Telefono && <p style={{ color: 'red' }}>El teléfono es obligatorio y debe tener 8 dígitos.</p>}

        <FormControl fullWidth sx={{ marginBottom: '16px' , fontWeight: 'bold', fontSize: '30px', paddingTop:'25px'}}>
          <InputLabel id="select-role-label" style={labelRoll }> Asignar Rol </InputLabel>
          <Select
            labelId="select-role-label"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={selectStyles}
            MenuProps={{
              PaperProps: {
                style: {
                  border: '#00897b',
                  fontWeight: 'bold',
                  color: '#00897b',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                },
              },
            }}
          >
            <MenuItem value="Cliente">Cliente</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
            <MenuItem value="Recepcionista">Recepcionista</MenuItem>
            <MenuItem value="Veterinario">Veterinario</MenuItem>
          </Select>
        </FormControl>

        <input type="submit" value="Registrar" style={{ ...inputStyles, backgroundColor: '#00897b', color: '#fff', cursor: 'pointer' }} />
        
        <Button onClick={goToGestionarRoles} style={buttonStyles}>
          Ir a Gestionar Roles
        </Button>
      </form>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyles, width: 300, p: 3 }}>
          <Typography variant="h6" style={{ fontFamily: 'Poppins, sans-serif', color: '#00897b', fontSize: '13px' }}>
            ¡Registro Exitoso!
          </Typography>
          <Typography sx={{ mt: 2, fontFamily: 'Poppins, sans-serif', fontSize: '13px' }}>
            El usuario ha sido registrado correctamente.
          </Typography>
          <Button onClick={handleCloseModal} sx={{ mt: 3, backgroundColor: '#00897b', color: '#fff', fontSize: '13px' }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  fontFamily: 'Poppins, sans-serif',
   color: '#00897b', 
   fontSize: '25px' ,
  boxShadow: 30,
  borderRadius: 2,
  p: 4
};
