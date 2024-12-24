import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

interface DatabaseConfig {
  database: string;
}

interface UploadResponse {
  success: boolean;
  count: number;
}

interface DatabaseTestResponse {
  success: boolean;
  error?: string;
}

export const api = {
  async connectToDatabase(config: DatabaseConfig): Promise<void> {
    try {
      const response = await axios.post(`${API_URL}/database/connect`, config);
      if (!response.data.success) throw new Error(response.data.error || 'Failed to connect to database');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  },

  async testDatabaseConnection(config: DatabaseConfig): Promise<DatabaseTestResponse> {
    try {
      const response = await axios.post<DatabaseTestResponse>(`${API_URL}/database/test`, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        return {
          success: false,
          error: error.response.data.error
        };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  },

  async uploadRMAFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/rma/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async uploadServiceOrderFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/service-orders/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};