import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomerList } from './customers/CustomerList';
import { CustomerForm } from './customers/CustomerForm';
import { Customer } from '../types';
import { CustomerFormData } from '../utils/validation';
import { api } from '../services/api';

export default function Customers() {
  const { addNotification } = useApp();
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>();

  // TODO: Replace with API call
  const customers = [
    {
      id: '1',
      name: 'Acme Corp',
      contactName: 'John Smith',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@acme.com',
      address: '123 Business Ave, Tech City, TC 12345',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'TechCo Industries',
      contactName: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      email: 'sarah.j@techco.com',
      address: '456 Innovation Blvd, Tech Valley, TV 67890',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const handleSendReport = (customerId: string) => {
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      message: 'Report sent to customer successfully',
      timestamp: new Date()
    });
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleAddNewCustomer = () => {
    setEditingCustomer(undefined);
    setShowCustomerModal(true);
  };

  const handleSubmitCustomer = async (data: CustomerFormData) => {
    try {
      if (editingCustomer) {
        await api.customer.update(editingCustomer.id, data);
        addNotification({
          id: Date.now().toString(),
          type: 'success',
          message: 'Customer updated successfully',
          timestamp: new Date()
        });
      } else {
        await api.customer.create(data);
        addNotification({
          id: Date.now().toString(),
          type: 'success',
          message: 'Customer added successfully',
          timestamp: new Date()
        });
      }
      setShowCustomerModal(false);
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to save customer',
        timestamp: new Date()
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button 
          onClick={handleAddNewCustomer}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      <CustomerList
        customers={customers}
        expandedCustomer={expandedCustomer}
        onExpand={setExpandedCustomer}
        onEdit={handleEditCustomer}
        onSendReport={handleSendReport}
      />

      {showCustomerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative bg-white rounded-lg max-w-md w-full p-6">
              <CustomerForm
                customer={editingCustomer}
                onClose={() => setShowCustomerModal(false)}
                onSubmit={handleSubmitCustomer}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}