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
exports.UpdateAceiteDto = exports.CreateAceiteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAceiteDto {
}
exports.CreateAceiteDto = CreateAceiteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del aceite crudo' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAceiteDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Octanaje del aceite (RON)', minimum: 0, maximum: 120 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], CreateAceiteDto.prototype, "octanaje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contenido de plomo en mg/L', minimum: 0, maximum: 1000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], CreateAceiteDto.prototype, "plomo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo por litro en USD', minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateAceiteDto.prototype, "costo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Capacidad disponible en litros', minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateAceiteDto.prototype, "capacidad", void 0);
class UpdateAceiteDto {
}
exports.UpdateAceiteDto = UpdateAceiteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del aceite crudo', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAceiteDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Octanaje del aceite (RON)', minimum: 0, maximum: 120, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(120),
    __metadata("design:type", Number)
], UpdateAceiteDto.prototype, "octanaje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contenido de plomo en mg/L', minimum: 0, maximum: 1000, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1000),
    __metadata("design:type", Number)
], UpdateAceiteDto.prototype, "plomo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo por litro en USD', minimum: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateAceiteDto.prototype, "costo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Capacidad disponible en litros', minimum: 0, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateAceiteDto.prototype, "capacidad", void 0);
//# sourceMappingURL=index.js.map