import { useState } from "react";
import { motion } from "framer-motion";
import { FiUpload, FiCamera, FiX, FiCheck, FiInfo } from "react-icons/fi";

const VerificationUploader = ({ onVerificationSubmit }) => {
  const [files, setFiles] = useState({
    idCard: null,
    selfie: null,
  });
  const [previews, setPreviews] = useState({
    idCard: null,
    selfie: null,
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: ID, 2: Selfie, 3: Review
  const [error, setError] = useState(null);

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews(prev => ({ ...prev, [type]: reader.result }));
    };
    reader.readAsDataURL(file);

    setFiles(prev => ({ ...prev, [type]: file }));
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Here you would typically upload the files to your server
      // and process the verification
      await onVerificationSubmit(files);
    } catch (err) {
      setError('Verification submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please upload a clear photo of your student/staff ID card. Make sure all details are visible.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        {previews.idCard ? (
          <div className="relative">
            <img
              src={previews.idCard}
              alt="ID Card Preview"
              className="max-h-48 mx-auto rounded-lg"
            />
            <button
              onClick={() => {
                setFiles(prev => ({ ...prev, idCard: null }));
                setPreviews(prev => ({ ...prev, idCard: null }));
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('idCard', e)}
              className="hidden"
            />
            <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Upload ID Card
            </span>
          </label>
        )}
      </div>

      {previews.idCard && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Next: Take Selfie
        </motion.button>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please take a clear selfie of yourself in good lighting. This will be compared with your ID photo.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
        {previews.selfie ? (
          <div className="relative">
            <img
              src={previews.selfie}
              alt="Selfie Preview"
              className="max-h-48 mx-auto rounded-lg"
            />
            <button
              onClick={() => {
                setFiles(prev => ({ ...prev, selfie: null }));
                setPreviews(prev => ({ ...prev, selfie: null }));
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={(e) => handleFileChange('selfie', e)}
              className="hidden"
            />
            <FiCamera className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Take Selfie
            </span>
          </label>
        )}
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(1)}
          className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Back
        </motion.button>
        {previews.selfie && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep(3)}
            className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Next: Review
          </motion.button>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please review your uploaded images. Make sure both images are clear and match your identity.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-xl p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">ID Card</h4>
          <img
            src={previews.idCard}
            alt="ID Card Preview"
            className="w-full rounded-lg"
          />
        </div>
        <div className="border rounded-xl p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Selfie</h4>
          <img
            src={previews.selfie}
            alt="Selfie Preview"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 flex items-center justify-center">
          {loading ? (
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
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit for Verification'
          )}
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div
            key={stepNumber}
            className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= stepNumber
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
              {step > stepNumber ? (
                <FiCheck className="w-5 h-5" />
              ) : (
                stepNumber
              )}
            </div>
            {stepNumber < 3 && (
              <div
                className={`w-full h-1 mx-2 ${
                  step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-4">
          {error}
        </div>
      )}

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default VerificationUploader; 