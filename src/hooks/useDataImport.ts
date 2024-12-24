import { useState } from 'react';
import axios from 'axios';
import { APIResponse } from '../types';

interface ImportResponse extends APIResponse {
  data?: {
    records: number;
  };
}

export function useDataImport() {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importDatabase = async (file: File): Promise<ImportResponse> => {
    setIsImporting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<ImportResponse>(
        'http://localhost:3000/api/import/database',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : 'Failed to import database';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsImporting(false);
    }
  };

  const importExcel = async (file: File): Promise<ImportResponse> => {
    setIsImporting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<ImportResponse>(
        'http://localhost:3000/api/import/excel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : 'Failed to import Excel file';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsImporting(false);
    }
  };

  return {
    importDatabase,
    importExcel,
    isImporting,
    error
  };
}