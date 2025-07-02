import api from './api';

export interface Gasolina {
  id: number;
  nombre: string;
  demanda: number;
  precio: number;
  octanajeMinimo: number;
  plomoMaximo: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGasolinaDto {
  nombre: string;
  demanda: number;
  precio: number;
  octanajeMinimo: number;
  plomoMaximo: number;
}

export interface UpdateGasolinaDto {
  nombre?: string;
  demanda?: number;
  precio?: number;
  octanajeMinimo?: number;
  plomoMaximo?: number;
}

export const gasolinasService = {
  async getAll(): Promise<Gasolina[]> {
    const response = await api.get('/gasolinas');
    return response.data;
  },

  async getById(id: number): Promise<Gasolina> {
    const response = await api.get(`/gasolinas/${id}`);
    return response.data;
  },

  async create(data: CreateGasolinaDto): Promise<Gasolina> {
    const response = await api.post('/gasolinas', data);
    return response.data;
  },

  async update(id: number, data: UpdateGasolinaDto): Promise<Gasolina> {
    const response = await api.patch(`/gasolinas/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/gasolinas/${id}`);
  },

  async getStats(): Promise<{ totalDemand: number; averagePrice: number }> {
    const response = await api.get('/gasolinas/stats');
    return response.data;
  },
}; 