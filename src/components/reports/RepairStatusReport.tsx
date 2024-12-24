import React, { useState } from 'react';
import { FileText, Send, Download } from 'lucide-react';
import { generatePDF } from '../../utils/reportGenerator';
import { sendOutlookEmail } from '../../utils/emailService';
import { getCustomerContact } from '../../services/customerService';
import { useApp } from '../../context/AppContext';

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

interface RepairStatusReportProps {
  customerId: string;
  customerName: string;
  repairs: Repair[];
  onSend: (customerId: string) => void;
}

export function RepairStatusReport({ customerId, customerName, repairs, onSend }: RepairStatusReportProps) {
  const { addNotification } = useApp();
  const [isSending, setIsSending] = useState(false);

  const handleDownload = async () => {
    try {
      await generatePDF({ customerName, repairs });
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: 'Report downloaded successfully',
        timestamp: new Date()
      });
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: 'Failed to download report',
        timestamp: new Date()
      });
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsSending(true);
      
      // Get the RMA number from the first repair
      const rmaNumber = repairs[0]?.rmaNumber;
      if (!rmaNumber) {
        throw new Error('No RMA number found');
      }

      // Get customer contact details
      const contact = await getCustomerContact(rmaNumber);
      if (!contact || !contact.email) {
        throw new Error('No contact email found');
      }

      // Send email via default email client
      await sendOutlookEmail({
        customerName,
        repairs,
        contact
      });

      onSend(customerId);
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: 'Email draft created in your default email client',
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error sending email:', error);
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to create email',
        timestamp: new Date()
      });
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Repair Status Report</h3>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className={`inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white ${
              isSending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSending ? 'Creating Email...' : 'Send to Customer'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales Order
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RMA Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Material
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Required
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Est. Completion
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {repairs.map((repair) => (
              <tr key={repair.serviceOrder} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {repair.serviceOrder}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {repair.salesOrder}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {repair.rmaNumber}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {repair.productStatus}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    repair.orderStatus === 'open' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {repair.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-col">
                    <span className="font-medium">{repair.material.partNumber}</span>
                    <span className="text-xs text-gray-400">{repair.material.description}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {repair.serial}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(repair.orderCreatedDate)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(repair.customerRequiredDate)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(repair.estimatedCompletionDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}