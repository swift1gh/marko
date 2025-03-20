import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiStar,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { products } from "../data/products";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link to="/shop" className="mt-4 text-purple-600 hover:text-purple-700">
          Return to shop
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.itemsLeft) {
      setQuantity(newQuantity);
    }
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({product.rating})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4">
            <div className="flex items-center">
              <p className="text-3xl font-bold text-gray-900">
                ${product.price}
              </p>
              {product.originalPrice && (
                <p className="ml-2 text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </p>
              )}
              {product.discount && (
                <span className="ml-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Features</h2>
            <ul className="mt-2 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 border rounded-l-md hover:bg-gray-50"
                disabled={quantity <= 1}>
                <FiMinus className="w-4 h-4" />
              </button>
              <div className="px-4 py-2 border-t border-b w-16 text-center">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 border rounded-r-md hover:bg-gray-50"
                disabled={quantity >= product.itemsLeft}>
                <FiPlus className="w-4 h-4" />
              </button>
              <span className="ml-4 text-sm text-gray-500">
                {product.itemsLeft} items left
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              disabled={product.itemsLeft === 0}>
              {product.itemsLeft === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          {/* Shipping Info */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center">
                <FiTruck className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center">
                <FiShield className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center">
                <FiRotateCcw className="w-5 h-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
