import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Paperclip, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Communications() {
  const { addNotification } = useApp();
  const [showNewEmailModal, setShowNewEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    content: ''
  });
  const [activeFilter, setActiveFilter] = useState('all');

  const communications = [
    {
      id: 1,
      type: 'email',
      subject: 'RMA Status Update - SO-2024-101',
      to: 'john.smith@acme.com',
      date: '2024-02-28',
      content: 'Your repair order has been moved to final testing phase...',
      status: 'sent'
    },
    {
      id: 2,
      type: 'email',
      subject: 'Parts Delay Notification - SO-2024-103',
      to: 'm.wilson@globalsys.com',
      date: '2024-02-27',
      content: 'We are currently waiting for replacement parts to arrive...',
      status: 'draft'
    }
  ];

  const handleNewEmail = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      message: 'Email sent successfully',
      timestamp: new Date()
    });
    setShowNewEmailModal(false);
    setNewEmail({ to: '', subject: '', content: '' });
  };

  const handleSendDraft = (id: number) => {
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      message: 'Draft sent successfully',
      timestamp: new Date()
    });
  };

  const filteredCommunications = communications.filter(comm => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sent') return comm.status === 'sent';
    if (activeFilter === 'drafts') return comm.status === 'draft';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
        <button 
          onClick={() => setShowNewEmailModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          New Email
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            {['all', 'sent', 'drafts'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                  activeFilter === filter
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCommunications.map((comm) => (
            <div key={comm.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {comm.type === 'email' ? (
                      <Mail className="w-6 h-6 text-gray-400" />
                    ) : (
                      <MessageSquare className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{comm.subject}</h3>
                    <p className="text-sm text-gray-500">To: {comm.to}</p>
                    <p className="mt-1 text-sm text-gray-500">{comm.content}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    comm.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {comm.status}
                  </span>
                  <span className="text-sm text-gray-500">{comm.date}</span>
                </div>
              </div>
              {comm.status === 'draft' && (
                <div className="mt-4 flex space-x-4">
                  <button 
                    onClick={() => handleSendDraft(comm.id)}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Send
                  </button>
                  <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-4 h-4 mr-1" />
                    Attach
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Email Modal */}
      {showNewEmailModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="relative bg-white rounded-lg max-w-md w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowNewEmailModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleNewEmail} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  New Email
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      To
                    </label>
                    <input
                      type="email"
                      value={newEmail.to}
                      onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={newEmail.subject}
                      onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      value={newEmail.content}
                      onChange={(e) => setNewEmail({ ...newEmail, content: e.target.value })}
                      rows={4}
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
                    Send Email
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