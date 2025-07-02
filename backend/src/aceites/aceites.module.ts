import { Module } from '@nestjs/common';
import { AceitesController } from './aceites.controller';
import { AceitesService } from './aceites.service';
import { ServicesModule } from '../services/services.module';

@Module({
  controllers: [AceitesController],
  providers: [AceitesService],
  imports: [ServicesModule],
  exports: [AceitesService],
})
export class AceitesModule {} 