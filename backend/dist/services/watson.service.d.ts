import { ConfigService } from '@nestjs/config';
import { CosService } from './cos.service';
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
export interface WatsonAsset {
    id: string;
    name: string;
    type: string;
    href: string;
}
export interface WatsonTableData {
    fields: Array<{
        name: string;
        type: string;
    }>;
    values: any[][];
}
export interface WatsonResponse {
    data: any;
    status: number;
}
export declare class WatsonDataService {
    private configService;
    private cosService;
    private readonly logger;
    private readonly client;
    private readonly projectId;
    private readonly spaceId;
    private readonly apiKey;
    private accessToken;
    private tokenExpiry;
    private readonly assets;
    constructor(configService: ConfigService, cosService: CosService);
    private getAccessToken;
    private authenticatedRequest;
    private getTableData;
    private updateTableData;
    getAceites(): Promise<any[]>;
    getAceite(id: number): Promise<any>;
    createAceite(aceite: any): Promise<any>;
    updateAceite(id: number, aceite: any): Promise<any>;
    deleteAceite(id: number): Promise<void>;
    getGasolinas(): Promise<any[]>;
    getGasolina(id: number): Promise<any>;
    createGasolina(gasolina: any): Promise<any>;
    updateGasolina(id: number, gasolina: any): Promise<any>;
    deleteGasolina(id: number): Promise<void>;
    getParametrosCosto(): Promise<any[]>;
    updateParametroCosto(id: number, parametro: any): Promise<any>;
    getParametrosMaxima(): Promise<any[]>;
    updateParametroMaxima(id: number, parametro: any): Promise<any>;
    private convertTableDataToObjects;
    getAllOptimizationData(): Promise<{
        aceites: any[];
        gasolinas: any[];
        parametrosCosto: any[];
        parametrosMaxima: any[];
    }>;
    testConnection(): Promise<boolean>;
    lanzarJobWatsonStudio(payload?: any): Promise<any>;
    estadoJobWatsonStudio(jobId?: string): Promise<any>;
    resultadosJobWatsonStudio(jobId?: string): Promise<any>;
    ejecutarOptimizacionWatsonStudioReal(): Promise<any>;
    private obtenerIamToken;
}
