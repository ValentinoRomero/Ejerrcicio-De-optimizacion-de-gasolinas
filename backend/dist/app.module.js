"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const aceites_module_1 = require("./aceites/aceites.module");
const gasolinas_module_1 = require("./gasolinas/gasolinas.module");
const optimizacion_module_1 = require("./optimizacion/optimizacion.module");
const parametros_module_1 = require("./parametros/parametros.module");
const services_module_1 = require("./services/services.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: process.env.DB_DATABASE || 'database.sqlite',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: process.env.NODE_ENV !== 'production',
            }),
            aceites_module_1.AceitesModule,
            gasolinas_module_1.GasolinasModule,
            optimizacion_module_1.OptimizacionModule,
            parametros_module_1.ParametrosModule,
            services_module_1.ServicesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map