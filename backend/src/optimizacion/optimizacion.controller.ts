import { Controller, Get, Logger } from '@nestjs/common';
import { OptimizacionService } from './optimizacion.service';

@Controller('optimizacion')
export class OptimizacionController {
  private readonly logger = new Logger(OptimizacionController.name);

  constructor(private readonly optimizacionService: OptimizacionService) {}

  @Get('test-conexion')
  async probarConexionWatson() {
    this.logger.log('Solicitud de prueba de conexión con Watson Studio');
    return await this.optimizacionService.probarConexionWatson();
  }

  /**
   * Endpoint para ejecutar el modelo OPL en Watson Studio y devolver los resultados reales.
   * Lanza el job, espera a que termine y devuelve los archivos de salida parseados.
   */
  @Get('resultados-watson')
  async getResultadosWatson() {
    this.logger.log('Solicitud de resultados reales de Watson Studio recibida');
    return await this.optimizacionService.getResultadosWatson();
  }
} 