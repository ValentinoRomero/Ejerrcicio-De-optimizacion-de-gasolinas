import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GasolinasService } from './gasolinas.service';
import { CreateGasolinaDto, UpdateGasolinaDto } from './dto';
import { Gasolina } from '../entities/gasolina.entity';

@ApiTags('gasolinas')
@Controller('gasolinas')
export class GasolinasController {
  constructor(private readonly gasolinasService: GasolinasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo tipo de gasolina' })
  @ApiResponse({ status: 201, description: 'Gasolina creada exitosamente', type: Gasolina })
  @ApiResponse({ status: 409, description: 'Ya existe una gasolina con ese nombre' })
  async create(@Body() createGasolinaDto: CreateGasolinaDto): Promise<Gasolina> {
    return await this.gasolinasService.create(createGasolinaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tipos de gasolina' })
  @ApiResponse({ status: 200, description: 'Lista de gasolinas obtenida', type: [Gasolina] })
  async findAll(): Promise<Gasolina[]> {
    return await this.gasolinasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una gasolina por ID' })
  @ApiParam({ name: 'id', description: 'ID de la gasolina' })
  @ApiResponse({ status: 200, description: 'Gasolina encontrada', type: Gasolina })
  @ApiResponse({ status: 404, description: 'Gasolina no encontrada' })
  async findOne(@Param('id') id: string): Promise<Gasolina> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid gasolina id: ${id}`);
    }
    return await this.gasolinasService.findOne(numericId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una gasolina' })
  @ApiParam({ name: 'id', description: 'ID de la gasolina' })
  @ApiResponse({ status: 200, description: 'Gasolina actualizada exitosamente', type: Gasolina })
  @ApiResponse({ status: 404, description: 'Gasolina no encontrada' })
  @ApiResponse({ status: 409, description: 'Ya existe una gasolina con ese nombre' })
  async update(
    @Param('id') id: string,
    @Body() updateGasolinaDto: UpdateGasolinaDto,
  ): Promise<Gasolina> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid gasolina id: ${id}`);
    }
    return await this.gasolinasService.update(numericId, updateGasolinaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una gasolina' })
  @ApiParam({ name: 'id', description: 'ID de la gasolina' })
  @ApiResponse({ status: 204, description: 'Gasolina eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Gasolina no encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid gasolina id: ${id}`);
    }
    await this.gasolinasService.remove(numericId);
  }
} 