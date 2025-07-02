import { WatsonDataService } from '../services/watson.service';
export declare class GasolinasService {
    private readonly watsonDataService;
    private readonly logger;
    constructor(watsonDataService: WatsonDataService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createGasolinaDto: any): Promise<any>;
    update(id: number, updateGasolinaDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
