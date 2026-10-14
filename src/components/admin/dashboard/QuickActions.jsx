import React from 'react'
import { ShoppingCart, Users, Box, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const quickActions = [
  { title: 'Manage Products', desc: 'Add, edit or remove products', path:"/admin/products",icon: <Box size={20} /> },
  { title: 'View Orders', desc: 'Track and manage orders', path:"/admin/orders",icon: <ShoppingCart size={20} /> },
  { title: 'Manage Customers', desc: 'View customer list', path:"/admin/customers", icon: <Users size={20} /> },
  { title: 'Generate Reports', desc: 'Get detailed insights', path:"/admin/products", icon: <Package size={20} /> },
]

function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action) => (
        <button
        onClick={()=>{navigate(action.path)}}
          key={action.title}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between text-left hover:border-blue-200 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 shrink-0 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              {action.icon}
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{action.title}</p>
              <p className="text-xs text-gray-400">{action.desc}</p>
            </div>
          </div>
          <span className="text-gray-300">›</span>
        </button>
      ))}
    </div>
  )
}

export default QuickActions