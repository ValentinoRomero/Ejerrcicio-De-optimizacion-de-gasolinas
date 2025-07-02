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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametros = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let Parametros = class Parametros {
};
exports.Parametros = Parametros;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único de los parámetros' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Parametros.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo fijo por litro producido en USD', minimum: 0 }),
    (0, typeorm_1.Column)('decimal', { precision: 8, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], Parametros.prototype, "costoFijoPorLitro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Producción máxima total permitida en litros', minimum: 0 }),
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], Parametros.prototype, "produccionMaximaTotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Penalización por producción extra (factor multiplicador)', minimum: 0 }),
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], Parametros.prototype, "penalizacionProduccionExtra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permitir producción extra a la demanda' }),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Parametros.prototype, "permitirProduccionExtra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Parametros.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Parametros.prototype, "updatedAt", void 0);
exports.Parametros = Parametros = __decorate([
    (0, typeorm_1.Entity)('parametros')
], Parametros);
//# sourceMappingURL=parametros.entity.js.map