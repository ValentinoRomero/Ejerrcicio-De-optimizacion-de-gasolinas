"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GasolinasService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasolinasService = void 0;
const common_1 = require("@nestjs/common");
const watson_service_1 = require("../services/watson.service");
let GasolinasService = GasolinasService_1 = class GasolinasService {
    constructor(watsonDataService) {
        this.watsonDataService = watsonDataService;
        this.logger = new common_1.Logger(GasolinasService_1.name);
    }
    async findAll() {
        try {
            this.logger.log('Fetching all gasolinas from Watson Studio');
            return await this.watsonDataService.getGasolinas();
        }
        catch (error) {
            this.logger.error('Error fetching gasolinas:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            if (isNaN(id) || id <= 0) {
                throw new Error(`Invalid gasolina id: ${id}`);
            }
            this.logger.log(`Fetching gasolina with id ${id} from Watson Studio`);
            const gasolinas = await this.watsonDataService.getGasolinas();
            const gasolina = gasolinas.find(g => g.id === id);
            if (!gasolina) {
                throw new Error(`Gasolina with id ${id} not found`);
            }
            return gasolina;
        }
        catch (error) {
            this.logger.error(`Error fetching gasolina with id ${id}:`, error);
            throw error;
        }
    }
    async create(createGasolinaDto) {
        try {
            this.logger.log('Creating new gasolina in Watson Studio');
            return await this.watsonDataService.createGasolina(createGasolinaDto);
        }
        catch (error) {
            this.logger.error('Error creating gasolina:', error);
            throw error;
        }
    }
    async update(id, updateGasolinaDto) {
        try {
            this.logger.log(`Updating gasolina with id ${id} in Watson Studio`);
            return await this.watsonDataService.updateGasolina(id, updateGasolinaDto);
        }
        catch (error) {
            this.logger.error(`Error updating gasolina with id ${id}:`, error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Deleting gasolina with id ${id} from Watson Studio`);
            await this.watsonDataService.deleteGasolina(id);
            return { message: `Gasolina with id ${id} deleted successfully` };
        }
        catch (error) {
            this.logger.error(`Error deleting gasolina with id ${id}:`, error);
            throw error;
        }
    }
};
exports.GasolinasService = GasolinasService;
exports.GasolinasService = GasolinasService = GasolinasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [watson_service_1.WatsonDataService])
], GasolinasService);
//# sourceMappingURL=gasolinas.service.js.map