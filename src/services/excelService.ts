import { read, utils, WorkBook } from 'xlsx';

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

export const processRMAExcel = async (file: File): Promise<RMAData[]> => {
  try {
    const data = await file.arrayBuffer();
    const workbook: WorkBook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    const rmaData: RMAData[] = jsonData.map((row: any) => ({
      rmaNumber: row['RMA Number'] || '',
      customerName: row['Customer Name'] || '',
      customerEmail: row['Customer Email'] || '',
      contactName: row['Contact Name'] || '',
      contactEmail: row['Contact Email'] || '',
      dateSubmitted: row['Date Submitted'] || '',
      status: row['Status'] || ''
    }));

    return rmaData;
  } catch (error) {
    console.error('Error processing RMA Excel file:', error);
    throw error;
  }
};

export const processServiceOrderExcel = async (file: File): Promise<ServiceOrderData[]> => {
  try {
    const data = await file.arrayBuffer();
    const workbook: WorkBook = read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    const serviceOrders: ServiceOrderData[] = jsonData.map((row: any) => ({
      serviceOrder: row['Service Order'] || '',
      salesOrder: row['Sales Order'] || '',
      productStatus: row['Product Status'] || '',
      orderStatus: row['Order Status'] || '',
      material: row['Material'] || '',
      materialDescription: row['Material Description'] || '',
      serial: row['Serial'] || '',
      orderCreatedDate: row['Order Created Date'] || '',
      customerRequiredDate: row['Customer Required Date'] || '',
      estimatedCompletionDate: row['Estimated Completion Date'] || '',
      rmaNumber: row['RMA Number'] || ''
    }));

    return serviceOrders;
  } catch (error) {
    console.error('Error processing Service Order Excel file:', error);
    throw error;
  }
};