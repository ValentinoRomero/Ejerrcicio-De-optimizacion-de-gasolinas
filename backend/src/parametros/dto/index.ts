import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsBoolean, Min } from 'class-validator';

export class CreateParametrosDto {
  @ApiProperty({ description: 'Costo fijo por litro producido en USD', minimum: 0 })
  @IsNumber()
  @Min(0)
  costoFijoPorLitro: number;

  @ApiProperty({ description: 'Producción máxima total permitida en litros', minimum: 0 })
  @IsNumber()
  @IsPositive()
  produccionMaximaTotal: number;

  @ApiProperty({ description: 'Penalización por producción extra (factor multiplicador)', minimum: 0 })
  @IsNumber()
  @Min(0)
  penalizacionProduccionExtra: number;

  @ApiProperty({ description: 'Permitir producción extra a la demanda' })
  @IsBoolean()
  permitirProduccionExtra: boolean;
}

export class UpdateParametrosDto {
  @ApiProperty({ description: 'Costo fijo por litro producido en USD', minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  costoFijoPorLitro?: number;

  @ApiProperty({ description: 'Producción máxima total permitida en litros', minimum: 0, required: false })
  @IsNumber()
  @IsPositive()
  produccionMaximaTotal?: number;

  @ApiProperty({ description: 'Penalización por producción extra (factor multiplicador)', minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  penalizacionProduccionExtra?: number;

  @ApiProperty({ description: 'Permitir producción extra a la demanda', required: false })
  @IsBoolean()
  permitirProduccionExtra?: boolean;
} 