// src/pages/Reports.js
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import {
  FaFileDownload, FaChartLine, FaMoneyBillWave,
  FaBoxes, FaUsers, FaPlus, FaShoppingCart, FaCog
} from "react-icons/fa";
import { CSVLink } from "react-csv";

// ---------- Mock Data ----------
const revenueData = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 39000 },
  { month: "Apr", revenue: 48000 },
  { month: "May", revenue: 52000 },
  { month: "Jun", revenue: 45000 },
];

const categorySales = [
  { name: "Engine Parts", value: 35000 },
  { name: "Electricals", value: 25000 },
  { name: "Body Parts", value: 20000 },
  { name: "Tools", value: 12000 },
  { name: "Essentials", value: 8000 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

const stockTrends = [
  { week: "W1", usage: 210, restock: 150 },
  { week: "W2", usage: 180, restock: 220 },
  { week: "W3", usage: 270, restock: 240 },
  { week: "W4", usage: 230, restock: 250 },
];

// ---------- CSV Export Data ----------
const combinedReportData = [
  { section: "Revenue Trend", data: JSON.stringify(revenueData) },
  { section: "Sales by Category", data: JSON.stringify(categorySales) },
  { section: "Stock Trends", data: JSON.stringify(stockTrends) },
];

const csvHeaders = [
  { label: "Report Section", key: "section" },
  { label: "Data", key: "data" },
];

// ---------- Component ----------
export default function Reports() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">Parts Manager</div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="/dashboard" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Dashboard</a>
          <a href="/inventory" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Inventory</a>
          <a href="/suppliers" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Suppliers</a>
          <a href="/reports" className="block py-2 px-3 rounded-lg bg-indigo-100 font-medium">Reports</a>
          <a href="/users" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Users</a>
        </nav>

        {/* Quick Actions */}
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

        {/* User Info */}
        <div className="mt-auto border-t p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-bold">JD</div>
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">Garage Manager</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-sm text-gray-500">Manage your garage efficiently</p>
          </div>

          {/* Export CSV button */}
          <CSVLink
            data={combinedReportData}
            headers={csvHeaders}
            filename={`business-report-${new Date().toISOString().split("T")[0]}.csv`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition"
          >
            <FaFileDownload className="mr-2" /> Export CSV
          </CSVLink>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaMoneyBillWave className="text-green-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold">₹45,012</h2>
            <p className="text-green-600 text-sm">+12.5% this month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaBoxes className="text-blue-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold">2,847</h2>
            <p className="text-green-600 text-sm">+8.2% this month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaChartLine className="text-red-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <h2 className="text-xl font-bold">12</h2>
            <p className="text-red-600 text-sm">-12% compared</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaUsers className="text-yellow-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Supplier Rating</p>
            <h2 className="text-xl font-bold">87.6%</h2>
            <p className="text-red-600 text-sm">-7.2% this month</p>
          </div>
        </div>

           {/* Tabs */}
        <div className="px-6 mb-6">
          <div className="flex space-x-6 text-sm font-medium border-b">
            {["Overview", "Inventory", "Suppliers", "Sales", "Expenses"].map((tab, i) => (
              <button key={i} className={`pb-2 ${i === 0 ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-indigo-600"}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Sales vs Inventory Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Monthly Sales vs Inventory</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Sales" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Parts by Category */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Parts by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categorySales} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                  {categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Usage Trends */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-4">Stock Usage Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockTrends}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#EF4444" name="Usage" />
              <Bar dataKey="restock" fill="#10B981" name="Restock" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
