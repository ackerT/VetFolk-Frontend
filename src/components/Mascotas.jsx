import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Mascotas = () => {
  const [ownerQuery, setOwnerQuery] = useState('');
  const [pets, setPets] = useState([]);
  const [/* searchResults */, setSearchResults] = useState([]);
  const [ownerInfo, setOwnerInfo] = useState({ ownerId: '', ownerName: '' });
  const [matchingOwners, setMatchingOwners] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOwnerPets, setSelectedOwnerPets] = useState([]);

  useEffect(() => {
    const initialPets = [
      { id_mascota: 1, nombre_especie: 'Perro', nombre_raza: 'Labrador', genero: 'Macho', nombre_mascota: 'Rex', edad: 5, peso: 30, agresiva: false, esterilizada: true, ownerId: '123', ownerName: 'Juan Pérez' },
      { id_mascota: 2, nombre_especie: 'Gato', nombre_raza: 'Siames', genero: 'Hembra', nombre_mascota: 'Mia', edad: 3, peso: 4, agresiva: false, esterilizada: true, ownerId: '456', ownerName: 'Ana Gómez' },
      { id_mascota: 3, nombre_especie: 'Perro', nombre_raza: 'Labrador', genero: 'Macho', nombre_mascota: 'Yuki', edad: 3, peso: 4, agresiva: false, esterilizada: true, ownerId: '456', ownerName: 'Ana Gómez' },
      { id_mascota: 4, nombre_especie: 'Tortuga', nombre_raza: 'Desconocida', genero: 'Macho', nombre_mascota: 'Tito', edad: 7, peso: 1, agresiva: false, esterilizada: false, ownerId: '789', ownerName: 'Juan Henriquez' },
    ];
    setPets(initialPets);
  }, []);

  const handleSearch = () => {
    const results = pets.filter(
      (pet) => 
        pet.ownerId.includes(ownerQuery) || 
        pet.ownerName.toLowerCase().includes(ownerQuery.toLowerCase())
    );
    setSearchResults(results);

    const uniqueOwners = Array.from(
      new Set(results.map((pet) => JSON.stringify({ ownerId: pet.ownerId, ownerName: pet.ownerName })))
    ).map((owner) => JSON.parse(owner));

    if (uniqueOwners.length > 1) {
      setMatchingOwners(uniqueOwners);
      setDialogOpen(true);
    } else if (uniqueOwners.length === 1) {
      handleOwnerSelect(uniqueOwners[0]);
    } else {
      setOwnerInfo({ ownerId: '', ownerName: '' });
      setSelectedOwnerPets([]);
    }
  };

  const handleOwnerChange = (e) => {
    setOwnerQuery(e.target.value);
  };

  const handleOwnerSelect = (owner) => {
    setOwnerInfo(owner);
    const ownerPets = pets.filter((pet) => pet.ownerId === owner.ownerId);
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
    <div>
      <h2>Gestión de Mascotas</h2>

      <div>
        <label htmlFor="ownerQuery">Buscar por ID o Nombre del Propietario:</label>
        <input
          type="text"
          id="ownerQuery"
          value={ownerQuery}
          onChange={handleOwnerChange}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleAddPet} style={{ marginLeft: '10px' }}>Agregar Nueva Mascota</button>
      </div>

      {selectedOwnerPets.length > 0 && (
        <div>
          <h3>Propietario: {ownerInfo.ownerName} (ID: {ownerInfo.ownerId})</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>ID Mascota</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Especie</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Raza</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Género</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Nombre</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Edad</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Peso</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Agresiva</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Esterilizada</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {selectedOwnerPets.map((pet) => (
                <tr key={pet.id_mascota}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.id_mascota}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.nombre_especie}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.nombre_raza}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.genero}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.nombre_mascota}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.edad} años</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.peso} kg</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.agresiva ? 'Sí' : 'No'}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{pet.esterilizada ? 'Sí' : 'No'}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <button onClick={() => handleViewDetails(pet.id_mascota)}>Nueva Consulta</button>
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
            <Button key={owner.ownerId} onClick={() => handleOwnerSelect(owner)}>
              {owner.ownerName} (ID: {owner.ownerId})
            </Button>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Mascotas;
