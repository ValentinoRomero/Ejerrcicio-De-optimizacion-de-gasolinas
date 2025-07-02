import { Module } from '@nestjs/common';
import { ParametrosController } from './parametros.controller';
import { ParametrosService } from './parametros.service';
import { ServicesModule } from '../services/services.module';

@Module({
  controllers: [ParametrosController],
  providers: [ParametrosService],
  imports: [ServicesModule],
  exports: [ParametrosService],
})
export class ParametrosModule {} 