import { FiInfo, FiCheckCircle, FiCheck } from "react-icons/fi";
import FormInput from "../shared/FormInput";
import CustomDropdown from "../CustomDropdown";

const VerificationSection = ({
  userData,
  verificationForm,
  handleVerificationChange,
  handleVerificationSubmit,
  errors,
  isVerifying,
  ROLES,
}) => {
  if (userData.isVerified) {
    return (
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
                Your account is verified as a {userData.verificationType}. You
                have access to all features and exclusive deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userData.userType === "buyer" && !userData.isVerified) {
    return (
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
                features. Please provide your student or staff ID to complete
                verification.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <CustomDropdown
              name="role"
              label="Role"
              options={ROLES}
              value={verificationForm.role}
              onChange={handleVerificationChange}
              placeholder="Select Role"
              error={errors.role}
            />

            <FormInput
              label={`${
                verificationForm.role === "staff" ? "Staff ID" : "Student ID"
              } Number`}
              name="idNumber"
              value={verificationForm.idNumber}
              onChange={handleVerificationChange}
              error={errors.idNumber}
            />
          </div>

          <div className="flex justify-end">
            <button
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
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
};

export default VerificationSection; 