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
var OptimizacionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizacionService = void 0;
const common_1 = require("@nestjs/common");
const watson_service_1 = require("../services/watson.service");
let OptimizacionService = OptimizacionService_1 = class OptimizacionService {
    constructor(watsonDataService) {
        this.watsonDataService = watsonDataService;
        this.logger = new common_1.Logger(OptimizacionService_1.name);
    }
    async getResultadosWatson() {
        this.logger.log('Ejecutando optimización real en Watson Studio (síncrona)');
        return await this.watsonDataService.ejecutarOptimizacionWatsonStudioReal();
    }
    async probarConexionWatson() {
        this.logger.log('Probando conexión con Watson Studio');
        try {
            const conexionExitosa = await this.watsonDataService.testConnection();
            return {
                success: conexionExitosa,
                message: conexionExitosa
                    ? 'Conexión con Watson Studio exitosa'
                    : 'Error en la conexión con Watson Studio',
            };
        }
        catch (error) {
            this.logger.error('Error al probar conexión:', error);
            return {
                success: false,
                error: error.message,
                message: 'Error al probar conexión con Watson Studio',
            };
        }
    }
};
exports.OptimizacionService = OptimizacionService;
exports.OptimizacionService = OptimizacionService = OptimizacionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [watson_service_1.WatsonDataService])
], OptimizacionService);
//# sourceMappingURL=optimizacion.service.js.map