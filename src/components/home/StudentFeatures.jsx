import { motion } from "framer-motion";
import {
  FiBook,
  FiDollarSign,
  FiUsers,
  FiAward,
  FiShield,
  FiHeart,
} from "react-icons/fi";

const StudentFeatures = () => {
  const features = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Student Discounts",
      description:
        "Exclusive discounts on textbooks, electronics, and study materials.",
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Cashback Rewards",
      description:
        "Earn points on every purchase and redeem them for future discounts.",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Student Community",
      description:
        "Connect with other students and share study resources and tips.",
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Study Rewards",
      description:
        "Get rewarded for your academic achievements with special offers.",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure Payments",
      description:
        "Safe and secure payment options with student-friendly terms.",
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: "Student Support",
      description:
        "Dedicated support team to help you with any questions or concerns.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Student Benefits
          </h2>
          <p className="text-gray-600">
            Special features designed just for students like you
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentFeatures;
