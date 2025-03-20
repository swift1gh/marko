import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";

const FlashSales = ({ sales }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Flash Sales</h2>
          <p className="text-gray-600">
            Limited time offers for students - Don't miss out!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sales.map((sale) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={sale.image}
                  alt={sale.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {sale.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {sale.title}
                </h3>
                <p className="text-gray-600 mb-4">{sale.category}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="mr-2" />
                  <span>
                    Ends {new Date(sale.endTime).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
