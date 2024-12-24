import React, { useState } from 'react';
import { Filter, Plus, ChevronDown, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const REPAIR_STATUSES = [
  'Awaiting Test',
  'Rework',
  'Re-test',
  'Final Test',
  'Clean and Label',
  'Inspection',
  'Awaiting Parts',
  'With Support',
  'With Engineering',
  'Awaiting Customer Confirmation',
  'Credit Held',
  'Sub-contractor',
  'Completed',
  'Shipped'
];

export default function Tickets() {
  const { addNotification } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    customer: '',
    product: '',
    serial: '',
    description: ''
  });

  const tickets = [
    {
      id: 'SO-2024-101',
      rma: 'RMA-2024-001',
      customer: 'Acme Corp',
      status: 'Awaiting Test',
      product: 'Control Module X1',
      serial: 'SN-123456',
      daysOpen: 5
    },
    {
      id: 'SO-2024-102',
      rma: 'RMA-2024-002',
      customer: 'TechCo Industries',
      status: 'Final Test',
      product: 'Power Supply Y2',
      serial: 'SN-789012',
      daysOpen: 3
    },
    {
      id: 'SO-2024-103',
      rma: 'RMA-2024-003',
      customer: 'Global Systems',
      status: 'Awaiting Parts',
      product: 'Sensor Array Z3',
      serial: 'SN-345678',
      daysOpen: 7
    }
  ];

  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the ticket
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      message: 'New repair ticket created successfully',
      timestamp: new Date()
    });
    setShowNewTicketModal(false);
    setNewTicket({ customer: '', product: '', serial: '', description: '' });
  };

  const handleRowClick = (ticketId: string) => {
    // Here you would typically navigate to the ticket detail view
    console.log('Navigating to ticket:', ticketId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Repair Tickets</h1>
        <button 
          onClick={() => setShowNewTicketModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Status: {selectedStatus === 'all' ? 'All' : selectedStatus}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              
              {statusDropdownOpen && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      onClick={() => {
                        setSelectedStatus('all');
                        setStatusDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      All
                    </button>
                    {REPAIR_STATUSES.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setStatusDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RMA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Open
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets
                .filter(ticket => selectedStatus === 'all' || ticket.status === selectedStatus)
                .map((ticket) => (
                  <tr 
                    key={ticket.id} 
                    onClick={() => handleRowClick(ticket.id)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.rma}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.serial}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket.daysOpen}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="relative bg-white rounded-lg max-w-md w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowNewTicketModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleNewTicket} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Create New Repair Ticket
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Customer
                    </label>
                    <input
                      type="text"
                      value={newTicket.customer}
                      onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product
                    </label>
                    <input
                      type="text"
                      value={newTicket.product}
                      onChange={(e) => setNewTicket({ ...newTicket, product: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      value={newTicket.serial}
                      onChange={(e) => setNewTicket({ ...newTicket, serial: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create Ticket
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