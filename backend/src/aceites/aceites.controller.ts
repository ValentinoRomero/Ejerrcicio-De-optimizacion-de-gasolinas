import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AceitesService } from './aceites.service';
import { CreateAceiteDto, UpdateAceiteDto } from './dto';
import { Aceite } from '../entities/aceite.entity';

@ApiTags('aceites')
@Controller('aceites')
export class AceitesController {
  constructor(private readonly aceitesService: AceitesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo aceite crudo' })
  @ApiResponse({ status: 201, description: 'Aceite creado exitosamente', type: Aceite })
  @ApiResponse({ status: 409, description: 'Ya existe un aceite con ese nombre' })
  async create(@Body() createAceiteDto: CreateAceiteDto): Promise<Aceite> {
    return await this.aceitesService.create(createAceiteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los aceites crudos' })
  @ApiResponse({ status: 200, description: 'Lista de aceites obtenida', type: [Aceite] })
  async findAll(): Promise<Aceite[]> {
    return await this.aceitesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un aceite por ID' })
  @ApiParam({ name: 'id', description: 'ID del aceite' })
  @ApiResponse({ status: 200, description: 'Aceite encontrado', type: Aceite })
  @ApiResponse({ status: 404, description: 'Aceite no encontrado' })
  async findOne(@Param('id') id: string): Promise<Aceite> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid aceite id: ${id}`);
    }
    return await this.aceitesService.findOne(numericId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un aceite' })
  @ApiParam({ name: 'id', description: 'ID del aceite' })
  @ApiResponse({ status: 200, description: 'Aceite actualizado exitosamente', type: Aceite })
  @ApiResponse({ status: 404, description: 'Aceite no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe un aceite con ese nombre' })
  async update(
    @Param('id') id: string,
    @Body() updateAceiteDto: UpdateAceiteDto,
  ): Promise<Aceite> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid aceite id: ${id}`);
    }
    return await this.aceitesService.update(numericId, updateAceiteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un aceite' })
  @ApiParam({ name: 'id', description: 'ID del aceite' })
  @ApiResponse({ status: 204, description: 'Aceite eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Aceite no encontrado' })
  async remove(@Param('id') id: string): Promise<void> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid aceite id: ${id}`);
    }
    await this.aceitesService.remove(numericId);
  }
} 