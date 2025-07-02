import api from './api';

export interface ProdCostParam {
  prodCost: number;
}

export interface MaxProdParam {
  maxProduction: number;
}

export const parametrosService = {
  async getProdCostParams(): Promise<ProdCostParam[]> {
    const response = await api.get('/parametros/costo');
    return response.data;
  },

  async updateProdCostParam(id: number, data: Partial<ProdCostParam>): Promise<any> {
    const response = await api.patch(`/parametros/costo/${id}`, data);
    return response.data;
  },

  async getMaxProdParams(): Promise<MaxProdParam[]> {
    const response = await api.get('/parametros/maxima');
    return response.data;
  },

  async updateMaxProdParam(id: number, data: Partial<MaxProdParam>): Promise<any> {
    const response = await api.patch(`/parametros/maxima/${id}`, data);
    return response.data;
  },
}; 