import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
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

  // Get products with highest discounts
  const flashSaleProducts = [...products]
    .filter((product) => product.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  return (
    <div className="bg-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Flash Sale</h2>
          <p className="text-orange-600 font-medium">
            Limited time offers! Don't miss out on these amazing deals.
          </p>
        </div>

        {/* Timer */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 flex space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {timeLeft.hours.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-500">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-500">Seconds</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-orange-600">
                        $
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </div>
                    <span className="bg-orange-500 text-white text-sm px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/shop?filter=onSale"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
            View All Deals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
