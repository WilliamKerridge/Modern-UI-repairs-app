import React, { useState } from 'react';
import { Database, FileSpreadsheet, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDataImport } from '../../hooks/useDataImport';

export function DataImportPanel() {
  const { addNotification } = useApp();
  const { importDatabase, importExcel, isImporting } = useDataImport();
  const [showModal, setShowModal] = useState(false);
  const [importType, setImportType] = useState<'database' | 'excel' | null>(null);

  const handleDatabaseImport = async (file: File) => {
    try {
      const result = await importDatabase(file);
      if (result.success) {
        addNotification({
          id: Date.now().toString(),
          type: 'success',
          message: `Successfully imported ${result.data?.records || 0} records from database`,
          timestamp: new Date()
        });
        setShowModal(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to import database',
        timestamp: new Date()
      });
    }
  };

  const handleExcelImport = async (file: File) => {
    try {
      const result = await importExcel(file);
      if (result.success) {
        addNotification({
          id: Date.now().toString(),
          type: 'success',
          message: `Successfully imported ${result.data?.records || 0} records from Excel`,
          timestamp: new Date()
        });
        setShowModal(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to import Excel file',
        timestamp: new Date()
      });
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (importType === 'database') {
      await handleDatabaseImport(file);
    } else if (importType === 'excel') {
      await handleExcelImport(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Data Import</label>
      <div className="mt-1">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Import Data
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Import Data
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Import Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setImportType('database')}
                      className={`p-4 border rounded-lg text-center ${
                        importType === 'database'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Database className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <span className="block text-sm font-medium">SQLite Database</span>
                    </button>
                    <button
                      onClick={() => setImportType('excel')}
                      className={`p-4 border rounded-lg text-center ${
                        importType === 'excel'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <FileSpreadsheet className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <span className="block text-sm font-medium">Excel File</span>
                    </button>
                  </div>
                </div>

                {importType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select File
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept={importType === 'database' ? '.db,.sqlite,.sqlite3' : '.xlsx,.xls,.csv'}
                              onChange={handleFileSelect}
                              disabled={isImporting}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {importType === 'database' ? 'SQLite database files' : 'Excel or CSV files'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}