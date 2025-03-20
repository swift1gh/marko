import { Link } from "react-router-dom";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { products } from "../data/products";

const HomePage = () => {
  const featuredProducts = products.slice(0, 4); // Get first 4 products
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500",
      description: "Latest gadgets and tech accessories",
    },
    {
      name: "Furniture",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500",
      description: "Ergonomic study and dorm furniture",
    },
    {
      name: "School Supplies",
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500",
      description: "Essential supplies for students",
    },
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
      description: "Textbooks and study materials",
    },
  ];

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
    <div>
      {/* Hero Section */}
      <div className="relative bg-purple-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920"
            alt="Students studying"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Marko Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Your one-stop shop for all student essentials. Find everything you
            need for your academic journey at great prices.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-white text-purple-900 px-6 py-3 rounded-md font-medium hover:bg-purple-50 transition-colors">
            Shop Now
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
      </div>

      {/* Categories */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/shop`}
                className="group relative rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Choose Marko Marketplace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Student Discounts
            </h3>
            <p className="text-gray-500">
              Special prices for students with valid ID
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Quality Guarantee
            </h3>
            <p className="text-gray-500">
              All products verified for quality and authenticity
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-500">
              Quick delivery to your dorm or apartment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
