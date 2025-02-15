import React, { useState } from 'react';

const Servicio = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');  // Cambiado de tipoServicio a name
  const [description, setDescription] = useState('');  // Cambiado de descripcion a description
  const [detalle, setDetalle] = useState('');  // Agregado nuevo campo detalle
  const [mensaje, setMensaje] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file || !name || !description || !detalle) {  // Actualizado para incluir detalle
      setMensaje('Por favor completa todos los campos.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);  // Cambiado de tipoServicio a name
    formData.append('description', description);  // Cambiado de descripcion a description
    formData.append('detalle', detalle);  // Agregado nuevo campo detalle

    try {
      const response = await fetch('http://localhost:3000/servicios/crear', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensaje('Servicio creado exitosamente.');
      } else {
        setMensaje('Error al crear el servicio.');
      }
    } catch (error) {
      setMensaje('Error de red: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre del Servicio:  {/* Cambiado de Tipo de Servicio a Nombre del Servicio */}
          <input
            type="text"
            value={name}  // Cambiado de tipoServicio a name
            onChange={(e) => setName(e.target.value)}  // Cambiado de tipoServicio a name
            required
          />
        </label>
      </div>
      <div>
        <label>
          Descripción:
          <textarea
            value={description}  // Cambiado de descripcion a description
            onChange={(e) => setDescription(e.target.value)}  // Cambiado de descripcion a description
            required
          />
        </label>
      </div>
      <div>
        <label>
          Detalle:  {/* Agregado nuevo campo detalle */}
          <textarea
            value={detalle}  // Agregado nuevo campo detalle
            onChange={(e) => setDetalle(e.target.value)}  // Agregado nuevo campo detalle
            required
          />
        </label>
      </div>
      <div>
        <label>
          Subir Imagen:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
      </div>
      <button type="submit">Crear Servicio</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default Servicio;
