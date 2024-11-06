import React, { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { usuarios } from '../data/UsuarioData';
import { Modal, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
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

  // Estilos de los input
  const inputStyles = {
    color: '#00897b',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14px',
    marginBottom: '5px',  // Espaciado de 5px entre cada campo
    padding: '12px',
    borderRadius: '1px',
    border: '1px solid #ccc',
    width: '90%',
  };

  const buttonStyles = {
    backgroundColor: '#00897b',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    padding: '10px',
    width: '96%',// ancho de los botones
    marginTop:'25px',//separacion de los botones
    spacing: '10px',
    cursor: 'pointer',
  };

  return (
    <>
      <div style={{
        // estilo de la imagen 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        position: 'relative',
        minHeight: '100vh',
        zIndex: 1,
      }}>
        {/* Imagen de fondo con desenfoque */}
        <img 
          src={process.env.PUBLIC_URL + '/asset/imgServicios/sombreo3.png'} 
          alt="Fondo"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
            maxWidth: '550%',
            maxHeight: '500%',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 80%, rgba(0, 0, 0, 0))',
            maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 80%, rgba(0, 0, 0, 0))',
          }} 
        />
        
        <div style={{ width: '90%',
           maxWidth: '450px' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold', 
            fontSize: '30px',
            color: '#00897b'}}>
            Registro Roles
          </h2>
          <Button onClick={() => setOpenModal(true)} style={buttonStyles}>
            Registrar 
          </Button>

          {/* Modal de Registro */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={{
              position: 'absolute',
              top: '51%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '310px',
              bgcolor: 'background.paper',
              border: '1.5px solid #00897b',
              spacing:'15px',
              borderRadius: '10px',
              boxShadow: 24,
              padding: '28px',
            }}>
              <Typography variant="h6" sx={{ textAlign: 'center', 
                color: '#00897b', marginBottom: '20px', 
                
                fontWeight: 'bold'  }}>
                Completa el Registro
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} className="">
            <div    className='grid grid-flow-col grid-rows-4 gap-4'>
                {/* Primer y Segundo Nombre */}
                <div className="">
                    <div>
                      <TextField
                        label="Primer Nombre"
                        variant="outlined"
                        {...register("PrimerNombre", { required: "Primer nombre es requerido", maxLength: 50 })}
                        error={!!errors.PrimerNombre}
                        helperText={errors.PrimerNombre?.message}
                        sx={{ marginBottom: '5px', input: { color: '#00897b' }}}
                      />
                    </div>
                  
                    <div>
                      <TextField
                        label="Segundo Nombre"
                        variant="outlined"
                        {...register("SegundoNombre", { maxLength: 50 })}
                        sx={{ marginBottom: '5px', input: { color: '#00897b' }}}
                      />
                    </div>
                </div>
                
                {/* Primer y Segundo Apellido */}
                <div className="">
                    <div>
                      <TextField
                        label="Primer Apellido"
                        variant="outlined"
                        {...register("PrimerApellido", { required: "Primer apellido es requerido", maxLength: 50 })}
                        error={!!errors.PrimerApellido}
                        helperText={errors.PrimerApellido?.message}
                        sx={{ marginBottom: '5px', 
                          input: { color: '#00897b' }}}
                      />
                    </div>

                    <div>
                      <TextField
                        label="Segundo Apellido"
                        variant="outlined"
                        {...register("SegundoApellido", { maxLength: 50 })}
                        sx={{ marginBottom: '5px',
                           input: { color: '#00897b' }}}
                      />
                    </div>
                </div>
                
              <div   className=""> 
                  <div>
                    {/* Correo */}
                    <TextField
                      label="Correo"
                          variant="outlined"
                          type="email"
                          {...register("Correo", {
                            required: "Correo es requerido",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de correo inválido" }
                          })}
                          error={!!errors.Correo}
                          helperText={errors.Correo?.message}
                          sx={{ marginBottom: '5px', 
                            input: { color: '#00897b' }}}
                        />
                      </div>  
                      {/* contraseña */}
                     <div>
                      {/* Contraseña */}
                      <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        {...register("Contraseña", {
                          required: "La contraseña es requerida",
                          pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{6,}$/,
                            message: "Debe tener 6 caracteres, al menos un dígito"
                          }
                        })}
                        error={!!errors.Contraseña}
                        helperText={errors.Contraseña?.message}
                        sx={{ marginBottom: '5px',
                           input: { color: '#00897b' }}}
                      />
                      {/* Confirmar Contraseña */}
                      </div>
                  </div>

                    {/* Teléfono */}
                    <TextField
                      label="Teléfono"
                      variant="outlined"
                      type="text"
                      {...register("Telefono", { required: true, pattern: /^[0-9]{8}$/ })}
                      error={!!errors.Telefono}
                      helperText={errors.Telefono?.message}
                      sx={{ marginBottom: '5px', input: { color: '#00897b' }}}
                    />

                {/* Asignar Rol */}
                <FormControl fullWidth sx={{ marginBottom: '0px' }}>
                  <InputLabel 
                  style={{ color: '#00897b',
                   fontFamily: 'Poppins, sans-serif ',
                    marginTop:'10px',//separacion de los botones
                    withShadow:'5px',
                    fontWeight:'bold',
                    fontSize:'20px',
                     }}>  
                     Rol
                 </InputLabel>
                  <Select
                    value={role}
                     type=" Asignar Rol"
                    onChange={(e) => setRole(e.target.value)}
                    label="Asignar Rol"
                    sx={{ 
                      marginBottom: '10px',
                      color: '#00897b',
                    fontcolor: '#fff',
                      border: '0px solid #00897b', 
                      fontFamily: 'Poppins, sans-serif', 
                      fontSize: '16px',
                       height:'50px',
                       fontWeight: 'bold',
                        padding: '10px',// separo la letra delntro del input
                        width: '200px',// ancho de los botones
                        marginTop:'10px',//separacion de los botones
                        spacing: '1px',
                       
                       }}
                  >
                    <MenuItem value="Cliente">Cliente</MenuItem>
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Recepcionista">Recepcionista</MenuItem>
                    <MenuItem value="Veterinario">Veterinario</MenuItem>
                  </Select>
                </FormControl>

                {/* Botón para registrar */}
                <Button type="submit" style={buttonStyles}>Registrar</Button>
              {/* cierre del div del form  */}
            </div>
              </form>
            </Box>
          </Modal>

          <Button onClick={goToGestionarRoles} style={buttonStyles}>Gestionar Roles</Button>

          {showSuccessAlert && (
            <Alert severity="success" onClose={() => setShowSuccessAlert(false)}
             style={{ marginTop: '20px' }}>
              Su registrato fue éxito.
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
