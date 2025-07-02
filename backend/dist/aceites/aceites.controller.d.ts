import { AceitesService } from './aceites.service';
import { CreateAceiteDto, UpdateAceiteDto } from './dto';
import { Aceite } from '../entities/aceite.entity';
export declare class AceitesController {
    private readonly aceitesService;
    constructor(aceitesService: AceitesService);
    create(createAceiteDto: CreateAceiteDto): Promise<Aceite>;
    findAll(): Promise<Aceite[]>;
    findOne(id: string): Promise<Aceite>;
    update(id: string, updateAceiteDto: UpdateAceiteDto): Promise<Aceite>;
    remove(id: string): Promise<void>;
}
