import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Student Deals
            </h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter for exclusive student discounts and
              special offers
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <div className="flex-1 relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
