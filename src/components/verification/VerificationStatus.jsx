import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiClock, FiShield } from 'react-icons/fi';
import { verificationService } from '../../services/verificationService';

const VerificationStatus = ({ userId }) => {
  const [status, setStatus] = useState('pending');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        setLoading(true);
        const statusData = await verificationService.checkVerificationStatus(userId);
        setStatus(statusData.status);
        
        if (statusData.status !== 'pending') {
          const detailsData = await verificationService.getVerificationDetails(userId);
          setDetails(detailsData);
        }
      } catch (err) {
        setError('Failed to fetch verification status');
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, [userId]);

  const renderStatusIcon = () => {
    switch (status) {
      case 'verified':
        return <FiCheckCircle className="w-12 h-12 text-green-500" />;
      case 'rejected':
        return <FiAlertCircle className="w-12 h-12 text-red-500" />;
      case 'pending':
        return <FiClock className="w-12 h-12 text-yellow-500" />;
      default:
        return <FiShield className="w-12 h-12 text-gray-500" />;
    }
  };

  const renderStatusMessage = () => {
    switch (status) {
      case 'verified':
        return (
          <div className="text-green-700">
            <h3 className="text-lg font-semibold">Verification Approved</h3>
            <p className="text-sm mt-1">
              Your account has been verified. You now have full access to all features.
            </p>
          </div>
        );
      case 'rejected':
        return (
          <div className="text-red-700">
            <h3 className="text-lg font-semibold">Verification Rejected</h3>
            <p className="text-sm mt-1">
              {details?.rejectionReason || 'Your verification was not approved. Please try again with clearer images.'}
            </p>
          </div>
        );
      case 'pending':
        return (
          <div className="text-yellow-700">
            <h3 className="text-lg font-semibold">Verification Pending</h3>
            <p className="text-sm mt-1">
              Your verification is being reviewed. This usually takes 1-2 business days.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-gray-700">
            <h3 className="text-lg font-semibold">Not Verified</h3>
            <p className="text-sm mt-1">
              Please complete the verification process to access all features.
            </p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start space-x-4">
        {renderStatusIcon()}
        <div className="flex-1">
          {renderStatusMessage()}
          {status === 'verified' && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <FiShield className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-green-700">
                  Verified on {new Date(details?.verificationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
          {status === 'rejected' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="mt-4 w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Try Again
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationStatus; 