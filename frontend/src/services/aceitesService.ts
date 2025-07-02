import api from './api';

export interface Aceite {
  id: number;
  nombre: string;
  octanaje: number;
  plomo: number;
  costo: number;
  capacidad: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAceiteDto {
  nombre: string;
  octanaje: number;
  plomo: number;
  costo: number;
  capacidad: number;
}

export interface UpdateAceiteDto {
  nombre?: string;
  octanaje?: number;
  plomo?: number;
  costo?: number;
  capacidad?: number;
}

export const aceitesService = {
  async getAll(): Promise<Aceite[]> {
    const response = await api.get('/aceites');
    return response.data;
  },

  async getById(id: number): Promise<Aceite> {
    const response = await api.get(`/aceites/${id}`);
    return response.data;
  },

  async create(data: CreateAceiteDto): Promise<Aceite> {
    const response = await api.post('/aceites', data);
    return response.data;
  },

  async update(id: number, data: UpdateAceiteDto): Promise<Aceite> {
    const response = await api.patch(`/aceites/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/aceites/${id}`);
  },

  async getStats(): Promise<{ totalCapacity: number; averageCost: number }> {
    const response = await api.get('/aceites/stats');
    return response.data;
  },
}; 