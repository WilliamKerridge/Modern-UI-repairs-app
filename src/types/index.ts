// Common Types
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'service' | 'viewer';
  email: string;
}

export interface Customer {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RMA {
  rmaNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  contactName: string;
  contactEmail: string;
  dateSubmitted: Date;
  status: RMAStatus;
  createdAt: Date;
}

export interface ServiceOrder {
  serviceOrder: string;
  salesOrder: string;
  productStatus: ProductStatus;
  orderStatus: OrderStatus;
  material: string;
  materialDescription: string;
  serial: string;
  orderCreatedDate: Date;
  customerRequiredDate: Date;
  estimatedCompletionDate: Date;
  rmaNumber: string;
}

export type RMAStatus = 
  | 'pending'
  | 'approved'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type ProductStatus = 
  | 'awaiting_test'
  | 'rework'
  | 'retest'
  | 'final_test'
  | 'clean_and_label'
  | 'inspection'
  | 'awaiting_parts'
  | 'with_support'
  | 'with_engineering'
  | 'awaiting_customer'
  | 'credit_held'
  | 'sub_contractor'
  | 'completed'
  | 'shipped';

export type OrderStatus = 'open' | 'closed';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: Date;
}

export interface DatabaseConfig {
  filePath: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}