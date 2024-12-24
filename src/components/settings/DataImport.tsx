import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';

export function DataImport() {
  const { addNotification } = useApp();
  const [isProcessingRMA, setIsProcessingRMA] = useState(false);
  const [isProcessingServiceOrder, setIsProcessingServiceOrder] = useState(false);
  const rmaFileInputRef = useRef<HTMLInputElement>(null);
  const serviceOrderFileInputRef = useRef<HTMLInputElement>(null);

  const handleRMAExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingRMA(true);
    try {
      const response = await api.rma.uploadFile(file);
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: `Successfully processed ${response.data?.count || 0} RMA records`,
        timestamp: new Date()
      });

      if (rmaFileInputRef.current) {
        rmaFileInputRef.current.value = '';
      }
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: error instanceof Error ? error.message : 'Error processing RMA file',
        timestamp: new Date()
      });
    } finally {
      setIsProcessingRMA(false);
    }
  };

  const handleServiceOrderExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingServiceOrder(true);
    try {
      const response = await api.serviceOrder.uploadFile(file);
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: `Successfully processed ${response.data?.count || 0} Service Order records`,
        timestamp: new Date()
      });

      if (serviceOrderFileInputRef.current) {
        serviceOrderFileInputRef.current.value = '';
      }
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: error instanceof Error ? error.message : 'Error processing Service Order file',
        timestamp: new Date()
      });
    } finally {
      setIsProcessingServiceOrder(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">RMA Data Import</label>
        <div className="mt-1 flex items-center space-x-4">
          <button
            onClick={() => rmaFileInputRef.current?.click()}
            disabled={isProcessingRMA}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
              isProcessingRMA
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isProcessingRMA ? 'Processing RMA...' : 'Upload RMA Excel'}
          </button>
          <input
            type="file"
            ref={rmaFileInputRef}
            onChange={handleRMAExcelUpload}
            accept=".xlsx,.xls"
            className="hidden"
            disabled={isProcessingRMA}
          />
          <span className="text-sm text-gray-500">
            Upload RMA data from Excel
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Service Order Import</label>
        <div className="mt-1 flex items-center space-x-4">
          <button
            onClick={() => serviceOrderFileInputRef.current?.click()}
            disabled={isProcessingServiceOrder}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
              isProcessingServiceOrder
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isProcessingServiceOrder ? 'Processing Orders...' : 'Upload Service Orders'}
          </button>
          <input
            type="file"
            ref={serviceOrderFileInputRef}
            onChange={handleServiceOrderExcelUpload}
            accept=".xlsx,.xls"
            className="hidden"
            disabled={isProcessingServiceOrder}
          />
          <span className="text-sm text-gray-500">
            Upload Power BI export data
          </span>
        </div>
      </div>
    </div>
  );
}