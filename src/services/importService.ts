import { read, utils } from 'xlsx';
import { supabase } from './supabase';

interface RMAData {
  rma_number: string;
  customer_name: string;
  customer_email: string;
  contact_name: string;
  contact_email: string;
  date_submitted: string;
  status: string;
}

interface ServiceOrderData {
  service_order: string;
  sales_order: string;
  product_status: string;
  order_status: string;
  material: string;
  material_description: string;
  serial: string;
  order_created_date: string;
  customer_required_date: string;
  estimated_completion_date: string;
  rma_number: string;
}

export const importRMAExcel = async (file: File): Promise<{ success: boolean; count?: number; error?: string }> => {
  try {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: Record<string, any>[] = utils.sheet_to_json(worksheet);

    const rmaData: RMAData[] = jsonData.map(row => ({
      rma_number: String(row['RMA Number'] || ''),
      customer_name: String(row['Customer Name'] || ''),
      customer_email: String(row['Customer Email'] || ''),
      contact_name: String(row['Contact Name'] || ''),
      contact_email: String(row['Contact Email'] || ''),
      date_submitted: row['Date Submitted'] ? new Date(row['Date Submitted']).toISOString() : new Date().toISOString(),
      status: String(row['Status'] || 'pending')
    }));

    const { error } = await supabase
      .from('rmas')
      .upsert(rmaData, { 
        onConflict: 'rma_number',
        ignoreDuplicates: false 
      });

    if (error) throw error;

    return { 
      success: true, 
      count: rmaData.length 
    };
  } catch (error) {
    console.error('Error importing RMA data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to import RMA data' 
    };
  }
};

export const importServiceOrderExcel = async (file: File): Promise<{ success: boolean; count?: number; error?: string }> => {
  try {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: Record<string, any>[] = utils.sheet_to_json(worksheet);

    const serviceOrderData: ServiceOrderData[] = jsonData.map(row => ({
      service_order: String(row['Service Order'] || ''),
      sales_order: String(row['Sales Order'] || ''),
      product_status: String(row['Product Status'] || ''),
      order_status: String(row['Order Status'] || 'open'),
      material: String(row['Material'] || ''),
      material_description: String(row['Material Description'] || ''),
      serial: String(row['Serial'] || ''),
      order_created_date: row['Order Created Date'] ? new Date(row['Order Created Date']).toISOString() : new Date().toISOString(),
      customer_required_date: row['Customer Required Date'] ? new Date(row['Customer Required Date']).toISOString() : null,
      estimated_completion_date: row['Estimated Completion Date'] ? new Date(row['Estimated Completion Date']).toISOString() : null,
      rma_number: String(row['RMA Number'] || '')
    }));

    const { error } = await supabase
      .from('service_orders')
      .upsert(serviceOrderData, {
        onConflict: 'service_order',
        ignoreDuplicates: false
      });

    if (error) throw error;

    return { 
      success: true, 
      count: serviceOrderData.length 
    };
  } catch (error) {
    console.error('Error importing Service Order data:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to import Service Order data' 
    };
  }
};