import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  Cloud as CloudIcon,
  Psychology as PsychologyIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { optimizacionService } from '../services/optimizacionService';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OptimizacionPage: React.FC = () => {
  const [loadingWatson, setLoadingWatson] = useState(false);
  const [errorWatson, setErrorWatson] = useState<string>('');
  
  // Usar el hook personalizado para localStorage
  const [watsonResultados, setWatsonResultados, clearWatsonResultados] = useLocalStorage<any | null>('watsonOptimizationResults', null);
  const [lastExecutionTime, setLastExecutionTime, clearLastExecutionTime] = useLocalStorage<string>('watsonOptimizationTime', '');

  // Ejecuta la optimización real en Watson Studio y obtiene los resultados reales
  const ejecutarWatson = async () => {
    try {
      setLoadingWatson(true);
      setErrorWatson('');
      setWatsonResultados(null);
      const data = await optimizacionService.getResultadosWatson();
      setWatsonResultados(data);
      setLastExecutionTime(new Date().toLocaleString('es-ES'));
    } catch (error: any) {
      setErrorWatson(error.response?.data?.message || 'Error al obtener resultados de Watson Studio');
    } finally {
      setLoadingWatson(false);
    }
  };

  // Función para limpiar todos los resultados guardados
  const clearAllResults = () => {
    clearWatsonResultados();
    clearLastExecutionTime();
  };

  // Función para crear datos del gráfico de mezclas
  const crearDatosGraficoMezclas = (data: any[]) => {
    if (!data || data.length === 0) return null;

    // Obtener todos los crudos únicos
    const aceitesUnicos = Array.from(new Set(data.map((item) => item.oil)));
    // Paleta de colores (puedes agregar más si hay más crudos)
    const colores = [
      '#1976d2', // azul
      '#388e3c', // verde
      '#fbc02d', // amarillo
      '#d32f2f', // rojo
      '#7b1fa2', // morado
      '#0288d1', // celeste
      '#c2185b', // rosa
      '#ffa000', // naranja
      '#455a64', // gris
    ];
    // Asignar color a cada crudo
    const colorPorAceite: Record<string, string> = {};
    aceitesUnicos.forEach((oil, idx) => {
      colorPorAceite[oil] = colores[idx % colores.length];
    });

    // Etiquetas: combinación de oil y gas
    const labels = data.map((item) => `${item.oil} - ${item.gas}`);
    // Colores para cada barra según el crudo
    const backgroundColors = data.map((item) => colorPorAceite[item.oil]);
    // Solo un dataset: value
    const dataset = {
      label: 'Cantidad',
      data: data.map((item) => Number(item.value) || 0),
      backgroundColor: backgroundColors,
      borderColor: backgroundColors,
      borderWidth: 1,
    };
    return {
      labels,
      datasets: [dataset],
    };
  };

  // Función para crear datos del gráfico de gasolinas adicionales
  const crearDatosGraficoGasolinas = (data: any[]) => {
    if (!data || data.length === 0) return null;

    // Etiquetas: name
    const labels = data.map((item) => item.name);
    // Solo un dataset: value
    const dataset = {
      label: 'Cantidad',
      data: data.map((item) => Number(item.value) || 0),
      backgroundColor: 'rgba(56, 142, 60, 0.7)',
      borderColor: 'rgba(56, 142, 60, 1)',
      borderWidth: 1,
    };
    return {
      labels,
      datasets: [dataset],
    };
  };

  // Componente para mostrar un gráfico de barras
  const GraficoBarras: React.FC<{ titulo: string; data: any; height?: number }> = ({ titulo, data, height = 400 }) => {
    if (!data) return null;

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: titulo,
          font: {
            size: 16,
            weight: 'bold' as const,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Valor',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Elementos',
          },
        },
      },
    };

    return (
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BarChartIcon sx={{ color: '#1976d2', mr: 1 }} />
            <Typography variant="h6" gutterBottom>
              {titulo}
            </Typography>
          </Box>
          <Box sx={{ height: height }}>
            <Bar data={data} options={options} />
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Componente para mostrar una tabla genérica a partir de un array de objetos
  const TablaGenerica: React.FC<{ titulo: string; data: any[] }> = ({ titulo, data }) => (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {titulo}
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {data.length > 0 && Object.keys(data[0]).map((col) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  {Object.values(row).map((val, i) => (
                    <TableCell key={i}>{String(val)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  // Mostrar logs para depuración
  useEffect(() => {
    if (watsonResultados) {
      console.log('watsonResultados:', watsonResultados);
      console.log('resultadoMezclas:', watsonResultados.resultadoMezclas);
      console.log('resultadoAdicionalGasolinas:', watsonResultados.resultadoAdicionalGasolinas);
    }
  }, [watsonResultados]);

  return (
    <Box>
      {/* Header con información del motor de optimización */}
      <Card sx={{ mb: 3, bgcolor: '#f8f9fa' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CloudIcon sx={{ color: '#1976d2', mr: 1 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
              Optimización de Producción con IBM Watson Studio
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            La optimización se ejecuta en IBM Watson Studio utilizando programación lineal para maximizar 
            el beneficio neto considerando restricciones de capacidad, calidad y demanda.
          </Typography>
        </CardContent>
      </Card>

      {/* Información de última ejecución y botones */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Button
            variant="contained"
            startIcon={<CloudIcon />}
            onClick={ejecutarWatson}
            disabled={loadingWatson}
            size="large"
            sx={{ 
              bgcolor: '#388e3c',
              '&:hover': { bgcolor: '#256029' }
            }}
          >
            {loadingWatson ? 'Ejecutando en Watson Studio...' : 'Ejecutar en Watson Studio'}
          </Button>
          
          {lastExecutionTime && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Última ejecución: {lastExecutionTime}
            </Typography>
          )}
        </Box>
        
        {watsonResultados && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearAllResults}
            size="small"
          >
            Limpiar resultados guardados
          </Button>
        )}
      </Box>

      {errorWatson && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorWatson('')}>
          {errorWatson}
        </Alert>
      )}

      {loadingWatson && (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Ejecutando optimización real en Watson Studio...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Esto puede tardar unos minutos dependiendo del tamaño de los datos.
          </Typography>
        </Box>
      )}

      {/* Tablas de datos */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        Datos Detallados
      </Typography>
      {/* Mostrar tabla resultadoMezclas */}
      <TablaGenerica titulo="resultadoMezclas" data={watsonResultados.resultadoMezclas} />
      {/* Mostrar tabla resultadoAdicionalGasolinas */}
      <TablaGenerica titulo="resultadoAdicionalGasolinas" data={watsonResultados.resultadoAdicionalGasolinas} />

      {/* Gráficos de barras */}
      <Typography variant="h5" sx={{ mb: 3, mt: 4, fontWeight: 'bold', color: '#1976d2' }}>
        Visualización de Resultados
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <GraficoBarras 
            titulo="Análisis de Mezclas" 
            data={crearDatosGraficoMezclas(watsonResultados.resultadoMezclas)}
            height={350}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraficoBarras 
            titulo="Análisis de Gasolinas Adicionales" 
            data={crearDatosGraficoGasolinas(watsonResultados.resultadoAdicionalGasolinas)}
            height={350}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OptimizacionPage; 