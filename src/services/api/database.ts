import { AxiosInstance } from 'axios';
import { DatabaseConfig, APIResponse } from '../../types';

export const databaseAPI = (axios: AxiosInstance) => ({
  connect: async (config: DatabaseConfig): Promise<APIResponse> => {
    try {
      const response = await axios.post('/database/connect', config);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to connect to database'
      };
    }
  },

  test: async (config: DatabaseConfig): Promise<APIResponse> => {
    try {
      const response = await axios.post('/database/test', config);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to test database connection'
      };
    }
  },

  disconnect: async (): Promise<APIResponse> => {
    try {
      const response = await axios.post('/database/disconnect');
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to disconnect from database'
      };
    }
  }
});