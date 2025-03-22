import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1471&q=80"
        alt="KNUST students studying in the library"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transform transition-transform duration-10000 hover:scale-100"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-primary-800/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 font-display tracking-tight">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-primary-100">
                Marko
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-100 font-light max-w-3xl mx-auto">
              Your One-Stop Shop for KNUST Student Essentials
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-gray-200 max-w-2xl mx-auto">
              From textbooks to tech, find everything you need for success at
              Kwame Nkrumah University of Science and Technology
            </motion.p>

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
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute  left-0 right-0 h-32 bg-gradient-to-t from-primary-900 to-transparent" />
    </section>
  );
};

export default HeroSection;
