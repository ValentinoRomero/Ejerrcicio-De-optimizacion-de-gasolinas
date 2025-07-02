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
var AceitesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceitesService = void 0;
const common_1 = require("@nestjs/common");
const watson_service_1 = require("../services/watson.service");
let AceitesService = AceitesService_1 = class AceitesService {
    constructor(watsonDataService) {
        this.watsonDataService = watsonDataService;
        this.logger = new common_1.Logger(AceitesService_1.name);
    }
    async findAll() {
        try {
            this.logger.log('Fetching all aceites from Watson Studio');
            return await this.watsonDataService.getAceites();
        }
        catch (error) {
            this.logger.error('Error fetching aceites:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            if (isNaN(id) || id <= 0) {
                throw new Error(`Invalid aceite id: ${id}`);
            }
            this.logger.log(`Fetching aceite with id ${id} from Watson Studio`);
            const aceites = await this.watsonDataService.getAceites();
            const aceite = aceites.find(a => a.id === id);
            if (!aceite) {
                throw new Error(`Aceite with id ${id} not found`);
            }
            return aceite;
        }
        catch (error) {
            this.logger.error(`Error fetching aceite with id ${id}:`, error);
            throw error;
        }
    }
    async create(createAceiteDto) {
        try {
            this.logger.log('Creating new aceite in Watson Studio');
            return await this.watsonDataService.createAceite(createAceiteDto);
        }
        catch (error) {
            this.logger.error('Error creating aceite:', error);
            throw error;
        }
    }
    async update(id, updateAceiteDto) {
        try {
            this.logger.log(`Updating aceite with id ${id} in Watson Studio`);
            return await this.watsonDataService.updateAceite(id, updateAceiteDto);
        }
        catch (error) {
            this.logger.error(`Error updating aceite with id ${id}:`, error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this.logger.log(`Deleting aceite with id ${id} from Watson Studio`);
            await this.watsonDataService.deleteAceite(id);
            return { message: `Aceite with id ${id} deleted successfully` };
        }
        catch (error) {
            this.logger.error(`Error deleting aceite with id ${id}:`, error);
            throw error;
        }
    }
};
exports.AceitesService = AceitesService;
exports.AceitesService = AceitesService = AceitesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [watson_service_1.WatsonDataService])
], AceitesService);
//# sourceMappingURL=aceites.service.js.map