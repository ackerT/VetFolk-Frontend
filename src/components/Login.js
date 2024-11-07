import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import vetImage from '../img/vet.png';
import "./Login.css"

function Login() {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [registerForm, setRegisterForm] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    correo: '',
    password: ''
  });
  const [loginForm, setLoginForm] = useState({
    correo: '',
    password: ''
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
      const response = await fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerForm) // Simplificación
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Usuario creado con éxito');  // Mostrar ventana emergente
      }

      setRegisterMessage(data.message); // Mensaje de respuesta del backend
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
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();
      setLoginMessage(data.message); // Mensaje de respuesta del backend

      // Verifica si la respuesta es correcta y redirige
      if (response.ok && data.success) { // Asegúrate de que tu backend envíe el campo 'success'
        navigate('/Home'); // Redirecciona a la página de aterrizaje
      } else {
        setLoginMessage('Correo o contraseña incorrectos'); // Mensaje de error
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

    if (!form.primerNombre.trim()) {
      errors.primerNombre = "Primer nombre es requerido";
    }

    if (!form.primerApellido.trim()) {
      errors.primerApellido = "Primer apellido es requerido";
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

    if (!form.password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
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

    if (!form.password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
  };

  
  return (
    <div className={`back justify-content-center align-items-center d-flex shadow-lg ${isLoginActive ? "" : "active"}`} id="back">
      {/*---Formulario de registro---*/}
      <div className={`col-md-6 d-flex justify-content-center ${!isLoginActive ? 'active' : 'inactive'}`}>
        <form onSubmit={handleRegisterSubmit}>
          <div className='header-text mb-4 text-center'>
            <div className='icon-container1'>
              <i className="fa-solid fa-user-plus" style={{ fontSize: '40px', color: '#fff' }}></i>
            </div>
            <h1>Crear Cuenta</h1>
          </div>

          {errors.primerNombre && (
            <div className="error-message">
              {errors.primerNombre}
            </div>
          )}
          <div className='input-group mb-4'>
            <input type='text' name='primerNombre' placeholder='Primer nombre' className='form-control form-control-lg bg-light fs-6' value={registerForm.primerNombre} onChange={handleRegisterChange} />
          </div>


          <div className='input-group mb-4'>
            <input type='text' name='segundoNombre' placeholder='Segundo nombre' className='form-control form-control-lg bg-light fs-6' value={registerForm.segundoNombre} onChange={handleRegisterChange} />
          </div>

          {errors.primerApellido && (
            <div className="error-message">
              {errors.primerApellido}
            </div>
          )}

          <div className='input-group mb-4'>
            <input type='text' name='primerApellido' placeholder='Primer apellido' className='form-control form-control-lg bg-light fs-6' value={registerForm.primerApellido} onChange={handleRegisterChange} />
          </div>


          <div className='input-group mb-4'>
            <input type='text' name='segundoApellido' placeholder='Segundo apellido' className='form-control form-control-lg bg-light fs-6' value={registerForm.segundoApellido} onChange={handleRegisterChange} />
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

          {errors.password && (
            <div className="error-message">
              {errors.password}
            </div>
          )}

          <div className='input-group mb-4'>
            <input type='password' name='password' placeholder='Contraseña' className='form-control form-control-lg bg-light fs-6' value={registerForm.password} onChange={handleRegisterChange} />
          </div>

          <div className='input-group mb-3 justify-content-center'>
            <button className='btn border-#fff text-#2c6b6b w-55 fs-6' type='submit'>Regístrate</button>
          </div>
          {registerMessage && <p>{registerMessage}</p>}
        </form>
      </div>

      {/*---Formulario de inicio de sesión---*/}
      <div className={`col-md-6 right-box ${isLoginActive ? 'active' : 'inactive'}`}>
        <form onSubmit={handleLoginSubmit}>
          <div className='header-text mb-4'>
            <div className='icon-container1'>
              <i className="fa-solid fa-right-to-bracket" style={{ fontSize: '40px', color: '#fff' }}></i>
            </div>
            <h1>Iniciar Sesión</h1>
          </div>

          {loginErrors.correo && (
            <div className="error-message">
              {loginErrors.correo}
            </div>
          )}

          <div className='input-group mb-3'>
            <input type='email' name='correo' placeholder='Correo' className='form-control form-control-lg bg-light fs-6' value={loginForm.correo} onChange={handleLoginChange} />
          </div>

          {loginErrors.password && (
            <div className="error-message">
              {loginErrors.password}
            </div>
          )}

          <div className='input-group mb-3'>
            <input type='password' name='password' placeholder='Contraseña' className='form-control form-control-lg bg-light fs-6' value={loginForm.password} onChange={handleLoginChange} />
          </div>
          <div className='input-group mb-5 d-flex justify-content-between'>
            <div className='form-check'>
              <input type='checkbox' className='form-check-input' />
              <label htmlFor='formcheck' className='form-check-label'>
                <small>Recuérdame</small>
              </label>
            </div>
            <div className='forgot'>
              <small><a href='/'>¿Olvidaste tu contraseña?</a></small>
            </div>
          </div>
          <div className='input-group mb-3 justify-content-center'>
            <button className='btn border-#2c6b6b text-#2c6b6b w-50 fs-6' type='submit'>Iniciar Sesión</button>
          </div>
          {loginMessage && <p>{loginMessage}</p>}
        </form>
      </div>

      {/*--switch--*/}
      <div className='switch-back'>
        <div className='switch'>
          <div className='switch-panel switch-left'>
            <img src={vetImage} alt="Imagen de Bienvenida" className="welcome-img" />
            <h1>¡Hola de nuevo!</h1>
            <p>Inicia sesión ahora. ¡El bienestar de tu mejor amigo comienza aquí!</p>
            <button className='hidden btn border-#2c6b6b text-#2c6b6b w-50 fs-6' id='login' onClick={SwitchBack}>
              Iniciar Sesión
            </button>
            <div className='location'>
              <i className="fa-solid fa-location-dot" style={{ marginRight: '8px' }}></i>
              Las Lajas, Comayagua.
            </div>
          </div>
          <div className='switch-panel switch-right'>
            <img src={vetImage} alt="Imagen de Bienvenida" className="welcome-img" />
            <h1>¡Bienvenido!</h1>
            <p>Regístrate ahora y accede a todos nuestros servicios para el cuidado de tus mascotas.</p>
            <button className='hidden btn border-#2c6b6b text-#2c6b6b w-50 fs-6' id='register' onClick={SwitchBack}>
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