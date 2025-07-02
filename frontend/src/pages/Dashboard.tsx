import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import {
  OilBarrel as OilBarrelIcon,
  LocalGasStation as GasStationIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<OilBarrelIcon sx={{ fontSize: 40 }} />}
            onClick={() => navigate('/aceites')}
            sx={{ minWidth: 250, minHeight: 100, fontSize: 24, fontWeight: 'bold', p: 3 }}
            fullWidth
          >
            Aceites
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="success"
            startIcon={<GasStationIcon sx={{ fontSize: 40 }} />}
            onClick={() => navigate('/gasolinas')}
            sx={{ minWidth: 250, minHeight: 100, fontSize: 24, fontWeight: 'bold', p: 3 }}
            fullWidth
          >
            Gasolinas
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SettingsIcon sx={{ fontSize: 40 }} />}
            onClick={() => navigate('/parametros')}
            sx={{ minWidth: 250, minHeight: 100, fontSize: 24, fontWeight: 'bold', p: 3 }}
            fullWidth
          >
            Parámetros
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="warning"
            startIcon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
            onClick={() => navigate('/optimizacion')}
            sx={{ minWidth: 250, minHeight: 100, fontSize: 24, fontWeight: 'bold', p: 3 }}
            fullWidth
          >
            Optimización
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 