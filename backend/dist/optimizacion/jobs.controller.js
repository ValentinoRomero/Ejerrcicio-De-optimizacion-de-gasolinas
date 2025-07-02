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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var JobsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const watson_service_1 = require("../services/watson.service");
const optimizacion_service_1 = require("./optimizacion.service");
let JobsController = JobsController_1 = class JobsController {
    constructor(watsonDataService, optimizacionService) {
        this.watsonDataService = watsonDataService;
        this.optimizacionService = optimizacionService;
        this.logger = new common_1.Logger(JobsController_1.name);
    }
    async lanzarJob(payload) {
        try {
            this.logger.log('Lanzando job de optimización con Watson Studio');
            const resultado = await this.optimizacionService.ejecutarOptimizacion();
            return {
                success: true,
                jobId: `optimizacion_${Date.now()}`,
                status: 'completed',
                data: resultado,
                message: 'Job de optimización completado exitosamente usando modelo OPL',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.logger.error('Error al lanzar job:', error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async estadoJob(jobId) {
        try {
            this.logger.log(`Consultando estado del job: ${jobId}`);
            return {
                jobId,
                status: 'completed',
                message: 'Job completado exitosamente',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.logger.error('Error al consultar estado del job:', error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resultadosJob(jobId) {
        try {
            this.logger.log(`Obteniendo resultados del job: ${jobId}`);
            const resultado = await this.optimizacionService.obtenerResultadosOptimizacion();
            return {
                jobId,
                success: true,
                data: resultado.data,
                message: 'Resultados obtenidos exitosamente',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.logger.error('Error al obtener resultados del job:', error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async descargarResultado(assetId, res) {
        try {
            this.logger.log(`Descargando resultado: ${assetId}`);
            const resultado = await this.optimizacionService.obtenerResultadosOptimizacion();
            const csvData = this.convertirResultadosACSV(resultado.data);
            res.set({
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="optimizacion_${assetId}.csv"`
            });
            res.send(csvData);
        }
        catch (error) {
            this.logger.error('Error al descargar resultado:', error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    convertirResultadosACSV(data) {
        let csv = 'Tipo,Detalle,Valor\n';
        csv += `Métricas,Ingreso Total,${data.metricas.ingresoTotal}\n`;
        csv += `Métricas,Costo Total,${data.metricas.costoTotal}\n`;
        csv += `Métricas,Beneficio Neto,${data.metricas.beneficioNeto}\n`;
        csv += `Métricas,Litros Excedentes,${data.metricas.litrosExcedentes}\n`;
        csv += `Métricas,Costo Excedentes,${data.metricas.costoExcedentes}\n`;
        data.asignaciones.forEach((asignacion) => {
            csv += `Asignación,${asignacion.aceiteNombre} -> ${asignacion.gasolinaNombre},${asignacion.litros}\n`;
        });
        data.produccion.forEach((prod) => {
            csv += `Producción,${prod.gasolinaNombre} - Producidos,${prod.litrosProducidos}\n`;
            csv += `Producción,${prod.gasolinaNombre} - Demanda,${prod.demanda}\n`;
            csv += `Producción,${prod.gasolinaNombre} - Excedente,${prod.excedente}\n`;
        });
        return csv;
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)('launch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "lanzarJob", null);
__decorate([
    (0, common_1.Get)('status/:jobId'),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "estadoJob", null);
__decorate([
    (0, common_1.Get)('results/:jobId'),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "resultadosJob", null);
__decorate([
    (0, common_1.Get)('download/:assetId'),
    __param(0, (0, common_1.Param)('assetId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "descargarResultado", null);
exports.JobsController = JobsController = JobsController_1 = __decorate([
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [watson_service_1.WatsonDataService,
        optimizacion_service_1.OptimizacionService])
], JobsController);
//# sourceMappingURL=jobs.controller.js.map