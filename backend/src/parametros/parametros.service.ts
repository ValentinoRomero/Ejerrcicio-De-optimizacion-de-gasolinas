import { Injectable, Logger } from '@nestjs/common';
import { WatsonDataService } from '../services/watson.service';

@Injectable()
export class ParametrosService {
  private readonly logger = new Logger(ParametrosService.name);

  constructor(private readonly watsonDataService: WatsonDataService) {}

  async findAll() {
    try {
      this.logger.log('Fetching all parameters from Watson Studio');
      const [parametrosCosto, parametrosMaxima] = await Promise.all([
        this.watsonDataService.getParametrosCosto(),
        this.watsonDataService.getParametrosMaxima()
      ]);
      
      return {
        parametrosCosto,
        parametrosMaxima
      };
    } catch (error) {
      this.logger.error('Error fetching parameters:', error);
      throw error;
    }
  }

  async findParametroCosto(id: number) {
    try {
      this.logger.log(`Fetching parametro costo with id ${id} from Watson Studio`);
      const parametros = await this.watsonDataService.getParametrosCosto();
      const parametro = parametros.find(p => p.id === id);
      if (!parametro) {
        throw new Error(`Parámetro costo with id ${id} not found`);
      }
      return parametro;
    } catch (error) {
      this.logger.error(`Error fetching parametro costo with id ${id}:`, error);
      throw error;
    }
  }

  async findParametroMaxima(id: number) {
    try {
      this.logger.log(`Fetching parametro maxima with id ${id} from Watson Studio`);
      const parametros = await this.watsonDataService.getParametrosMaxima();
      const parametro = parametros.find(p => p.id === id);
      if (!parametro) {
        throw new Error(`Parámetro maxima with id ${id} not found`);
      }
      return parametro;
    } catch (error) {
      this.logger.error(`Error fetching parametro maxima with id ${id}:`, error);
      throw error;
    }
  }

  async updateParametroCosto(id: number, updateParametroDto: any) {
    try {
      this.logger.log(`Updating parametro costo with id ${id} in Watson Studio`);
      return await this.watsonDataService.updateParametroCosto(id, updateParametroDto);
    } catch (error) {
      this.logger.error(`Error updating parametro costo with id ${id}:`, error);
      throw error;
    }
  }

  async updateParametroMaxima(id: number, updateParametroDto: any) {
    try {
      this.logger.log(`Updating parametro maxima with id ${id} in Watson Studio`);
      return await this.watsonDataService.updateParametroMaxima(id, updateParametroDto);
    } catch (error) {
      this.logger.error(`Error updating parametro maxima with id ${id}:`, error);
      throw error;
    }
  }

  async getParametrosCosto() {
    try {
      this.logger.log('Fetching parametros costo from Watson Studio');
      return await this.watsonDataService.getParametrosCosto();
    } catch (error) {
      this.logger.error('Error fetching parametros costo:', error);
      throw error;
    }
  }

  async getParametrosMaxima() {
    try {
      this.logger.log('Fetching parametros maxima from Watson Studio');
      return await this.watsonDataService.getParametrosMaxima();
    } catch (error) {
      this.logger.error('Error fetching parametros maxima:', error);
      throw error;
    }
  }
} 