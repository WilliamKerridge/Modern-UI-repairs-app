import axios from 'axios';
import { authAPI } from './auth';
import { databaseAPI } from './database';
import { customerAPI } from './customer';
import { rmaAPI } from './rma';
import { serviceOrderAPI } from './serviceOrder';
import { APIResponse } from '../../types';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const api = {
  auth: authAPI(instance),
  database: databaseAPI(instance),
  customer: customerAPI(instance),
  rma: rmaAPI(instance),
  serviceOrder: serviceOrderAPI(instance)
};

export type { APIResponse };