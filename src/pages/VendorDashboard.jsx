import { useState } from "react";
import {
  FiPackage,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

// Mock vendor data
const vendorProducts = [
  {
    id: 1,
    name: "Noise-Canceling Headphones",
    price: 149.99,
    stock: 6,
    sales: 24,
    revenue: 3599.76,
    status: "active",
  },
  {
    id: 2,
    name: "Ergonomic Study Desk",
    price: 199.99,
    stock: 3,
    sales: 12,
    revenue: 2399.88,
    status: "active",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 19.99,
    stock: 20,
    sales: 45,
    revenue: 899.55,
    status: "active",
  },
];

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState(vendorProducts);

  const totalRevenue = products.reduce(
    (sum, product) => sum + product.revenue,
    0
  );
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);

  const stats = [
    {
      name: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      change: "+12.5%",
      changeType: "increase",
    },
    {
      name: "Total Sales",
      value: totalSales,
      icon: FiTrendingUp,
      change: "+8.2%",
      changeType: "increase",
    },
    {
      name: "Total Stock",
      value: totalStock,
      icon: FiPackage,
      change: "-2.4%",
      changeType: "decrease",
    },
    {
      name: "Active Customers",
      value: "85",
      icon: FiUsers,
      change: "+4.6%",
      changeType: "increase",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Vendor Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`${
              activeTab === "products"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`${
              activeTab === "orders"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Orders
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`${
              activeTab === "analytics"
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Analytics
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                Your Products
              </h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                Add New Product
              </button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${product.revenue.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-purple-600 hover:text-purple-900 mr-4">
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="text-center py-12 text-gray-500">
            Orders section coming soon...
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="text-center py-12 text-gray-500">
            Analytics section coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
