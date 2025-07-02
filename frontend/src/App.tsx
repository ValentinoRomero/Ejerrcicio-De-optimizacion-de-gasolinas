import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AceitesPage from './pages/AceitesPage';
import GasolinasPage from './pages/GasolinasPage';
import ParametrosPage from './pages/ParametrosPage';
import OptimizacionPage from './pages/OptimizacionPage';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/aceites" element={<AceitesPage />} />
          <Route path="/gasolinas" element={<GasolinasPage />} />
          <Route path="/parametros" element={<ParametrosPage />} />
          <Route path="/optimizacion" element={<OptimizacionPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App; 