import { WatsonDataService } from '../services/watson.service';
export declare class ParametrosService {
    private readonly watsonDataService;
    private readonly logger;
    constructor(watsonDataService: WatsonDataService);
    findAll(): Promise<{
        parametrosCosto: any[];
        parametrosMaxima: any[];
    }>;
    findParametroCosto(id: number): Promise<any>;
    findParametroMaxima(id: number): Promise<any>;
    updateParametroCosto(id: number, updateParametroDto: any): Promise<any>;
    updateParametroMaxima(id: number, updateParametroDto: any): Promise<any>;
    getParametrosCosto(): Promise<any[]>;
    getParametrosMaxima(): Promise<any[]>;
}
