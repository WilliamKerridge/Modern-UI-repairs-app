import React from 'react';
import { Building2, ChevronDown, ChevronUp, Edit, Mail, Phone, Users } from 'lucide-react';
import { Customer } from '../../types';
import { RepairStatusReport } from '../reports/RepairStatusReport';

interface CustomerListProps {
  customers: Customer[];
  expandedCustomer: number | null;
  onExpand: (customerId: number | null) => void;
  onEdit: (customer: Customer) => void;
  onSendReport: (customerId: string) => void;
}

export function CustomerList({ 
  customers, 
  expandedCustomer, 
  onExpand, 
  onEdit, 
  onSendReport 
}: CustomerListProps) {
  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <div key={customer.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">{customer.name}</h2>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onEdit(customer)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onExpand(expandedCustomer === Number(customer.id) ? null : Number(customer.id))}
                >
                  {expandedCustomer === Number(customer.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{customer.contactName}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{customer.email}</span>
              </div>
            </div>
          </div>

          {expandedCustomer === Number(customer.id) && (
            <div className="border-t border-gray-200 p-6">
              <RepairStatusReport
                customerId={customer.id}
                customerName={customer.name}
                repairs={[]} // TODO: Add repairs from API
                onSend={() => onSendReport(customer.id)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}