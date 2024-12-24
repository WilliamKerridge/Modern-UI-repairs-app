import { AxiosInstance } from 'axios';
import { ServiceOrder, APIResponse } from '../../types';

export const serviceOrderAPI = (axios: AxiosInstance) => ({
  getAll: async (): Promise<APIResponse<ServiceOrder[]>> => {
    return axios.get('/service-orders');
  },

  getById: async (id: string): Promise<APIResponse<ServiceOrder>> => {
    return axios.get(`/service-orders/${id}`);
  },

  create: async (order: Partial<ServiceOrder>): Promise<APIResponse<ServiceOrder>> => {
    return axios.post('/service-orders', order);
  },

  update: async (id: string, order: Partial<ServiceOrder>): Promise<APIResponse<ServiceOrder>> => {
    return axios.put(`/service-orders/${id}`, order);
  },

  delete: async (id: string): Promise<APIResponse> => {
    return axios.delete(`/service-orders/${id}`);
  },

  uploadFile: async (file: File): Promise<APIResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/service-orders/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
});