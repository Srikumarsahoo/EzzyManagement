import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  FaFileDownload,
  FaChartLine,
  FaMoneyBillWave,
  FaBoxes,
  FaUsers,
  FaPlus,
  FaShoppingCart,
  FaCog,
} from "react-icons/fa";
import { CSVLink } from "react-csv";
import ProfileMenu from "../components/ProfileMenu";
import SalesReport from "./Reports/SalesReport";
import ExpenseReport from "./Reports/ExpenseReport";


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

const suppliers = [
  { name: "Engine Oil Filter", onTime: 95, late: 5, reliability: 95 },
  { name: "Brake Pad Sets", onTime: 88, late: 12, reliability: 95 },
  { name: "Spark Plug", onTime: 92, late: 8, reliability: 95 },
  { name: "Headlight Assembly", onTime: 78, late: 22, reliability: 95 },
  { name: "Wrench Set", onTime: 85, late: 15, reliability: 95 },
];

const sales = [
  { month: "Jan", revenue: 32000, orders: 250 },
  { month: "Feb", revenue: 42000, orders: 310 },
  { month: "Mar", revenue: 38000, orders: 280 },
  { month: "Apr", revenue: 47000, orders: 340 },
  { month: "May", revenue: 52000, orders: 360 },
];

// ---------- CSV Export ----------
const combinedReportData = [
  { section: "Revenue Trend", data: JSON.stringify(revenueData) },
  { section: "Sales by Category", data: JSON.stringify(categorySales) },
  { section: "Stock Trends", data: JSON.stringify(stockTrends) },
];

const csvHeaders = [
  { label: "Report Section", key: "section" },
  { label: "Data", key: "data" },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("Overview");

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

        <div className="p-4 border-t mt-auto">
          <ProfileMenu />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-sm text-gray-500">Manage your garage efficiently</p>
          </div>
          <CSVLink
            data={combinedReportData}
            headers={csvHeaders}
            filename={`business-report-${new Date().toISOString().split("T")[0]}.csv`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700 transition"
          >
            <FaFileDownload className="mr-2" /> Export CSV
          </CSVLink>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <KPI icon={<FaMoneyBillWave />} color="text-green-500" title="Total Revenue" value="₹45,012" change="+12.5% this month" />
          <KPI icon={<FaBoxes />} color="text-blue-500" title="Total Orders" value="2,847" change="+8.2% this month" />
          <KPI icon={<FaChartLine />} color="text-red-500" title="Low Stock Items" value="12" change="-12% compared" />
          <KPI icon={<FaUsers />} color="text-yellow-500" title="Supplier Rating" value="87.6%" change="-7.2% this month" />
        </div>

        {/* Tabs */}
        <div className="px-6 mb-6">
          <div className="flex space-x-6 text-sm font-medium border-b">
            {["Overview", "Inventory", "Suppliers", "Sales", "Expenses"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition ${
                  activeTab === tab
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        {activeTab === "Overview" && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <ChartCard title="Monthly Sales vs Inventory">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Sales" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Parts by Category">
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
              </ChartCard>
            </div>

            <ChartCard title="Stock Usage Trends">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockTrends}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#EF4444" name="Usage" />
                  <Bar dataKey="restock" fill="#10B981" name="Restock" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </>
        )}

        {/* Inventory */}
        {activeTab === "Inventory" && <InventoryTable />}

        {/* Suppliers */}
        {activeTab === "Suppliers" && (
          <ChartCard title="Supplier Performance Report">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Supplier Name</th>
                  <th className="px-4 py-2">On-Time Delivery</th>
                  <th className="px-4 py-2">Late Delivery</th>
                  <th className="px-4 py-2">Reliability</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{s.name}</td>
                    <td className="px-4 py-2 text-green-600 font-medium">{s.onTime}%</td>
                    <td className="px-4 py-2 text-red-500 font-medium">{s.late}%</td>
                    <td className="px-4 py-2 text-indigo-600 font-semibold">{s.reliability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ChartCard>
        )}

        {/* Sales */}
       {activeTab === "Sales" && <SalesReport />}

        {/* Expenses Placeholder */}
        {activeTab === "Expenses" && (
          <ExpenseReport />
        )}
      </main>
    </div>
  );
}

// --- Small Components ---
const KPI = ({ icon, color, title, value, change }) => (
  <div className="bg-white p-4 rounded-lg shadow flex flex-col">
    <div className={`${color} text-2xl mb-2`}>{icon}</div>
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-xl font-bold">{value}</h2>
    <p className="text-green-600 text-sm">{change}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded-lg shadow mb-6">
    <h3 className="font-bold mb-4">{title}</h3>
    {children}
  </div>
);

const InventoryTable = () => {
  const items = [
    { name: "Engine Oil Filter", sku: "EO-001", category: "Engine Parts", stock: 45, threshold: 20 },
    { name: "Brake Pad Sets", sku: "BP-102", category: "Body Parts", stock: 8, threshold: 15 },
    { name: "Spark Plug", sku: "SP-045", category: "Engine Parts", stock: 120, threshold: 30 },
    { name: "Headlight Assembly", sku: "HL-089", category: "Electricals", stock: 3, threshold: 10 },
    { name: "Wrench Set", sku: "WS-200", category: "Tools", stock: 25, threshold: 120 },
  ];

  return (
    <ChartCard title="Inventory Report">
      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">SKU</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Current Stock</th>
            <th className="px-4 py-2">Threshold</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const status =
              item.stock <= item.threshold / 2
                ? "Critical"
                : item.stock < item.threshold
                ? "Low"
                : "OK";
            const statusColor =
              status === "OK"
                ? "bg-blue-100 text-blue-700"
                : status === "Low"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

            return (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">{item.threshold}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ChartCard>
  );
};
