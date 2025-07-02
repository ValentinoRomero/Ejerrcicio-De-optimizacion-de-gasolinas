import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min, Max } from 'class-validator';

@Entity('aceites')
export class Aceite {
  @ApiProperty({ description: 'ID único del aceite' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del aceite crudo' })
  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Octanaje del aceite (RON)', minimum: 0, maximum: 120 })
  @Column('decimal', { precision: 5, scale: 2 })
  @IsNumber()
  @Min(0)
  @Max(120)
  octanaje: number;

  @ApiProperty({ description: 'Contenido de plomo en mg/L', minimum: 0, maximum: 1000 })
  @Column('decimal', { precision: 6, scale: 2 })
  @IsNumber()
  @Min(0)
  @Max(1000)
  plomo: number;

  @ApiProperty({ description: 'Costo por litro en USD', minimum: 0 })
  @Column('decimal', { precision: 8, scale: 2 })
  @IsNumber()
  @IsPositive()
  costo: number;

  @ApiProperty({ description: 'Capacidad disponible en litros', minimum: 0 })
  @Column('decimal', { precision: 12, scale: 2 })
  @IsNumber()
  @Min(0)
  capacidad: number;

  @ApiProperty({ description: 'Fecha de creación' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  @UpdateDateColumn()
  updatedAt: Date;
} 