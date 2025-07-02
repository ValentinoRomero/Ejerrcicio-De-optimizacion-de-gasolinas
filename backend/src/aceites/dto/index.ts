import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, Max } from 'class-validator';

export class CreateAceiteDto {
  @ApiProperty({ description: 'Nombre del aceite crudo' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Octanaje del aceite (RON)', minimum: 0, maximum: 120 })
  @IsNumber()
  @Min(0)
  @Max(120)
  octanaje: number;

  @ApiProperty({ description: 'Contenido de plomo en mg/L', minimum: 0, maximum: 1000 })
  @IsNumber()
  @Min(0)
  @Max(1000)
  plomo: number;

  @ApiProperty({ description: 'Costo por litro en USD', minimum: 0 })
  @IsNumber()
  @IsPositive()
  costo: number;

  @ApiProperty({ description: 'Capacidad disponible en litros', minimum: 0 })
  @IsNumber()
  @Min(0)
  capacidad: number;
}

export class UpdateAceiteDto {
  @ApiProperty({ description: 'Nombre del aceite crudo', required: false })
  @IsString()
  nombre?: string;

  @ApiProperty({ description: 'Octanaje del aceite (RON)', minimum: 0, maximum: 120, required: false })
  @IsNumber()
  @Min(0)
  @Max(120)
  octanaje?: number;

  @ApiProperty({ description: 'Contenido de plomo en mg/L', minimum: 0, maximum: 1000, required: false })
  @IsNumber()
  @Min(0)
  @Max(1000)
  plomo?: number;

  @ApiProperty({ description: 'Costo por litro en USD', minimum: 0, required: false })
  @IsNumber()
  @IsPositive()
  costo?: number;

  @ApiProperty({ description: 'Capacidad disponible en litros', minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  capacidad?: number;
} 