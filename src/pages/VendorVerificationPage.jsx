import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCheckCircle } from 'react-icons/fi';
import VendorVerification from '../components/verification/VendorVerification';
import { verificationService } from '../services/verificationService';
import { useAuth } from '../hooks/useAuth';

const VendorVerificationPage = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleVerificationSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await verificationService.uploadVendorVerification(data);
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
          <h1 className="text-3xl font-bold text-gray-900">Vendor Verification</h1>
          <p className="mt-2 text-lg text-gray-600">
            Complete your vendor verification to start selling on our platform
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Build Trust',
              description: 'Verified vendors gain more trust from customers',
              icon: '🤝',
            },
            {
              title: 'Increase Sales',
              description: 'Verified vendors see higher conversion rates',
              icon: '📈',
            },
            {
              title: 'Priority Support',
              description: 'Get dedicated support for your business',
              icon: '⭐',
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

        {/* Verification Form */}
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
            <VendorVerification
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
            <FiCheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-lg font-semibold text-green-800">
              Verification Submitted Successfully
            </h3>
            <p className="mt-2 text-sm text-green-700">
              Your vendor verification documents have been submitted and are being reviewed.
              This process usually takes 2-3 business days. We'll notify you once your
              verification is complete.
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
              Valid business registration or permit
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Government-issued ID of the business owner
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Proof of business address (utility bill or lease agreement)
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Clear photos of your business location
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              All documents must be clear and valid
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              File size must be under 5MB per document
            </li>
          </ul>
        </div>

        {/* Trust & Safety Section */}
        <div className="bg-primary-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">
            Trust & Safety
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-primary-800 mb-2">
                Document Security
              </h3>
              <p className="text-sm text-primary-700">
                All your documents are encrypted and stored securely. We follow strict
                data protection guidelines to ensure your information is safe.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary-800 mb-2">
                Verification Process
              </h3>
              <p className="text-sm text-primary-700">
                Our verification team carefully reviews each application to maintain
                the quality and trustworthiness of our platform.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorVerificationPage; 