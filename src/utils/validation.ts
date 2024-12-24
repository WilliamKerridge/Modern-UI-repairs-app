import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required')
});

export const databaseConfigSchema = z.object({
  filePath: z.string().min(1, 'Database path is required')
});

export const rmaSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  contactName: z.string().min(1, 'Contact name is required'),
  contactEmail: z.string().email('Invalid contact email address'),
  description: z.string().min(1, 'Description is required')
});

export type CustomerFormData = z.infer<typeof customerSchema>;
export type DatabaseConfigFormData = z.infer<typeof databaseConfigSchema>;
export type RMAFormData = z.infer<typeof rmaSchema>;