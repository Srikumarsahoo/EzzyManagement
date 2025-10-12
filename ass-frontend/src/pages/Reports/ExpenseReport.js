import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { FaDownload, FaWallet, FaChartBar, FaMoneyBillWave } from "react-icons/fa";

const ExpenseReport = () => {
  const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#E11D48", "#06B6D4"];

  const pieData = [
    { name: "Rent", value: 4000 },
    { name: "Utilities", value: 2400 },
    { name: "Supplies", value: 1500 },
    { name: "Salaries", value: 5000 },
    { name: "Marketing", value: 2000 },
  ];

  const monthlyExpenseData = [
    { month: "Jan", expense: 4500 },
    { month: "Feb", expense: 5200 },
    { month: "Mar", expense: 4900 },
    { month: "Apr", expense: 5300 },
    { month: "May", expense: 4800 },
    { month: "Jun", expense: 5100 },
  ];

  const categoryExpenseData = [
    { category: "Office", cost: 3000 },
    { category: "Travel", cost: 2500 },
    { category: "Supplies", cost: 1500 },
    { category: "Maintenance", cost: 2000 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Expense Report</h2>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
          <FaDownload /> Download Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-semibold text-gray-800">$18,900</p>
            </div>
            <FaWallet className="text-indigo-600 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500">Monthly Avg</h3>
              <p className="text-2xl font-semibold text-gray-800">$3,150</p>
            </div>
            <FaChartBar className="text-green-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500">Pending Bills</h3>
              <p className="text-2xl font-semibold text-gray-800">$1,200</p>
            </div>
            <FaMoneyBillWave className="text-orange-500 text-3xl" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-500">This Month</h3>
              <p className="text-2xl font-semibold text-gray-800">$4,800</p>
            </div>
            <FaChartBar className="text-pink-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Line Chart */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Monthly Expense Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyExpenseData}>
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Category Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Expense Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category-wise Bar Chart */}
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Category-wise Expenses
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryExpenseData}>
            <XAxis dataKey="category" stroke="#6B7280" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#22C55E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseReport;
