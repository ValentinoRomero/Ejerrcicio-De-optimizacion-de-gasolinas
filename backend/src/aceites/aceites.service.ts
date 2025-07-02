import { Injectable, Logger } from '@nestjs/common';
import { WatsonDataService } from '../services/watson.service';

@Injectable()
export class AceitesService {
  private readonly logger = new Logger(AceitesService.name);

  constructor(private readonly watsonDataService: WatsonDataService) {}

  async findAll() {
    try {
      this.logger.log('Fetching all aceites from Watson Studio');
      return await this.watsonDataService.getAceites();
    } catch (error) {
      this.logger.error('Error fetching aceites:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      // Validar que el ID sea un número válido
      if (isNaN(id) || id <= 0) {
        throw new Error(`Invalid aceite id: ${id}`);
      }

      this.logger.log(`Fetching aceite with id ${id} from Watson Studio`);
      const aceites = await this.watsonDataService.getAceites();
      const aceite = aceites.find(a => a.id === id);
      if (!aceite) {
        throw new Error(`Aceite with id ${id} not found`);
      }
      return aceite;
    } catch (error) {
      this.logger.error(`Error fetching aceite with id ${id}:`, error);
      throw error;
    }
  }

  async create(createAceiteDto: any) {
    try {
      this.logger.log('Creating new aceite in Watson Studio');
      return await this.watsonDataService.createAceite(createAceiteDto);
    } catch (error) {
      this.logger.error('Error creating aceite:', error);
      throw error;
    }
  }

  async update(id: number, updateAceiteDto: any) {
    try {
      this.logger.log(`Updating aceite with id ${id} in Watson Studio`);
      return await this.watsonDataService.updateAceite(id, updateAceiteDto);
    } catch (error) {
      this.logger.error(`Error updating aceite with id ${id}:`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      this.logger.log(`Deleting aceite with id ${id} from Watson Studio`);
      await this.watsonDataService.deleteAceite(id);
      return { message: `Aceite with id ${id} deleted successfully` };
    } catch (error) {
      this.logger.error(`Error deleting aceite with id ${id}:`, error);
      throw error;
    }
  }
} 