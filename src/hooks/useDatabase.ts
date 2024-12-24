import { useState } from 'react';
import { DatabaseConfig } from '../types';
import axios from 'axios';

interface DatabaseResponse {
  success: boolean;
  error?: string;
}

export function useDatabase() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async (config: DatabaseConfig): Promise<DatabaseResponse> => {
    setIsConnecting(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/api/database/connect', config);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : 'Database connection failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsConnecting(false);
    }
  };

  const test = async (config: DatabaseConfig): Promise<DatabaseResponse> => {
    try {
      const response = await axios.post('http://localhost:3000/api/database/test', config);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : 'Database test failed';
      return { success: false, error: errorMessage };
    }
  };

  return {
    connect,
    test,
    isConnecting,
    error
  };
}