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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasolinasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gasolinas_service_1 = require("./gasolinas.service");
const dto_1 = require("./dto");
const gasolina_entity_1 = require("../entities/gasolina.entity");
let GasolinasController = class GasolinasController {
    constructor(gasolinasService) {
        this.gasolinasService = gasolinasService;
    }
    async create(createGasolinaDto) {
        return await this.gasolinasService.create(createGasolinaDto);
    }
    async findAll() {
        return await this.gasolinasService.findAll();
    }
    async findOne(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error(`Invalid gasolina id: ${id}`);
        }
        return await this.gasolinasService.findOne(numericId);
    }
    async update(id, updateGasolinaDto) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error(`Invalid gasolina id: ${id}`);
        }
        return await this.gasolinasService.update(numericId, updateGasolinaDto);
    }
    async remove(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error(`Invalid gasolina id: ${id}`);
        }
        await this.gasolinasService.remove(numericId);
    }
};
exports.GasolinasController = GasolinasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo tipo de gasolina' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Gasolina creada exitosamente', type: gasolina_entity_1.Gasolina }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ya existe una gasolina con ese nombre' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateGasolinaDto]),
    __metadata("design:returntype", Promise)
], GasolinasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los tipos de gasolina' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de gasolinas obtenida', type: [gasolina_entity_1.Gasolina] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GasolinasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una gasolina por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la gasolina' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gasolina encontrada', type: gasolina_entity_1.Gasolina }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Gasolina no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GasolinasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una gasolina' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la gasolina' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gasolina actualizada exitosamente', type: gasolina_entity_1.Gasolina }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Gasolina no encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ya existe una gasolina con ese nombre' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateGasolinaDto]),
    __metadata("design:returntype", Promise)
], GasolinasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una gasolina' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la gasolina' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Gasolina eliminada exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Gasolina no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GasolinasController.prototype, "remove", null);
exports.GasolinasController = GasolinasController = __decorate([
    (0, swagger_1.ApiTags)('gasolinas'),
    (0, common_1.Controller)('gasolinas'),
    __metadata("design:paramtypes", [gasolinas_service_1.GasolinasService])
], GasolinasController);
//# sourceMappingURL=gasolinas.controller.js.map