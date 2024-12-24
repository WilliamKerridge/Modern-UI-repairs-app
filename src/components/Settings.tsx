import React from 'react';
import { DatabaseConfigPanel } from './settings/DatabaseConfig';
import { DataImport } from './settings/DataImport';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Data Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Configure database connection and import data from external sources.
            </p>
          </div>

          <div className="space-y-6">
            <DatabaseConfigPanel />
            <DataImport />
          </div>
        </div>
      </div>
    </div>
  );
}