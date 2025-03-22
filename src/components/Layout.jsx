import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Navbar from "./Navbar";
import VerifiedName from "./VerifiedName";
import {
  FiLogOut,
  FiSettings,
  FiHeart,
  FiPackage,
  FiBox,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiCheck,
} from "react-icons/fi";

const Layout = ({ children }) => {
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

  const baseProfileLinks = [
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

  const vendorLinks = [
    { name: "My Products", href: "/vendor/products", icon: FiBox },
  ];

  const profileLinks =
    localStorage.getItem("userType") === "vendor"
      ? [
          ...baseProfileLinks.slice(0, 1),
          ...vendorLinks,
          ...baseProfileLinks.slice(1),
        ]
      : baseProfileLinks;

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar
        isAuthenticated={isAuthenticated}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      <Footer />

      {/* Profile Popup */}
      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsProfileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed top-4 right-4 w-80 bg-white rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-6">
                {/* Profile Header */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <VerifiedName
                        name={userName}
                        isVerified={
                          localStorage.getItem("isVerified") === "true"
                        }
                        verificationType={
                          localStorage.getItem("verificationType") || ""
                        }
                        className="text-sm font-medium text-gray-900"
                      />
                      <p className="text-sm text-gray-500">
                        {localStorage.getItem("userEmail")}
                      </p>
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
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowConfirmDialog(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 text-red-600 mb-4">
                  <FiAlertCircle className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Confirm Logout</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to log out? You will need to sign in
                  again to access your account.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                    Cancel
                  </button>
                  <button
                    onClick={handleLogoutConfirm}
                    disabled={isLoggingOut}
                    className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
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
            className="fixed bottom-4 right-4 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            <FiCheckCircle className="w-5 h-5" />
            <span>Successfully logged out</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
