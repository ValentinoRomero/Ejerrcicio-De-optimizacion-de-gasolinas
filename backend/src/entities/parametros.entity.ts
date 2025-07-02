import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsBoolean, Min } from 'class-validator';

@Entity('parametros')
export class Parametros {
  @ApiProperty({ description: 'ID único de los parámetros' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Costo fijo por litro producido en USD', minimum: 0 })
  @Column('decimal', { precision: 8, scale: 2 })
  @IsNumber()
  @Min(0)
  costoFijoPorLitro: number;

  @ApiProperty({ description: 'Producción máxima total permitida en litros', minimum: 0 })
  @Column('decimal', { precision: 12, scale: 2 })
  @IsNumber()
  @IsPositive()
  produccionMaximaTotal: number;

  @ApiProperty({ description: 'Penalización por producción extra (factor multiplicador)', minimum: 0 })
  @Column('decimal', { precision: 5, scale: 2 })
  @IsNumber()
  @Min(0)
  penalizacionProduccionExtra: number;

  @ApiProperty({ description: 'Permitir producción extra a la demanda' })
  @Column()
  @IsBoolean()
  permitirProduccionExtra: boolean;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updatedAt: Date;
} 