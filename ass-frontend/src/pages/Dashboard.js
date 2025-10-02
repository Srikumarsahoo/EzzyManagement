// src/pages/Dashboard.js
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { FaBell, FaSun, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample data for charts
const performanceData = [
  { month: "Jan", sales: 4000, parts: 2400 },
  { month: "Feb", sales: 3000, parts: 1398 },
  { month: "Mar", sales: 5000, parts: 2800 },
  { month: "Apr", sales: 7000, parts: 4000 },
  { month: "May", sales: 6000, parts: 3500 },
  { month: "Jun", sales: 7500, parts: 4300 },
];

const categoryData = [
  { name: "Brake System", value: 35 },
  { name: "Engine Parts", value: 25 },
  { name: "Electrical", value: 20 },
  { name: "Body Parts", value: 15 },
  { name: "Tools", value: 5 },
];
const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">
          Parts Manager
          <p className="text-sm text-gray-500">Garage Tools & Parts</p>
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="/Dashboard" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Dashboard</a>
          <a href="/Inventory" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Inventory</a>
          <a href="/Suppliers" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Suppliers</a>
          <a href="/Reports" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Reports</a>
          <a href="/Users" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Users</a>
        </nav>
        <div className="p-4 border-t">
          <p className="text-gray-600 font-medium">Quick Actions</p>
          <button className="w-full mt-2 py-2 px-3 bg-indigo-600 text-white rounded-lg">+ Add Part</button>
          <button className="w-full mt-2 py-2 px-3 bg-gray-200 rounded-lg">New Order</button>
          <button className="w-full mt-2 py-2 px-3 bg-gray-200 rounded-lg">Settings</button>
        </div>
        <div className="p-4 flex items-center border-t mt-auto">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">JD</div>
          <div className="ml-3">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Garage Manager</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 text-xl" />
            <FaSun className="text-gray-600 text-xl" />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center">
              <FaPlus className="mr-2" /> Add Part
            </button>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Total parts</p>
            <h2 className="text-2xl font-bold">2,847</h2>
            <p className="text-green-600 text-sm">+12% from last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Low Stock Alert</p>
            <h2 className="text-2xl font-bold">23</h2>
            <p className="text-green-600 text-sm">+5% this week</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h2 className="text-2xl font-bold">8</h2>
            <p className="text-red-600 text-sm">-12% this month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <h2 className="text-2xl font-bold">₹45,012</h2>
            <p className="text-green-600 text-sm">+12% this month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Line Chart */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#6366F1" strokeWidth={2} />
                <Line type="monotone" dataKey="parts" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Parts by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-2 gap-6">
          {/* Stock Alerts */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Critical Stock Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Brake Pads - Front</p>
                  <p className="text-sm text-gray-500">Brake System + AutoParts Inc</p>
                </div>
                <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">Reorder Now</button>
              </div>
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Air Filters</p>
                  <p className="text-sm text-gray-500">Engine Parts</p>
                </div>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm">Reorder Now</button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Recent Activity</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span>Order delivered - Brake Rotors</span><span>2h ago</span></li>
              <li className="flex justify-between"><span>Stock updated - Motor Oil</span><span>4h ago</span></li>
              <li className="flex justify-between"><span>Low stock alert - Air Filters</span><span>6h ago</span></li>
              <li className="flex justify-between"><span>New supplier added - Premium Parts Co.</span><span>1d ago</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
