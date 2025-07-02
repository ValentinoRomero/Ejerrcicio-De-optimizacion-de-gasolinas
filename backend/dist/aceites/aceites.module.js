"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceitesModule = void 0;
const common_1 = require("@nestjs/common");
const aceites_controller_1 = require("./aceites.controller");
const aceites_service_1 = require("./aceites.service");
const services_module_1 = require("../services/services.module");
let AceitesModule = class AceitesModule {
};
exports.AceitesModule = AceitesModule;
exports.AceitesModule = AceitesModule = __decorate([
    (0, common_1.Module)({
        controllers: [aceites_controller_1.AceitesController],
        providers: [aceites_service_1.AceitesService],
        imports: [services_module_1.ServicesModule],
        exports: [aceites_service_1.AceitesService],
    })
], AceitesModule);
//# sourceMappingURL=aceites.module.js.map