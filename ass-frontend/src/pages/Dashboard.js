// src/pages/Dashboard.js
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const Dashboard = () => {
  // Sample data for charts
  const performanceData = [
    { month: "Jan", sales: 4000, parts: 2400 },
    { month: "Feb", sales: 3000, parts: 1398 },
    { month: "Mar", sales: 5000, parts: 3800 },
    { month: "Apr", sales: 4780, parts: 3908 },
    { month: "May", sales: 5890, parts: 4800 },
    { month: "Jun", sales: 6490, parts: 5300 },
  ];

  const pieData = [
    { name: "Brake System", value: 35 },
    { name: "Engine Parts", value: 25 },
    { name: "Electrical", value: 20 },
    { name: "Body Parts", value: 15 },
    { name: "Tools", value: 5 },
  ];
  const COLORS = ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#6366F1"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">Parts Manager</h1>
          <nav className="space-y-2">
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Inventory</a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Suppliers</a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Reports</a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Users</a>
            <a href="#" className="block p-2 rounded hover:bg-gray-200">Settings</a>
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Garage Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow">
            + Add Part
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">Total Parts: 2847</div>
          <div className="bg-white p-4 rounded shadow">Low Stock: 23</div>
          <div className="bg-white p-4 rounded shadow">Pending Orders: 8</div>
          <div className="bg-white p-4 rounded shadow">Revenue: ₹45,012</div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4F46E5" />
                <Line type="monotone" dataKey="parts" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Parts by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Critical Stock Alerts</h3>
            <ul>
              <li className="p-2 border-b">Brake Pads - Front (Critical)</li>
              <li className="p-2 border-b">Engine Oil (Low)</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <ul>
              <li className="p-2 border-b">Order delivered - 2h ago</li>
              <li className="p-2 border-b">Stock updated - 4h ago</li>
              <li className="p-2 border-b">Low stock alert - 6h ago</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
