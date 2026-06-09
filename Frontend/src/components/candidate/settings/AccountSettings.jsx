import { useState } from "react";
import {
  FiMail,
  FiBriefcase,
  FiMapPin,
  FiEye,
  FiEyeOff,
  FiXCircle,
} from "react-icons/fi";

import {
  validateContactInfo,
  validateJobAlertsSettings,
  validatePasswordSettings,
} from "../../../utils/candidateSettingsValidation";

import {
  updateCandidateContactInfo,
  updateCandidateNotifications,
  updateCandidateJobAlerts,
  updateCandidatePrivacy,
  updateCandidatePassword,
  deleteCandidateAccount,
} from "../../../services/candidateSettingsService";

export default function AccountSettings({
  accountSettings,
  setAccountSettings,
}) {
  const [contactErrors, setContactErrors] = useState({});
  const [jobAlertErrors, setJobAlertErrors] = useState({});
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

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setAccountSettings({
      ...accountSettings,
      [name]: value,
    });

    setContactErrors({
      ...contactErrors,
      [name]: "",
    });
  };

  const handleNotificationChange = (name) => {
    setAccountSettings({
      ...accountSettings,
      notifications: {
        ...accountSettings.notifications,
        [name]: !accountSettings.notifications[name],
      },
    });
  };

  const handleJobAlertChange = (e) => {
    const { name, value } = e.target;

    setAccountSettings({
      ...accountSettings,
      jobAlerts: {
        ...accountSettings.jobAlerts,
        [name]: value,
      },
    });

    setJobAlertErrors({
      ...jobAlertErrors,
      [name]: "",
    });
  };

  const handlePrivacyChange = (name) => {
    setAccountSettings({
      ...accountSettings,
      privacy: {
        ...accountSettings.privacy,
        [name]: !accountSettings.privacy[name],
      },
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

  const saveContactInfo = async (e) => {
    e.preventDefault();

    const errors = validateContactInfo(accountSettings);

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    await updateCandidateContactInfo({
      mapLocation: accountSettings.mapLocation,
      countryCode: accountSettings.countryCode,
      phone: accountSettings.phone,
      email: accountSettings.email,
    });

    alert("Contact info updated successfully");
  };

  const saveNotifications = async () => {
    await updateCandidateNotifications(accountSettings.notifications);
    alert("Notification settings updated successfully");
  };

  const saveJobAlerts = async (e) => {
    e.preventDefault();

    const errors = validateJobAlertsSettings(accountSettings.jobAlerts);

    if (Object.keys(errors).length > 0) {
      setJobAlertErrors(errors);
      return;
    }

    await updateCandidateJobAlerts(accountSettings.jobAlerts);
    alert("Job alerts updated successfully");
  };

  const savePrivacy = async () => {
    await updateCandidatePrivacy(accountSettings.privacy);
    alert("Privacy settings updated successfully");
  };

  const savePassword = async (e) => {
    e.preventDefault();

    const errors = validatePasswordSettings(passwordData);

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    await updateCandidatePassword(passwordData);

    alert("Password changed successfully");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to close your account?"
    );

    if (!confirmDelete) return;

    await deleteCandidateAccount();
    alert("Account closed successfully");
  };

  return (
    <div className="max-w-5xl">
      {/* Contact Info */}
      <section className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Contact Info
        </h2>

        <form onSubmit={saveContactInfo}>
          <div className="space-y-5">
            <InputField
              label="Map Location"
              name="mapLocation"
              value={accountSettings.mapLocation}
              onChange={handleContactChange}
              error={contactErrors.mapLocation}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>

              <div className="flex">
                <select
                  name="countryCode"
                  value={accountSettings.countryCode}
                  onChange={handleContactChange}
                  className="w-28 border border-gray-300 rounded-l-md px-3 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="+880">🇧🇩 +880</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>

                <input
                  type="text"
                  name="phone"
                  value={accountSettings.phone}
                  onChange={handleContactChange}
                  placeholder="Phone number..."
                  className={`flex-1 border border-l-0 rounded-r-md px-4 py-3 text-sm outline-none focus:ring-2 ${
                    contactErrors.phone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </div>

              {contactErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {contactErrors.phone}
                </p>
              )}
            </div>

            <IconInputField
              label="Email"
              name="email"
              value={accountSettings.email}
              onChange={handleContactChange}
              error={contactErrors.email}
              placeholder="Email address"
              icon={<FiMail />}
            />
          </div>

          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </section>

      {/* Notification */}
      <section className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Notification
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CheckboxField
            label="Notify me when employers shortlisted me"
            checked={accountSettings.notifications.shortlisted}
            onChange={() => handleNotificationChange("shortlisted")}
          />

          <CheckboxField
            label="Notify me when employers saved my profile"
            checked={accountSettings.notifications.savedProfile}
            onChange={() => handleNotificationChange("savedProfile")}
          />

          <CheckboxField
            label="Notify me when my applied jobs are expire"
            checked={accountSettings.notifications.appliedJobsExpire}
            onChange={() => handleNotificationChange("appliedJobsExpire")}
          />

          <CheckboxField
            label="Notify me when employers rejected me"
            checked={accountSettings.notifications.rejected}
            onChange={() => handleNotificationChange("rejected")}
          />

          <CheckboxField
            label="Notify me when i have up to 5 job alerts"
            checked={accountSettings.notifications.jobAlerts}
            onChange={() => handleNotificationChange("jobAlerts")}
          />
        </div>

        <button
          type="button"
          onClick={saveNotifications}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </section>

      {/* Job Alerts */}
      <section className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Job Alerts
        </h2>

        <form onSubmit={saveJobAlerts}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <IconInputField
              label="Role"
              name="role"
              value={accountSettings.jobAlerts.role}
              onChange={handleJobAlertChange}
              error={jobAlertErrors.role}
              placeholder="Your job roles"
              icon={<FiBriefcase />}
            />

            <IconInputField
              label="Location"
              name="location"
              value={accountSettings.jobAlerts.location}
              onChange={handleJobAlertChange}
              error={jobAlertErrors.location}
              placeholder="City, state, country name"
              icon={<FiMapPin />}
            />
          </div>

          <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </section>

      {/* Privacy */}
      <section className="border-b border-gray-200 pb-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <PrivacyToggle
            title="Profile Privacy"
            enabled={accountSettings.privacy.profilePublic}
            yesText="YES"
            noText="NO"
            description={
              accountSettings.privacy.profilePublic
                ? "Your profile is public now"
                : "Your profile is private now"
            }
            onChange={() => handlePrivacyChange("profilePublic")}
          />

          <PrivacyToggle
            title="Resume Privacy"
            enabled={!accountSettings.privacy.resumePrivate}
            yesText="YES"
            noText="NO"
            description={
              accountSettings.privacy.resumePrivate
                ? "Your resume is private now"
                : "Your resume is public now"
            }
            onChange={() => handlePrivacyChange("resumePrivate")}
          />
        </div>

        <button
          type="button"
          onClick={savePrivacy}
          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </section>

      {/* Change Password */}
      <section className="border-b border-gray-200 pb-8 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Change Password
        </h2>

        <form onSubmit={savePassword}>
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
            Save Changes
          </button>
        </form>
      </section>

      {/* Delete Account */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Delete Your Account
        </h2>

        <p className="text-sm text-gray-500 leading-6 max-w-xl mb-5">
          If you delete your Jobpilot account, you will no longer be able to get
          information about the matched jobs, following employers, and job alert,
          shortlisted jobs and more. You will be abandoned from all the services
          of Jobpilot.com.
        </p>

        <button
          onClick={handleDeleteAccount}
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

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-blue-600"
      />
      {label}
    </label>
  );
}

function PrivacyToggle({
  title,
  enabled,
  yesText,
  noText,
  description,
  onChange,
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>

      <button
        type="button"
        onClick={onChange}
        className="w-full border border-gray-300 rounded-md px-4 py-3 flex items-center gap-3 text-sm"
      >
        <span
          className={`w-9 h-5 rounded-full flex items-center px-0.5 transition ${
            enabled ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"
          }`}
        >
          <span className="w-4 h-4 bg-white rounded-full"></span>
        </span>

        <span className={enabled ? "text-blue-600 font-semibold" : "text-red-500 font-semibold"}>
          {enabled ? yesText : noText}
        </span>

        <span className="text-gray-500">{description}</span>
      </button>
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