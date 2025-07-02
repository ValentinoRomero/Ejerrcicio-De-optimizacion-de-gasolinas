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
exports.ParametrosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const parametros_service_1 = require("./parametros.service");
let ParametrosController = class ParametrosController {
    constructor(parametrosService) {
        this.parametrosService = parametrosService;
    }
    async getParametrosCosto() {
        return this.parametrosService.getParametrosCosto();
    }
    async updateParametroCosto(id, body) {
        return this.parametrosService.updateParametroCosto(id, body);
    }
    async getParametrosMaxima() {
        return this.parametrosService.getParametrosMaxima();
    }
    async updateParametroMaxima(id, body) {
        return this.parametrosService.updateParametroMaxima(id, body);
    }
};
exports.ParametrosController = ParametrosController;
__decorate([
    (0, common_1.Get)('costo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParametrosController.prototype, "getParametrosCosto", null);
__decorate([
    (0, common_1.Patch)('costo/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ParametrosController.prototype, "updateParametroCosto", null);
__decorate([
    (0, common_1.Get)('maxima'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParametrosController.prototype, "getParametrosMaxima", null);
__decorate([
    (0, common_1.Patch)('maxima/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ParametrosController.prototype, "updateParametroMaxima", null);
exports.ParametrosController = ParametrosController = __decorate([
    (0, swagger_1.ApiTags)('parametros'),
    (0, common_1.Controller)('parametros'),
    __metadata("design:paramtypes", [parametros_service_1.ParametrosService])
], ParametrosController);
//# sourceMappingURL=parametros.controller.js.map