import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AceitesModule } from './aceites/aceites.module';
import { GasolinasModule } from './gasolinas/gasolinas.module';
import { OptimizacionModule } from './optimizacion/optimizacion.module';
import { ParametrosModule } from './parametros/parametros.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_DATABASE || 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AceitesModule,
    GasolinasModule,
    OptimizacionModule,
    ParametrosModule,
    ServicesModule,
  ],
})
export class AppModule {} 