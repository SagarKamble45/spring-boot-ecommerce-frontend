import React from 'react'

function DashboardOverview({ title, amount, icon, revenue = false }) {
  const convertedAmount = revenue
    ? `₹${Number(amount).toLocaleString('en-IN')}`
    : Number(amount).toLocaleString('en-IN');

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">
        {convertedAmount}
      </h2>
    </div>
  )
}

export default DashboardOverview