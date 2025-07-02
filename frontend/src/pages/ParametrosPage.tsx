import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Edit as EditIcon, 
  Cancel as CancelIcon 
} from '@mui/icons-material';
import { parametrosService, ProdCostParam, MaxProdParam } from '../services/parametrosService';

const ParametrosPage: React.FC = () => {
  // Estado para ProdCostParam
  const [prodCostParam, setProdCostParam] = useState<ProdCostParam | null>(null);
  const [prodCostParamOriginal, setProdCostParamOriginal] = useState<ProdCostParam | null>(null);
  const [editingProdCost, setEditingProdCost] = useState(false);
  const [loadingProdCost, setLoadingProdCost] = useState(true);
  const [savingProdCost, setSavingProdCost] = useState(false);
  const [successProdCost, setSuccessProdCost] = useState('');
  const [errorProdCost, setErrorProdCost] = useState('');

  // Estado para MaxProdParam
  const [maxProdParam, setMaxProdParam] = useState<MaxProdParam | null>(null);
  const [maxProdParamOriginal, setMaxProdParamOriginal] = useState<MaxProdParam | null>(null);
  const [editingMaxProd, setEditingMaxProd] = useState(false);
  const [loadingMaxProd, setLoadingMaxProd] = useState(true);
  const [savingMaxProd, setSavingMaxProd] = useState(false);
  const [successMaxProd, setSuccessMaxProd] = useState('');
  const [errorMaxProd, setErrorMaxProd] = useState('');

  useEffect(() => {
    loadProdCostParam();
    loadMaxProdParam();
  }, []);

  const loadProdCostParam = async () => {
    try {
      setLoadingProdCost(true);
      const data = await parametrosService.getProdCostParams();
      setProdCostParam(data[0]);
      setProdCostParamOriginal(data[0]);
    } catch (error) {
      setErrorProdCost('Error al cargar el parámetro de costo');
    } finally {
      setLoadingProdCost(false);
    }
  };

  const loadMaxProdParam = async () => {
    try {
      setLoadingMaxProd(true);
      const data = await parametrosService.getMaxProdParams();
      setMaxProdParam(data[0]);
      setMaxProdParamOriginal(data[0]);
    } catch (error) {
      setErrorMaxProd('Error al cargar el parámetro de producción máxima');
    } finally {
      setLoadingMaxProd(false);
    }
  };

  const handleEditProdCost = () => {
    setEditingProdCost(true);
    setErrorProdCost('');
    setSuccessProdCost('');
  };

  const handleCancelProdCost = () => {
    setEditingProdCost(false);
    setProdCostParam(prodCostParamOriginal);
    setErrorProdCost('');
    setSuccessProdCost('');
  };

  const handleSaveProdCost = async () => {
    if (!prodCostParam) return;
    try {
      setSavingProdCost(true);
      setErrorProdCost('');
      setSuccessProdCost('');
      await parametrosService.updateProdCostParam(1, prodCostParam); // ID fijo 1
      setSuccessProdCost('Parámetro de costo actualizado exitosamente');
      setProdCostParamOriginal(prodCostParam);
      setEditingProdCost(false);
      await loadProdCostParam();
    } catch (error: any) {
      setErrorProdCost('Error al guardar el parámetro de costo');
    } finally {
      setSavingProdCost(false);
    }
  };

  const handleEditMaxProd = () => {
    setEditingMaxProd(true);
    setErrorMaxProd('');
    setSuccessMaxProd('');
  };

  const handleCancelMaxProd = () => {
    setEditingMaxProd(false);
    setMaxProdParam(maxProdParamOriginal);
    setErrorMaxProd('');
    setSuccessMaxProd('');
  };

  const handleSaveMaxProd = async () => {
    if (!maxProdParam) return;
    try {
      setSavingMaxProd(true);
      setErrorMaxProd('');
      setSuccessMaxProd('');
      await parametrosService.updateMaxProdParam(1, maxProdParam); // ID fijo 1
      setSuccessMaxProd('Parámetro de producción máxima actualizado exitosamente');
      setMaxProdParamOriginal(maxProdParam);
      setEditingMaxProd(false);
      await loadMaxProdParam();
    } catch (error: any) {
      setErrorMaxProd('Error al guardar el parámetro de producción máxima');
    } finally {
      setSavingMaxProd(false);
    }
  };

  if (loadingProdCost || loadingMaxProd) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Parámetros del Modelo de Optimización
      </Typography>

      {/* Sección ProdCostParam */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Parámetro de Costo Fijo por Litro Producido
          </Typography>
          {errorProdCost && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorProdCost('')}>
              {errorProdCost}
            </Alert>
          )}
          {successProdCost && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessProdCost('')}>
              {successProdCost}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Costo Fijo por Litro Producido (USD)"
              type="number"
              value={prodCostParam?.prodCost ?? ''}
              onChange={(e) => setProdCostParam({ ...prodCostParam!, prodCost: parseFloat(e.target.value) })}
              fullWidth
              disabled={!editingProdCost}
              inputProps={{ min: 0, step: 0.01 }}
              helperText="Costo adicional por litro además del costo del aceite crudo"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              {!editingProdCost ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditProdCost}
                >
                  Editar Parámetro
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelProdCost}
                    disabled={savingProdCost}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProdCost}
                    disabled={savingProdCost}
                  >
                    {savingProdCost ? 'Guardando...' : 'Guardar Parámetro'}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Sección MaxProdParam */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Parámetro de Producción Máxima Total
          </Typography>
          {errorMaxProd && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMaxProd('')}>
              {errorMaxProd}
            </Alert>
          )}
          {successMaxProd && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMaxProd('')}>
              {successMaxProd}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Producción Máxima Total (L)"
              type="number"
              value={maxProdParam?.maxProduction ?? ''}
              onChange={(e) => setMaxProdParam({ ...maxProdParam!, maxProduction: parseFloat(e.target.value) })}
              fullWidth
              disabled={!editingMaxProd}
              inputProps={{ min: 0, step: 1 }}
              helperText="Cantidad máxima de litros que se pueden producir en total"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              {!editingMaxProd ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditMaxProd}
                >
                  Editar Parámetro
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelMaxProd}
                    disabled={savingMaxProd}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveMaxProd}
                    disabled={savingMaxProd}
                  >
                    {savingMaxProd ? 'Guardando...' : 'Guardar Parámetro'}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ParametrosPage; 