import { useState } from "react";
import { FiCalendar } from "react-icons/fi";

import { validateProfileSettings } from "../../../utils/candidateSettingsValidation";
import { updateCandidateProfileDetails } from "../../../services/candidateSettingsService";


const nationalityOptions = [
  "Indian",
  "American",
  "British",
  "Canadian",
  "Australian",
];

const genderOptions = ["Male", "Female", "Other"];

const maritalStatusOptions = ["Single", "Married", "Divorced"];

const educationOptions = [
  "High School",
  "Diploma",
  "Bachelor Degree",
  "Master Degree",
  "PhD",
];

const experienceOptions = [
  "Fresher",
  "1-2 Years",
  "2-4 Years",
  "5+ Years",
  "10+ Years",
];

export default function ProfileSettings({
  profileDetails,
  setProfileDetails,
}) {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileDetails({
      ...profileDetails,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const validationErrors = validateProfileSettings(profileDetails);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      await updateCandidateProfileDetails(profileDetails);
      alert("Profile settings updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSaveChanges}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectField
          label="Nationality"
          name="nationality"
          value={profileDetails.nationality}
          onChange={handleChange}
          options={nationalityOptions}
          error={errors.nationality}
        />

        <DateField
          label="Date of Birth"
          name="dateOfBirth"
          value={profileDetails.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />

        <SelectField
          label="Gender"
          name="gender"
          value={profileDetails.gender}
          onChange={handleChange}
          options={genderOptions}
          error={errors.gender}
        />

        <SelectField
          label="Marital Status"
          name="maritalStatus"
          value={profileDetails.maritalStatus}
          onChange={handleChange}
          options={maritalStatusOptions}
          error={errors.maritalStatus}
        />

        <SelectField
          label="Education"
          name="education"
          value={profileDetails.education}
          onChange={handleChange}
          options={educationOptions}
          error={errors.education}
        />

        <SelectField
          label="Experience"
          name="experience"
          value={profileDetails.experience}
          onChange={handleChange}
          options={experienceOptions}
          error={errors.experience}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biography
          </label>

          <textarea
            name="biography"
            value={profileDetails.biography}
            onChange={handleChange}
            placeholder="Write down your biography here. Let the employers know who you are..."
            rows={9}
            className={`w-full border rounded-t-md px-4 py-3 text-sm outline-none resize-none focus:ring-2 ${
              errors.biography
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

          {errors.biography && (
            <p className="text-red-500 text-xs mt-1">{errors.biography}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-300"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
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
          <option key={option} value={option}>
            {option}
          </option>
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