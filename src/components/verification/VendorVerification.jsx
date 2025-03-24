import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiCamera, FiX, FiCheck, FiInfo, FiShield, FiLoader } from 'react-icons/fi';
import VerificationUploader from './VerificationUploader';

const VendorVerification = ({ onVerificationSubmit }) => {
  const [step, setStep] = useState(1);
  const [vendorDetails, setVendorDetails] = useState({
    businessName: '',
    businessType: '',
    contactNumber: '',
    location: '',
    description: '',
    taxId: '',
    foundedYear: '',
  });
  const [documents, setDocuments] = useState({
    businessRegistration: null,
    validId: null,
    proofOfAddress: null,
    taxCertificate: null,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [serverValidationFailed, setServerValidationFailed] = useState(false);
  const [documentErrors, setDocumentErrors] = useState({});

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleDocumentUpload = (type, file) => {
    if (!file) return;

    // Validate file type - be more specific about accepted formats
    const validImageTypes = ['image/jpeg', 'image/png'];
    const validDocTypes = ['application/pdf'];
    
    if (!validImageTypes.includes(file.type) && !validDocTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [type]: 'Only JPEG, PNG or PDF files are accepted'
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [type]: 'File size should be less than 5MB'
      }));
      return;
    }
    
    // Validate filename for security
    if (/[<>:"/\\|?*]/.test(file.name)) {
      setErrors(prev => ({
        ...prev,
        [type]: 'Filename contains invalid characters'
      }));
      return;
    }
    
    // Clear any previous document errors
    if (documentErrors[type]) {
      setDocumentErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }
    
    // Clear error when valid document is uploaded
    if (errors[type]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[type];
        return newErrors;
      });
    }
    
    // Simulate upload with progress
    setUploadProgress(prev => ({
      ...prev,
      [type]: 0
    }));
    
    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 100) progress = 100;
        
        setUploadProgress(prev => ({
          ...prev,
          [type]: progress
        }));
        
        if (progress === 100) {
          clearInterval(interval);
          
          // Simulate server validation after upload (10% chance of failure for demo)
          if (Math.random() < 0.1) {
            setTimeout(() => {
              setDocumentErrors(prev => ({
                ...prev,
                [type]: type === 'validId' 
                  ? 'ID appears to be expired or unclear' 
                  : 'Document could not be validated. Please upload a clearer copy.'
              }));
            }, 500);
          }
        }
      }, 200);
    };
    
    simulateUpload();
    
    setDocuments(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Mark all business fields as touched
      setTouched({
        businessName: true,
        businessType: true,
        taxId: true,
        foundedYear: true,
        contactNumber: true,
        location: true,
        description: true
      });
      
      // Validate and proceed if valid
      if (validateBusinessDetails()) {
        // Scroll to top before changing step
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(2);
      } else {
        // Scroll to the first error
        setTimeout(() => {
          const firstError = document.querySelector('.border-red-500');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    } else if (step === 2) {
      if (validateDocuments()) {
        // Scroll to top before changing step
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep(3);
      } else {
        // Highlight the first missing document
        const missingDocs = Object.keys(errors).filter(key => key !== 'general');
        if (missingDocs.length > 0) {
          setTimeout(() => {
            const firstErrorDoc = document.querySelector(`[class*="border-red-300"]`);
            if (firstErrorDoc) {
              firstErrorDoc.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Simulate server validation (20% chance of failure for demo)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (Math.random() < 0.2) {
        // Simulate specific server validation error
        const errorType = Math.random() < 0.5 ? 'businessName' : 'taxId';
        
        if (errorType === 'businessName') {
          throw new Error('Business name could not be verified with government records.');
        } else {
          throw new Error('Tax ID does not match our records. Please check and try again.');
        }
      }
      
      // 10% chance of network error
      if (Math.random() < 0.1) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      await onVerificationSubmit({
        ...vendorDetails,
        documents
      });
      
      setSuccess(true);
      
      // Simulate automated email notification
      console.log('Vendor verification submitted successfully. Confirmation email sent to registered email.');
    } catch (err) {
      console.error('Verification error:', err);
      
      if (err.message.includes('Business name')) {
        setServerValidationFailed(true);
        setErrors({ 
          submit: err.message,
          businessName: 'Business name verification failed'
        });
      } else if (err.message.includes('Tax ID')) {
        setServerValidationFailed(true);
        setErrors({ 
          submit: err.message,
          taxId: 'Tax ID verification failed'
        });
      } else {
        setErrors({ 
          submit: err.message || 'Verification submission failed. Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validateBusinessDetails = () => {
    const newErrors = {};
    const allFieldsFilled = Object.keys(vendorDetails).every(key => {
      // Check if the field is filled
      const hasValue = typeof vendorDetails[key] === 'string' 
        ? vendorDetails[key].trim().length > 0 
        : !!vendorDetails[key];
      
      // If not filled, add to errors
      if (!hasValue) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
      
      return hasValue;
    });
    
    // Only proceed with additional validation if all fields are filled
    if (allFieldsFilled) {
      // Business name validation
      if (vendorDetails.businessName.trim().length < 3) {
        newErrors.businessName = 'Business name is too short';
      } else if (/restricted|banned/i.test(vendorDetails.businessName)) {
        newErrors.businessName = 'This business name contains restricted words';
      }
      
      // Contact number validation
      if (!/^\+?[0-9]{10,15}$/.test(vendorDetails.contactNumber.replace(/\s+/g, ''))) {
        newErrors.contactNumber = 'Enter a valid contact number';
      } else if (vendorDetails.contactNumber.includes("123456789")) {
        newErrors.contactNumber = 'This appears to be a fake number';
      }
      
      // Location validation
      if (vendorDetails.location.trim().length < 10) {
        newErrors.location = 'Please provide a complete address';
      }
      
      // Description validation
      if (vendorDetails.description.trim().length < 20) {
        newErrors.description = 'Description should be at least 20 characters';
      } else if (vendorDetails.description.trim().length > 500) {
        newErrors.description = 'Description should be less than 500 characters';
      }
      
      // Tax ID validation
      if (!/^[A-Z0-9]{8,12}$/i.test(vendorDetails.taxId.trim())) {
        newErrors.taxId = 'Tax ID must be 8-12 alphanumeric characters';
      }
      
      // Founded year validation
      const year = parseInt(vendorDetails.foundedYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        newErrors.foundedYear = `Please enter a valid year between 1900 and ${currentYear}`;
      }
    }
    
    // Update errors state
    setErrors(newErrors);
    
    // Update touched state to show all errors
    setTouched({
      businessName: true,
      businessType: true,
      contactNumber: true,
      location: true,
      description: true,
      taxId: true,
      foundedYear: true
    });
    
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const validateDocuments = () => {
    const newErrors = {};
    
    if (!documents.businessRegistration) {
      newErrors.businessRegistration = 'Business registration document is required';
    } else if (documentErrors.businessRegistration) {
      newErrors.businessRegistration = documentErrors.businessRegistration;
    } else if (uploadProgress.businessRegistration < 100) {
      newErrors.businessRegistration = 'Upload in progress. Please wait...';
    }
    
    if (!documents.validId) {
      newErrors.validId = 'Valid ID is required';
    } else if (documentErrors.validId) {
      newErrors.validId = documentErrors.validId;
    } else if (uploadProgress.validId < 100) {
      newErrors.validId = 'Upload in progress. Please wait...';
    }
    
    if (!documents.proofOfAddress) {
      newErrors.proofOfAddress = 'Proof of address is required';
    } else if (documentErrors.proofOfAddress) {
      newErrors.proofOfAddress = documentErrors.proofOfAddress;
    } else if (uploadProgress.proofOfAddress < 100) {
      newErrors.proofOfAddress = 'Upload in progress. Please wait...';
    }
    
    // Tax certificate is only required for retail and food businesses
    if ((vendorDetails.businessType === 'retail' || vendorDetails.businessType === 'food') && !documents.taxCertificate) {
      newErrors.taxCertificate = 'Tax certificate is required for your business type';
    } else if (documents.taxCertificate && documentErrors.taxCertificate) {
      newErrors.taxCertificate = documentErrors.taxCertificate;
    } else if (documents.taxCertificate && uploadProgress.taxCertificate < 100) {
      newErrors.taxCertificate = 'Upload in progress. Please wait...';
    }
    
    // Check if any document failed validation
    const hasFailedDocuments = Object.keys(documentErrors).length > 0;
    if (hasFailedDocuments) {
      newErrors.general = 'One or more documents could not be validated. Please review and upload again.';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const renderBusinessDetails = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please provide accurate business information. This helps build trust with your customers and expedites the verification process. All fields are required.
            </p>
          </div>
        </div>
      </div>

      {serverValidationFailed && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiInfo className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                We couldn't verify some of your business information. Please double-check your entries.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={vendorDetails.businessName}
            onChange={handleDetailsChange}
            onBlur={handleBlur}
            placeholder="Enter your business name as registered"
            className={`mt-1 block w-full rounded-md border ${
              touched.businessName && errors.businessName ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
            required
          />
          {touched.businessName && errors.businessName && (
            <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Business Type</label>
          <select
            name="businessType"
            value={vendorDetails.businessType}
            onChange={handleDetailsChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md border ${
              touched.businessType && errors.businessType ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
            required
          >
            <option value="">Select a business type</option>
            <option value="retail">Retail Store</option>
            <option value="service">Service Provider</option>
            <option value="food">Food & Beverages</option>
            <option value="technology">Technology</option>
            <option value="education">Educational Services</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
          {touched.businessType && errors.businessType && (
            <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tax ID / Business Registration Number</label>
            <input
              type="text"
              name="taxId"
              value={vendorDetails.taxId}
              onChange={handleDetailsChange}
              onBlur={handleBlur}
              placeholder="e.g., AB12345678"
              className={`mt-1 block w-full rounded-md border ${
                touched.taxId && errors.taxId ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
              required
            />
            {touched.taxId && errors.taxId && (
              <p className="mt-1 text-sm text-red-600">{errors.taxId}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Year Founded</label>
            <input
              type="number"
              name="foundedYear"
              value={vendorDetails.foundedYear}
              onChange={handleDetailsChange}
              onBlur={handleBlur}
              placeholder="e.g., 2020"
              min="1900"
              max={new Date().getFullYear()}
              className={`mt-1 block w-full rounded-md border ${
                touched.foundedYear && errors.foundedYear ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
              required
            />
            {touched.foundedYear && errors.foundedYear && (
              <p className="mt-1 text-sm text-red-600">{errors.foundedYear}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={vendorDetails.contactNumber}
            onChange={handleDetailsChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md border ${
              touched.contactNumber && errors.contactNumber ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
            required
          />
          {touched.contactNumber && errors.contactNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Business Location</label>
          <input
            type="text"
            name="location"
            value={vendorDetails.location}
            onChange={handleDetailsChange}
            onBlur={handleBlur}
            className={`mt-1 block w-full rounded-md border ${
              touched.location && errors.location ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
            required
          />
          {touched.location && errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Business Description</label>
          <textarea
            name="description"
            value={vendorDetails.description}
            onChange={handleDetailsChange}
            onBlur={handleBlur}
            rows={4}
            className={`mt-1 block w-full rounded-md border ${
              touched.description && errors.description ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-primary-500 focus:ring-primary-500`}
            required
          />
          {touched.description && errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNextStep}
        className="w-full py-3 px-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Next: Upload Documents
      </motion.button>
    </div>
  );

  const renderDocumentUpload = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please upload the required documents to verify your business. All documents must be clear, valid, and under 5MB. Accepted formats: JPEG, PNG, PDF.
            </p>
          </div>
        </div>
      </div>
      
      {documentErrors.general && (
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiInfo className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {documentErrors.general}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {[
          {
            type: 'businessRegistration',
            title: 'Business Registration',
            description: 'Upload your business registration certificate or permit',
            required: true
          },
          {
            type: 'validId',
            title: 'Valid ID',
            description: 'Government-issued ID of the business owner',
            required: true
          },
          {
            type: 'proofOfAddress',
            title: 'Proof of Address',
            description: 'Recent utility bill or lease agreement (not older than 3 months)',
            required: true
          },
          {
            type: 'taxCertificate',
            title: 'Tax Certificate',
            description: 'Tax compliance certificate (if applicable)',
            required: vendorDetails.businessType === 'retail' || vendorDetails.businessType === 'food'
          }
        ].map((doc) => (
          <div key={doc.type} className={`border rounded-xl p-4 ${errors[doc.type] || documentErrors[doc.type] ? 'border-red-300 bg-red-50' : ''}`}>
            <div className="flex justify-between">
              <h4 className="text-sm font-medium text-gray-900">{doc.title} {doc.required && <span className="text-red-500">*</span>}</h4>
              {documentErrors[doc.type] && (
                <span className="text-xs text-red-600 font-medium">Document validation failed</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
            <div className="mt-3 flex items-center">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FiUpload className="mr-2 h-5 w-5 text-gray-400" />
                Upload Document
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={(e) => handleDocumentUpload(doc.type, e.target.files[0])}
                />
              </label>
              {uploadProgress[doc.type] && uploadProgress[doc.type] < 100 && (
                <div className="ml-3 w-24">
                  <div className="bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress[doc.type]}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{uploadProgress[doc.type]}% uploaded</span>
                </div>
              )}
              {documents[doc.type] && uploadProgress[doc.type] === 100 && (
                <span className="ml-3 text-sm text-green-600 flex items-center">
                  <FiCheck className="mr-1 h-5 w-5" />
                  {documents[doc.type].name.length > 20 
                    ? documents[doc.type].name.substring(0, 17) + '...' 
                    : documents[doc.type].name}
                </span>
              )}
            </div>
            {(errors[doc.type] || documentErrors[doc.type]) && (
              <p className="mt-1 text-sm text-red-600">{errors[doc.type] || documentErrors[doc.type]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(1)}
          className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNextStep}
          className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
        >
          Next: Review & Submit
        </motion.button>
      </div>
    </div>
  );

  const renderReviewAndSubmit = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiInfo className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Please review your information before submitting. Once submitted, you will be notified via email when your verification is complete. This process typically takes 1-2 business days.
            </p>
          </div>
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiX className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{errors.submit}</p>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-xl p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div className={errors.businessName ? "bg-red-50 p-2 rounded-md" : ""}>
            <dt className="text-sm font-medium text-gray-500">Business Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{vendorDetails.businessName}</dd>
            {errors.businessName && (
              <dd className="mt-1 text-xs text-red-600">{errors.businessName}</dd>
            )}
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Business Type</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {vendorDetails.businessType === 'retail' && 'Retail Store'}
              {vendorDetails.businessType === 'service' && 'Service Provider'}
              {vendorDetails.businessType === 'food' && 'Food & Beverages'}
              {vendorDetails.businessType === 'technology' && 'Technology'}
              {vendorDetails.businessType === 'education' && 'Educational Services'}
              {vendorDetails.businessType === 'entertainment' && 'Entertainment'}
              {vendorDetails.businessType === 'other' && 'Other'}
            </dd>
          </div>
          <div className={errors.taxId ? "bg-red-50 p-2 rounded-md" : ""}>
            <dt className="text-sm font-medium text-gray-500">Tax ID / Registration Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{vendorDetails.taxId}</dd>
            {errors.taxId && (
              <dd className="mt-1 text-xs text-red-600">{errors.taxId}</dd>
            )}
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Year Founded</dt>
            <dd className="mt-1 text-sm text-gray-900">{vendorDetails.foundedYear}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
            <dd className="mt-1 text-sm text-gray-900">{vendorDetails.contactNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Business Location</dt>
            <dd className="mt-1 text-sm text-gray-900">{vendorDetails.location}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Business Description</dt>
            <dd className="mt-1 text-sm text-gray-900">{vendorDetails.description}</dd>
          </div>
        </dl>
      </div>

      <div className="border rounded-xl p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Documents</h3>
        <ul className="space-y-3">
          {Object.entries(documents)
            .filter(([_, file]) => file !== null)
            .map(([key, file]) => (
              <li key={key} className={`flex items-start text-sm ${documentErrors[key] ? 'bg-red-50 p-2 rounded-md' : ''}`}>
                {documentErrors[key] ? (
                  <FiX className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                ) : (
                  <FiCheck className="mr-2 h-5 w-5 text-green-500 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center">
                    <span className="text-gray-900 font-medium">
                      {key === 'businessRegistration' && 'Business Registration'}
                      {key === 'validId' && 'Valid ID'}
                      {key === 'proofOfAddress' && 'Proof of Address'}
                      {key === 'taxCertificate' && 'Tax Certificate'}
                    </span>
                    <span className={`ml-2 text-xs ${documentErrors[key] ? 'text-red-500' : 'text-gray-500'}`}>
                      {file.name}
                    </span>
                  </div>
                  {documentErrors[key] && (
                    <p className="text-xs text-red-600 mt-1">{documentErrors[key]}</p>
                  )}
                </div>
              </li>
          ))}
        </ul>
        {Object.keys(documents).filter(key => documents[key] !== null).length === 0 && (
          <p className="text-sm text-gray-500 italic">No documents uploaded yet.</p>
        )}
      </div>

      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiShield className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-yellow-800">Verification Notice</h4>
            <p className="mt-1 text-sm text-yellow-700">
              By submitting this application, you certify that all information provided is accurate and complete. 
              Providing false information may result in rejection and possible account restrictions.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
          disabled={loading}
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 flex items-center justify-center"
          disabled={loading || success}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin mr-2 h-5 w-5" />
              Processing...
            </>
          ) : success ? (
            <>
              <FiCheck className="mr-2 h-5 w-5" />
              Submitted
            </>
          ) : (
            'Submit Verification'
          )}
        </motion.button>
      </div>

      {success && (
        <div className="mt-4 bg-green-50 border border-green-300 rounded-xl p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheck className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Your vendor verification has been submitted successfully! We will review your information and notify you when the verification is complete.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center h-9 w-9 rounded-full ${step >= 1 ? 'bg-primary-600' : 'bg-gray-300'}`}>
              <span className="text-white text-sm font-semibold">1</span>
            </div>
            <div className={`ml-3 ${step === 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Business Details</div>
          </div>
          <div className={`flex-1 border-t border-2 mx-4 ${step >= 2 ? 'border-primary-600' : 'border-gray-300'}`}></div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center h-9 w-9 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}>
              <span className="text-white text-sm font-semibold">2</span>
            </div>
            <div className={`ml-3 ${step === 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Documents</div>
          </div>
          <div className={`flex-1 border-t border-2 mx-4 ${step >= 3 ? 'border-primary-600' : 'border-gray-300'}`}></div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center h-9 w-9 rounded-full ${step >= 3 ? 'bg-primary-600' : 'bg-gray-300'}`}>
              <span className="text-white text-sm font-semibold">3</span>
            </div>
            <div className={`ml-3 ${step === 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>Submit</div>
          </div>
        </div>
      </div>

      {step === 1 && renderBusinessDetails()}
      {step === 2 && renderDocumentUpload()}
      {step === 3 && renderReviewAndSubmit()}
    </div>
  );
};

export default VendorVerification; 