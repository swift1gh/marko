import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiHome,
  FiTag,
  FiInfo,
} from "react-icons/fi";
import AuthModal from "./auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/shop", label: "Shop", icon: FiTag },
    { path: "/about", label: "About", icon: FiInfo },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              Marko
            </Link>
          </div>
          <div className="hidden sm:flex flex-1 justify-center items-center">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:border-purple-300 hover:text-purple-600"
                  }`}>
                  {link.icon && <link.icon className="mr-1 h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center space-x-4">
            <Link
              to="/cart"
              className={`p-2 rounded-full transition-colors duration-200 ${
                isActive("/cart")
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-purple-600"
              }`}>
              <span className="sr-only">View cart</span>
              <FiShoppingCart className="h-6 w-6" />
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200">
                  <span className="sr-only">View profile</span>
                  <FiUser className="h-6 w-6" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      {user?.name || "User"}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200">
                <span className="sr-only">Sign in</span>
                <FiUser className="h-6 w-6" />
              </button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white shadow-lg">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "bg-purple-50 border-purple-500 text-purple-700"
                      : "border-transparent text-gray-500 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center">
                    {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 space-x-4">
                <Link
                  to="/cart"
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isActive("/cart")
                      ? "bg-purple-100 text-purple-600"
                      : "text-gray-500 hover:bg-gray-100 hover:text-purple-600"
                  }`}>
                  <span className="sr-only">View cart</span>
                  <FiShoppingCart className="h-6 w-6" />
                </Link>
                {!isAuthenticated && (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600 transition-colors duration-200">
                    <span className="sr-only">Sign in</span>
                    <FiUser className="h-6 w-6" />
                  </button>
                )}
              </div>
              {isAuthenticated && (
                <div className="mt-3 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </motion.nav>
  );
};

export default Navbar;
