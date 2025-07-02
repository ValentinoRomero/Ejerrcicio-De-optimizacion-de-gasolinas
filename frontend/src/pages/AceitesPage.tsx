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
import { aceitesService, Aceite, CreateAceiteDto, UpdateAceiteDto } from '../services/aceitesService';

const AceitesPage: React.FC = () => {
  const [aceites, setAceites] = useState<Aceite[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAceite, setEditingAceite] = useState<Aceite | null>(null);
  const [formData, setFormData] = useState<CreateAceiteDto>({
    nombre: '',
    octanaje: 0,
    plomo: 0,
    costo: 0,
    capacidad: 0,
  });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadAceites();
  }, []);

  const loadAceites = async () => {
    try {
      setLoading(true);
      const data = await aceitesService.getAll();
      setAceites(data);
    } catch (error) {
      setError('Error al cargar los aceites');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (aceite?: Aceite) => {
    if (aceite) {
      setEditingAceite(aceite);
      setFormData({
        nombre: aceite.nombre,
        octanaje: aceite.octanaje,
        plomo: aceite.plomo,
        costo: aceite.costo,
        capacidad: aceite.capacidad,
      });
    } else {
      setEditingAceite(null);
      setFormData({
        nombre: '',
        octanaje: 0,
        plomo: 0,
        costo: 0,
        capacidad: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAceite(null);
    setFormData({
      nombre: '',
      octanaje: 0,
      plomo: 0,
      costo: 0,
      capacidad: 0,
    });
    setError('');
  };

  const handleSubmit = async () => {
    try {
      if (editingAceite) {
        await aceitesService.update(editingAceite.id, formData as UpdateAceiteDto);
      } else {
        await aceitesService.create(formData);
      }
      handleCloseDialog();
      loadAceites();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar el aceite');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este aceite?')) {
      try {
        await aceitesService.delete(id);
        loadAceites();
      } catch (error) {
        setError('Error al eliminar el aceite');
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
          Gestión de Aceites Crudos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Agregar Aceite
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
              <TableCell align="right">Octanaje (RON)</TableCell>
              <TableCell align="right">Plomo (mg/L)</TableCell>
              <TableCell align="right">Costo (USD/L)</TableCell>
              <TableCell align="right">Capacidad (L)</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aceites.map((aceite) => (
              <TableRow key={aceite.id}>
                <TableCell>{aceite.nombre}</TableCell>
                <TableCell align="right">{aceite.octanaje}</TableCell>
                <TableCell align="right">{aceite.plomo}</TableCell>
                <TableCell align="right">${aceite.costo.toFixed(2)}</TableCell>
                <TableCell align="right">{aceite.capacidad.toLocaleString()}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDialog(aceite)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(aceite.id)}>
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
          {editingAceite ? 'Editar Aceite' : 'Agregar Nuevo Aceite'}
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
              label="Octanaje (RON)"
              type="number"
              value={formData.octanaje}
              onChange={(e) => setFormData({ ...formData, octanaje: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, max: 120, step: 0.01 }}
            />
            <TextField
              label="Plomo (mg/L)"
              type="number"
              value={formData.plomo}
              onChange={(e) => setFormData({ ...formData, plomo: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, max: 1000, step: 0.01 }}
            />
            <TextField
              label="Costo (USD/L)"
              type="number"
              value={formData.costo}
              onChange={(e) => setFormData({ ...formData, costo: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              label="Capacidad (L)"
              type="number"
              value={formData.capacidad}
              onChange={(e) => setFormData({ ...formData, capacidad: parseFloat(e.target.value) })}
              fullWidth
              required
              inputProps={{ min: 0, step: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingAceite ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AceitesPage; 