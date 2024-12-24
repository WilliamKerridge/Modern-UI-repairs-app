import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle, Database, FolderOpen, Save } from 'lucide-react';
import { useDatabase } from '../../hooks/useDatabase';
import { useApp } from '../../context/AppContext';
import { DatabaseConfig } from '../../types';
import { databaseConfigSchema } from '../../utils/validation';

const DEFAULT_DATABASE_PATH = "C:\\Users\\wkerridge\\OneDrive - Cosworth Group Holdings Limited\\Cosworth\\Python\\Service App\\repairs.db";

export function DatabaseConfigPanel() {
  const { addNotification } = useApp();
  const { connect, test, isConnecting, error: dbError } = useDatabase();
  const [showModal, setShowModal] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'success' | 'error'>('none');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [dbConfig, setDbConfig] = useState<DatabaseConfig>({
    filePath: DEFAULT_DATABASE_PATH
  });

  const dbFileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    dbFileInputRef.current?.click();
  };

  const handleDatabaseFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fullPath = file.path || file.name;
      setDbConfig({ filePath: fullPath });
      setConnectionStatus('none');
      setConnectionError(null);
    }
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('none');
    setConnectionError(null);

    try {
      const validatedConfig = databaseConfigSchema.parse(dbConfig);
      const result = await test(validatedConfig);
      
      if (!result.success) {
        throw new Error(result.error || 'Unknown database connection error');
      }
      
      setConnectionStatus('success');
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: 'Database connection successful',
        timestamp: new Date()
      });
    } catch (error) {
      setConnectionStatus('error');
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setConnectionError(errorMessage);
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: `Database connection failed: ${errorMessage}`,
        timestamp: new Date()
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleDatabaseConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedConfig = databaseConfigSchema.parse(dbConfig);
      const result = await connect(validatedConfig);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to connect to database');
      }

      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: 'Database connection saved successfully',
        timestamp: new Date()
      });
      setShowModal(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: `Failed to save database connection: ${errorMessage}`,
        timestamp: new Date()
      });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Database Configuration</label>
      <div className="mt-1">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Database className="w-4 h-4 mr-2" />
          Configure Database
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="relative bg-white rounded-lg max-w-md w-full">
              <form onSubmit={handleDatabaseConnect} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  SQLite Database Configuration
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Database File Path
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="text"
                        value={dbConfig.filePath}
                        onChange={(e) => {
                          setDbConfig({ filePath: e.target.value });
                          setConnectionStatus('none');
                          setConnectionError(null);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter database file path"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleBrowseClick}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FolderOpen className="w-4 h-4" />
                      </button>
                      <input
                        type="file"
                        ref={dbFileInputRef}
                        onChange={handleDatabaseFileSelect}
                        accept=".db,.sqlite,.sqlite3"
                        className="hidden"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Select your existing SQLite database file
                    </p>
                  </div>

                  {connectionError && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Connection Error
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            {connectionError}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTestingConnection}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    {connectionStatus === 'success' && (
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    )}
                    {connectionStatus === 'error' && (
                      <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                    )}
                    {isTestingConnection ? 'Testing...' : 'Test Connection'}
                  </button>

                  <button
                    type="submit"
                    disabled={isConnecting}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isConnecting ? 'Connecting...' : 'Save Configuration'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}