import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiChevronLeft, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 13,
    minutes: 54,
    seconds: 34,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const products = [
    {
      id: 1,
      name: "Delron 2 Burner Electric Hot Plate",
      price: 206.9,
      originalPrice: 250.0,
      discount: 17,
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 10,
    },
    {
      id: 2,
      name: 'Asano 32" Digital Satellite TV',
      price: 1316.0,
      originalPrice: 1699.0,
      discount: 23,
      image:
        "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 6,
    },
    {
      id: 3,
      name: 'Bruhn 55"- LED BTF-55V',
      price: 5734.0,
      originalPrice: 6200.0,
      discount: 8,
      image:
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 10,
    },
    {
      id: 4,
      name: "Kiss Beauty Rosemary Oil",
      price: 44.0,
      originalPrice: 45.0,
      discount: 2,
      image:
        "https://images.unsplash.com/photo-1617897903246-719242758050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 10,
    },
    {
      id: 5,
      name: "Professional Gaming Headset",
      price: 189.0,
      originalPrice: 249.0,
      discount: 24,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 8,
    },
    {
      id: 6,
      name: "Wireless Bluetooth Speaker",
      price: 79.9,
      originalPrice: 99.9,
      discount: 20,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 15,
    },
    {
      id: 7,
      name: "Smart Fitness Watch",
      price: 156.0,
      originalPrice: 195.0,
      discount: 20,
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 12,
    },
    {
      id: 8,
      name: "Portable Power Bank 20000mAh",
      price: 89.9,
      originalPrice: 129.9,
      discount: 31,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      itemsLeft: 20,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2.5">
                <span className="text-2xl animate-pulse">🔥</span>
                <h2 className="text-xl font-bold">Flash Sales</h2>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2.5">
                <FiClock className="w-5 h-5" />
                <div className="flex items-center space-x-2">
                  <div className="bg-white/20 rounded-lg px-3 py-1.5 font-mono font-bold">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <span className="font-bold">:</span>
                  <div className="bg-white/20 rounded-lg px-3 py-1.5 font-mono font-bold">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <span className="font-bold">:</span>
                  <div className="bg-white/20 rounded-lg px-3 py-1.5 font-mono font-bold">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
              <Link
                to="/flash-sales"
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-6 py-2.5 transition-all duration-300 transform hover:scale-105">
                <span className="font-medium">See All</span>
                <FiChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Products Grid with Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -left-6 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 -right-6 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300">
            <FiChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}>
                <Link to={`/product/${product.id}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Product Image with Discount Badge */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                          -{product.discount}%
                        </div>
                      </div>
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors duration-200">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline space-x-3 mb-4">
                        <span className="text-2xl font-bold text-red-600">
                          GH₵ {product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          GH₵ {product.originalPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(product.itemsLeft / 20) * 100}%`,
                            }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-red-500 to-pink-500"
                          />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm font-medium text-gray-500">
                            {product.itemsLeft} items left
                          </p>
                          <p className="text-sm font-medium text-red-600">
                            {((product.itemsLeft / 20) * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Page Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "bg-red-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSales;
