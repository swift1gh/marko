import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiDollarSign,
  FiPackage,
  FiTag,
  FiImage,
  FiSearch,
  FiX,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";

const sampleProducts = [
  {
    id: 1,
    name: "Engineering Mathematics Textbook",
    price: 180.0,
    category: "Books",
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&auto=format",
    description:
      "Essential mathematics textbook for KNUST engineering students",
    status: "Active",
  },
  {
    id: 2,
    name: "Scientific Calculator (Casio fx-991ES)",
    price: 120.0,
    category: "Electronics",
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f260d3c5?w=500&auto=format",
    description: "Approved calculator for KNUST examinations",
    status: "Active",
  },
  {
    id: 3,
    name: "KNUST Branded Study Chair",
    price: 450.0,
    category: "Furniture",
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1505843490578-d3001d12d3ca?w=500&auto=format",
    description: "Comfortable study chair with KNUST logo",
    status: "Active",
  },
  {
    id: 4,
    name: "USB Flash Drive 32GB",
    price: 85.0,
    category: "Electronics",
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format",
    description: "High-speed USB drive for storing lecture materials",
    status: "Active",
  },
  {
    id: 5,
    name: "Rechargeable LED Desk Lamp",
    price: 95.0,
    category: "Electronics",
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1534381341970-d4ccd2d13d5f?w=500&auto=format",
    description: "Perfect for late night studying during power outages",
    status: "Active",
  },
  {
    id: 6,
    name: "KNUST Lab Manual Bundle",
    price: 150.0,
    category: "Books",
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format",
    description: "Complete set of laboratory manuals for first-year students",
    status: "Active",
  },
];

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Load products from localStorage on component mount
  useEffect(() => {
    // Force reset to sample products
    setProducts(sampleProducts);
    localStorage.setItem("vendorProducts", JSON.stringify(sampleProducts));
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("vendorProducts", JSON.stringify(products));
  }, [products]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Product name is required";
    if (!formData.price || formData.price <= 0)
      errors.price = "Valid price is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.stock || formData.stock < 0)
      errors.stock = "Valid stock quantity is required";
    if (!formData.image.trim()) errors.image = "Image URL is required";
    return errors;
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      image: "",
      description: "",
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      description: product.description || "",
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setIsDeleteDialogOpen(false);
    showToastMessage("Product deleted successfully", "success");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      if (selectedProduct) {
        // Edit existing product
        setProducts(
          products.map((p) =>
            p.id === selectedProduct.id
              ? {
                  ...p,
                  ...formData,
                  price: parseFloat(formData.price),
                  stock: parseInt(formData.stock),
                }
              : p
          )
        );
        showToastMessage("Product updated successfully", "success");
      } else {
        // Add new product
        const newProduct = {
          id: Date.now(),
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          status: "Active",
        };
        setProducts([...products, newProduct]);
        showToastMessage("Product added successfully", "success");
      }
      setIsFormOpen(false);
    } else {
      setFormErrors(errors);
    }
  };

  const showToastMessage = (message, type) => {
    setShowToast({ show: true, message, type });
    setTimeout(
      () => setShowToast({ show: false, message: "", type: "" }),
      3000
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <button
              onClick={handleAddProduct}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FiPlus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products & events..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isVendorView={true}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try adjusting your search term"
                : "Get started by adding some products"}
            </p>
          </div>
        )}
      </div>

      {/* Modals and notifications stay outside the main content area */}
      {/* Add/Edit Product Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedProduct ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="p-2 text-gray-600 hover:text-primary-600">
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`mt-1 block w-full rounded-lg border ${
                          formErrors.name ? "border-red-500" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price (GH₵)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className={`mt-1 block w-full rounded-lg border ${
                          formErrors.price
                            ? "border-red-500"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {formErrors.price && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.price}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className={`mt-1 block w-full rounded-lg border ${
                          formErrors.category
                            ? "border-red-500"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {formErrors.category && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.category}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        className={`mt-1 block w-full rounded-lg border ${
                          formErrors.stock
                            ? "border-red-500"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {formErrors.stock && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.stock}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        className={`mt-1 block w-full rounded-lg border ${
                          formErrors.image
                            ? "border-red-500"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500`}
                      />
                      {formErrors.image && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.image}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows="3"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700">
                        {selectedProduct ? "Update Product" : "Add Product"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {isDeleteDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsDeleteDialogOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
                <div className="text-center">
                  <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    Delete Product
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to delete this product? This action
                    cannot be undone.
                  </p>
                  <div className="mt-6 flex justify-center space-x-3">
                    <button
                      onClick={() => setIsDeleteDialogOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50 ${
              showToast.type === "success"
                ? "border-l-4 border-green-500"
                : "border-l-4 border-red-500"
            }`}>
            {showToast.type === "success" ? (
              <FiCheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <FiAlertCircle className="h-5 w-5 text-red-500" />
            )}
            <p className="text-sm font-medium text-gray-900">
              {showToast.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorProducts;
