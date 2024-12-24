import { api } from './api';

interface DatabaseConfig {
  host: string;
  database: string;
  username: string;
  password: string;
}

interface RMAData {
  rmaNumber: string;
  customerName: string;
  customerEmail: string;
  contactName: string;
  contactEmail: string;
  dateSubmitted: string;
  status: string;
}

interface ServiceOrderData {
  serviceOrder: string;
  salesOrder: string;
  productStatus: string;
  orderStatus: string;
  material: string;
  materialDescription: string;
  serial: string;
  orderCreatedDate: string;
  customerRequiredDate: string;
  estimatedCompletionDate: string;
  rmaNumber: string;
}

export const connectToDatabase = async (config: DatabaseConfig): Promise<void> => {
  return api.connectToDatabase(config);
};

export const testDatabaseConnection = async (config: DatabaseConfig): Promise<boolean> => {
  return api.testDatabaseConnection(config);
};

export const saveRMAData = async (data: RMAData[]): Promise<void> => {
  return api.saveRMAData(data);
};

export const saveServiceOrderData = async (data: ServiceOrderData[]): Promise<void> => {
  return api.saveServiceOrderData(data);
};