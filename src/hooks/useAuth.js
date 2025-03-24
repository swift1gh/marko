import { useState, useEffect, createContext, useContext } from 'react';
import { verificationService } from '../services/verificationService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [vendorVerificationStatus, setVendorVerificationStatus] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Here you would typically check your authentication token
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Fetch user data
          const userData = await fetchUserData(token);
          setUser(userData);

          // Check verification status
          if (userData.id) {
            const status = await verificationService.checkVerificationStatus(userData.id);
            setVerificationStatus(status);

            // Check vendor verification status if user is a vendor
            if (userData.role === 'vendor') {
              const vendorStatus = await verificationService.checkVendorVerificationStatus(userData.id);
              setVendorVerificationStatus(vendorStatus);
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // Here you would typically make an API call to login
      const response = await loginUser(credentials);
      const { token, user: userData } = response;

      // Store token
      localStorage.setItem('auth_token', token);
      
      // Set user data
      setUser(userData);

      // Check verification status
      if (userData.id) {
        const status = await verificationService.checkVerificationStatus(userData.id);
        setVerificationStatus(status);

        // Check vendor verification status if user is a vendor
        if (userData.role === 'vendor') {
          const vendorStatus = await verificationService.checkVendorVerificationStatus(userData.id);
          setVendorVerificationStatus(vendorStatus);
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setVerificationStatus(null);
    setVendorVerificationStatus(null);
  };

  const updateVerificationStatus = async () => {
    if (user?.id) {
      try {
        const status = await verificationService.checkVerificationStatus(user.id);
        setVerificationStatus(status);
        return status;
      } catch (error) {
        console.error('Failed to update verification status:', error);
        return null;
      }
    }
  };

  const updateVendorVerificationStatus = async () => {
    if (user?.id && user?.role === 'vendor') {
      try {
        const status = await verificationService.checkVendorVerificationStatus(user.id);
        setVendorVerificationStatus(status);
        return status;
      } catch (error) {
        console.error('Failed to update vendor verification status:', error);
        return null;
      }
    }
  };

  const value = {
    user,
    loading,
    verificationStatus,
    vendorVerificationStatus,
    login,
    logout,
    updateVerificationStatus,
    updateVendorVerificationStatus,
    isVerified: verificationStatus?.status === 'verified',
    isVendorVerified: vendorVerificationStatus?.status === 'verified',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper functions (these would typically be in your API service)
const fetchUserData = async (token) => {
  // Make API call to fetch user data
  return {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'vendor'
  };
};

const loginUser = async (credentials) => {
  // Make API call to login
  return {
    token: 'sample_token',
    user: {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'vendor'
    }
  };
}; 