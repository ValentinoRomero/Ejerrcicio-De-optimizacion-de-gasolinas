import { GasolinasService } from './gasolinas.service';
import { CreateGasolinaDto, UpdateGasolinaDto } from './dto';
import { Gasolina } from '../entities/gasolina.entity';
export declare class GasolinasController {
    private readonly gasolinasService;
    constructor(gasolinasService: GasolinasService);
    create(createGasolinaDto: CreateGasolinaDto): Promise<Gasolina>;
    findAll(): Promise<Gasolina[]>;
    findOne(id: string): Promise<Gasolina>;
    update(id: string, updateGasolinaDto: UpdateGasolinaDto): Promise<Gasolina>;
    remove(id: string): Promise<void>;
}
