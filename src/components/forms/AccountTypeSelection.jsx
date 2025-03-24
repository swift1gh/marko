import { motion } from "framer-motion";
import { FaUser, FaStore, FaExclamationCircle } from "react-icons/fa";

const AccountTypeSelection = ({ accountType, setAccountType, errors }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Choose an account type <span className="text-red-500 font-medium">*</span>
      </h2>
      
      {!accountType && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-medium">Please select an account type to continue to the next step.</p>
        </div>
      )}
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={accountType === "student" ? { scale: 0.98 } : {}}
          onClick={() => setAccountType("student")}
          className={`flex flex-col items-center justify-center p-6 border rounded-xl shadow-sm cursor-pointer transition-colors ${
            accountType === "student"
              ? "border-primary-500 bg-primary-50"
              : errors && errors.accountType 
                ? "border-red-300 hover:border-primary-300 hover:bg-primary-50/30" 
                : "border-gray-300 hover:border-primary-300 hover:bg-primary-50/30"
          }`}
          role="button"
          aria-pressed={accountType === "student"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setAccountType("student");
            }
          }}
        >
          <FaUser className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Student / Staff</h3>
          <p className="mt-1 text-sm text-gray-500 text-center">
            Browse and buy products from campus vendors
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={accountType === "vendor" ? { scale: 0.98 } : {}}
          onClick={() => setAccountType("vendor")}
          className={`flex flex-col items-center justify-center p-6 border rounded-xl shadow-sm cursor-pointer transition-colors ${
            accountType === "vendor"
              ? "border-primary-500 bg-primary-50"
              : errors && errors.accountType 
                ? "border-red-300 hover:border-primary-300 hover:bg-primary-50/30" 
                : "border-gray-300 hover:border-primary-300 hover:bg-primary-50/30"
          }`}
          role="button"
          aria-pressed={accountType === "vendor"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setAccountType("vendor");
            }
          }}
        >
          <FaStore className="w-12 h-12 text-primary-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Vendor</h3>
          <p className="mt-1 text-sm text-gray-500 text-center">
            Sell your products to students and staff
          </p>
        </motion.div>
      </div>
      
      {errors && errors.accountType && (
        <div className="flex items-center mt-2 text-red-600">
          <FaExclamationCircle className="w-5 h-5 mr-2" />
          <p className="text-sm">{errors.accountType}</p>
        </div>
      )}
      
      <div className="mt-4 p-4 rounded-lg bg-blue-50">
        <p className="text-sm text-blue-700">
          {accountType ? (
            <>
              <strong>
                {accountType === "student" ? "Student/Staff Account: " : "Vendor Account: "}
              </strong>
              {accountType === "student" 
                ? "Access campus marketplace, save favorite items, and track your purchases." 
                : "Sell products to the university community. Requires verification of university affiliation."}
            </>
          ) : (
            <>
              <strong className="text-blue-800">Selection Required: </strong>
              Please select an account type to continue.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AccountTypeSelection; 