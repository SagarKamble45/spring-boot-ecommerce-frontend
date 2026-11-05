import React from 'react'

const recentOrders = [
  { id: '#HC1024', customer: 'Rahul Sharma', date: 'Apr 14, 2025', status: 'Delivered', amount: 20749 },
  { id: '#HC1023', customer: 'Priya Singh', date: 'Apr 14, 2025', status: 'Processing', amount: 13197 },
  { id: '#HC1022', customer: 'Amit Verma', date: 'Apr 13, 2025', status: 'Shipped', amount: 26560 },
  { id: '#HC1021', customer: 'Neha Gupta', date: 'Apr 12, 2025', status: 'Processing', amount: 14940 },
  { id: '#HC1020', customer: 'Rohit Mehta', date: 'Apr 12, 2025', status: 'Delivered', amount: 37350 },
]

const statusStyles = {
  Delivered: 'bg-green-50 text-green-600',
  Processing: 'bg-blue-50 text-blue-600',
  Shipped: 'bg-purple-50 text-purple-600',
}

function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Orders</h3>
        <button className="text-sm text-blue-600 font-medium hover:underline">View All →</button>
      </div>

      <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="py-2 font-medium">Order ID</th>
              <th className="py-2 font-medium">Customer</th>
              <th className="py-2 font-medium hidden sm:table-cell">Date</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 font-medium text-gray-800">{order.id}</td>
                <td className="py-3 text-gray-600">{order.customer}</td>
                <td className="py-3 text-gray-500 hidden sm:table-cell">{order.date}</td>
                <td className="py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-right font-medium text-gray-800">
                  ₹{order.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders