import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiStar,
  FiHeart,
  FiShare2,
  FiShoppingCart,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { products } from "../data/products";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Product not found
          </h2>
          <p className="mt-2 text-gray-600">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="mt-4 inline-block text-primary-600 hover:text-primary-700">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.itemsLeft) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                  {product.discount}% OFF
                </span>
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                  New
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-6">
            <div className="text-sm text-primary-600 font-medium mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-gray-500">
                  ({product.rating})
                </span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                {product.itemsLeft} items left
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Features
            </h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {product.itemsLeft > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-full">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:text-primary-600 transition-colors duration-200">
                    <FiMinus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:text-primary-600 transition-colors duration-200">
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`p-3 rounded-full border ${
                    isWishlist
                      ? "border-primary-500 text-primary-600 bg-primary-50"
                      : "border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-600"
                  } transition-all duration-200`}>
                  <FiHeart
                    className={`w-5 h-5 ${isWishlist ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-3 rounded-full border border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-all duration-200">
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>
              <button className="w-full py-3 px-6 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="text-center py-4 px-6 bg-red-50 rounded-xl">
              <p className="text-red-600 font-medium">Out of Stock</p>
              <p className="text-sm text-red-500 mt-1">
                This item is currently unavailable
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Free Shipping
              </div>
              <div className="text-xs text-gray-600">On orders over $50</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Secure Payment
              </div>
              <div className="text-xs text-gray-600">100% secure checkout</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Easy Returns
              </div>
              <div className="text-xs text-gray-600">30-day returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
