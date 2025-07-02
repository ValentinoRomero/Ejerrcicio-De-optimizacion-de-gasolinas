import { WatsonDataService } from '../services/watson.service';
export declare class AceitesService {
    private readonly watsonDataService;
    private readonly logger;
    constructor(watsonDataService: WatsonDataService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createAceiteDto: any): Promise<any>;
    update(id: number, updateAceiteDto: any): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
