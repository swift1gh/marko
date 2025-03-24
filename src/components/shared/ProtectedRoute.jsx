import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiShield, FiAlertCircle } from 'react-icons/fi';

const ProtectedRoute = ({ children, requireVerification = false, requireVendorVerification = false }) => {
  const { user, loading, isVerified, isVendorVerified } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireVerification && !isVerified) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <FiShield className="mx-auto h-16 w-16 text-yellow-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Verification Required
          </h2>
          <p className="mt-2 text-gray-600">
            This section requires a verified student or staff account.
          </p>
          <div className="mt-8 bg-yellow-50 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Please verify your account
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    To access this section, you need to verify your student or staff
                    status. This helps us ensure a safe and trusted environment for
                    our community.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <button
                      onClick={() => window.location.href = '/verification'}
                      className="bg-yellow-100 px-4 py-2 rounded-lg text-sm font-medium text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                      Verify Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (requireVendorVerification && !isVendorVerified) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <FiShield className="mx-auto h-16 w-16 text-yellow-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Vendor Verification Required
          </h2>
          <p className="mt-2 text-gray-600">
            This section requires a verified vendor account.
          </p>
          <div className="mt-8 bg-yellow-50 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Please verify your vendor account
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    To access this section, you need to complete the vendor verification
                    process. This helps ensure a safe and trusted marketplace for our
                    community.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <button
                      onClick={() => window.location.href = '/vendor/verification'}
                      className="bg-yellow-100 px-4 py-2 rounded-lg text-sm font-medium text-yellow-800 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                      Complete Vendor Verification
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 