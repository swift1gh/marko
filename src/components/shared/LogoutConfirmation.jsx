import { FiAlertCircle } from "react-icons/fi";
import Modal from "./Modal";

const LogoutConfirmation = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          Confirm Logout
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to log out? You will need to sign in again to access your account.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 border border-gray-300">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirmation; 