import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  LocalGasStation as GasStationIcon,
  OilBarrel as OilBarrelIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/aceites', label: 'Aceites Crudos', icon: <OilBarrelIcon /> },
    { path: '/gasolinas', label: 'Tipos de Gasolina', icon: <GasStationIcon /> },
    { path: '/parametros', label: 'Parámetros', icon: <SettingsIcon /> },
    { path: '/optimizacion', label: 'Optimización', icon: <TrendingUpIcon /> },
  ];

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <OilBarrelIcon sx={{ mr: 1 }} />
            EnergíaFina S.A.
          </Box>
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                ...(location.pathname === item.path && {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }),
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Chip
          label="Sistema de Optimización"
          color="secondary"
          size="small"
          sx={{ ml: 2 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header; 