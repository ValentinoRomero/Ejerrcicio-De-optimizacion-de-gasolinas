import { Module } from '@nestjs/common';
import { CosService } from './cos.service';
import { WatsonDataService } from './watson.service';
 
@Module({
  providers: [CosService, WatsonDataService],
  exports: [CosService, WatsonDataService],
})
export class ServicesModule {} 