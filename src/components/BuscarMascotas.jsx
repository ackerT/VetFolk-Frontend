import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { DataGrid, GRID_DEFAULT_LOCALE_TEXT } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
=======
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
<<<<<<< HEAD
    fontSize: '13px',
    h5: {
      color: '#00897b',
=======
    h5: {
      color: '#2c6b6b',
>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
      margin: '20px',
      fontWeight: '600',
    },
    h6: {
<<<<<<< HEAD
      color: '#00897b',
      margin: '20px',
    },
  },
});

const ButtonEstilo = {
  backgroundColor: "#00897b",
  border: "1px solid #2c6b6b",
  color: "white",
  margin: "10px",
  fontSize: '13px',
};

const Mascotas = () => {
  const navigate = useNavigate();
  const [ownerQuery, setOwnerQuery] = useState('');
  const [pets, setPets] = useState([]);
=======
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

>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
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
<<<<<<< HEAD
=======
    setSearchResults(results);

>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
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

<<<<<<< HEAD
  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  const columns = [
    { field: 'id_mascota', headerName: 'ID Mascota', width: 120 },
    { field: 'nombre_especie', headerName: 'Especie', width: 120 },
    { field: 'nombre_raza', headerName: 'Raza', width: 130 },
    { field: 'genero', headerName: 'Género', width: 130 },
    { field: 'nombre_mascota', headerName: 'Nombre', width: 140 },
    { field: 'edad', headerName: 'Edad', width: 80 },
    { field: 'peso', headerName: 'Peso', width: 80 },
    { field: 'agresiva', headerName: 'Agresiva', width: 100, valueGetter: (params) => (params.row?.agresiva ? 'Sí' : 'No') },
    { field: 'esterilizada', headerName: 'Esterilizada', width: 120, valueGetter: (params) => (params.row?.esterilizada ? 'Sí' : 'No') },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 130,
      renderCell: (params) => (
        <Button onClick={() => handleViewDetails(params.row.id_mascota)} sx={ButtonEstilo}>Consultar</Button>
      ),
    },
  ];

=======
>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h5">Buscar Mascotas</Typography>
        <div>
<<<<<<< HEAD
          <label htmlFor="ownerQuery" style={{ marginRight: '10px' }}>Buscar por ID o Nombre del Propietario:</label>
=======
          <label htmlFor="ownerQuery">Buscar por ID o Nombre del Propietario</label>
>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
          <input
            type="text"
            id="ownerQuery"
            value={ownerQuery}
            onChange={handleOwnerChange}
          />
<<<<<<< HEAD
          <Button onClick={handleSearch} sx={ButtonEstilo}>Buscar</Button>
          <Button onClick={handleAddPet} sx={ButtonEstilo}>Agregar Nueva Mascota</Button>
          <Button onClick={handleGoToAdmin} sx={ButtonEstilo}>Ir a Admin</Button> {/* Botón  */}
        </div>

        {selectedOwnerPets.length > 0 && (
          <div style={{ height: 400, width: '100%', marginTop: 20 }}>
            <Typography variant="h5">Propietario: {ownerInfo.Nombre} (ID: {ownerInfo.IdUsuario})</Typography>
            <DataGrid
              rows={selectedOwnerPets}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.id_mascota}
              localeText={{
                ...GRID_DEFAULT_LOCALE_TEXT,
                footerRowSelected: (count) =>
                  count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`,
                toolbarColumns: "Columnas",
                toolbarDensity: "Densidad",
                toolbarExport: "Exportar",
                paginationLabelRowsPerPage: "Filas por página",
                paginationLabelDisplayedRows: ({ from, to, count }) =>
                  `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
              }}
            />
=======
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
                      <Button onClick={() => handleViewDetails(pet.id_mascota)} sx={{ mb: 2, mt: ButtonEstilo }}>Consultar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
          </div>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Seleccionar Propietario</DialogTitle>
          <DialogContent>
            {matchingOwners.map((owner) => (
<<<<<<< HEAD
              <Button key={owner.IdUsuario} onClick={() => handleOwnerSelect(owner)} sx={ButtonEstilo}>
=======
              <Button key={owner.IdUsuario} onClick={() => handleOwnerSelect(owner)} sx={{ mt: ButtonEstilo }}>
>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
                {owner.Nombre} (ID: {owner.IdUsuario})
              </Button>
            ))}
          </DialogContent>
          <DialogActions>
<<<<<<< HEAD
            <Button onClick={() => setDialogOpen(false)} sx={ButtonEstilo}>Cancelar</Button>
=======
            <Button onClick={() => setDialogOpen(false)} sx={{ mt: ButtonEstilo }} >Cancelar</Button>
>>>>>>> 9f59bdc4dfbde523d2fd435fc3f1f9675c7aeecf
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default Mascotas;
