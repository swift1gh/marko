import { motion } from "framer-motion";
import {
  FiTag,
  FiPackage,
  FiEdit2,
  FiTrash2,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";

const ProductCard = ({
  product,
  isVendorView = false,
  isWishlistView = false,
  onEdit,
  onDelete,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  const { name, price, category, itemsLeft, image, description } = product;

  const stockStatus =
    itemsLeft > 0 ? (
      <span className="text-green-600">In Stock</span>
    ) : (
      <span className="text-red-600">Out of Stock</span>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      {/* Image Container with fixed aspect ratio */}
      <div className="relative pt-[60%] bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x240?text=Product+Image";
          }}
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-none min-h-[3.5rem]">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-none min-h-[2.5rem]">
          {description}
        </p>

        {/* Category and Price */}
        <div className="flex items-center justify-between mb-4 flex-none">
          <div className="flex items-center text-gray-500 text-sm">
            <FiTag className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate max-w-[120px]">{category}</span>
          </div>
          <div className="flex items-center text-primary-600 font-semibold">
            GH₵ {Number(price).toFixed(2)}
          </div>
        </div>

        {/* Stock Status and Actions */}
        <div className="flex items-center justify-between flex-none mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-sm">
            <FiPackage className="w-4 h-4 mr-1 flex-shrink-0" />
            {stockStatus}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {isVendorView ? (
              <>
                <button
                  onClick={() => onEdit?.(product)}
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  <FiEdit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete?.(product)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onAddToCart?.(product)}
                  disabled={itemsLeft === 0}
                  className={`inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium
                    ${
                      itemsLeft > 0
                        ? "text-white bg-primary-600 hover:bg-primary-700"
                        : "text-gray-400 bg-gray-100 cursor-not-allowed"
                    }`}>
                  <FiShoppingCart className="w-4 h-4 mr-2" />
                  {itemsLeft > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
                {isWishlistView && (
                  <button
                    onClick={() => onRemoveFromWishlist?.(product)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <FiHeart className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
