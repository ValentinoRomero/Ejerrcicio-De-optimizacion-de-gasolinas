import { OptimizacionService } from './optimizacion.service';
export declare class OptimizacionController {
    private readonly optimizacionService;
    private readonly logger;
    constructor(optimizacionService: OptimizacionService);
    probarConexionWatson(): Promise<any>;
    getResultadosWatson(): Promise<any>;
}
