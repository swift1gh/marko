import { motion } from "framer-motion";
import verificationBadge from "../assets/images/verification_badge.svg";

const VerifiedName = ({
  name,
  isVerified,
  verificationType,
  className = "",
  showUserType = true,
}) => {
  const userType = localStorage.getItem("userType") || "regular";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <span>{name}</span>
        {isVerified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="relative inline-flex items-center justify-center w-6 h-6"
            title={`Verified ${verificationType}`}>
            <img
              src={verificationBadge}
              alt="Verification Badge"
              className="w-full h-full"
            />
          </motion.div>
        )}
      </div>
      {showUserType && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
            userType.toLowerCase() === "vendor"
              ? "bg-purple-100 text-purple-700 border border-purple-200"
              : "bg-blue-100 text-blue-700 border border-blue-200"
          }`}>
          {userType === "vendor" ? "Vendor" : "Regular"}
        </motion.span>
      )}
    </div>
  );
};

export default VerifiedName;
