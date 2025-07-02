import { Module } from '@nestjs/common';
import { OptimizacionController } from './optimizacion.controller';
import { OptimizacionService } from './optimizacion.service';
import { ServicesModule } from '../services/services.module';

@Module({
  controllers: [OptimizacionController],
  providers: [OptimizacionService],
  imports: [ServicesModule],
  exports: [OptimizacionService],
})
export class OptimizacionModule {} 