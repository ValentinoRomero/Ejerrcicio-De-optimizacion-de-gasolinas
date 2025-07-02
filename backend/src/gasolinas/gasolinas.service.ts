import { Injectable, Logger } from '@nestjs/common';
import { WatsonDataService } from '../services/watson.service';

@Injectable()
export class GasolinasService {
  private readonly logger = new Logger(GasolinasService.name);

  constructor(private readonly watsonDataService: WatsonDataService) {}

  async findAll() {
    try {
      this.logger.log('Fetching all gasolinas from Watson Studio');
      return await this.watsonDataService.getGasolinas();
    } catch (error) {
      this.logger.error('Error fetching gasolinas:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      if (isNaN(id) || id <= 0) {
        throw new Error(`Invalid gasolina id: ${id}`);
      }

      this.logger.log(`Fetching gasolina with id ${id} from Watson Studio`);
      const gasolinas = await this.watsonDataService.getGasolinas();
      const gasolina = gasolinas.find(g => g.id === id);
      if (!gasolina) {
        throw new Error(`Gasolina with id ${id} not found`);
      }
      return gasolina;
    } catch (error) {
      this.logger.error(`Error fetching gasolina with id ${id}:`, error);
      throw error;
    }
  }

  async create(createGasolinaDto: any) {
    try {
      this.logger.log('Creating new gasolina in Watson Studio');
      return await this.watsonDataService.createGasolina(createGasolinaDto);
    } catch (error) {
      this.logger.error('Error creating gasolina:', error);
      throw error;
    }
  }

  async update(id: number, updateGasolinaDto: any) {
    try {
      this.logger.log(`Updating gasolina with id ${id} in Watson Studio`);
      return await this.watsonDataService.updateGasolina(id, updateGasolinaDto);
    } catch (error) {
      this.logger.error(`Error updating gasolina with id ${id}:`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      this.logger.log(`Deleting gasolina with id ${id} from Watson Studio`);
      await this.watsonDataService.deleteGasolina(id);
      return { message: `Gasolina with id ${id} deleted successfully` };
    } catch (error) {
      this.logger.error(`Error deleting gasolina with id ${id}:`, error);
      throw error;
    }
  }
} 