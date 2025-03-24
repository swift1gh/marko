import { FiPhone, FiMapPin, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import FormInput from "../shared/FormInput";
import CustomDropdown from "../CustomDropdown";

const UniversityInfoForm = ({
  formData,
  handleChange,
  handleBlur,
  errors,
  touched,
  accountType,
  UNIVERSITIES,
  ROLES,
  getFilteredDepartments,
  departmentSearch,
  setDepartmentSearch,
  isDesktop,
}) => {
  const isPrivateUniversity = formData.university === "private_uni";
  const isInternationalStudent = formData.role === "international";
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        University Information
      </h2>
      {errors.connectivity && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{errors.connectivity}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <CustomDropdown
            name="university"
            label="University/Institution"
            options={UNIVERSITIES.map((uni) => ({
              value: uni.value,
              label: isDesktop ? uni.label : uni.shortLabel,
            }))}
            value={formData.university}
            onChange={handleChange}
            onBlur={() => handleBlur({ target: { name: 'university' } })}
            placeholder="Select University"
            error={touched.university && errors.university ? errors.university : null}
          />
        </div>

        {accountType === "vendor" && (
          <>
            <CustomDropdown
              name="role"
              label="Role"
              options={ROLES}
              value={formData.role}
              onChange={handleChange}
              onBlur={() => handleBlur({ target: { name: 'role' } })}
              placeholder="Select Role"
              error={touched.role && errors.role ? errors.role : null}
            />

            <FormInput
              label={`${formData.role === "staff" ? "Staff ID" : formData.role === "international" ? "International Student ID" : "Student ID"} Number`}
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.idNumber && errors.idNumber ? errors.idNumber : null}
            />
            
            {isInternationalStudent && (
              <div className="sm:col-span-2">
                <FormInput
                  label="Passport Number"
                  name="passportNumber"
                  value={formData.passportNumber || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.passportNumber && errors.passportNumber ? errors.passportNumber : null}
                />
              </div>
            )}
          </>
        )}

        <CustomDropdown
          name="department"
          label="Department"
          options={getFilteredDepartments()}
          value={formData.department}
          onChange={handleChange}
          onBlur={() => handleBlur({ target: { name: 'department' } })}
          placeholder={
            formData.university ? "Select Department" : "Select University First"
          }
          error={touched.department && errors.department ? errors.department : null}
          isSearchable
          searchValue={departmentSearch}
          onSearchChange={setDepartmentSearch}
          disabled={!formData.university}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          icon={FiPhone}
          error={touched.phone && errors.phone ? errors.phone : null}
        />

        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          icon={FiMapPin}
          error={touched.address && errors.address ? errors.address : null}
        />

        {accountType === "vendor" && (
          <div className="sm:col-span-2 bg-blue-50 rounded-xl p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Your vendor account will be verified once you submit your{" "}
                  {formData.role === "staff" 
                    ? "staff" 
                    : formData.role === "international" 
                      ? "international student" 
                      : "student"} ID. 
                  {isPrivateUniversity && " Private university vendors require additional verification steps."}
                  {isInternationalStudent && " Please ensure your passport information matches your university records."}
                  {" "}This helps ensure the security of our marketplace.
                </p>
              </div>
            </div>
          </div>
        )}

        {accountType === "student" && (
          <div className="sm:col-span-2 bg-blue-50 rounded-xl p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Want to get verified? You can verify your student/staff ID
                  anytime by going to Settings after creating your account.
                  Verified students get access to exclusive deals and features!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="sm:col-span-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                onBlur={handleBlur}
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="agreeToTerms"
                className="font-medium text-gray-700">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
              {touched.agreeToTerms && errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityInfoForm; 