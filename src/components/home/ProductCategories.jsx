import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Laptops, Phones, and Accessories",
    icon: "💻",
    color: "from-blue-500 to-indigo-500",
    itemCount: 245,
  },
  {
    id: 2,
    name: "Books",
    description: "Textbooks and Study Materials",
    icon: "📚",
    color: "from-emerald-500 to-teal-500",
    itemCount: 189,
  },
  {
    id: 3,
    name: "Stationery",
    description: "Notebooks, Pens, and Art Supplies",
    icon: "✏️",
    color: "from-orange-500 to-amber-500",
    itemCount: 167,
  },
  {
    id: 4,
    name: "Furniture",
    description: "Desks, Chairs, and Storage",
    icon: "🪑",
    color: "from-rose-500 to-pink-500",
    itemCount: 94,
  },
  {
    id: 5,
    name: "Fashion",
    description: "Uniforms and Accessories",
    icon: "👕",
    color: "from-violet-500 to-purple-500",
    itemCount: 156,
  },
  {
    id: 6,
    name: "Sports",
    description: "Equipment and Sportswear",
    icon: "⚽",
    color: "from-cyan-500 to-sky-500",
    itemCount: 112,
  },
];

const ProductCategories = () => {
  return (
    <div className="w-full bg-primary-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Shop by Category</h2>
            <p className="mt-1 text-gray-300">
              Find everything you need for your studies
            </p>
          </div>
          <Link
            to="/categories"
            className="flex items-center space-x-1 text-primary-200 hover:text-primary-100 font-medium">
            <span>View All Categories</span>
            <FiChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="group">
              <div className="relative h-full bg-primary-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-15 transition-opacity duration-200`}
                />

                <div className="relative p-6">
                  {/* Icon */}
                  <div className="text-4xl mb-4">{category.icon}</div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary-200 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-300 line-clamp-2">
                      {category.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-primary-200">
                      {category.itemCount} items
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
