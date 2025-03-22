import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

// Mock cart data - in a real app, this would come from a cart context/state management
const initialCartItems = [
  {
    id: 1,
    name: "Noise-Canceling Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    quantity: 1,
    maxQuantity: 6,
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    quantity: 2,
    maxQuantity: 8,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const formatPrice = (price) => `GH₵ ${price.toFixed(2)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some items to your cart to continue shopping.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            {/* Cart Items */}
            <ul className="border-t border-gray-200 divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 border rounded-l-md hover:bg-gray-50"
                          disabled={item.quantity <= 1}>
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <div className="px-4 py-1 border-t border-b w-12 text-center">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 border rounded-r-md hover:bg-gray-50"
                          disabled={item.quantity >= item.maxQuantity}>
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="font-medium text-purple-600 hover:text-purple-500">
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(subtotal)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">
                    Order Total
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {formatPrice(total)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  Proceed to Checkout
                </button>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/shop"
                  className="text-sm font-medium text-purple-600 hover:text-purple-500">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
