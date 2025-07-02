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
exports.Gasolina = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let Gasolina = class Gasolina {
};
exports.Gasolina = Gasolina;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID único del tipo de gasolina' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Gasolina.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del tipo de gasolina' }),
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Gasolina.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Demanda del mercado en litros', minimum: 0 }),
    (0, typeorm_1.Column)('decimal', { precision: 12, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], Gasolina.prototype, "demanda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Precio de venta por litro en USD', minimum: 0 }),
    (0, typeorm_1.Column)('decimal', { precision: 8, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], Gasolina.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Octanaje mínimo requerido (RON)', minimum: 0, maximum: 120 }),
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], Gasolina.prototype, "octanajeMinimo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contenido máximo de plomo permitido en mg/L', minimum: 0, maximum: 1000 }),
    (0, typeorm_1.Column)('decimal', { precision: 6, scale: 2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], Gasolina.prototype, "plomoMaximo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de creación' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Gasolina.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha de última actualización' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Gasolina.prototype, "updatedAt", void 0);
exports.Gasolina = Gasolina = __decorate([
    (0, typeorm_1.Entity)('gasolinas')
], Gasolina);
//# sourceMappingURL=gasolina.entity.js.map