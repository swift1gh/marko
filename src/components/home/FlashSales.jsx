import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

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
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
        "https://images.unsplash.com/photo-1617043786394-ae546530ecba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-2xl animate-pulse">🔥</span>
                <h2 className="text-xl font-bold">Flash Sales</h2>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-sm font-medium">Time Left:</span>
                <div className="flex items-center space-x-1">
                  <span className="bg-white/20 rounded-lg px-3 py-1 font-mono font-bold">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                  <span className="font-bold">:</span>
                  <span className="bg-white/20 rounded-lg px-3 py-1 font-mono font-bold">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="font-bold">:</span>
                  <span className="bg-white/20 rounded-lg px-3 py-1 font-mono font-bold">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              <Link
                to="/flash-sales"
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 transition-all duration-200">
                <span className="font-medium">See All</span>
                <FiChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid with Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -left-4 z-10">
            <button
              onClick={prevPage}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200">
              <FiChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -right-4 z-10">
            <button
              onClick={nextPage}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200">
              <FiChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {visibleProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                  {/* Product Image with Discount Badge */}
                  <div className="relative aspect-w-1 aspect-h-1">
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{product.discount}%
                      </div>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-sm text-gray-800 font-medium line-clamp-2 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="text-lg font-bold text-purple-600">
                        GH₵ {product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        GH₵ {product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300 ease-in-out"
                          style={{
                            width: `${(product.itemsLeft / 20) * 100}%`,
                          }}></div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-medium text-gray-500">
                          {product.itemsLeft} items left
                        </p>
                        <p className="text-xs font-medium text-purple-600">
                          {((product.itemsLeft / 20) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Page Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentPage === index
                    ? "bg-purple-600 w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
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
