import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiBookOpen,
  FiHash,
  FiPhone,
  FiMapPin,
  FiShoppingBag,
  FiShoppingCart,
  FiInfo,
  FiChevronDown,
  FiUsers,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
} from "react-icons/fi";
import CustomDropdown from "../components/CustomDropdown";

// Top 10 Universities in Ghana with mobile-friendly format
const UNIVERSITIES = [
  { value: "UG", label: "UG - University of Ghana", shortLabel: "UG" },
  {
    value: "KNUST",
    label: "KNUST - Kwame Nkrumah University of Science and Technology",
    shortLabel: "KNUST",
  },
  { value: "UCC", label: "UCC - University of Cape Coast", shortLabel: "UCC" },
  {
    value: "UMAT",
    label: "UMAT - University of Mines and Technology",
    shortLabel: "UMAT",
  },
  {
    value: "UHAS",
    label: "UHAS - University of Health and Allied Sciences",
    shortLabel: "UHAS",
  },
  {
    value: "UPSA",
    label: "UPSA - University of Professional Studies",
    shortLabel: "UPSA",
  },
  {
    value: "ATU",
    label: "ATU - Accra Technical University",
    shortLabel: "ATU",
  },
  { value: "AUC", label: "AUC - Accra University College", shortLabel: "AUC" },
  { value: "CU", label: "CU - Central University", shortLabel: "CU" },
  {
    value: "AUCC",
    label: "AUCC - African University College of Communications",
    shortLabel: "AUCC",
  },
];

// Departments by University
const DEPARTMENTS = {
  UG: [
    { value: "computer-science", label: "Computer Science" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "engineering", label: "Engineering" },
    { value: "business", label: "Business Administration" },
    { value: "economics", label: "Economics" },
    { value: "political-science", label: "Political Science" },
    { value: "sociology", label: "Sociology" },
    { value: "psychology", label: "Psychology" },
    { value: "english", label: "English" },
    { value: "history", label: "History" },
    { value: "medicine", label: "Medicine" },
    { value: "nursing", label: "Nursing" },
    { value: "pharmacy", label: "Pharmacy" },
  ],
  KNUST: [
    { value: "computer-engineering", label: "Computer Engineering" },
    { value: "electrical-engineering", label: "Electrical Engineering" },
    { value: "mechanical-engineering", label: "Mechanical Engineering" },
    { value: "chemical-engineering", label: "Chemical Engineering" },
    { value: "civil-engineering", label: "Civil Engineering" },
    { value: "aerospace-engineering", label: "Aerospace Engineering" },
    { value: "materials-engineering", label: "Materials Engineering" },
    { value: "biomedical-engineering", label: "Biomedical Engineering" },
    { value: "petroleum-engineering", label: "Petroleum Engineering" },
    { value: "telecommunications", label: "Telecommunications Engineering" },
    { value: "computer-science", label: "Computer Science" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "mathematics", label: "Mathematics" },
    { value: "business", label: "Business Administration" },
  ],
  // Add departments for other universities...
};

const ROLES = [
  { value: "student", label: "Student" },
  { value: "staff", label: "Staff" },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("buyer");
  const [step, setStep] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    university: "",
    idNumber: "",
    department: "",
    role: "", // student or staff
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isUniversityOpen, setIsUniversityOpen] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.university.trim())
      newErrors.university = "University is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";

    // Only validate role and ID for vendors
    if (accountType === "vendor") {
      if (!formData.role) newErrors.role = "Please select your role";
      if (!formData.idNumber.trim())
        newErrors.idNumber = "ID number is required";
    }

    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = step === 1 ? validateStep1() : validateStep2();
    if (Object.keys(stepErrors).length === 0) {
      setStep(step + 1);
    } else {
      setErrors(stepErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep2();
    if (Object.keys(stepErrors).length === 0 && formData.agreeToTerms) {
      // Store user information in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", accountType);
      localStorage.setItem(
        "userName",
        `${formData.firstName} ${formData.lastName}`
      );
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userUniversity", formData.university);
      localStorage.setItem("userDepartment", formData.department);
      localStorage.setItem("userRole", formData.role);
      localStorage.setItem("userPhone", formData.phone);
      localStorage.setItem("userAddress", formData.address);

      // Set verification status for vendors with ID
      if (accountType === "vendor" && formData.idNumber) {
        localStorage.setItem("isVerified", "true");
        localStorage.setItem("verificationId", formData.idNumber);
        localStorage.setItem("verificationType", formData.role); // "student" or "staff"
      }

      // Show success toast
      setShowToast(true);

      // Hide toast after 3 seconds and navigate
      setTimeout(() => {
        setShowToast(false);
        // Redirect to home page
        navigate("/");
      }, 2000);
    } else {
      setErrors(stepErrors);
    }
  };

  // Get departments based on selected university
  const getFilteredDepartments = () => {
    const universityDepts = DEPARTMENTS[formData.university] || [];
    if (!departmentSearch) return universityDepts;

    return universityDepts.filter((dept) =>
      dept.label.toLowerCase().includes(departmentSearch.toLowerCase())
    );
  };

  const renderAccountTypeSelection = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Choose Account Type
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAccountType("buyer")}
          className={`p-6 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-200 ${
            accountType === "buyer"
              ? "border-primary-500 bg-primary-50"
              : "border-gray-200 hover:border-primary-200"
          }`}>
          <FiShoppingCart className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900">Buyer Account</h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            Purchase products from verified university vendors
          </p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAccountType("vendor")}
          className={`p-6 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-200 ${
            accountType === "vendor"
              ? "border-primary-500 bg-primary-50"
              : "border-gray-200 hover:border-primary-200"
          }`}>
          <FiShoppingBag className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900">
            Vendor Account
          </h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            Sell products within the university community
          </p>
        </motion.button>
      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Vendors need to be verified students or staff members. You can
              always switch to a vendor account later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                errors.firstName
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-primary-500 focus:border-primary-500"
              }`}
            />
          </div>
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                errors.lastName
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-primary-500 focus:border-primary-500"
              }`}
            />
          </div>
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                errors.email
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-primary-500 focus:border-primary-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`pl-12 pr-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                errors.password
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-primary-500 focus:border-primary-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none">
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`pl-12 pr-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                errors.confirmPassword
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-primary-500 focus:border-primary-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none">
              {showConfirmPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderUniversityInfo = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        University Information
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <CustomDropdown
            name="university"
            label="University/Institution"
            options={UNIVERSITIES.map((uni) => ({
              value: uni.value,
              label: isDesktop ? uni.label : uni.shortLabel,
            }))}
            value={formData.university}
            onChange={(e) => {
              handleChange(e);
              // Reset department when university changes
              setFormData((prev) => ({ ...prev, department: "" }));
              setDepartmentSearch("");
            }}
            placeholder="Select University"
            icon={FiBookOpen}
            error={errors.university}
          />
        </div>

        {accountType === "vendor" && (
          <>
            <div>
              <CustomDropdown
                name="role"
                label="Role"
                options={ROLES}
                value={formData.role}
                onChange={handleChange}
                placeholder="Select Role"
                icon={FiUsers}
                error={errors.role}
              />
            </div>

            <div>
              <label
                htmlFor="idNumber"
                className="block text-sm font-medium text-gray-700">
                {formData.role === "staff" ? "Staff ID" : "Student ID"} Number
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiHash className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className={`pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                    errors.idNumber
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-primary-500 focus:border-primary-500"
                  }`}
                />
              </div>
              {errors.idNumber && (
                <p className="mt-2 text-sm text-red-600">{errors.idNumber}</p>
              )}
            </div>
          </>
        )}

        <div>
          <CustomDropdown
            name="department"
            label="Department"
            options={getFilteredDepartments()}
            value={formData.department}
            onChange={handleChange}
            placeholder={
              formData.university
                ? "Select Department"
                : "Select University First"
            }
            icon={FiBookOpen}
            error={errors.department}
            isSearchable
            searchValue={departmentSearch}
            onSearchChange={setDepartmentSearch}
            disabled={!formData.university}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiPhone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                errors.phone
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-primary-500 focus:border-primary-500"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiMapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`pl-12 block w-full shadow-sm sm:text-sm border-gray-300 rounded-xl ${
                errors.address
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-primary-500 focus:border-primary-500"
              }`}
            />
          </div>
          {errors.address && (
            <p className="mt-2 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        {accountType === "vendor" && (
          <div className="sm:col-span-2 bg-blue-50 rounded-xl p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Your vendor account will be verified once you submit your{" "}
                  {formData.role === "staff" ? "staff" : "student"} ID. This
                  helps ensure the security of our marketplace.
                </p>
              </div>
            </div>
          </div>
        )}

        {accountType === "buyer" && (
          <div className="sm:col-span-2 bg-blue-50 rounded-xl p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Want to get verified? You can verify your student/staff ID
                  anytime by going to Settings after creating your account.
                  Verified buyers get access to exclusive deals and features!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="sm:col-span-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="agreeToTerms"
                className="font-medium text-gray-700">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10">
          <div className="space-y-8">
            {step === 1 && (
              <>
                {renderAccountTypeSelection()}
                {renderPersonalInfo()}
              </>
            )}
            {step === 2 && renderUniversityInfo()}

            <div className="flex justify-between">
              {step === 2 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(1)}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={step === 1 ? handleNext : handleSubmit}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg ml-auto">
                {step === 1 ? "Next" : "Create Account"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

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
              Account created successfully! Redirecting...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;
