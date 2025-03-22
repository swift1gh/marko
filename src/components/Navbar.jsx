import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiHome,
  FiTag,
  FiInfo,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

const Navbar = ({ isAuthenticated, onProfileClick, cartItemsCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate("/profile");
    }
    setIsMenuOpen(false);
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
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent font-display">
              Marko
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative group px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${
                  isActive(link.path)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}>
                <div className="flex items-center space-x-2">
                  {link.icon && (
                    <link.icon
                      className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                        isActive(link.path)
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      }`}
                    />
                  )}
                  <span>{link.label}</span>
                </div>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-200 transform origin-left ${
                    isActive(link.path)
                      ? "bg-blue-600 scale-x-100"
                      : "bg-blue-400 scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8 max-w-xl">
            <div className="w-full">
              <SearchBar />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden sm:flex sm:items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative p-2 rounded-full transition-colors duration-200 group">
                  <span className="sr-only">View cart</span>
                  <FiShoppingCart
                    className={`h-6 w-6 ${
                      isActive("/cart")
                        ? "text-blue-600"
                        : "text-gray-500 group-hover:text-blue-600"
                    }`}
                  />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[1.25rem] flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleProfileClick}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isActive("/profile")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                  }`}>
                  <span className="sr-only">Profile</span>
                  <FiUser className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200">
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
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
            <div className="p-4">
              <SearchBar />
            </div>
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-500 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
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
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/cart"
                      className="relative p-2 rounded-full transition-colors duration-200 group"
                      onClick={() => setIsMenuOpen(false)}>
                      <span className="sr-only">View cart</span>
                      <FiShoppingCart
                        className={`h-6 w-6 ${
                          isActive("/cart")
                            ? "text-blue-600"
                            : "text-gray-500 group-hover:text-blue-600"
                        }`}
                      />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[1.25rem] flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </Link>
                    <button
                      onClick={handleProfileClick}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        isActive("/profile")
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                      }`}>
                      <span className="sr-only">Profile</span>
                      <FiUser className="h-6 w-6" />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
                    <FiUser className="w-5 h-5" />
                    <span>Sign in</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
