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
var OptimizacionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizacionController = void 0;
const common_1 = require("@nestjs/common");
const optimizacion_service_1 = require("./optimizacion.service");
let OptimizacionController = OptimizacionController_1 = class OptimizacionController {
    constructor(optimizacionService) {
        this.optimizacionService = optimizacionService;
        this.logger = new common_1.Logger(OptimizacionController_1.name);
    }
    async probarConexionWatson() {
        this.logger.log('Solicitud de prueba de conexión con Watson Studio');
        return await this.optimizacionService.probarConexionWatson();
    }
    async getResultadosWatson() {
        this.logger.log('Solicitud de resultados reales de Watson Studio recibida');
        return await this.optimizacionService.getResultadosWatson();
    }
};
exports.OptimizacionController = OptimizacionController;
__decorate([
    (0, common_1.Get)('test-conexion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OptimizacionController.prototype, "probarConexionWatson", null);
__decorate([
    (0, common_1.Get)('resultados-watson'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OptimizacionController.prototype, "getResultadosWatson", null);
exports.OptimizacionController = OptimizacionController = OptimizacionController_1 = __decorate([
    (0, common_1.Controller)('optimizacion'),
    __metadata("design:paramtypes", [optimizacion_service_1.OptimizacionService])
], OptimizacionController);
//# sourceMappingURL=optimizacion.controller.js.map