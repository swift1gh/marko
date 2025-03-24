import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const Toast = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50">
          <FiCheckCircle className="h-5 w-5 text-green-500" />
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 