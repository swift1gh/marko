import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield } from 'react-icons/fi';
import VerificationUploader from '../components/verification/VerificationUploader';
import VerificationStatus from '../components/verification/VerificationStatus';
import { verificationService } from '../services/verificationService';
import { useAuth } from '../hooks/useAuth';

const VerificationPage = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleVerificationSubmit = async (files) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await verificationService.uploadVerificationDocuments(files);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <FiShield className="w-16 h-16 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Account Verification</h1>
          <p className="mt-2 text-lg text-gray-600">
            Verify your student or staff status to access exclusive features and deals
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Student Discounts',
              description: 'Get exclusive discounts on products and services',
              icon: '🎓',
            },
            {
              title: 'Priority Support',
              description: 'Access dedicated support for verified members',
              icon: '⭐',
            },
            {
              title: 'Special Features',
              description: 'Unlock additional features and capabilities',
              icon: '🎯',
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Verification Status
          </h2>
          <VerificationStatus userId={user?.id} />
        </div>

        {/* Upload Section */}
        {!success && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Submit Verification
            </h2>
            {error && (
              <div className="mb-4 bg-red-50 text-red-700 p-4 rounded-xl">
                {error}
              </div>
            )}
            <VerificationUploader
              onVerificationSubmit={handleVerificationSubmit}
            />
          </div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 rounded-xl p-6 text-center">
            <FiShield className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-lg font-semibold text-green-800">
              Verification Submitted Successfully
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Your verification documents have been submitted and are being reviewed.
              This process usually takes 1-2 business days.
            </p>
          </motion.div>
        )}

        {/* Requirements Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Verification Requirements
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Valid student or staff ID card from KNUST
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Clear, recent selfie photo
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Both photos must be clear and well-lit
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              File size must be under 5MB per image
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationPage; 