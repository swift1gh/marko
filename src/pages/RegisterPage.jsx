import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiInfo } from "react-icons/fi";
import AccountTypeSelection from "../components/forms/AccountTypeSelection";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import UniversityInfoForm from "../components/forms/UniversityInfoForm";
import VendorVerification from "../components/verification/VendorVerification";
import { verificationService } from "../services/verificationService";
import Toast from "../components/shared/Toast";
import { UNIVERSITIES, DEPARTMENTS, ROLES } from "../data/constants";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState('');
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({ message: "", type: "success" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    university: '',
    department: '',
    role: '',
    idNumber: '',
    passportNumber: '', 
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('handleChange called:', { name, value, type, checked });
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleNext = () => {
    console.log('Handle next clicked');
    
    // Define which fields to mark as touched based on the current step
    let fieldsToTouch = {};
    if (step === 1) {
      fieldsToTouch = { accountType: true };
    } else if (step === 2) {
      fieldsToTouch = {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true
      };
    } else if (step === 3) {
      fieldsToTouch = { 
        university: true, 
        idNumber: true
      };
    }
    
    // Update the touched state
    setTouched(prev => ({ ...prev, ...fieldsToTouch }));

    // Validate the current step
    let stepErrors = {};
    let requiredFieldsFilled = false;
    
    if (step === 1) {
      stepErrors = validateStep1();
      requiredFieldsFilled = !!accountType;
    } else if (step === 2) {
      stepErrors = validateStep2();
      requiredFieldsFilled = 
        !!formData.firstName.trim() && 
        !!formData.lastName.trim() && 
        !!formData.email.trim() && 
        !!formData.password && 
        !!formData.confirmPassword;
    } else if (step === 3) {
      stepErrors = validateStep3();
      requiredFieldsFilled = 
        !!formData.university.trim() && 
        !!formData.idNumber.trim();
    }

    // Only proceed if there are no errors AND all required fields are filled
    if (Object.keys(stepErrors).length === 0 && requiredFieldsFilled) {
      console.log('No errors and all required fields filled, proceeding to next step');
      setStep(step + 1);
      // Reset touched state for next step
      setTouched({});
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('Validation errors found or required fields not filled, setting errors');
      setErrors(stepErrors);
      
      // Scroll to the first error field
      setTimeout(() => {
        const firstErrorField = document.querySelector('.border-red-500');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    console.log('handleSubmit called');
    
    // Mark all fields as touched
    setTouched(prev => ({ ...prev, all: true }));
    setIsSubmitting(true);
    setNetworkError(false);
    
    const stepErrors = validateStep3();
    console.log('Step 3 validation errors:', stepErrors);
    
    if (Object.keys(stepErrors).length === 0) {
      try {
        console.log('Form data valid, checking email availability');
        
        // Simulate API call to check if email exists
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 10% chance of network error for realism
        if (Math.random() < 0.1) {
          throw new Error("Network error. Please check your connection and try again.");
        }
        
        // Check if email already exists (randomly for demo)
        if (formData.email.includes("existing") || Math.random() < 0.2) {
          setEmailExists(true);
          setToastConfig({
            message: "This email is already registered. Please use a different email or login.",
            type: "error"
          });
          setShowToast(true);
          setIsSubmitting(false);
          return;
        }
        
        // Simulate server processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Email available, storing user information');
        
        // Store authentication state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", accountType);
        
        // Store user profile information
        localStorage.setItem("userName", `${formData.firstName} ${formData.lastName}`);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userUniversity", formData.university);
        localStorage.setItem("userDepartment", formData.department);
        localStorage.setItem("userRole", formData.role);
        localStorage.setItem("userPhone", formData.phone);
        localStorage.setItem("userAddress", formData.address);
        
        // Store additional verification details if available
        if (formData.passportNumber) {
          localStorage.setItem("userPassport", formData.passportNumber);
        }
        if (formData.idNumber) {
          localStorage.setItem("userId", formData.idNumber);
        }
        
        // Store registration date
        localStorage.setItem("registrationDate", new Date().toISOString());
        localStorage.setItem("lastLoginDate", new Date().toISOString());

        setToastConfig({
          message: accountType === "vendor" 
            ? "Registration successful! Please complete verification." 
            : "Registration successful! Redirecting to homepage...",
          type: "success"
        });
        setShowToast(true);

        if (accountType === "vendor") {
          console.log('Vendor account, proceeding to verification step');
          setStep(4);
        } else {
          console.log('Regular account, completing registration');
          // Add a slight delay for the toast message to be visible
          setTimeout(() => {
            setShowToast(false);
            navigate("/", { 
              state: { 
                showWelcome: true,
                userName: formData.firstName
              }
            });
          }, 2000);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setNetworkError(true);
        setErrors({ 
          submit: error.message,
          connectivity: "Connection error. Please check your internet and try again."
        });
        setToastConfig({
          message: error.message,
          type: "error"
        });
        setShowToast(true);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form validation failed:', stepErrors);
      setErrors(stepErrors);
      setIsSubmitting(false);
    }
  };

  const validateStep1 = () => {
    console.log('Validating step 1');
    const newErrors = {};
    
    if (!accountType) {
      newErrors.accountType = "Please select an account type to continue";
    }
    
    console.log('Step 1 validation errors:', newErrors);
    return newErrors;
  };

  const validateStep2 = () => {
    console.log('Validating step 2');
    const newErrors = {};

    // Always validate required fields when submitting
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    console.log('Step 2 validation errors:', newErrors);
    return newErrors;
  };

  const validateStep3 = () => {
    console.log('Validating step 3');
    const newErrors = {};

    // Only validate fields that have been touched or if we're trying to proceed
    if (touched.university || touched.all) {
      if (!formData.university.trim()) {
        newErrors.university = "University is required";
      }
    }

    if (touched.department || touched.all) {
      if (!formData.department.trim()) {
        newErrors.department = "Department is required";
      } else if (formData.department.includes("unavailable")) {
        newErrors.department = "This department is currently unavailable for registration";
      }
    }

    if (touched.phone || touched.all) {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = "Enter a valid phone number";
      } else if (formData.phone.includes("123456789")) {
        newErrors.phone = "This appears to be an invalid phone number";
      }
    }

    if (touched.address || touched.all) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      } else if (formData.address.length < 10) {
        newErrors.address = "Please enter a complete address";
      }
    }

    if (accountType === "vendor") {
      if ((touched.role || touched.all) && !formData.role) {
        newErrors.role = "Please select your role";
      }
      
      if ((touched.idNumber || touched.all)) {
        if (!formData.idNumber.trim()) {
          newErrors.idNumber = "ID number is required";
        } else if (formData.role === "staff" && !/^STF-\d{5,6}$/i.test(formData.idNumber)) {
          newErrors.idNumber = "Staff ID must be in format STF-XXXXX";
        } else if (formData.role === "student" && !/^\d{8,10}$/i.test(formData.idNumber)) {
          newErrors.idNumber = "Student ID must be 8-10 digits";
        } else if (formData.role === "international" && !/^INT-\d{7,8}$/i.test(formData.idNumber)) {
          newErrors.idNumber = "International student ID must be in format INT-XXXXXXX";
        }
      }
      
      if (formData.role === "international" && (touched.passportNumber || touched.all)) {
        if (!formData.passportNumber) {
          newErrors.passportNumber = "Passport number is required for international students";
        } else if (formData.passportNumber.length < 6) {
          newErrors.passportNumber = "Passport number is too short";
        }
      }
    }

    if (touched.agreeToTerms || touched.all) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms and conditions";
      }
    }

    console.log('Step 3 validation errors:', newErrors);
    return newErrors;
  };

  const handleVerificationSubmit = async (verificationData) => {
    try {
      await verificationService.uploadVendorVerification({
        ...verificationData,
        userId: formData.idNumber,
        userRole: formData.role,
        university: formData.university,
        department: formData.department
      });
      
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrors({ verification: error.message });
    }
  };

  const getFilteredDepartments = () => {
    const universityDepts = DEPARTMENTS[formData.university] || [];
    if (!departmentSearch) return universityDepts;
    return universityDepts.filter((dept) =>
      dept.label.toLowerCase().includes(departmentSearch.toLowerCase())
    );
  };

  const renderStep = () => {
    console.log('renderStep called, current step:', step);
    switch (step) {
      case 1:
        return (
          <AccountTypeSelection
            accountType={accountType}
            setAccountType={setAccountType}
            errors={errors}
          />
        );
      case 2:
        return (
          <PersonalInfoForm
            formData={formData}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        );
      case 3:
        return (
          <UniversityInfoForm
            formData={formData}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            accountType={accountType}
            UNIVERSITIES={UNIVERSITIES}
            ROLES={ROLES}
            getFilteredDepartments={getFilteredDepartments}
            departmentSearch={departmentSearch}
            setDepartmentSearch={setDepartmentSearch}
            isDesktop={true}
          />
        );
      case 4:
        return (
    <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Vendor Verification</h2>
            <VendorVerification onVerificationSubmit={handleVerificationSubmit} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        {emailExists && (
          <p className="mt-2 text-center text-sm text-red-600">
            This email address is already registered.
            <br />
            <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Login instead?
            </a>
          </p>
        )}
        {networkError && (
          <div className="mt-2 text-center text-sm text-red-600 p-2 bg-red-50 rounded-md">
            Connection error occurred. Please check your internet and try again.
          </div>
          )}
        </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl md:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {step > 1 && step < 4 && (
            <div className="mt-6">
              <button
                onClick={() => setStep(step - 1)}
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Back
              </button>
            </div>
          )}

          {step < 4 && (
            <div className="mt-6">
            <button
                onClick={step === 3 ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  step === 3 ? 'Complete Registration' : 'Next'
              )}
            </button>
          </div>
          )}
          
          {errors.submit && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default RegisterPage;
