import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Footer from "./Footer";
import {
  FiHome,
  FiShoppingBag,
  FiInfo,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiSettings,
  FiHeart,
  FiPackage,
  FiLogIn,
  FiAlertCircle,
  FiCheckCircle,
  FiCheck,
} from "react-icons/fi";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userName = localStorage.getItem("userName");

  // Function to clear all user data from localStorage
  const clearUserData = () => {
    const userKeys = [
      "isAuthenticated",
      "userEmail",
      "userName",
      "userType",
      "userUniversity",
      "userDepartment",
      "userRole",
      "userPhone",
      "userAddress",
      "userPreferences",
      "userTheme",
      "userNotifications",
      "userCart",
      "userWishlist",
      "lastLoginDate",
      "isVerified",
      "verificationId",
      "verificationType",
    ];

    userKeys.forEach((key) => localStorage.removeItem(key));
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);

    try {
      // Simulate API call to logout (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Clear all user data
      clearUserData();

      // Close all menus
      setIsProfileOpen(false);
      setShowConfirmDialog(false);

      // Show success toast
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutClick = () => {
    setShowConfirmDialog(true);
  };

  const navigation = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Shop", href: "/shop", icon: FiShoppingBag },
    { name: "About", href: "/about", icon: FiInfo },
  ];

  const profileLinks = [
    { name: "My Profile", href: "/profile", icon: FiUser },
    { name: "My Orders", href: "/orders", icon: FiPackage },
    { name: "Wishlist", href: "/wishlist", icon: FiHeart },
    { name: "Settings", href: "/settings", icon: FiSettings },
    {
      name: "Logout",
      href: "#",
      icon: FiLogOut,
      onClick: handleLogoutClick,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent font-display">
                Marko
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    location.pathname === item.href
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <FiShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      3
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <FiUser className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Sign in
                </Link>
              )}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white z-50 md:hidden">
              <div className="p-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="mt-8 space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        location.pathname === item.href
                          ? "text-primary-600 bg-primary-50"
                          : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                      }`}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  {!isAuthenticated && (
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg">
                      <FiLogIn className="w-5 h-5" />
                      <span>Sign in</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Popup */}
      <AnimatePresence>
        {isProfileOpen && isAuthenticated && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsProfileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Profile
                  </h2>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                {/* User Info */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          {userName}
                        </h3>
                        {localStorage.getItem("isVerified") === "true" &&
                          localStorage.getItem("userType") === "vendor" && (
                            <div
                              className="flex items-center"
                              title="Verified Vendor">
                              <div className="bg-blue-500 rounded-full p-0.5">
                                <FiCheck className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {localStorage.getItem("userEmail")}
                      </p>
                      {localStorage.getItem("isVerified") === "true" && (
                        <p className="text-xs text-blue-600 mt-1">
                          Verified {localStorage.getItem("verificationType")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Links */}
                <div className="space-y-1">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.onClick ? "#" : link.href}
                      onClick={() => {
                        if (link.onClick) {
                          link.onClick();
                        }
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <link.icon className="w-5 h-5 text-gray-500" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={() => !isLoggingOut && setShowConfirmDialog(false)}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl p-8 z-50 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}>
                <div className="text-center">
                  <FiAlertCircle className="mx-auto h-12 w-12 text-primary-500" />
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    Confirm Logout
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to log out? You will need to log in
                    again to access your account.
                  </p>
                  <div className="mt-6 flex justify-center space-x-3">
                    <button
                      onClick={() =>
                        !isLoggingOut && setShowConfirmDialog(false)
                      }
                      disabled={isLoggingOut}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50">
                      Cancel
                    </button>
                    <button
                      onClick={handleLogoutConfirm}
                      disabled={isLoggingOut}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 flex items-center">
                      {isLoggingOut ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging out...
                        </>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50">
            <FiCheckCircle className="h-5 w-5 text-green-500" />
            <p className="text-sm font-medium text-gray-900">
              Successfully logged out
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
