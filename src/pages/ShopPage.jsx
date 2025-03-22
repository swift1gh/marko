import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewType, setViewType] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("featured"); // 'featured', 'price-low', 'price-high', 'rating'
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });
  const [filters, setFilters] = useState({
    inStock: false,
    onSale: false,
    newArrival: false,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    if (filters.inStock) params.set("inStock", "true");
    if (filters.onSale) params.set("onSale", "true");
    if (filters.newArrival) params.set("newArrival", "true");
    setSearchParams(params);
  }, [selectedCategory, searchQuery, filters, setSearchParams]);

  // Read URL parameters on mount
  useEffect(() => {
    const inStock = searchParams.get("inStock") === "true";
    const onSale = searchParams.get("onSale") === "true";
    const newArrival = searchParams.get("newArrival") === "true";
    const search = searchParams.get("search") || "";
    setFilters({ inStock, onSale, newArrival });
    setSearchQuery(search);
  }, [searchParams]);

  const categories = [
    "All",
    "Electronics",
    "Books",
    "Stationery",
    "Furniture",
    "Fashion",
    "Sports",
  ];

  const handleFilterChange = (filter) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // Filter and sort products
  let filteredProducts = [...products];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  // Apply price range filter
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.price >= priceRange.min && product.price <= priceRange.max
  );

  // Apply other filters
  if (filters.inStock) {
    filteredProducts = filteredProducts.filter(
      (product) => product.itemsLeft > 0
    );
  }
  if (filters.onSale) {
    filteredProducts = filteredProducts.filter(
      (product) => product.discount > 0
    );
  }
  if (filters.newArrival) {
    filteredProducts = filteredProducts.filter((product) => product.isNew);
  }

  // Apply sorting
  switch (sortBy) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      // Featured sorting (default)
      break;
  }

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log("Adding to cart:", product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 space-y-6">
          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    selectedCategory === category
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}>
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Price Range
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Min Price
                </label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      min: Number(e.target.value),
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Price
                </label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value),
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={() => handleFilterChange("inStock")}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.onSale}
                  onChange={() => handleFilterChange("onSale")}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">On Sale</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.newArrival}
                  onChange={() => handleFilterChange("newArrival")}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-700">New Arrivals</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button
                onClick={() => setViewType("grid")}
                className={`p-2 rounded-md ${
                  viewType === "grid"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-2 rounded-md ${
                  viewType === "list"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                <FiList className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <FiFilter className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid/List */}
          <div
            className={
              viewType === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
