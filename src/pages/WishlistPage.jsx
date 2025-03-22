import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Advanced Calculus Textbook",
      price: 129.99,
      category: "Books",
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Essential calculus textbook for advanced mathematics courses",
    },
    {
      id: 2,
      name: "Graphing Calculator",
      price: 199.99,
      category: "Electronics",
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1574492543172-b37d0d5f5087?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Professional graphing calculator for mathematics and engineering",
    },
    {
      id: 3,
      name: "Physics Study Set",
      price: 89.99,
      category: "Books",
      stock: 0,
      image:
        "https://images.unsplash.com/photo-1602306834394-6c8b7ea5337d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      description:
        "Comprehensive physics study materials and practice problems",
    },
  ];

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", product);
  };

  const handleRemoveFromWishlist = (product) => {
    // TODO: Implement remove from wishlist functionality
    console.log("Removing from wishlist:", product);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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
                <ProductCard
                  key={item.id}
                  product={item}
                  isWishlistView={true}
                  onAddToCart={handleAddToCart}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;
