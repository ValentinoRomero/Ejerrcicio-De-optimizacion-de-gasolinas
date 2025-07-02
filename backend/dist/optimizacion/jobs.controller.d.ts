import { WatsonDataService } from '../services/watson.service';
import { OptimizacionService } from './optimizacion.service';
import { Response } from 'express';
export declare class JobsController {
    private readonly watsonDataService;
    private readonly optimizacionService;
    private readonly logger;
    constructor(watsonDataService: WatsonDataService, optimizacionService: OptimizacionService);
    lanzarJob(payload: any): Promise<{
        success: boolean;
        jobId: string;
        status: string;
        data: any;
        message: string;
        timestamp: string;
    }>;
    estadoJob(jobId: string): Promise<{
        jobId: string;
        status: string;
        message: string;
        timestamp: string;
    }>;
    resultadosJob(jobId: string): Promise<{
        jobId: string;
        success: boolean;
        data: any;
        message: string;
        timestamp: string;
    }>;
    descargarResultado(assetId: string, res: Response): Promise<void>;
    private convertirResultadosACSV;
}
