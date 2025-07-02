import { Controller, Get, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParametrosService } from './parametros.service';

@ApiTags('parametros')
@Controller('parametros')
export class ParametrosController {
  constructor(private readonly parametrosService: ParametrosService) {}

  // Obtener todos los parámetros de costo (ProdCostParam)
  @Get('costo')
  async getParametrosCosto() {
    return this.parametrosService.getParametrosCosto();
  }

  // Actualizar parámetro de costo por ID
  @Patch('costo/:id')
  async updateParametroCosto(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any
  ) {
    return this.parametrosService.updateParametroCosto(id, body);
  }

  // Obtener todos los parámetros de producción máxima (MaxProdParam)
  @Get('maxima')
  async getParametrosMaxima() {
    return this.parametrosService.getParametrosMaxima();
  }

  // Actualizar parámetro de producción máxima por ID
  @Patch('maxima/:id')
  async updateParametroMaxima(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any
  ) {
    return this.parametrosService.updateParametroMaxima(id, body);
  }
} 