import { useState } from "react";
import { FiCalendar, FiLink } from "react-icons/fi";

import { validateFoundingInfo } from "../../../utils/recruiterSettingsValidation";
import { updateRecruiterFoundingInfo } from "../../../services/recruiterSettingsService";

const organizationTypes = ["Private", "Public", "Government", "Non-Profit"];
const industryTypes = ["IT & Software", "Healthcare", "Finance", "Education"];
const teamSizes = ["1-10", "11-50", "51-100", "101-500", "500+"];

export default function FoundingInfoSettings({ foundingInfo, setFoundingInfo }) {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFoundingInfo({
      ...foundingInfo,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationErrors = validateFoundingInfo(foundingInfo);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      await updateRecruiterFoundingInfo(foundingInfo);
      alert("Founding info updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update founding info");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <SelectField
          label="Organization Type"
          name="organizationType"
          value={foundingInfo.organizationType}
          onChange={handleChange}
          options={organizationTypes}
          error={errors.organizationType}
        />

        <SelectField
          label="Industry Types"
          name="industryType"
          value={foundingInfo.industryType}
          onChange={handleChange}
          options={industryTypes}
          error={errors.industryType}
        />

        <SelectField
          label="Team Size"
          name="teamSize"
          value={foundingInfo.teamSize}
          onChange={handleChange}
          options={teamSizes}
          error={errors.teamSize}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <DateField
          label="Year of Establishment"
          name="yearOfEstablishment"
          value={foundingInfo.yearOfEstablishment}
          onChange={handleChange}
          error={errors.yearOfEstablishment}
        />

        <IconInputField
          label="Company Website"
          name="companyWebsite"
          value={foundingInfo.companyWebsite}
          onChange={handleChange}
          error={errors.companyWebsite}
          placeholder="Website url..."
          icon={<FiLink />}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Vision
        </label>

        <textarea
          name="companyVision"
          value={foundingInfo.companyVision}
          onChange={handleChange}
          placeholder="Tell us what Vision of your company..."
          rows={6}
          className={`w-full border rounded-t-md px-4 py-3 text-sm outline-none resize-none focus:ring-2 ${
            errors.companyVision
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        <div className="border border-t-0 border-gray-300 rounded-b-md px-4 py-3 flex gap-5 text-gray-400 text-sm">
          <span>B</span>
          <span>I</span>
          <span>U</span>
          <span>S</span>
          <span>🔗</span>
          <span>☷</span>
          <span>☰</span>
        </div>

        {errors.companyVision && (
          <p className="text-red-500 text-xs mt-1">{errors.companyVision}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-300"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-4 py-3 text-sm bg-white outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function DateField({ label, name, value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full border rounded-md px-4 py-3 pr-10 text-sm outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>

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