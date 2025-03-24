import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import FormInput from "../shared/FormInput";

const PersonalInfoForm = ({
  formData,
  handleChange,
  handleBlur,
  errors,
  touched,
  showPassword = false,
  setShowPassword = () => {},
  showConfirmPassword = false,
  setShowConfirmPassword = () => {},
  loading = false,
}) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
  const allFieldsFilled = requiredFields.every(field => formData[field]?.trim?.());
  
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-center mt-3">Processing...</p>
          </div>
        </div>
      )}

      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
        <p className="font-medium">All fields marked with <span className="text-red-500 font-medium">*</span> are required to create your account.</p>
      </div>

      {!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-medium"><span className="font-bold">Note:</span> Please fill in all required fields to continue to the next step.</p>
        </div>
      ) : null}

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Please correct the following errors:</p>
          <ul className="list-disc ml-5">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex items-center">
            <FiInfo className="h-5 w-5 text-blue-400 mr-2" />
            <div>
              <p className="text-sm text-blue-700">
                <span className="font-medium">All fields are required</span> to create your account.
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Fields marked with <span className="text-red-500">*</span> must be filled before proceeding.
              </p>
            </div>
          </div>
        </div>
        
        {!allFieldsFilled && Object.keys(touched).length > 0 && (
          <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <div className="flex items-center">
              <FiInfo className="h-5 w-5 text-yellow-400 mr-2" />
              <p className="text-sm text-yellow-700">Please complete all required fields before continuing.</p>
            </div>
          </div>
        )}
        
        {!allFieldsFilled && touched.all && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center">
              <FiInfo className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">All fields must be filled before proceeding to the next step.</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            icon={FiUser}
            required
            error={touched.firstName && errors.firstName ? errors.firstName : null}
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            icon={FiUser}
            required
            error={touched.lastName && errors.lastName ? errors.lastName : null}
          />

          <div className="sm:col-span-2">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              icon={FiMail}
              required
              placeholder="your@email.com"
              error={touched.email && errors.email ? errors.email : null}
            />
          </div>

          <div className="sm:col-span-2">
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                    touched.password && errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none">
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long</p>
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full pl-10 pr-10 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
                      ? "border-green-300 focus:border-green-500 focus:ring-green-500"
                      : ""
                  }`}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none">
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
              {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="mt-1 text-sm text-green-600">
                  Passwords match
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm; 