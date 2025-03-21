import { motion } from "framer-motion";
import { FiPackage, FiClock, FiCheck, FiTruck } from "react-icons/fi";

const OrdersPage = () => {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "March 20, 2024",
      total: 299.99,
      status: "Delivered",
      items: [
        {
          name: "Advanced Mathematics Textbook",
          quantity: 1,
          price: 199.99,
        },
        {
          name: "Scientific Calculator",
          quantity: 1,
          price: 100.0,
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "March 18, 2024",
      total: 145.98,
      status: "In Transit",
      items: [
        {
          name: "Physics Lab Manual",
          quantity: 2,
          price: 72.99,
        },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "March 15, 2024",
      total: 89.99,
      status: "Processing",
      items: [
        {
          name: "Chemistry Study Guide",
          quantity: 1,
          price: 89.99,
        },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FiCheck className="w-5 h-5 text-green-500" />;
      case "In Transit":
        return <FiTruck className="w-5 h-5 text-blue-500" />;
      case "Processing":
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      default:
        return <FiPackage className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700";
      case "In Transit":
        return "bg-blue-50 text-blue-700";
      case "Processing":
        return "bg-yellow-50 text-yellow-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-2 mb-8">
          <FiPackage className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order {order.id}
                    </h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full ${getStatusColor(
                      order.status
                    )} flex items-center space-x-2`}>
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">{order.status}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FiPackage className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 -mx-6 px-6 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OrdersPage;
