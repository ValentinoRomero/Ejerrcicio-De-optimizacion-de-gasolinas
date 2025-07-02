"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizacionModule = void 0;
const common_1 = require("@nestjs/common");
const optimizacion_controller_1 = require("./optimizacion.controller");
const optimizacion_service_1 = require("./optimizacion.service");
const services_module_1 = require("../services/services.module");
let OptimizacionModule = class OptimizacionModule {
};
exports.OptimizacionModule = OptimizacionModule;
exports.OptimizacionModule = OptimizacionModule = __decorate([
    (0, common_1.Module)({
        controllers: [optimizacion_controller_1.OptimizacionController],
        providers: [optimizacion_service_1.OptimizacionService],
        imports: [services_module_1.ServicesModule],
        exports: [optimizacion_service_1.OptimizacionService],
    })
], OptimizacionModule);
//# sourceMappingURL=optimizacion.module.js.map