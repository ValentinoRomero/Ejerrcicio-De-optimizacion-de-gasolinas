import api from './api';

export interface OptimizacionRequest {
  aceites: Array<{
    id: number;
    nombre: string;
    octanaje: number;
    plomo: number;
    costo: number;
    capacidad: number;
  }>;
  gasolinas: Array<{
    id: number;
    nombre: string;
    demanda: number;
    precio: number;
    octanajeMinimo: number;
    plomoMaximo: number;
  }>;
  parametros: {
    costoFijoPorLitro: number;
    produccionMaximaTotal: number;
    penalizacionProduccionExtra: number;
    permitirProduccionExtra: boolean;
  };
}

export interface OptimizacionResponse {
  asignaciones: Array<{
    aceiteId: number;
    aceiteNombre: string;
    gasolinaId: number;
    gasolinaNombre: string;
    litros: number;
  }>;
  produccion: Array<{
    gasolinaId: number;
    gasolinaNombre: string;
    litrosProducidos: number;
    demanda: number;
    excedente: number;
    porcentajeCumplimiento: number;
  }>;
  metricas: {
    ingresoTotal: number;
    costoTotal: number;
    beneficioNeto: number;
    litrosExcedentes: number;
    costoExcedentes: number;
  };
  status: 'success' | 'error';
  message?: string;
}

export interface ValidacionResponse {
  valido: boolean;
  errores: string[];
}

export const optimizacionService = {
  async ejecutarOptimizacion(): Promise<OptimizacionResponse> {
    try {
      console.log('Ejecutando optimización con Watson Studio (modelo OPL)...');
    const response = await api.post('/optimizacion/ejecutar');
      
      if (response.data.success) {
        console.log('Optimización completada exitosamente con Watson Studio');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error en la optimización');
      }
    } catch (error) {
      console.error('Error al ejecutar optimización:', error);
      throw error;
    }
  },

  async obtenerDatosOptimizacion(): Promise<any> {
    try {
      console.log('Obteniendo datos para optimización desde Cloud Object Storage...');
      const response = await api.get('/optimizacion/datos');
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener datos');
      }
    } catch (error) {
      console.error('Error al obtener datos de optimización:', error);
      throw error;
    }
  },

  async obtenerResultadosOptimizacion(): Promise<any> {
    try {
      console.log('Obteniendo resultados de optimización...');
      const response = await api.get('/optimizacion/resultados');
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener resultados');
      }
    } catch (error) {
      console.error('Error al obtener resultados de optimización:', error);
      throw error;
    }
  },

  async probarConexionWatson(): Promise<any> {
    try {
      console.log('Probando conexión con Watson Studio...');
      const response = await api.get('/optimizacion/test-conexion');
      
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error) {
      console.error('Error al probar conexión con Watson Studio:', error);
      return {
        success: false,
        message: 'Error al probar conexión con Watson Studio',
      };
    }
  },

  async lanzarJob(): Promise<any> {
    try {
      console.log('Lanzando job de optimización en Watson Studio...');
      const response = await api.post('/jobs/launch', {});
      
      return {
        success: response.data.success,
        jobId: response.data.jobId,
        status: response.data.status,
        message: response.data.message,
      };
    } catch (error) {
      console.error('Error al lanzar job:', error);
      throw error;
    }
  },

  async consultarEstadoJob(jobId: string): Promise<any> {
    try {
      console.log(`Consultando estado del job: ${jobId}`);
      const response = await api.get(`/jobs/status/${jobId}`);
      
      return {
        jobId: response.data.jobId,
        status: response.data.status,
        message: response.data.message,
      };
    } catch (error) {
      console.error('Error al consultar estado del job:', error);
      throw error;
    }
  },

  async obtenerResultadosJob(jobId: string): Promise<any> {
    try {
      console.log(`Obteniendo resultados del job: ${jobId}`);
      const response = await api.get(`/jobs/results/${jobId}`);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Error al obtener resultados del job');
      }
    } catch (error) {
      console.error('Error al obtener resultados del job:', error);
      throw error;
    }
  },

  async descargarResultados(assetId: string): Promise<void> {
    try {
      console.log(`Descargando resultados: ${assetId}`);
      const response = await api.get(`/jobs/download/${assetId}`, {
        responseType: 'blob',
      });
      
      // Crear enlace de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `optimizacion_${assetId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar resultados:', error);
      throw error;
    }
  },

  async validarDatos(): Promise<ValidacionResponse> {
    const response = await api.get('/optimizacion/validar');
    return response.data;
  },

  /**
   * Llama al endpoint que ejecuta el modelo OPL en Watson Studio y devuelve los resultados reales.
   * Devuelve las tablas resultadoMezclas y resultadoAdicionalGasolinas.
   */
  async getResultadosWatson(): Promise<any> {
    try {
      console.log('Solicitando resultados reales de Watson Studio...');
      const response = await api.get('/optimizacion/resultados-watson');
      return response.data;
    } catch (error) {
      console.error('Error al obtener resultados reales de Watson Studio:', error);
      throw error;
    }
  },
}; 