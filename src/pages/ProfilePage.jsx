import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiHeart,
  FiShoppingBag,
  FiEdit2,
  FiChevronRight,
  FiBox,
  FiCheck,
} from "react-icons/fi";
import verificationBadge from "../assets/images/verification_badge.svg";
import VerifiedName from "../components/VerifiedName";

const ProfilePage = () => {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const isVerified = localStorage.getItem("isVerified") === "true";
  const verificationType = localStorage.getItem("verificationType") || "";
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    phone: "+1 (555) 123-4567",
    address: "123 Student Street, College Town, ST 12345",
  });

  const stats = [
    { name: "Orders", value: "12", icon: FiPackage },
    { name: "Wishlist", value: "5", icon: FiHeart },
    { name: "Cart Items", value: "3", icon: FiShoppingBag },
  ];

  const recentOrders = [
    {
      id: "ORD-2024-001",
      date: "March 20, 2024",
      status: "Delivered",
      total: 299.99,
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "March 18, 2024",
      status: "In Transit",
      total: 145.98,
      items: 2,
    },
    {
      id: "ORD-2024-003",
      date: "March 15, 2024",
      status: "Processing",
      total: 89.99,
      items: 1,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", formData.name);
    localStorage.setItem("userEmail", formData.email);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div className="flex items-center space-x-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                  <FiUser className="w-12 h-12 text-white" />
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold text-gray-900 mb-1">
                    <VerifiedName
                      name={formData.name}
                      isVerified={isVerified}
                      verificationType={verificationType}
                      className="text-3xl font-bold"
                    />
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 flex items-center">
                    <FiMail className="w-4 h-4 mr-2" />
                    {formData.email}
                  </motion.p>
                  {isVerified && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-1 text-sm text-gray-500">
                      Verified {verificationType} • Joined{" "}
                      {localStorage.getItem("lastLoginDate") || "March 2024"}
                    </motion.p>
                  )}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 transform hover:-translate-y-0.5">
                <FiEdit2 className="w-5 h-5 mr-2" />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </motion.button>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={stat.name}
                  className="group hover:shadow-lg transition-all duration-200 px-6 py-5 bg-white rounded-xl border border-gray-200 overflow-hidden transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors duration-200">
                      <stat.icon className="h-7 w-7 text-primary-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200">
                <div className="p-8 bg-gray-50">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {Object.entries(formData).map(([key, value], index) => (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          key={key}>
                          <label
                            htmlFor={key}
                            className="block text-sm font-medium text-gray-700 mb-2">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              {key === "name" && (
                                <FiUser className="h-5 w-5 text-gray-400" />
                              )}
                              {key === "email" && (
                                <FiMail className="h-5 w-5 text-gray-400" />
                              )}
                              {key === "phone" && (
                                <FiPhone className="h-5 w-5 text-gray-400" />
                              )}
                              {key === "address" && (
                                <FiMapPin className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <input
                              type={key === "email" ? "email" : "text"}
                              name={key}
                              id={key}
                              value={value}
                              onChange={handleChange}
                              className="pl-12 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-xl"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg transition-all duration-200">
                        Save Changes
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={order.id}
                className="group hover:bg-gray-50 transition-colors duration-200">
                <div className="px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                          <FiPackage className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-600">
                          {order.id}
                        </p>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500">{order.date}</p>
                          <span className="mx-2 text-gray-300">•</span>
                          <p className="text-sm text-gray-500">
                            {order.items} items
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${order.total.toFixed(2)}
                        </p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}>
                          {order.status}
                        </span>
                      </div>
                      <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
