import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        to="/shop"
        className="inline-flex items-center bg-primary-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-600 transition-all duration-300 shadow-soft-lg hover:shadow-soft-xl transform hover:-translate-y-0.5">
        Start Shopping
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>
      <Link
        to="/about"
        className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
        Learn More
      </Link>
    </motion.div>
  );
};

export default HeroButtons; 