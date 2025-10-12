import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SalesReport() {
  // ✅ Example sales data
  const salesPerformance = [
    { product: "Engine Oil Filter", sales: 45000, growth: "+12%", units: 240 },
    { product: "Brake Pad Set", sales: 38000, growth: "+9%", units: 180 },
    { product: "Spark Plug", sales: 52000, growth: "+15%", units: 320 },
    { product: "Headlight Assembly", sales: 29000, growth: "-8%", units: 120 },
    { product: "Wrench Set", sales: 35000, growth: "+5%", units: 200 },
  ];

  // ✅ For chart
  const salesComparison = [
    { name: "Engine Oil Filter", Revenue: 45000 },
    { name: "Brake Pad Set", Revenue: 38000 },
    { name: "Spark Plug", Revenue: 52000 },
    { name: "Headlight Assembly", Revenue: 29000 },
    { name: "Wrench Set", Revenue: 35000 },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Sales Performance Report
          </h2>
          <p className="text-sm text-gray-500">
            Monthly sales and revenue metrics
          </p>
        </div>
        <div>
          <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 border rounded-xl p-4">
          <h4 className="text-gray-600 text-sm">Total Revenue</h4>
          <p className="text-2xl font-semibold text-green-600 mt-1">
            ₹2,45,012
          </p>
          <p className="text-xs text-green-500 mt-1">▲ +12.5%</p>
        </div>
        <div className="bg-gray-50 border rounded-xl p-4">
          <h4 className="text-gray-600 text-sm">Total Orders</h4>
          <p className="text-2xl font-semibold text-blue-600 mt-1">1,247</p>
          <p className="text-xs text-green-500 mt-1">▲ +8.2%</p>
        </div>
        <div className="bg-gray-50 border rounded-xl p-4">
          <h4 className="text-gray-600 text-sm">Best Seller</h4>
          <p className="text-lg font-medium mt-1">Spark Plug</p>
          <p className="text-xs text-gray-400">520 units</p>
        </div>
        <div className="bg-gray-50 border rounded-xl p-4">
          <h4 className="text-gray-600 text-sm">Low Performer</h4>
          <p className="text-lg font-medium mt-1">Headlight Assembly</p>
          <p className="text-xs text-gray-400">-8% growth</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden mb-10">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">
                Product Name
              </th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">
                Total Sales (₹)
              </th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">
                Units Sold
              </th>
              <th className="text-center px-6 py-3 text-sm font-medium text-gray-600">
                Growth
              </th>
            </tr>
          </thead>
          <tbody>
            {salesPerformance.map((item, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition-all duration-200"
              >
                <td className="px-6 py-3 text-sm text-gray-700 font-medium">
                  {item.product}
                </td>
                <td className="text-center px-6 py-3 text-sm text-gray-700">
                  ₹{item.sales.toLocaleString()}
                </td>
                <td className="text-center px-6 py-3 text-sm text-gray-700">
                  {item.units}
                </td>
                <td
                  className={`text-center px-6 py-3 text-sm font-medium ${
                    item.growth.startsWith("-")
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {item.growth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-gray-700 mb-3">
          Product-wise Revenue Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesComparison} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Revenue" fill="#4ade80" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
