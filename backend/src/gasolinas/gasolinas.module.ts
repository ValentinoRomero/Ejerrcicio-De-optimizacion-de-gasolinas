import { Module } from '@nestjs/common';
import { GasolinasController } from './gasolinas.controller';
import { GasolinasService } from './gasolinas.service';
import { ServicesModule } from '../services/services.module';

@Module({
  controllers: [GasolinasController],
  providers: [GasolinasService],
  imports: [ServicesModule],
  exports: [GasolinasService],
})
export class GasolinasModule {} 