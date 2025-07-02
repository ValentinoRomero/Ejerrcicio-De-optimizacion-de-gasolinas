import { ParametrosService } from './parametros.service';
export declare class ParametrosController {
    private readonly parametrosService;
    constructor(parametrosService: ParametrosService);
    getParametrosCosto(): Promise<any[]>;
    updateParametroCosto(id: number, body: any): Promise<any>;
    getParametrosMaxima(): Promise<any[]>;
    updateParametroMaxima(id: number, body: any): Promise<any>;
}
