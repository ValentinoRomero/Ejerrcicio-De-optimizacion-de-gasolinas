import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import * as csvParse from 'csv-parse/sync';
import { CosService } from './cos.service';

export interface OptimizacionRequest {
  aceites: Array<{
    id: number;
    nombre: string;
    octanaje: number;
    plomo: number;
    costo: number;
    capacidad: number;
  }>;
  gasolinas: Array<{
    id: number;
    nombre: string;
    demanda: number;
    precio: number;
    octanajeMinimo: number;
    plomoMaximo: number;
  }>;
  parametros: {
    costoFijoPorLitro: number;
    produccionMaximaTotal: number;
    penalizacionProduccionExtra: number;
    permitirProduccionExtra: boolean;
  };
}

export interface OptimizacionResponse {
  asignaciones: Array<{
    aceiteId: number;
    aceiteNombre: string;
    gasolinaId: number;
    gasolinaNombre: string;
    litros: number;
  }>;
  produccion: Array<{
    gasolinaId: number;
    gasolinaNombre: string;
    litrosProducidos: number;
    demanda: number;
    excedente: number;
    porcentajeCumplimiento: number;
  }>;
  metricas: {
    ingresoTotal: number;
    costoTotal: number;
    beneficioNeto: number;
    litrosExcedentes: number;
    costoExcedentes: number;
  };
  status: 'success' | 'error';
  message?: string;
}

export interface WatsonAsset {
  id: string;
  name: string;
  type: string;
  href: string;
}

export interface WatsonTableData {
  fields: Array<{
    name: string;
    type: string;
  }>;
  values: any[][];
}

export interface WatsonResponse {
  data: any;
  status: number;
}

@Injectable()
export class WatsonDataService {
  private readonly logger = new Logger(WatsonDataService.name);
  private readonly client: AxiosInstance;
  private readonly projectId: string;
  private readonly spaceId: string;
  private readonly apiKey: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private readonly assets: {
    oils: string;
    gasolines: string;
    prodCostParam: string;
    maxProdParam: string;
  };

  constructor(
    private configService: ConfigService,
    private cosService: CosService,
  ) {
    this.projectId = this.configService.get<string>('WATSON_PROJECT_ID');
    this.spaceId = this.configService.get<string>('WATSON_SPACE_ID');
    this.apiKey = this.configService.get<string>('WATSON_API_KEY');
    
    this.assets = {
      oils: this.configService.get<string>('WATSON_OILS_ASSET_ID'),
      gasolines: this.configService.get<string>('WATSON_GASOLINES_ASSET_ID'),
      prodCostParam: this.configService.get<string>('WATSON_PROD_COST_PARAM_ASSET_ID'),
      maxProdParam: this.configService.get<string>('WATSON_MAX_PROD_PARAM_ASSET_ID'),
    };

    // Verificar configuración completa de Watson
    if (!this.apiKey || this.apiKey === 'your_watson_api_key_here' || !this.projectId || !this.spaceId) {
      throw new Error(
        'Watson Studio configuration is incomplete. Please set the following environment variables:\n' +
        '- WATSON_API_KEY\n' +
        '- WATSON_PROJECT_ID\n' +
        '- WATSON_SPACE_ID\n' +
        '- WATSON_OILS_ASSET_ID\n' +
        '- WATSON_GASOLINES_ASSET_ID\n' +
        '- WATSON_PROD_COST_PARAM_ASSET_ID\n' +
        '- WATSON_MAX_PROD_PARAM_ASSET_ID'
      );
    }

      this.client = axios.create({
        baseURL: 'https://api.dataplatform.cloud.ibm.com',
        headers: {
          'Content-Type': 'application/json',
        'Accept': 'application/json',
        },
      });
    
      this.logger.log('WatsonDataService initialized with Watson Studio connection');
    }

  // Método para obtener token de acceso
  private async getAccessToken(): Promise<string> {
    // Verificar si ya tenemos un token válido
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      this.logger.log('Obteniendo nuevo token de acceso...');
      
      const response = await axios.post('https://iam.cloud.ibm.com/identity/token', 
        `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${this.apiKey}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
        }
      );

      this.accessToken = response.data.access_token;
      // El token expira en 1 hora, pero lo renovamos 10 minutos antes
      this.tokenExpiry = Date.now() + (response.data.expires_in - 600) * 1000;
      
      this.logger.log('Token de acceso obtenido exitosamente');
      return this.accessToken;
    } catch (error) {
      this.logger.error('Error obteniendo token de acceso:', error);
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }

  // Método para hacer requests autenticados
  private async authenticatedRequest(config: any): Promise<any> {
    const token = await this.getAccessToken();
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
    
    return this.client.request(config);
  }

  // Métodos genéricos para manejar datos de tablas
  private async getTableData(assetId: string): Promise<WatsonTableData> {
    try {
      const response = await this.authenticatedRequest({
        method: 'GET',
        url: `/v2/assets/${assetId}/content?project_id=${this.projectId}`,
        responseType: 'arraybuffer'
      });
      
      const csvString = response.data.toString('utf-8');
      const records = csvParse.parse(csvString, { columns: true });
      // Convertir a formato WatsonTableData
      const fields = Object.keys(records[0] || {}).map(name => ({ name, type: 'string' }));
      const values = records.map((row: any) => fields.map(f => row[f.name]));
      return { fields, values };
    } catch (error) {
      this.logger.error(`Error getting table data for asset ${assetId}:`, error);
      throw new Error(`Failed to get table data: ${error.message}`);
    }
  }

  private async updateTableData(assetId: string, data: WatsonTableData): Promise<void> {
    try {
      await this.authenticatedRequest({
        method: 'PUT',
        url: `/v2/assets/${assetId}/data`,
        data: data
      });
      this.logger.log(`Table data updated for asset ${assetId}`);
    } catch (error) {
      this.logger.error(`Error updating table data for asset ${assetId}:`, error);
      throw new Error(`Failed to update table data: ${error.message}`);
    }
  }

  // Métodos específicos para Aceites (Oils)
  async getAceites(): Promise<any[]> {
    this.logger.log('Leyendo aceites desde Cloud Object Storage');
    const aceites = await this.cosService.leerCSV('Oils.csv');
    return aceites.map((a, index) => ({
      id: index + 1,
      nombre: a.name,
      capacidad: a.capacity ? Number(a.capacity) : undefined,
      costo: a.price ? Number(a.price) : undefined,
      octanaje: a.octane ? Number(a.octane) : undefined,
      plomo: a.lead ? Number(a.lead) : undefined,
    }));
  }

  async getAceite(id: number): Promise<any> {
    this.logger.log(`Fetching aceite with id ${id} from Watson Studio`);
    const tableData = await this.getTableData(this.assets.oils);
    const objects = this.convertTableDataToObjects(tableData, [
      'id', 'nombre', 'densidad', 'azufre', 'nitrogeno', 'viscosidad', 'precio'
    ]);
    const aceite = objects.find(a => a.id === id);
    if (!aceite) {
      throw new Error(`Aceite with id ${id} not found`);
    }
    return aceite;
  }

  async createAceite(aceite: any): Promise<any> {
    this.logger.log('Agregando aceite en Cloud Object Storage');
    const aceites = await this.getAceites();
    const newId = aceites.length > 0 ? Math.max(...aceites.map(a => Number(a.id))) + 1 : 1;
    
    // Mapear los campos del español al inglés para el CSV (sin incluir id)
    const newAceite = {
      name: aceite.nombre,
      capacity: aceite.capacidad,
      price: aceite.costo,
      octane: aceite.octanaje,
      lead: aceite.plomo,
    };
    
    await this.cosService.addRow('Oils.csv', newAceite);
    
    // Retornar en formato español con el ID generado
    return {
      id: newId,
      nombre: aceite.nombre,
      capacidad: aceite.capacidad,
      costo: aceite.costo,
      octanaje: aceite.octanaje,
      plomo: aceite.plomo,
    };
  }

  async updateAceite(id: number, aceite: any): Promise<any> {
    this.logger.log(`Actualizando aceite ${id} en Cloud Object Storage`);
    
    // Mapear los campos del español al inglés para el CSV (sin incluir id)
    const aceiteMapeado = {
      name: aceite.nombre,
      capacity: aceite.capacidad,
      price: aceite.costo,
      octane: aceite.octanaje,
      lead: aceite.plomo,
    };
    
    return this.cosService.updateRow('Oils.csv', 'id', id, aceiteMapeado);
  }

  async deleteAceite(id: number): Promise<void> {
    this.logger.log(`Eliminando aceite ${id} en Cloud Object Storage`);
    await this.cosService.deleteRow('Oils.csv', 'id', id);
  }

  // Métodos específicos para Gasolinas
  async getGasolinas(): Promise<any[]> {
    this.logger.log('Leyendo gasolinas desde Cloud Object Storage');
    const gasolinas = await this.cosService.leerCSV('Gasolines.csv');
    return gasolinas.map((g, index) => ({
      id: index + 1,
      nombre: g.name,
      demanda: g.demand ? Number(g.demand) : undefined,
      precio: g.price ? Number(g.price) : undefined,
      octanajeMinimo: g.octane ? Number(g.octane) : undefined,
      plomoMaximo: g.lead ? Number(g.lead) : undefined,
    }));
  }

  async getGasolina(id: number): Promise<any> {
    this.logger.log(`Fetching gasolina with id ${id} from Watson Studio`);
    const tableData = await this.getTableData(this.assets.gasolines);
    const objects = this.convertTableDataToObjects(tableData, [
      'id', 'nombre', 'octanaje', 'densidad', 'azufre', 'precio_venta', 'demanda_minima', 'demanda_maxima'
    ]);
    const gasolina = objects.find(g => g.id === id);
    if (!gasolina) {
      throw new Error(`Gasolina with id ${id} not found`);
    }
    return gasolina;
  }

  async createGasolina(gasolina: any): Promise<any> {
    this.logger.log('Agregando gasolina en Cloud Object Storage');
    const gasolinas = await this.getGasolinas();
    const newId = gasolinas.length > 0 ? Math.max(...gasolinas.map(g => Number(g.id))) + 1 : 1;
    
    // Mapear los campos del español al inglés para el CSV (sin incluir id)
    const newGasolina = {
      name: gasolina.nombre,
      demand: gasolina.demanda,
      price: gasolina.precio,
      octane: gasolina.octanajeMinimo,
      lead: gasolina.plomoMaximo,
    };
    
    await this.cosService.addRow('Gasolines.csv', newGasolina);
    
    // Retornar en formato español con el ID generado
    return {
      id: newId,
      nombre: gasolina.nombre,
      demanda: gasolina.demanda,
      precio: gasolina.precio,
      octanajeMinimo: gasolina.octanajeMinimo,
      plomoMaximo: gasolina.plomoMaximo,
    };
  }

  async updateGasolina(id: number, gasolina: any): Promise<any> {
    this.logger.log(`Actualizando gasolina ${id} en Cloud Object Storage`);
    
    // Mapear los campos del español al inglés para el CSV (sin incluir id)
    const gasolinaMapeada = {
      name: gasolina.nombre,
      demand: gasolina.demanda,
      price: gasolina.precio,
      octane: gasolina.octanajeMinimo,
      lead: gasolina.plomoMaximo,
    };
    
    return this.cosService.updateRow('Gasolines.csv', 'id', id, gasolinaMapeada);
  }

  async deleteGasolina(id: number): Promise<void> {
    this.logger.log(`Eliminando gasolina ${id} en Cloud Object Storage`);
    await this.cosService.deleteRow('Gasolines.csv', 'id', id);
  }

  // Métodos específicos para Parámetros de Costo
  async getParametrosCosto(): Promise<any[]> {
    this.logger.log('Leyendo parámetros de costo desde Cloud Object Storage');
    const params = await this.cosService.leerCSV('ProdCostParam.csv');
    return params.map(p => ({
      prodCost: p.ProdCost ? Number(p.ProdCost) : undefined,
    }));
  }

  async updateParametroCosto(id: number, parametro: any): Promise<any> {
    this.logger.log(`Actualizando parámetro de costo ${id} en Cloud Object Storage`);
    
    // Mapear los campos para el CSV
    const parametroMapeado = {
      id: id,
      ProdCost: parametro.prodCost,
    };
    
    return this.cosService.updateRow('ProdCostParam.csv', 'id', id, parametroMapeado);
  }

  // Métodos específicos para Parámetros de Producción Máxima
  async getParametrosMaxima(): Promise<any[]> {
    this.logger.log('Leyendo parámetros de producción máxima desde Cloud Object Storage');
    const params = await this.cosService.leerCSV('MaxProdParam.csv');
    return params.map(p => ({
      maxProduction: p.MaxProduction ? Number(p.MaxProduction) : undefined,
    }));
  }

  async updateParametroMaxima(id: number, parametro: any): Promise<any> {
    this.logger.log(`Actualizando parámetro de producción máxima ${id} en Cloud Object Storage`);
    
    // Mapear los campos para el CSV
    const parametroMapeado = {
      id: id,
      MaxProduction: parametro.maxProduction,
    };
    
    return this.cosService.updateRow('MaxProdParam.csv', 'id', id, parametroMapeado);
  }

  // Método auxiliar para convertir datos de tabla a objetos
  private convertTableDataToObjects(tableData: WatsonTableData, fieldNames: string[]): any[] {
    return tableData.values.map(row => {
      const obj: any = {};
      fieldNames.forEach((fieldName, index) => {
        obj[fieldName] = row[index];
      });
      return obj;
    });
  }

  // Método para obtener todos los datos necesarios para la optimización
  async getAllOptimizationData(): Promise<{
    aceites: any[];
    gasolinas: any[];
    parametrosCosto: any[];
    parametrosMaxima: any[];
  }> {
    this.logger.log('Fetching all optimization data from Cloud Object Storage');
    
    const [aceites, gasolinas, parametrosCosto, parametrosMaxima] = await Promise.all([
      this.getAceites(),
      this.getGasolinas(),
      this.getParametrosCosto(),
      this.getParametrosMaxima(),
    ]);

    return {
      aceites,
      gasolinas,
      parametrosCosto,
      parametrosMaxima,
    };
  }

  // Método para probar la conexión con Watson Studio
  async testConnection(): Promise<boolean> {
    try {
      this.logger.log('Testing Watson Studio connection...');
      // Por ahora, simulamos una conexión exitosa
      // En una implementación real, aquí probarías la conexión real
      return true;
    } catch (error) {
      this.logger.error('Watson Studio connection failed:', error);
      return false;
    }
  }

  // Métodos para ejecutar jobs de optimización en Watson Studio
  async lanzarJobWatsonStudio(payload: any = {}): Promise<any> {
    try {
      this.logger.log('Launching optimization job in Watson Studio');
      
      const response = await this.authenticatedRequest({
        method: 'POST',
        url: `/v2/jobs?project_id=${this.projectId}`,
        data: {
          ...payload,
          job_type: 'optimization',
          parameters: {
            ...payload.parameters,
            project_id: this.projectId,
            space_id: this.spaceId,
          }
        }
      });
      
      this.logger.log('Optimization job launched successfully');
      return response.data;
    } catch (error) {
      this.logger.error('Error launching optimization job:', error);
      throw new Error(`Failed to launch optimization job: ${error.message}`);
    }
  }

  async estadoJobWatsonStudio(jobId?: string): Promise<any> {
    try {
      if (!jobId) {
        throw new Error('Job ID is required');
      }
      
      this.logger.log(`Checking status of job ${jobId}`);
      
      const response = await this.authenticatedRequest({
        method: 'GET',
        url: `/v2/jobs/${jobId}?project_id=${this.projectId}`
      });
      
      return response.data;
    } catch (error) {
      this.logger.error('Error checking job status:', error);
      throw new Error(`Failed to check job status: ${error.message}`);
    }
  }

  async resultadosJobWatsonStudio(jobId?: string): Promise<any> {
    try {
      if (!jobId) {
        throw new Error('Job ID is required');
      }
      
      this.logger.log(`Getting results for job ${jobId}`);
      
      const response = await this.authenticatedRequest({
        method: 'GET',
        url: `/v2/jobs/${jobId}/results?project_id=${this.projectId}`
      });
      
      return response.data;
    } catch (error) {
      this.logger.error('Error getting job results:', error);
      throw new Error(`Failed to get job results: ${error.message}`);
    }
  }

  /**
   * Ejecuta el modelo OPL en Watson Studio, espera a que termine y devuelve los resultados reales.
   * 1. Actualiza los archivos de entrada con los datos más recientes
   * 2. Lanza el job OPL vía API Watson Studio
   * 3. Hace polling hasta que termine
   * 4. Lee los archivos de salida desde COS
   * 5. Devuelve los resultados reales
   */
  async ejecutarOptimizacionWatsonStudioReal(): Promise<any> {
    try {
      this.logger.log('Iniciando optimización con datos actualizados...');
      
      // 1. Obtener los datos más recientes
      const [aceites, gasolinas, parametrosCosto, parametrosMaxima] = await Promise.all([
        this.getAceites(),
        this.getGasolinas(),
        this.getParametrosCosto(),
        this.getParametrosMaxima(),
      ]);
      
      this.logger.log(`Datos obtenidos: ${aceites.length} aceites, ${gasolinas.length} gasolinas`);
      
      // 2. Actualizar los archivos de entrada en COS con los datos más recientes
      this.logger.log('Actualizando archivos de entrada en COS...');
      
      // Actualizar Oils.csv
      const oilsData = aceites.map(a => ({
        name: a.nombre,
        capacity: a.capacidad,
        price: a.costo,
        octane: a.octanaje,
        lead: a.plomo,
      }));
      await this.cosService.escribirCSV('Oils.csv', oilsData);
      
      // Actualizar Gasolines.csv
      const gasolinesData = gasolinas.map(g => ({
        name: g.nombre,
        demand: g.demanda,
        price: g.precio,
        octane: g.octanajeMinimo,
        lead: g.plomoMaximo,
      }));
      await this.cosService.escribirCSV('Gasolines.csv', gasolinesData);
      
      // Actualizar ProdCostParam.csv
      if (parametrosCosto.length > 0) {
        const prodCostData = parametrosCosto.map(p => ({
          ProdCost: p.prodCost,
        }));
        await this.cosService.escribirCSV('ProdCostParam.csv', prodCostData);
      }
      
      // Actualizar MaxProdParam.csv
      if (parametrosMaxima.length > 0) {
        const maxProdData = parametrosMaxima.map(p => ({
          MaxProduction: p.maxProduction,
        }));
        await this.cosService.escribirCSV('MaxProdParam.csv', maxProdData);
      }
      
      this.logger.log('Archivos de entrada actualizados correctamente');
      
      // Sleep para asegurar que los archivos se hayan actualizado completamente en COS
      this.logger.log('Esperando 5 segundos para asegurar que los archivos se hayan actualizado en COS...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      this.logger.log('Sleep completado, procediendo con la ejecución del job...');

      // 3. Preparar autenticación y endpoints
      const apiKey = process.env.WATSON_API_KEY;
      const apiUrl = process.env.WATSON_API_URL;
      const jobId = process.env.WATSON_DEPLOYMENT_JOB_ID;
      const spaceId = process.env.WATSON_SPACE_ID;

      this.logger.log('Obteniendo token IAM...');
      const iamToken = await this.obtenerIamToken(apiKey);
      this.logger.log('Token IAM obtenido');

      this.logger.log('Lanzando ejecución de job en Watson Studio...');
      const runResponse = await axios.post(
        `${apiUrl}/v2/jobs/${jobId}/runs?space_id=${spaceId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${iamToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      this.logger.log('Ejecución de job lanzada:', JSON.stringify(runResponse.data));

      // Obtener el runId correctamente
      const runId = runResponse.data.metadata.asset_id;
      this.logger.log('Run ID:', runId);

      // 4. Polling: Esperar a que el run termine
      let status = '';
      let maxTries = 60; // Esperar hasta 10 minutos (60*10s)
      let tries = 0;
      while (tries < maxTries) {
        this.logger.log(`Polling estado del run (intento ${tries + 1})...`);
        const runStatusResponse = await axios.get(
          `${apiUrl}/v2/jobs/${jobId}/runs/${runId}?space_id=${spaceId}`,
          {
            headers: {
              'Authorization': `Bearer ${iamToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        this.logger.log('Respuesta de estado del run:', JSON.stringify(runStatusResponse.data));
        // Acceso robusto al estado
        let state = undefined;
        if (runStatusResponse.data && runStatusResponse.data.entity && runStatusResponse.data.entity.job_run && runStatusResponse.data.entity.job_run.state) {
          state = runStatusResponse.data.entity.job_run.state;
        } else if (runStatusResponse.data && runStatusResponse.data.entity && runStatusResponse.data.entity.status && runStatusResponse.data.entity.status.state) {
          state = runStatusResponse.data.entity.status.state;
        }
        status = state;
        this.logger.log(`Estado actual del run: ${status}`);
        if (status && status.toLowerCase() === 'completed') {
          this.logger.log('Run completado, leyendo archivos de salida...');
          // 5. Leer los archivos de salida desde COS
          const resultadoMezclas = await this.cosService.leerCSV('resultadoMezclas.csv');
          const resultadoAdicionalGasolinas = await this.cosService.leerCSV('resultadoAdicionalGasolinas.csv');
          this.logger.log('Archivos de salida leídos correctamente');
          // Devolver los resultados reales
          return {
            resultadoMezclas,
            resultadoAdicionalGasolinas,
            runId,
            status,
            message: 'Resultados reales obtenidos desde Watson Studio y COS',
          };
        }
        if (status && (status.toLowerCase() === 'failed' || status.toLowerCase() === 'canceled')) {
          this.logger.error(`El run falló o fue cancelado. Estado: ${status}`);
          throw new Error(`El run de Watson Studio falló o fue cancelado. Estado: ${status}`);
        }
        await new Promise(res => setTimeout(res, 10000));
        tries++;
      }
      if (status !== 'completed') {
        this.logger.error('Timeout esperando la finalización del run de Watson Studio');
        throw new Error('Timeout esperando la finalización del run de Watson Studio');
      }
    } catch (error) {
      this.logger.error('Error en la ejecución real de Watson Studio:', error);
      if (error.response) {
        this.logger.error('Detalle del error:', error.response.data);
      }
      throw error;
    }
  }

  /**
   * Obtiene un token IAM de IBM Cloud para autenticación
   */
  private async obtenerIamToken(apiKey: string): Promise<string> {
    // Documentación: https://cloud.ibm.com/apidocs/iam-identity-token-api
    const response = await axios.post(
      'https://iam.cloud.ibm.com/identity/token',
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  }
} 