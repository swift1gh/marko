import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiClock, FiTrendingUp, FiX } from "react-icons/fi";
import { products } from "../data/products";

const MAX_RECENT_SEARCHES = 5;
const MAX_SUGGESTIONS = 6;

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Popular searches based on product categories and common terms
  const popularSearches = [
    "Electronics",
    "Books",
    "Stationery",
    "Student Essentials",
    "New Arrivals",
    "On Sale",
  ];

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate suggestions based on input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const productSuggestions = products
      .filter((product) => {
        // Check name match
        const nameMatch = product.name.toLowerCase().includes(query);
        // Check category match
        const categoryMatch = product.category.toLowerCase().includes(query);
        // Check description match with lower priority
        const descriptionMatch = product.description
          .toLowerCase()
          .includes(query);
        // Check for exact matches in features
        const featureMatch = product.features?.some((feature) =>
          feature.toLowerCase().includes(query)
        );

        return nameMatch || categoryMatch || descriptionMatch || featureMatch;
      })
      .slice(0, MAX_SUGGESTIONS)
      .map((product) => ({
        type: "product",
        text: product.name,
        category: product.category,
        price: product.price,
        id: product.id,
      }));

    setSuggestions(productSuggestions);
  }, [searchQuery]);

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent searches
      setRecentSearches((prev) => {
        const updated = [
          searchQuery,
          ...prev.filter((item) => item !== searchQuery),
        ].slice(0, MAX_RECENT_SEARCHES);
        return updated;
      });

      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "product") {
      navigate(`/product/${suggestion.id}`);
    } else {
      setSearchQuery(suggestion.text);
      navigate(`/shop?search=${encodeURIComponent(suggestion.text)}`);
    }
    setIsFocused(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none text-sm"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isFocused && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          {/* Product Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">
                SUGGESTIONS
              </div>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <FiSearch className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {suggestion.text}
                      </div>
                      <div className="text-xs text-gray-500">
                        in {suggestion.category}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    ${suggestion.price}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="border-t border-gray-100 p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-xs font-medium text-gray-500">
                  RECENT SEARCHES
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-primary-600 hover:text-primary-700">
                  Clear all
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick({ text: search })}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center space-x-3 group">
                  <FiClock className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                  <span className="text-sm text-gray-600">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {!searchQuery && (
            <div className="border-t border-gray-100 p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2">
                POPULAR SEARCHES
              </div>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick({ text: search })}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md flex items-center space-x-3 group">
                  <FiTrendingUp className="w-4 h-4 text-gray-400 group-hover:text-primary-500" />
                  <span className="text-sm text-gray-600">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
