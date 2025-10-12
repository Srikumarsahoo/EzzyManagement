import React from "react";
import {
  Search,
  Truck,
  Star,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { FaShoppingCart, FaPlus, FaCog } from "react-icons/fa";
import ProfileMenu from "../components/ProfileMenu";

export default function Suppliers() {
  const suppliers = [
    {
      id: 1,
      name: "AutoParts Inc",
      category: "General Parts",
      phone: "+1 (555) 123-456",
      email: "orders@autoparts-inc.com",
      location: "Detroit, MI",
      rating: 4.8,
      orders: 145,
      probability: 98,
      verified: true,
      specialties: ["Brake System", "Brake System", "Brake System"],
      lastOrder: "2024-01-15",
    },
    {
      id: 2,
      name: "AutoParts Inc",
      category: "General Parts",
      phone: "+1 (555) 123-456",
      email: "orders@autoparts-inc.com",
      location: "Detroit, MI",
      rating: 4.8,
      orders: 145,
      probability: 98,
      verified: true,
      specialties: ["Brake System", "Brake System", "Brake System"],
      lastOrder: "2024-01-15",
    },
    {
      id: 3,
      name: "AutoParts Inc",
      category: "General Parts",
      phone: "+1 (555) 123-456",
      email: "orders@autoparts-inc.com",
      location: "Detroit, MI",
      rating: 4.8,
      orders: 145,
      probability: 98,
      verified: true,
      specialties: ["Brake System", "Brake System", "Brake System"],
      lastOrder: "2024-01-15",
    },
    {
      id: 4,
      name: "AutoParts Inc",
      category: "General Parts",
      phone: "+1 (555) 123-456",
      email: "orders@autoparts-inc.com",
      location: "Detroit, MI",
      rating: 4.8,
      orders: 145,
      probability: 98,
      verified: true,
      specialties: ["Brake System", "Brake System", "Brake System"],
      lastOrder: "2024-01-15",
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">
          Parts Manager
          <p className="text-sm text-gray-500">Garage Tools & Parts</p>
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="/dashboard" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">
            Dashboard
          </a>
          <a href="/inventory" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">
            Inventory
          </a>
          <a href="/suppliers" className="block py-2 px-3 rounded-lg bg-indigo-100 font-medium text-indigo-600">
            Suppliers
          </a>
          <a href="/reports" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">
            Reports
          </a>
          <a href="/users" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">
            Users
          </a>
        </nav>

        <div className="border-t p-4 space-y-3">
          <button className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-indigo-100">
            <FaPlus className="mr-2 text-indigo-500" /> Add Part
          </button>
          <button className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-indigo-100">
            <FaShoppingCart className="mr-2 text-green-500" /> New Order
          </button>
          <button className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-indigo-100">
            <FaCog className="mr-2 text-gray-500" /> Settings
          </button>
        </div>

        <div className="p-4 border-t mt-auto">
          <ProfileMenu />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Supplier Management</h2>
            <p className="text-sm text-gray-500">Manage your trusted parts suppliers</p>
          </div>
          <div className="flex gap-3">
            <button className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              + Bulk Order
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm shadow">
              + Add Supplier
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search parts, orders..."
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Category</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Status</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <SummaryCard title="Total Suppliers" value="5" icon={<Truck className="w-5 h-5 text-indigo-500" />} />
          <SummaryCard title="Verified" value="4" icon={<CheckCircle className="w-5 h-5 text-green-500" />} />
          <SummaryCard title="Active Orders" value="7" icon={<Clock className="w-5 h-5 text-yellow-500" />} />
          <SummaryCard title="Avg Rating" value="4.7" icon={<Star className="w-5 h-5 text-orange-500" />} />
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {suppliers.map((s) => (
            <div key={s.id} className="border rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="bg-gray-100 text-gray-600 font-semibold rounded-full w-10 h-10 flex items-center justify-center">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{s.name}</h3>
                    <p className="text-sm text-gray-500">{s.category}</p>
                  </div>
                </div>
                {s.verified && (
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-lg">
                    Verified
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2"><Phone size={14} /> {s.phone}</p>
                <p className="flex items-center gap-2"><Mail size={14} /> {s.email}</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> {s.location}</p>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4 text-sm text-gray-600 flex justify-between">
                <div className="flex flex-col text-center">
                  <span className="font-semibold text-gray-800">{s.rating}</span>
                  <span className="text-xs text-gray-400">Rating</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="font-semibold text-gray-800">{s.orders}</span>
                  <span className="text-xs text-gray-400">Orders</span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="font-semibold text-gray-800">{s.probability}%</span>
                  <span className="text-xs text-gray-400">Probability</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {s.specialties.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={12} /> Last Order: {s.lastOrder}
                </p>
                <div className="flex gap-2">
                  <button className="border border-gray-300 text-gray-700 rounded-lg px-3 py-1.5 text-xs hover:bg-gray-50">
                    View Details
                  </button>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-1.5 text-xs">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ title, value, icon }) {
  return (
    <div className="flex items-center justify-between border rounded-xl bg-white p-4 shadow-sm">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
      </div>
      {icon}
    </div>
  );
}
