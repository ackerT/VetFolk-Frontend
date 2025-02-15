import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import vetImage from '../img/vet.png';
import "./Login.css"
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [registerForm, setRegisterForm] = useState({
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    telefono: '',
    correo: '',
    contrasena: ''
  });
  const [loginForm, setLoginForm] = useState({
    correo: '',
    contrasena: ''
  });

  const [registerMessage, setRegisterMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  
  const navigate = useNavigate(); // Inicializa useNavigate

  function SwitchBack() {
    setIsLoginActive(!isLoginActive);
  }

  // Maneja el cambio en los inputs del formulario de registro
  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  // Maneja el cambio en los inputs del formulario de login
  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  // Función para enviar los datos de registro al backend
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = onValidate(registerForm);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3008/personas/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerForm)
        });

        const data = await response.json();
        
        if (response.ok) {
          alert('Usuario creado con éxito');
        }

        setRegisterMessage(data.message);
      } catch (error) {
        setRegisterMessage('Error al registrar al usuario');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // Función para enviar los datos de login al backend
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationLoginErrors = onLoginValidate(loginForm);
    if (Object.keys(validationLoginErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3008/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginForm)
        });

        const data = await response.json();
        setLoginMessage(data.message);

        if (response.ok && data.token) {
          // Guardamos el JWT y el userId en el localStorage
          sessionStorage.setItem('token', data.token);
          const decodedToken = jwtDecode(data.token);
          const userRole = decodedToken.rol;
          const userId = decodedToken.userId; // Asumiendo que el userId está en el token

          sessionStorage.setItem('userId', userId); // Guarda el userId en localStorage

          if (userRole === 'Cliente') {
            navigate('/home'); // Redirige a la página de Cliente
          } else if (userRole === 'Administrador') {
            navigate('/admin'); // Redirige a la página de Admin
          } else {
            setLoginMessage('Rol no reconocido');
          }
        } else {
          setLoginMessage('Correo o contraseña incorrectos');
        }
      } catch (error) {
        setLoginMessage('Error al iniciar sesión');
      }
    } else {
      setLoginErrors(validationLoginErrors);
    }
  };
 



  const onValidate = (form) => {
    let errors = {};

    if (!form.nombre1.trim()) {
      errors.nombre1 = "Primer nombre es requerido";
    }

    if (!form.apellido1.trim()) {
      errors.apellido1 = "Primer apellido es requerido";
    }

    if (!form.telefono.trim()) {
      errors.telefono = "El número de teléfono es requerido";
    } else if (!/^\d{8}$/.test(form.telefono)) {
      errors.telefono = "El teléfono debe contener exactamente 8 dígitos";
    }

    if (!form.correo.trim()) {
      errors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      errors.correo = "Formato de correo incorrecto";
    }

    if (!form.contrasena.trim()) {
      errors.contrasena = "La contraseña es requerida";
    } else if (form.contrasena.length < 8) {
      errors.contrasena = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
  };

  const onLoginValidate = (form) => {
    let errors = {};

    if (!form.correo.trim()) {
      errors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      errors.correo = "Formato de correo incorrecto";
    }

    if (!form.contrasena.trim()) {
      errors.contrasena = "La contraseña es requerida";
    } else if (form.contrasena.length < 8) {
      errors.contrasena = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
  };

  
  return (
    <div className={`back justify-content-center align-items-center d-flex shadow-lg ${isLoginActive ? "" : "active"}`} id="back">
      {/*---Formulario de registro---*/}
      <div className={`col-md-6 d-flex justify-content-center ${!isLoginActive ? 'active' : 'inactive'}`}>
        <form onSubmit={handleRegisterSubmit}>
          <div className='header-text mb-4 text-center'>
            <div className='icon-container-login'>
              <i className="fa-solid fa-user-plus" style={{ fontSize: '40px', color: '#fff' }}></i>
            </div>
            <h1 className='title-login'>Crear Cuenta</h1>
          </div>

          {errors.nombre1 && (
            <div className="error-message">
              {errors.nombre1}
            </div>
          )}
          <div className='input-group mb-4'>
            <input type='text' name='nombre1' placeholder='Primer nombre' className='form-control form-control-lg bg-light fs-6' value={registerForm.nombre1} onChange={handleRegisterChange} />
          </div>


          <div className='input-group mb-4'>
            <input type='text' name='nombre2' placeholder='Segundo nombre' className='form-control form-control-lg bg-light fs-6' value={registerForm.nombre2} onChange={handleRegisterChange} />
          </div>

          {errors.apellido1 && (
            <div className="error-message">
              {errors.apellido1}
            </div>
          )}

          <div className='input-group mb-4'>
            <input type='text' name='apellido1' placeholder='Primer apellido' className='form-control form-control-lg bg-light fs-6' value={registerForm.apellido1} onChange={handleRegisterChange} />
          </div>


          <div className='input-group mb-4'>
            <input type='text' name='apellido2' placeholder='Segundo apellido' className='form-control form-control-lg bg-light fs-6' value={registerForm.apellido2} onChange={handleRegisterChange} />
          </div>


          {errors.telefono && (
            <div className="error-message">
              {errors.telefono}
            </div>
          )}

          <div className='input-group mb-4'>
            <input type='text' name='telefono' placeholder='Número de teléfono' className='form-control form-control-lg bg-light fs-6' value={registerForm.telefono} onChange={handleRegisterChange} />
          </div>

          {errors.correo && (
            <div className="error-message">
              {errors.correo}
            </div>
          )}

          <div className='input-group mb-4'>
            <input type='email' name='correo' placeholder='Correo' className='form-control form-control-lg bg-light fs-6' value={registerForm.correo} onChange={handleRegisterChange} />
          </div>

          {errors.contrasena && (
            <div className="error-message">
              {errors.contrasena}
            </div>
          )}

          <div className='input-group mb-4'>
            <input type='password' name='contrasena' placeholder='Contraseña' className='form-control form-control-lg bg-light fs-6' value={registerForm.contrasena} onChange={handleRegisterChange} />
          </div>

          <div className='input-group mb-3 justify-content-center'>
            <button className='button-back-login w-55 fs-6' type='submit'>Regístrate</button>
          </div>
          {registerMessage && <p className='text-login'>{registerMessage}</p>}
        </form>
      </div>

      {/*---Formulario de inicio de sesión---*/}
      <div className={`col-md-6 right-box ${isLoginActive ? 'active' : 'inactive'}`}>
        <form onSubmit={handleLoginSubmit}>
          <div className='header-text mb-4'>
            <div className='icon-container-login'>
              <i className="fa-solid fa-right-to-bracket" style={{ fontSize: '40px', color: '#fff' }}></i>
            </div>
            <h1 className='title-login'>Iniciar Sesión</h1>
          </div>

          {loginErrors.correo && (
            <div className="error-message">
              {loginErrors.correo}
            </div>
          )}

          <div className='input-group mb-3'>
            <input type='email' name='correo' placeholder='Correo' className='form-control form-control-lg bg-light fs-6' value={loginForm.correo} onChange={handleLoginChange} />
          </div>

          {loginErrors.contrasena && (
            <div className="error-message">
              {loginErrors.contrasena}
            </div>
          )}

          <div className='input-group mb-3'>
            <input type='password' name='contrasena' placeholder='Contraseña' className='form-control form-control-lg bg-light fs-6' value={loginForm.contrasena} onChange={handleLoginChange} />
          </div>
          <div className='input-group mb-5 d-flex justify-content-between'>
            <div className='form-check'>
              <input type='checkbox' className='form-check-input' />
              <label htmlFor='formcheck' className='form-check-label'>
                <small className='recuerdame-login'>Recuérdame</small>
              </label>
            </div>
            <div className='forgot'>
              <small><a href='/'>¿Olvidaste tu contraseña?</a></small>
            </div>
          </div>
          <div className='input-group mb-3 justify-content-center'>
            <button className='button-back-login w-50 fs-6' type='submit'>Iniciar Sesión</button>
          </div>
          {loginMessage && <p className='error-message-l'>{loginMessage}</p>}
        </form>
      </div>

      {/*--switch--*/}
      <div className='switch-back'>
        <div className='switch'>
          <div className='switch-panel switch-left'>
            <img src={vetImage} alt="Imagen de Bienvenida" className="welcome-img" />
            <h1 className='title-login-switch'>¡Hola de nuevo!</h1>
            <p className='text-login'>Inicia sesión ahora. ¡El bienestar de tu mejor amigo comienza aquí!</p>
            <button className='hidden button-switch-login border-#2c6b6b text-#2c6b6b w-50 fs-6' id='login' onClick={SwitchBack}>
              Iniciar Sesión
            </button>
            <div className='location'>
              <i className="fa-solid fa-location-dot" style={{ marginRight: '8px' }}></i>
              Las Lajas, Comayagua.
            </div>
          </div>
          <div className='switch-panel switch-right'>
            <img src={vetImage} alt="Imagen de Bienvenida" className="welcome-img" />
            <h1 className='title-login-switch'>¡Bienvenido!</h1>
            <p className='text-login'>Regístrate ahora y accede a todos nuestros servicios para el cuidado de tus mascotas.</p>
            <button className='hidden button-switch-login border-#2c6b6b text-#2c6b6b w-50 fs-6' id='register' onClick={SwitchBack}>
              Crear Cuenta
            </button>
            <div className='location'>
              <i className="fa-solid fa-location-dot" style={{ marginRight: '8px' }}></i>
              Las Lajas, Comayagua.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;