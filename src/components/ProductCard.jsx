import { FiPlus, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    rating,
    category,
    image,
    discount,
    isNew,
    itemsLeft,
  } = product;

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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} className="w-full h-48 object-cover" />
        </Link>
        {discount && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
        {isNew && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{name}</h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">{renderStars(rating)}</div>
          <span className="text-sm text-gray-500">({rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <button
            className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Add to cart">
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        {itemsLeft && itemsLeft < 10 && (
          <div className="mt-2 text-sm text-orange-600">
            Only {itemsLeft} items left
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
