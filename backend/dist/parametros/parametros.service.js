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
var ParametrosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametrosService = void 0;
const common_1 = require("@nestjs/common");
const watson_service_1 = require("../services/watson.service");
let ParametrosService = ParametrosService_1 = class ParametrosService {
    constructor(watsonDataService) {
        this.watsonDataService = watsonDataService;
        this.logger = new common_1.Logger(ParametrosService_1.name);
    }
    async findAll() {
        try {
            this.logger.log('Fetching all parameters from Watson Studio');
            const [parametrosCosto, parametrosMaxima] = await Promise.all([
                this.watsonDataService.getParametrosCosto(),
                this.watsonDataService.getParametrosMaxima()
            ]);
            return {
                parametrosCosto,
                parametrosMaxima
            };
        }
        catch (error) {
            this.logger.error('Error fetching parameters:', error);
            throw error;
        }
    }
    async findParametroCosto(id) {
        try {
            this.logger.log(`Fetching parametro costo with id ${id} from Watson Studio`);
            const parametros = await this.watsonDataService.getParametrosCosto();
            const parametro = parametros.find(p => p.id === id);
            if (!parametro) {
                throw new Error(`Parámetro costo with id ${id} not found`);
            }
            return parametro;
        }
        catch (error) {
            this.logger.error(`Error fetching parametro costo with id ${id}:`, error);
            throw error;
        }
    }
    async findParametroMaxima(id) {
        try {
            this.logger.log(`Fetching parametro maxima with id ${id} from Watson Studio`);
            const parametros = await this.watsonDataService.getParametrosMaxima();
            const parametro = parametros.find(p => p.id === id);
            if (!parametro) {
                throw new Error(`Parámetro maxima with id ${id} not found`);
            }
            return parametro;
        }
        catch (error) {
            this.logger.error(`Error fetching parametro maxima with id ${id}:`, error);
            throw error;
        }
    }
    async updateParametroCosto(id, updateParametroDto) {
        try {
            this.logger.log(`Updating parametro costo with id ${id} in Watson Studio`);
            return await this.watsonDataService.updateParametroCosto(id, updateParametroDto);
        }
        catch (error) {
            this.logger.error(`Error updating parametro costo with id ${id}:`, error);
            throw error;
        }
    }
    async updateParametroMaxima(id, updateParametroDto) {
        try {
            this.logger.log(`Updating parametro maxima with id ${id} in Watson Studio`);
            return await this.watsonDataService.updateParametroMaxima(id, updateParametroDto);
        }
        catch (error) {
            this.logger.error(`Error updating parametro maxima with id ${id}:`, error);
            throw error;
        }
    }
    async getParametrosCosto() {
        try {
            this.logger.log('Fetching parametros costo from Watson Studio');
            return await this.watsonDataService.getParametrosCosto();
        }
        catch (error) {
            this.logger.error('Error fetching parametros costo:', error);
            throw error;
        }
    }
    async getParametrosMaxima() {
        try {
            this.logger.log('Fetching parametros maxima from Watson Studio');
            return await this.watsonDataService.getParametrosMaxima();
        }
        catch (error) {
            this.logger.error('Error fetching parametros maxima:', error);
            throw error;
        }
    }
};
exports.ParametrosService = ParametrosService;
exports.ParametrosService = ParametrosService = ParametrosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [watson_service_1.WatsonDataService])
], ParametrosService);
//# sourceMappingURL=parametros.service.js.map