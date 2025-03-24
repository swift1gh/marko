import FormInput from "../shared/FormInput";
import { FiUser, FiMail, FiPhone, FiMapPin, FiBookOpen } from "react-icons/fi";

const ProfileSection = ({ userData }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Profile Settings
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          label="First Name"
          value={userData.firstName}
          disabled
          icon={FiUser}
        />

        <FormInput
          label="Last Name"
          value={userData.lastName}
          disabled
          icon={FiUser}
        />

        <div className="sm:col-span-2">
          <FormInput
            label="Email"
            type="email"
            value={userData.email}
            disabled
            icon={FiMail}
          />
        </div>

        <FormInput
          label="Phone Number"
          type="tel"
          value={userData.phone}
          disabled
          icon={FiPhone}
        />

        <FormInput
          label="Address"
          value={userData.address}
          disabled
          icon={FiMapPin}
        />

        <FormInput
          label="University"
          value={userData.university}
          disabled
          icon={FiBookOpen}
        />

        <FormInput
          label="Department"
          value={userData.department}
          disabled
          icon={FiBookOpen}
        />
      </div>
    </div>
  );
};

export default ProfileSection; 