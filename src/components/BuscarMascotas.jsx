import React, { useState, useEffect } from 'react';
import { DataGrid, GRID_DEFAULT_LOCALE_TEXT } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    h5: {
      color: '#ea3c3c',
      fontWeight: '600',
      fontSize: '30px',
    },
    h6: {
      color: '#ea3c3c',
    },
  },
});

const ButtonEstilo = {
  backgroundColor: "#2c6b6b",
  border: "none",
  color: "white",
  margin: "10px",
  fontSize: '13px',
};

const Mascotas = () => {
  const navigate = useNavigate();
  const [ownerQuery, setOwnerQuery] = useState('');
  const [ownerInfo, setOwnerInfo] = useState({ IdUsuario: '', Nombre: '' });
  const [matchingOwners, setMatchingOwners] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOwnerPets, setSelectedOwnerPets] = useState([]);
  const [ownersWithPets, setOwnersWithPets] = useState([]);
  const [especies, setEspecies] = useState([]); // Estado para las especies

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const response = await axios.get('http://localhost:3008/especies/obtener'); // Ajusta la URL si es necesario
        setEspecies(response.data); // Guarda las especies en el estado
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchEspecies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3008/personas/buscar?nombre=${ownerQuery}`);
      const fetchedOwnersWithPets = response.data;

      // Filtramos solo los propietarios que tengan mascotas
      const ownersWithPetsOnly = fetchedOwnersWithPets.filter(owner => owner.mascotas && owner.mascotas.length > 0);

      setOwnersWithPets(ownersWithPetsOnly);

      const uniqueOwners = Array.from(
        new Set(ownersWithPetsOnly.map((owner) => JSON.stringify({ IdUsuario: owner.idPersona, Nombre: `${owner.nombre1} ${owner.nombre2}` })))
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOwnerChange = (e) => {
    setOwnerQuery(e.target.value);
  };

  const handleOwnerSelect = (owner) => {
    setOwnerInfo(owner);

    // Usamos ownersWithPets desde el estado para filtrar las mascotas
    const ownerPets = ownersWithPets
      .filter((ownerData) => ownerData.idPersona === owner.IdUsuario)
      .map((ownerData) => ownerData.mascotas)
      .flat(); // Asegura que todas las mascotas sean obtenidas correctamente
    setSelectedOwnerPets(ownerPets);
    setDialogOpen(false);
  };

  const handleEditDetails = (idMascota) => {
    navigate(`/admin/updateregisterpet/${idMascota}`, { state: { idMascota } });
  };

  const columns = [
    { field: 'idMascota', headerName: 'ID Mascota', width: 120 },
    {
      field: 'idEspecie',
      headerName: 'Especie',
      width: 120,
      renderCell: (params) => {
        // Buscar el nombre de la especie basado en el idEspecie
        const especie = especies.find((e) => e.idEspecie === params.value);
        return especie ? especie.nombreEspecie : 'Desconocido'; // Si no se encuentra, mostrar 'Desconocido'
      },
    },
    { field: 'nombreMascota', headerName: 'Nombre', width: 140 },
    {
      field: 'acciones',  // Cambié el nombre de la columna a "Acciones"
      headerName: 'Acciones', // Nombre de la columna
      width: 130,
      renderCell: (params) => (
        <Button onClick={() => handleEditDetails(params.row.idMascota)} sx={ButtonEstilo}>Editar</Button> // Cambié el botón a "Editar"
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <AdminSideBar />
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Typography variant="h5">Buscar Mascotas</Typography>
          <div>
            <label htmlFor="ownerQuery" style={{ marginRight: '10px' }}>Buscar por ID o nombre del propietario:</label>
            <input
              type="text"
              id="ownerQuery"
              value={ownerQuery}
              onChange={handleOwnerChange}
            />
            <Button onClick={handleSearch} sx={ButtonEstilo}>Buscar</Button>
          </div>

          {selectedOwnerPets.length > 0 && (
            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
              <Typography variant="h5">Propietario: {ownerInfo.Nombre} (ID: {ownerInfo.IdUsuario})</Typography>
              <DataGrid
                rows={selectedOwnerPets}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.idMascota}
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
