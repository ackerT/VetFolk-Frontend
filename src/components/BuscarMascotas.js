import React, { useState, useEffect } from 'react';
import { DataGrid, GRID_DEFAULT_LOCALE_TEXT } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import Box from '@mui/material/Box';
import AdminSideBar from './AdminSideBar';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '13px',
    h5: {
      color: '#00897b',
      margin: '20px',
      fontWeight: '600',
    },
    h6: {
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
  const navigate = useNavigate();  // Instancia de useNavigate
  const [ownerQuery, setOwnerQuery] = useState('');
  const [pets, setPets] = useState([]);
  const [ownerInfo, setOwnerInfo] = useState({ IdUsuario: '', Nombre: '' });
  const [matchingOwners, setMatchingOwners] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOwnerPets, setSelectedOwnerPets] = useState([]);

  useEffect(() => {
    const initialPets = [
      { id_mascota: 1, nombre_especie: 'Perro', nombre_raza: 'Labrador', genero: 'Macho', nombre_mascota: 'Firulais', edad: 5, peso: 30, agresiva: false, esterilizada: true, IdUsuario: '123', Nombre: 'Juan Pérez' },
      { id_mascota: 2, nombre_especie: 'Gato', nombre_raza: 'Siames', genero: 'Macho', nombre_mascota: 'Max', edad: 3, peso: 4, agresiva: false, esterilizada: true, IdUsuario: '456', Nombre: 'Ana Gómez' },
      { id_mascota: 3, nombre_especie: 'Perro', nombre_raza: 'Labrador', genero: 'Hembra', nombre_mascota: 'Luna', edad: 3, peso: 4, agresiva: false, esterilizada: true, IdUsuario: '456', Nombre: 'Ana Gómez' },
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
    navigate(`/admin/buscar-expediente/${petId}`);
  };

  const handleNavigateHome = () => {
    navigate('/');  // Redirige a la página de inicio
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

  return (
    
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex',flexDirection: 'column', marginLeft: '200px'  }}>
      <AdminSideBar />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h5">Buscar Mascotas</Typography>
        <div>
          <label htmlFor="ownerQuery" style={{ marginRight: '10px' }}>Buscar por ID o Nombre del Propietario:</label>
          <input
            type="text"
            id="ownerQuery"
            value={ownerQuery}
            onChange={handleOwnerChange}
          />
          <Button onClick={handleSearch} sx={ButtonEstilo}>Buscar</Button>
          <Button onClick={handleAddPet} sx={ButtonEstilo}>Agregar Nueva Mascota</Button>
          <Button onClick={handleNavigateHome} sx={ButtonEstilo}>Inicio</Button>
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
          </div>
        )}

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Seleccionar Propietario</DialogTitle>
          <DialogContent>
            {matchingOwners.map((owner) => (
              <Button key={owner.IdUsuario} onClick={() => handleOwnerSelect(owner)} sx={ButtonEstilo}>
                {owner.Nombre} (ID: {owner.IdUsuario})
              </Button>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} sx={ButtonEstilo}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  </ThemeProvider>
);
};

export default Mascotas;