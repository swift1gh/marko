import { useState } from "react";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    studentId: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!isLogin) {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        // Validate student ID format (example: must be 8-10 digits)
        if (!/^\d{8,10}$/.test(formData.studentId)) {
          setError("Student ID must be 8-10 digits");
          return;
        }
      }

      // TODO: Replace with actual API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful authentication
      const userData = {
        name: formData.name || "Student User",
        email: formData.email,
        studentId: formData.studentId,
      };

      onAuthSuccess(userData);
      onClose();
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Authentication failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={onClose}
          />

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title">
                      {isLogin ? "Welcome Back!" : "Create Account"}
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500">
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  {error && (
                    <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">
                      {error}
                    </div>
                  )}

                  {isLogin ? (
                    <LoginForm
                      formData={formData}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                    />
                  ) : (
                    <RegisterForm
                      formData={formData}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                    />
                  )}

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setError("");
                      }}
                      className="text-sm text-purple-600 hover:text-purple-500">
                      {isLogin
                        ? "Don't have an account? Sign up"
                        : "Already have an account? Sign in"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
