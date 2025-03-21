import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Advanced Calculus Textbook",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      inStock: true,
    },
    {
      id: 2,
      name: "Graphing Calculator",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1574492543172-b37d0d5f5087?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      inStock: true,
    },
    {
      id: 3,
      name: "Physics Study Set",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1602306834394-6c8b7ea5337d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      inStock: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-2 mb-8">
          <FiHeart className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <FiHeart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500">
              Start adding items to your wishlist by browsing our products
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-primary-600">
                      ${item.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        item.inStock
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      disabled={!item.inStock}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        item.inStock
                          ? "bg-primary-600 text-white hover:bg-primary-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}>
                      <FiShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WishlistPage;
