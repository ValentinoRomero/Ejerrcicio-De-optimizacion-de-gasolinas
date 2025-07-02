import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, Max } from 'class-validator';

@Entity('gasolinas')
export class Gasolina {
  @ApiProperty({ description: 'ID único del tipo de gasolina' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del tipo de gasolina' })
  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Demanda del mercado en litros', minimum: 0 })
  @Column('decimal', { precision: 12, scale: 2 })
  @IsNumber()
  @Min(0)
  demanda: number;

  @ApiProperty({ description: 'Precio de venta por litro en USD', minimum: 0 })
  @Column('decimal', { precision: 8, scale: 2 })
  @IsNumber()
  @IsPositive()
  precio: number;

  @ApiProperty({ description: 'Octanaje mínimo requerido (RON)', minimum: 0, maximum: 120 })
  @Column('decimal', { precision: 5, scale: 2 })
  @IsNumber()
  @Min(0)
  @Max(120)
  octanajeMinimo: number;

  @ApiProperty({ description: 'Contenido máximo de plomo permitido en mg/L', minimum: 0, maximum: 1000 })
  @Column('decimal', { precision: 6, scale: 2 })
  @IsNumber()
  @Min(0)
  @Max(1000)
  plomoMaximo: number;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updatedAt: Date;
} 