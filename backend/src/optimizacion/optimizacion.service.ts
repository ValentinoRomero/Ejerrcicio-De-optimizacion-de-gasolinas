import { Injectable, Logger } from '@nestjs/common';
import { WatsonDataService } from '../services/watson.service';

@Injectable()
export class OptimizacionService {
  private readonly logger = new Logger(OptimizacionService.name);

  constructor(private watsonDataService: WatsonDataService) {}

  /**
   * Ejecuta el modelo OPL en Watson Studio y devuelve los resultados reales.
   * 1. Lanza el job OPL
   * 2. Espera a que termine
   * 3. Lee los archivos de salida desde COS
   * 4. Devuelve los resultados reales
   */
  async getResultadosWatson(): Promise<any> {
    this.logger.log('Ejecutando optimización real en Watson Studio (síncrona)');
    // Llama al método que implementa toda la lógica
    return await this.watsonDataService.ejecutarOptimizacionWatsonStudioReal();
  }

  /**
   * Prueba la conexión con Watson Studio
   */
  async probarConexionWatson(): Promise<any> {
    this.logger.log('Probando conexión con Watson Studio');
    try {
      const conexionExitosa = await this.watsonDataService.testConnection();
      return {
        success: conexionExitosa,
        message: conexionExitosa 
          ? 'Conexión con Watson Studio exitosa' 
          : 'Error en la conexión con Watson Studio',
      };
    } catch (error) {
      this.logger.error('Error al probar conexión:', error);
      return {
        success: false,
        error: error.message,
        message: 'Error al probar conexión con Watson Studio',
      };
    }
  }
} 