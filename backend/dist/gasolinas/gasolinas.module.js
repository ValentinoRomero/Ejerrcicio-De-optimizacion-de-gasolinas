"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GasolinasModule = void 0;
const common_1 = require("@nestjs/common");
const gasolinas_controller_1 = require("./gasolinas.controller");
const gasolinas_service_1 = require("./gasolinas.service");
const services_module_1 = require("../services/services.module");
let GasolinasModule = class GasolinasModule {
};
exports.GasolinasModule = GasolinasModule;
exports.GasolinasModule = GasolinasModule = __decorate([
    (0, common_1.Module)({
        controllers: [gasolinas_controller_1.GasolinasController],
        providers: [gasolinas_service_1.GasolinasService],
        imports: [services_module_1.ServicesModule],
        exports: [gasolinas_service_1.GasolinasService],
    })
], GasolinasModule);
//# sourceMappingURL=gasolinas.module.js.map