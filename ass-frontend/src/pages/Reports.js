// src/pages/Reports.js
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";
import { FaFileDownload, FaChartLine, FaMoneyBillWave, FaBoxes } from "react-icons/fa";
import { CSVLink } from "react-csv"; // ✅ for CSV export

// Mock Data
const revenueData = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 39000 },
  { month: "Apr", revenue: 48000 },
  { month: "May", revenue: 52000 },
  { month: "Jun", revenue: 45000 },
];

const categorySales = [
  { name: "Brake System", value: 40000 },
  { name: "Engine Parts", value: 30000 },
  { name: "Electrical", value: 20000 },
  { name: "Body Parts", value: 15000 },
  { name: "Tools", value: 10000 },
];
const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"];

const orderTrends = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 180 },
  { month: "Mar", orders: 160 },
  { month: "Apr", orders: 210 },
  { month: "May", orders: 240 },
  { month: "Jun", orders: 190 },
];

// ✅ Combine all data for CSV export
const combinedReportData = [
  { section: "Revenue Trend", data: JSON.stringify(revenueData) },
  { section: "Sales by Category", data: JSON.stringify(categorySales) },
  { section: "Orders Trend", data: JSON.stringify(orderTrends) },
];

const csvHeaders = [
  { label: "Report Section", key: "section" },
  { label: "Data", key: "data" },
];

export default function Reports() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar placeholder */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">Reports</div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="/Dashboard" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Dashboard</a>
          <a href="/Inventory" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Inventory</a>
          <a href="/Suppliers" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Suppliers</a>
          <a href="/Reports" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Reports</a>
          <a href="/Users" className="block py-2 px-3 rounded-lg hover:bg-indigo-100 font-medium">Users</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Business Reports</h1>

          {/* ✅ Export CSV button */}
          <CSVLink
            data={combinedReportData}
            headers={csvHeaders}
            filename={`business-report-${new Date().toISOString().split("T")[0]}.csv`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition"
          >
            <FaFileDownload className="mr-2" /> Export Report
          </CSVLink>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaMoneyBillWave className="text-green-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-xl font-bold">₹2,85,000</h2>
            <p className="text-green-600 text-sm">+8% from last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaBoxes className="text-blue-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold">1,110</h2>
            <p className="text-green-600 text-sm">+12% from last month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaChartLine className="text-purple-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Avg. Order Value</p>
            <h2 className="text-xl font-bold">₹4,200</h2>
            <p className="text-red-600 text-sm">-3% this month</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col">
            <FaChartLine className="text-yellow-500 text-2xl mb-2" />
            <p className="text-sm text-gray-500">Returning Customers</p>
            <h2 className="text-xl font-bold">64%</h2>
            <p className="text-green-600 text-sm">+5% this quarter</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Revenue Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Sales Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-4">Sales by Category</h3>
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

        {/* Order Trends Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold mb-4">Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
