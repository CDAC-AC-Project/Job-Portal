import { useState } from "react";
import { FiMail, FiEye, FiEyeOff, FiXCircle } from "react-icons/fi";

import {
  validateRecruiterAccountSettings,
  validateRecruiterPassword,
} from "../../../utils/recruiterSettingsValidation";

import {
  updateRecruiterAccountSettings,
  updateRecruiterPassword,
  deleteRecruiterCompany,
} from "../../../services/recruiterSettingsService";

export default function RecruiterAccountSettings({
  accountSettings,
  setAccountSettings,
}) {
  const [accountErrors, setAccountErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleAccountChange = (e) => {
    const { name, value } = e.target;

    setAccountSettings({
      ...accountSettings,
      [name]: value,
    });

    setAccountErrors({
      ...accountErrors,
      [name]: "",
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });

    setPasswordErrors({
      ...passwordErrors,
      [name]: "",
    });
  };

  const handleSaveAccount = async (e) => {
    e.preventDefault();

    const validationErrors = validateRecruiterAccountSettings(accountSettings);

    if (Object.keys(validationErrors).length > 0) {
      setAccountErrors(validationErrors);
      return;
    }

    await updateRecruiterAccountSettings(accountSettings);
    alert("Account settings updated successfully");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const validationErrors = validateRecruiterPassword(passwordData);

    if (Object.keys(validationErrors).length > 0) {
      setPasswordErrors(validationErrors);
      return;
    }

    await updateRecruiterPassword(passwordData);
    alert("Password changed successfully");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleDeleteCompany = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to close your company account?"
    );

    if (!confirmDelete) return;

    await deleteRecruiterCompany();
    alert("Company account closed successfully");
  };

  return (
    <div className="max-w-5xl">
      <section className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Contact Information
        </h2>

        <form onSubmit={handleSaveAccount}>
          <div className="space-y-5">
            <InputField
              label="Map Location"
              name="mapLocation"
              value={accountSettings.mapLocation}
              onChange={handleAccountChange}
              error={accountErrors.mapLocation}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>

              <div className="flex">
                <select
                  name="countryCode"
                  value={accountSettings.countryCode}
                  onChange={handleAccountChange}
                  className="w-28 border border-gray-300 rounded-l-md px-3 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="+880">🇧🇩 +880</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>

                <input
                  name="phone"
                  value={accountSettings.phone}
                  onChange={handleAccountChange}
                  placeholder="Phone number..."
                  className={`flex-1 border border-l-0 rounded-r-md px-4 py-3 text-sm outline-none focus:ring-2 ${
                    accountErrors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </div>

              {accountErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {accountErrors.phone}
                </p>
              )}
            </div>

            <IconInputField
              label="Email"
              name="email"
              value={accountSettings.email}
              onChange={handleAccountChange}
              error={accountErrors.email}
              placeholder="Email address"
              icon={<FiMail />}
            />
          </div>

          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </section>

      <section className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <PasswordField
              label="Current Password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              visible={showPassword.currentPassword}
              onToggle={() =>
                setShowPassword({
                  ...showPassword,
                  currentPassword: !showPassword.currentPassword,
                })
              }
              error={passwordErrors.currentPassword}
            />

            <PasswordField
              label="New Password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              visible={showPassword.newPassword}
              onToggle={() =>
                setShowPassword({
                  ...showPassword,
                  newPassword: !showPassword.newPassword,
                })
              }
              error={passwordErrors.newPassword}
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              visible={showPassword.confirmPassword}
              onToggle={() =>
                setShowPassword({
                  ...showPassword,
                  confirmPassword: !showPassword.confirmPassword,
                })
              }
              error={passwordErrors.confirmPassword}
            />
          </div>

          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">
            Change Password
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Delete Your Company
        </h2>

        <p className="text-sm text-gray-500 leading-6 max-w-xl mb-5">
          If you delete your Jobpilot account, you will no longer be able to get
          information about matched jobs, following employers, and job alert.
          You will be abandoned from all the services of Jobpilot.com.
        </p>

        <button
          type="button"
          onClick={handleDeleteCompany}
          className="text-red-500 text-sm font-medium flex items-center gap-2 hover:underline"
        >
          <FiXCircle />
          Close Account
        </button>
      </section>
    </div>
  );
}

function InputField({ label, name, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function IconInputField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  icon,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
          {icon}
        </span>

        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-md pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  visible,
  onToggle,
  error,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Password"
          className={`w-full border rounded-md px-4 py-3 pr-11 text-sm outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}