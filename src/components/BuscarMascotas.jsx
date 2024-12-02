import React, { useState, useEffect } from 'react';
import { DataGrid, GRID_DEFAULT_LOCALE_TEXT } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h5: {
      color: '#2c6b6b',
      margin: '20px',
      fontWeight: '600',
    },
    h6: {
      color: '#2c6b6b',
      margin: '20px',
      
    },
  },
}
);

const ButtonEstilo = {
  backgroundColor: "rgba(44, 107, 107, 0.2)", // Color de la etiqueta al enfocar
  border: "1px solid #2c6b6b",
  // color: "#2c6b6b",
  color: "#2c6b6b",
  margin: "10px",
}

const Mascotas = () => {
  const [ownerQuery, setOwnerQuery] = useState('');
  const [pets, setPets] = useState([]);
  const [/* searchResults */, setSearchResults] = useState([]);

  const [ownerInfo, setOwnerInfo] = useState({ IdUsuario: '', Nombre: '' });
  const [matchingOwners, setMatchingOwners] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOwnerPets, setSelectedOwnerPets] = useState([]);

  useEffect(() => {
    const initialPets = [
      { id_mascota: 1, nombre_especie: 'Perro', nombre_raza: 'Labrador', genero: 'Macho', nombre_mascota: 'Rex', edad: 5, peso: 30, agresiva: false, esterilizada: true, IdUsuario: '123', Nombre: 'Juan Pérez' },
      { id_mascota: 2, nombre_especie: 'Gato', nombre_raza: 'Siames', genero: 'Hembra', nombre_mascota: 'Mia', edad: 3, peso: 4, agresiva: false, esterilizada: true, IdUsuario: '456', Nombre: 'Ana Gómez' },
      { id_mascota: 3, nombre_especie: 'Perro', nombre_raza: 'Labrador', genero: 'Macho', nombre_mascota: 'Yuki', edad: 3, peso: 4, agresiva: false, esterilizada: true, IdUsuario: '456', Nombre: 'Ana Gómez' },
      { id_mascota: 4, nombre_especie: 'Tortuga', nombre_raza: 'Desconocida', genero: 'Macho', nombre_mascota: 'Tito', edad: 7, peso: 1, agresiva: false, esterilizada: false, IdUsuario: '789', Nombre: 'Juan Henriquez' },
    ];
    setPets(initialPets);
  }, []);

  const handleSearch = () => {
    const results = pets.filter(
      (pet) =>
        pet.IdUsuario.includes(ownerQuery) ||
        pet.Nombre.toLowerCase().includes(ownerQuery.toLowerCase())
    );
    setSearchResults(results);

    const uniqueOwners = Array.from(
      new Set(results.map((pet) => JSON.stringify({ IdUsuario: pet.IdUsuario, Nombre: pet.Nombre })))
    ).map((owner) => JSON.parse(owner));

    if (uniqueOwners.length > 1) {
      setMatchingOwners(uniqueOwners);
      setDialogOpen(true);
    } else if (uniqueOwners.length === 1) {
      handleOwnerSelect(uniqueOwners[0]);
    } else {
      setOwnerInfo({ IdUsuario: '', Nombre: '' });
      setSelectedOwnerPets([]);
    }
  };

  const handleOwnerChange = (e) => {
    setOwnerQuery(e.target.value);
  };

  const handleOwnerSelect = (owner) => {
    setOwnerInfo(owner);
    const ownerPets = pets.filter((pet) => pet.IdUsuario === owner.IdUsuario);
    setSelectedOwnerPets(ownerPets);
    setDialogOpen(false);
  };

  const handleAddPet = () => {
    alert("Agregar nueva mascota");
  };

  const handleViewDetails = (petId) => {
    alert(`Detalles de la mascota con ID: ${petId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h5">Buscar Mascotas</Typography>
        <div>
          <label htmlFor="ownerQuery">Buscar por ID o Nombre del Propietario</label>
          <input
            type="text"
            id="ownerQuery"
            value={ownerQuery}
            onChange={handleOwnerChange}
          />
          <Button onClick={handleSearch} sx={{ mb: 2, mt: ButtonEstilo }}>Buscar</Button>
          <Button onClick={handleAddPet} sx={{ mb: 2, mt: ButtonEstilo }}>Agregar Nueva Mascota</Button>
        </div>

        {selectedOwnerPets.length > 0 && (
          <div>
            <Typography variant="h5">Propietario: {ownerInfo.Nombre} (ID: {ownerInfo.IdUsuario})</Typography>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black', padding: '7px' }}>ID Mascota</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Especie</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Raza</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Género</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Nombre</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Edad</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Peso</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Agresiva</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Esterilizada</th>
                  <th style={{ border: '1px solid black', padding: '7px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedOwnerPets.map((pet) => (
                  <tr key={pet.id_mascota}>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.id_mascota}</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.nombre_especie}</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.nombre_raza}</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.genero}</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.nombre_mascota}</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.edad} años</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.peso} kg</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.agresiva ? 'Sí' : 'No'}</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>{pet.esterilizada ? 'Sí' : 'No'}</td>
                    <td style={{ border: '1px solid black', padding: '7px' }}>
                    <Button onClick={() => handleViewDetails(pet.id_mascota)} sx={{ mb: 2, mt: ButtonEstilo }}>
                  Editar 
                  </Button>   
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Seleccionar Propietario</DialogTitle>
          <DialogContent>
            {matchingOwners.map((owner) => (
              <Button key={owner.IdUsuario}
                onClick={() => handleOwnerSelect(owner)} sx={{ mt: ButtonEstilo }}>
                {owner.Nombre} (ID: {owner.IdUsuario})
              </Button>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => 
               setDialogOpen(false)} sx={{ mt: ButtonEstilo }} >Cancelar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Mascotas;
