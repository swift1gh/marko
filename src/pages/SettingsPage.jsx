import { useState } from "react";
import ProfileSection from "../components/forms/ProfileSection";
import VerificationSection from "../components/forms/VerificationSection";
import Toast from "../components/shared/Toast";

const ROLES = [
  { value: "student", label: "Student" },
  { value: "staff", label: "Staff" },
];

const SettingsPage = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [verificationForm, setVerificationForm] = useState({
    role: "",
    idNumber: "",
  });
  const [errors, setErrors] = useState({});

  // Get user data from localStorage
  const userData = {
    firstName: localStorage.getItem("userName")?.split(" ")[0] || "",
    lastName: localStorage.getItem("userName")?.split(" ")[1] || "",
    email: localStorage.getItem("userEmail") || "",
    phone: localStorage.getItem("userPhone") || "",
    address: localStorage.getItem("userAddress") || "",
    university: localStorage.getItem("userUniversity") || "",
    department: localStorage.getItem("userDepartment") || "",
    userType: localStorage.getItem("userType") || "",
    isVerified: localStorage.getItem("isVerified") === "true",
    verificationType: localStorage.getItem("verificationType") || "",
  };

  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setVerificationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateVerificationForm = () => {
    const newErrors = {};
    if (!verificationForm.role) {
      newErrors.role = "Please select your role";
    }
    if (!verificationForm.idNumber.trim()) {
      newErrors.idNumber = "ID number is required";
    }
    return newErrors;
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateVerificationForm();

    if (Object.keys(formErrors).length === 0) {
      setIsVerifying(true);

      try {
        // Simulate API verification delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Store verification data
        localStorage.setItem("isVerified", "true");
        localStorage.setItem("verificationId", verificationForm.idNumber);
        localStorage.setItem("verificationType", verificationForm.role);

        setToastMessage("Account verified successfully!");
        setShowToast(true);

        // Reset form
        setVerificationForm({ role: "", idNumber: "" });

        // Reload page after 2 seconds to update UI
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setToastMessage("Verification failed. Please try again.");
        setShowToast(true);
      } finally {
        setIsVerifying(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <ProfileSection userData={userData} />
        <VerificationSection
          userData={userData}
          verificationForm={verificationForm}
          handleVerificationChange={handleVerificationChange}
          handleVerificationSubmit={handleVerificationSubmit}
          errors={errors}
          isVerifying={isVerifying}
          ROLES={ROLES}
        />
      </div>

      <Toast show={showToast} message={toastMessage} />
    </div>
  );
};

export default SettingsPage;
