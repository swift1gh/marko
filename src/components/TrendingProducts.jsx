import { Link } from "react-router-dom";
import { products } from "../data/products";
import { FiStar } from "react-icons/fi";

const TrendingProducts = () => {
  // Get products with highest ratings and most sales
  const trendingProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Trending Products
          </h2>
          <p className="text-gray-600">
            Discover what's hot right now among students
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
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
                  <div className="flex items-center mb-2">
                    {renderStars(product.rating)}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </p>
                    {product.discount && (
                      <span className="bg-orange-500 text-white text-sm px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/shop?sort=rating"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
            View All Trending
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
