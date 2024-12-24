import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Repair {
  serviceOrder: string;
  salesOrder: string;
  productStatus: string;
  orderStatus: 'open' | 'closed';
  material: {
    partNumber: string;
    description: string;
  };
  serial: string;
  orderCreatedDate: string;
  customerRequiredDate: string;
  estimatedCompletionDate: string;
  rmaNumber: string;
}

interface ReportData {
  customerName: string;
  repairs: Repair[];
}

export const generatePDF = async (data: ReportData): Promise<void> => {
  const doc = new jsPDF('landscape');
  
  // Add header
  doc.setFontSize(20);
  doc.text('Repair Status Report', 14, 15);
  
  doc.setFontSize(12);
  doc.text(`Customer: ${data.customerName}`, 14, 25);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 32);

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Add repair table
  const tableData = data.repairs.map(repair => [
    repair.serviceOrder,
    repair.salesOrder,
    repair.rmaNumber,
    repair.productStatus,
    repair.orderStatus,
    `${repair.material.partNumber}\n${repair.material.description}`,
    repair.serial,
    formatDate(repair.orderCreatedDate),
    formatDate(repair.customerRequiredDate),
    formatDate(repair.estimatedCompletionDate)
  ]);

  (doc as any).autoTable({
    startY: 40,
    head: [['Service Order', 'Sales Order', 'RMA Number', 'Status', 'Order Status', 'Material', 'Serial', 'Created', 'Required', 'Est. Completion']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [66, 139, 202] },
    styles: { fontSize: 8 },
    columnStyles: {
      5: { cellWidth: 40 } // Make material column wider for description
    }
  });

  // Save the PDF
  doc.save(`${data.customerName.replace(/\s+/g, '_')}_repair_status.pdf`);
};