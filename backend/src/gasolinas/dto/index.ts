import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, Max } from 'class-validator';

export class CreateGasolinaDto {
  @ApiProperty({ description: 'Nombre del tipo de gasolina' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Demanda del mercado en litros', minimum: 0 })
  @IsNumber()
  @Min(0)
  demanda: number;

  @ApiProperty({ description: 'Precio de venta por litro en USD', minimum: 0 })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({ description: 'Octanaje mínimo requerido (RON)', minimum: 0, maximum: 120 })
  @IsNumber()
  @Min(0)
  @Max(120)
  octanajeMinimo: number;

  @ApiProperty({ description: 'Contenido máximo de plomo permitido en mg/L', minimum: 0, maximum: 1000 })
  @IsNumber()
  @Min(0)
  @Max(1000)
  plomoMaximo: number;
}

export class UpdateGasolinaDto {
  @ApiProperty({ description: 'Nombre del tipo de gasolina', required: false })
  @IsString()
  nombre?: string;

  @ApiProperty({ description: 'Demanda del mercado en litros', minimum: 0, required: false })
  @IsNumber()
  @Min(0)
  demanda?: number;

  @ApiProperty({ description: 'Precio de venta por litro en USD', minimum: 0, required: false })
  @IsNumber()
  @IsPositive()
  precio?: number;

  @ApiProperty({ description: 'Octanaje mínimo requerido (RON)', minimum: 0, maximum: 120, required: false })
  @IsNumber()
  @Min(0)
  @Max(120)
  octanajeMinimo?: number;

  @ApiProperty({ description: 'Contenido máximo de plomo permitido en mg/L', minimum: 0, maximum: 1000, required: false })
  @IsNumber()
  @Min(0)
  @Max(1000)
  plomoMaximo?: number;
} 