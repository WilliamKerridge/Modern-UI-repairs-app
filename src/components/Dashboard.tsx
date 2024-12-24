import React from 'react';
import { Package, Clock, AlertCircle, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      name: 'Active Repairs',
      value: '24',
      change: '+4.75%',
      icon: Package,
      trend: 'up'
    },
    {
      name: 'Average Repair Time',
      value: '5.2 days',
      change: '-0.1%',
      icon: Clock,
      trend: 'down'
    },
    {
      name: 'Pending RMAs',
      value: '12',
      change: '+2.02%',
      icon: AlertCircle,
      trend: 'up'
    },
    {
      name: 'Completed This Month',
      value: '67',
      change: '+12.05%',
      icon: CheckCircle,
      trend: 'up'
    }
  ];

  const recentUpdates = [
    {
      id: 1,
      serviceOrder: 'SO-2024-101',
      status: 'Final Testing',
      customer: 'Acme Corp',
      updatedAt: '2h ago'
    },
    {
      id: 2,
      serviceOrder: 'SO-2024-102',
      status: 'Awaiting Parts',
      customer: 'TechCo Industries',
      updatedAt: '4h ago'
    },
    {
      id: 3,
      serviceOrder: 'SO-2024-103',
      status: 'Initial Inspection',
      customer: 'Global Systems',
      updatedAt: '6h ago'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Updates</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentUpdates.map((update) => (
                  <li key={update.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {update.serviceOrder}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{update.customer}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {update.status}
                        </span>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">{update.updatedAt}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Performance Metrics</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6">
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">First Response Time</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">1.2h</dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">Customer Satisfaction</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">98%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}