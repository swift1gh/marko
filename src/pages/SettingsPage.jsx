import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiHash,
  FiCheck,
  FiX,
  FiInfo,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";
import CustomDropdown from "../components/CustomDropdown";

// Import the constants from RegisterPage
const ROLES = [
  { value: "student", label: "Student" },
  { value: "staff", label: "Staff" },
];

const SettingsPage = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [verificationForm, setVerificationForm] = useState({
    role: "",
    idNumber: "",
  });
  const [errors, setErrors] = useState({});

  // Get user data from localStorage
  const userData = {
    firstName: localStorage.getItem("userName")?.split(" ")[0] || "",
    lastName: localStorage.getItem("userName")?.split(" ")[1] || "",
    email: localStorage.getItem("userEmail") || "",
    phone: localStorage.getItem("userPhone") || "",
    address: localStorage.getItem("userAddress") || "",
    university: localStorage.getItem("userUniversity") || "",
    department: localStorage.getItem("userDepartment") || "",
    userType: localStorage.getItem("userType") || "",
    isVerified: localStorage.getItem("isVerified") === "true",
    verificationType: localStorage.getItem("verificationType") || "",
  };

  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setVerificationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateVerificationForm = () => {
    const newErrors = {};
    if (!verificationForm.role) {
      newErrors.role = "Please select your role";
    }
    if (!verificationForm.idNumber.trim()) {
      newErrors.idNumber = "ID number is required";
    }
    return newErrors;
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateVerificationForm();

    if (Object.keys(formErrors).length === 0) {
      setIsVerifying(true);

      try {
        // Simulate API verification delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Store verification data
        localStorage.setItem("isVerified", "true");
        localStorage.setItem("verificationId", verificationForm.idNumber);
        localStorage.setItem("verificationType", verificationForm.role);

        // Show success message
        setToastMessage("Account verified successfully!");
        setShowToast(true);

        // Reset form
        setVerificationForm({ role: "", idNumber: "" });

        // Reload page after 2 seconds to update UI
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setToastMessage("Verification failed. Please try again.");
        setShowToast(true);
      } finally {
        setIsVerifying(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Profile Settings
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.firstName}
                    disabled
                    className="pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.lastName}
                    disabled
                    className="pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={userData.email}
                    disabled
                    className="pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={userData.phone}
                    disabled
                    className="pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.address}
                    disabled
                    className="pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiBookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.university}
                    disabled
                    className="pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <div className="mt-1 flex items-center">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiBookOpen className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={userData.department}
                    disabled
                    className="pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Section */}
        {userData.userType === "buyer" && !userData.isVerified && (
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Account Verification
              </h2>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Not Verified
              </span>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Verify your account to get access to exclusive deals and
                    features. Please provide your student or staff ID to
                    complete verification.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <CustomDropdown
                    name="role"
                    label="Role"
                    options={ROLES}
                    value={verificationForm.role}
                    onChange={handleVerificationChange}
                    placeholder="Select Role"
                    icon={FiUsers}
                    error={errors.role}
                  />
                </div>

                <div>
                  <label
                    htmlFor="idNumber"
                    className="block text-sm font-medium text-gray-700">
                    {verificationForm.role === "staff"
                      ? "Staff ID"
                      : "Student ID"}{" "}
                    Number
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiHash className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      value={verificationForm.idNumber}
                      onChange={handleVerificationChange}
                      className={`pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                        errors.idNumber
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "focus:ring-primary-500 focus:border-primary-500"
                      }`}
                    />
                  </div>
                  {errors.idNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.idNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isVerifying}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg disabled:opacity-50">
                  {isVerifying ? (
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
                      Verifying...
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        )}

        {/* Verified Status */}
        {userData.isVerified && (
          <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Verification Status
              </h2>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center">
                <FiCheckCircle className="w-4 h-4 mr-2" />
                Verified
              </span>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiCheck className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Your account is verified as a {userData.verificationType}.
                    You have access to all features and exclusive deals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50">
            <FiCheckCircle className="h-5 w-5 text-green-500" />
            <p className="text-sm font-medium text-gray-900">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage;
