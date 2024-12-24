import { AxiosInstance } from 'axios';
import { Customer, APIResponse } from '../../types';

export const customerAPI = (axios: AxiosInstance) => ({
  getAll: async (): Promise<APIResponse<Customer[]>> => {
    return axios.get('/customers');
  },

  getById: async (id: string): Promise<APIResponse<Customer>> => {
    return axios.get(`/customers/${id}`);
  },

  create: async (customer: Partial<Customer>): Promise<APIResponse<Customer>> => {
    return axios.post('/customers', customer);
  },

  update: async (id: string, customer: Partial<Customer>): Promise<APIResponse<Customer>> => {
    return axios.put(`/customers/${id}`, customer);
  },

  delete: async (id: string): Promise<APIResponse> => {
    return axios.delete(`/customers/${id}`);
  }
});