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
exports.AceitesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aceites_service_1 = require("./aceites.service");
const dto_1 = require("./dto");
const aceite_entity_1 = require("../entities/aceite.entity");
let AceitesController = class AceitesController {
    constructor(aceitesService) {
        this.aceitesService = aceitesService;
    }
    async create(createAceiteDto) {
        return await this.aceitesService.create(createAceiteDto);
    }
    async findAll() {
        return await this.aceitesService.findAll();
    }
    async findOne(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error(`Invalid aceite id: ${id}`);
        }
        return await this.aceitesService.findOne(numericId);
    }
    async update(id, updateAceiteDto) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error(`Invalid aceite id: ${id}`);
        }
        return await this.aceitesService.update(numericId, updateAceiteDto);
    }
    async remove(id) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new Error(`Invalid aceite id: ${id}`);
        }
        await this.aceitesService.remove(numericId);
    }
};
exports.AceitesController = AceitesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo aceite crudo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Aceite creado exitosamente', type: aceite_entity_1.Aceite }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ya existe un aceite con ese nombre' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAceiteDto]),
    __metadata("design:returntype", Promise)
], AceitesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los aceites crudos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de aceites obtenida', type: [aceite_entity_1.Aceite] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AceitesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un aceite por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del aceite' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Aceite encontrado', type: aceite_entity_1.Aceite }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Aceite no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AceitesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un aceite' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del aceite' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Aceite actualizado exitosamente', type: aceite_entity_1.Aceite }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Aceite no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Ya existe un aceite con ese nombre' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateAceiteDto]),
    __metadata("design:returntype", Promise)
], AceitesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un aceite' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del aceite' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Aceite eliminado exitosamente' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Aceite no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AceitesController.prototype, "remove", null);
exports.AceitesController = AceitesController = __decorate([
    (0, swagger_1.ApiTags)('aceites'),
    (0, common_1.Controller)('aceites'),
    __metadata("design:paramtypes", [aceites_service_1.AceitesService])
], AceitesController);
//# sourceMappingURL=aceites.controller.js.map