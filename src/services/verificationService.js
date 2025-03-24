import axios from 'axios';

class VerificationService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Upload verification documents
  async uploadVerificationDocuments(files) {
    const formData = new FormData();
    formData.append('idCard', files.idCard);
    formData.append('selfie', files.selfie);

    try {
      const response = await this.api.post('/verification/upload', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload verification documents');
    }
  }

  // Upload vendor verification documents
  async uploadVendorVerification(data) {
    const formData = new FormData();
    
    // Add business details
    Object.keys(data).forEach(key => {
      if (key !== 'documents') {
        formData.append(key, data[key]);
      }
    });

    // Add documents
    Object.keys(data.documents).forEach(docType => {
      formData.append(docType, data.documents[docType]);
    });

    try {
      const response = await this.api.post('/verification/vendor/upload', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload vendor verification documents');
    }
  }

  // Check verification status
  async checkVerificationStatus(userId) {
    try {
      const response = await this.api.get(`/verification/status/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to check verification status');
    }
  }

  // Check vendor verification status
  async checkVendorVerificationStatus(userId) {
    try {
      const response = await this.api.get(`/verification/vendor/status/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to check vendor verification status');
    }
  }

  // Get verification details
  async getVerificationDetails(userId) {
    try {
      const response = await this.api.get(`/verification/details/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get verification details');
    }
  }

  // Get vendor verification details
  async getVendorVerificationDetails(userId) {
    try {
      const response = await this.api.get(`/verification/vendor/details/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get vendor verification details');
    }
  }
}

export const verificationService = new VerificationService(); 