import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { gasolinasService, Gasolina, CreateGasolinaDto, UpdateGasolinaDto } from '../services/gasolinasService';

const GasolinasPage: React.FC = () => {
  const [gasolinas, setGasolinas] = useState<Gasolina[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingGasolina, setEditingGasolina] = useState<Gasolina | null>(null);
  const [formData, setFormData] = useState<CreateGasolinaDto>({
    nombre: '',
    demanda: 0,
    precio: 0,
    octanajeMinimo: 0,
    plomoMaximo: 0,
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadGasolinas();
  }, []);

  const loadGasolinas = async () => {
    try {
      setLoading(true);
      const data = await gasolinasService.getAll();
      setGasolinas(data);
    } catch (error) {
      setError('Error al cargar las gasolinas');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (gasolina?: Gasolina) => {
    if (gasolina) {
      setEditingGasolina(gasolina);
      setFormData({
        nombre: gasolina.nombre,
        demanda: gasolina.demanda,
        precio: gasolina.precio,
        octanajeMinimo: gasolina.octanajeMinimo,
        plomoMaximo: gasolina.plomoMaximo,
      });
    } else {
      setEditingGasolina(null);
      setFormData({
        nombre: '',
        demanda: 0,
        precio: 0,
        octanajeMinimo: 0,
        plomoMaximo: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingGasolina(null);
    setFormData({
      nombre: '',
      demanda: 0,
      precio: 0,
      octanajeMinimo: 0,
      plomoMaximo: 0,
    });
    setError('');
  };

  const handleSubmit = async () => {
    try {
      if (editingGasolina) {
        await gasolinasService.update(editingGasolina.id, formData as UpdateGasolinaDto);
      } else {
        await gasolinasService.create(formData);
      }
      handleCloseDialog();
      loadGasolinas();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar la gasolina');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta gasolina?')) {
      try {
        await gasolinasService.delete(id);
        loadGasolinas();
      } catch (error) {
        setError('Error al eliminar la gasolina');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Gestión de Tipos de Gasolina
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Gasolina
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Demanda (L)</TableCell>
              <TableCell align="right">Precio (USD/L)</TableCell>
              <TableCell align="right">Octanaje Mínimo</TableCell>
              <TableCell align="right">Plomo Máximo (mg/L)</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gasolinas.map((gasolina) => (
              <TableRow key={gasolina.id}>
                <TableCell>{gasolina.nombre}</TableCell>
                <TableCell align="right">{gasolina.demanda.toLocaleString()}</TableCell>
                <TableCell align="right">${gasolina.precio.toFixed(2)}</TableCell>
                <TableCell align="right">{gasolina.octanajeMinimo}</TableCell>
                <TableCell align="right">{gasolina.plomoMaximo}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDialog(gasolina)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(gasolina.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingGasolina ? 'Editar Gasolina' : 'Agregar Nueva Gasolina'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Demanda (L)"
              type="number"
              value={formData.demanda}
              onChange={(e) => setFormData({ ...formData, demanda: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, step: 1 }}
            />
            <TextField
              label="Precio (USD/L)"
              type="number"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              label="Octanaje Mínimo (RON)"
              type="number"
              value={formData.octanajeMinimo}
              onChange={(e) => setFormData({ ...formData, octanajeMinimo: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, max: 120, step: 0.01 }}
            />
            <TextField
              label="Plomo Máximo (mg/L)"
              type="number"
              value={formData.plomoMaximo}
              onChange={(e) => setFormData({ ...formData, plomoMaximo: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, max: 1000, step: 0.01 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingGasolina ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GasolinasPage; 