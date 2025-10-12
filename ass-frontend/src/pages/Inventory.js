import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Package,
} from "lucide-react";
import { FaBell, FaSun, FaPlus } from "react-icons/fa";
import {
  FaFileDownload, FaChartLine, FaMoneyBillWave,
  FaBoxes, FaUsers, FaShoppingCart, FaCog
} from "react-icons/fa";
import ProfileMenu from "../components/ProfileMenu";


export default function Inventory() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", route: "" },
    { name: "Inventory", route: "/inventory" },
    { name: "Suppliers", route: "/suppliers" },
    { name: "Reports", route: "/reports" },
    { name: "Users", route: "/users" },
  ];

  const inventoryData = [
    {
      name: "Brake Pads - Front Set",
      partNo: "PART-001",
      category: "Brake System",
      stock: 15,
      minStock: 10,
      price: "$45.99",
      supplier: "AutoParts Inc",
      status: "In Stock",
    },
    {
      name: "Engine Oil Filter",
      partNo: "PART-002",
      category: "Engine Parts",
      stock: 8,
      minStock: 15,
      price: "$12.5",
      supplier: "FilterMax",
      status: "Low Stock",
    },
    {
      name: "Spark Plugs Set (4pc)",
      partNo: "PART-003",
      category: "Engine Parts",
      stock: 25,
      minStock: 20,
      price: "$32",
      supplier: "IgnitePro",
      status: "In Stock",
    },
    {
      name: "Windshield Wipers",
      partNo: "PART-004",
      category: "Body Parts",
      stock: 3,
      minStock: 8,
      price: "$18.75",
      supplier: "ClearView",
      status: "Critical",
    },
    {
      name: "Impact Wrench Set",
      partNo: "TOOL-001",
      category: "Tools",
      stock: 5,
      minStock: 3,
      price: "$245",
      supplier: "ToolMaster",
      status: "In Stock",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
     <aside className="w-64 bg-white shadow-lg flex flex-col">
             <div className="p-6 font-bold text-xl border-b">
               Parts Manager
               <p className="text-sm text-gray-500">Garage Tools & Parts</p>
             </div>
             <nav className="flex-1 p-4 space-y-3">
               <a
                 href="/Dashboard"
                 className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium"
               >
                 Dashboard
               </a>
               <a
                 href="/Inventory"
                 className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium"
               >
                 Inventory
               </a>
               <a
                 href="/Suppliers"
                 className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium"
               >
                 Suppliers
               </a>
               <a
                 href="/Reports"
                 className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium"
               >
                 Reports
               </a>
               <a
                 href="/Users"
                 className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium"
               >
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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Inventory Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage your vehicle parts and tools inventory
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Filter size={16} /> Export
            </button>
            <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
              <Plus size={16} /> Add Item
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center flex-1 border rounded-lg px-3 py-2 bg-white">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search parts, tools, or part numbers..."
              className="flex-1 outline-none text-sm"
            />
          </div>
          <select className="border rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Categories</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Status</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-500 text-sm">Total Items</p>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-500 text-sm">Low Stock</p>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-500" size={18} />
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-500 text-sm">Critical</p>
            <div className="flex items-center gap-2">
              <AlertOctagon className="text-red-500" size={18} />
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-gray-500 text-sm">Total Value</p>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={18} />
              <p className="text-2xl font-bold text-green-700">$2,871.1</p>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Inventory Items</h3>
          <p className="text-sm text-gray-500 mb-3">
            Showing {inventoryData.length} of {inventoryData.length} items
          </p>

          <table className="w-full text-sm text-left">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="pb-3">Item Details</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Supplier</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.partNo}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                      {item.category}
                    </span>
                  </td>
                  <td>
                    <p className="font-medium">{item.stock}</p>
                    <p className="text-xs text-gray-500">
                      Min: {item.minStock}
                    </p>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.supplier}</td>
                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded-md font-medium ${getStatusClass(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-3 py-2">
                    <button className="text-gray-500 hover:text-blue-600">
                      <Edit3 size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
