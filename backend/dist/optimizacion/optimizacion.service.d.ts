import { WatsonDataService } from '../services/watson.service';
export declare class OptimizacionService {
    private watsonDataService;
    private readonly logger;
    constructor(watsonDataService: WatsonDataService);
    getResultadosWatson(): Promise<any>;
    probarConexionWatson(): Promise<any>;
}
