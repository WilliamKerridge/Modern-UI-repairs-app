import { AxiosInstance } from 'axios';
import { RMA, APIResponse } from '../../types';

export const rmaAPI = (axios: AxiosInstance) => ({
  getAll: async (): Promise<APIResponse<RMA[]>> => {
    return axios.get('/rma');
  },

  getById: async (id: string): Promise<APIResponse<RMA>> => {
    return axios.get(`/rma/${id}`);
  },

  create: async (rma: Partial<RMA>): Promise<APIResponse<RMA>> => {
    return axios.post('/rma', rma);
  },

  update: async (id: string, rma: Partial<RMA>): Promise<APIResponse<RMA>> => {
    return axios.put(`/rma/${id}`, rma);
  },

  delete: async (id: string): Promise<APIResponse> => {
    return axios.delete(`/rma/${id}`);
  },

  uploadFile: async (file: File): Promise<APIResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/rma/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
});