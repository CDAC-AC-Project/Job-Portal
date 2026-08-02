import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

import { validateCompanyInfo } from "../../../utils/recruiterSettingsValidation";
import { updateRecruiterCompanyInfo } from "../../../services/recruiterSettingsService";

export default function CompanyInfoSettings({ recruiterProfileId, companyInfo, setCompanyInfo }) {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (field, file) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setCompanyInfo({
      ...companyInfo,
      [field]: {
        file,
        previewUrl,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      },
    });
  };

  const handleRemoveImage = (field) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationErrors = validateCompanyInfo(companyInfo);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      const updated = await updateRecruiterCompanyInfo(recruiterProfileId, companyInfo);
      setCompanyInfo({
        logo: updated.logo || "",
        banner: updated.banner || "",
        companyName: updated.companyName || "",
        aboutUs: updated.about || "",
      });
      alert("Company info updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update company info");
    } finally {
      setSaving(false);
    }
  };
    console.log("Company Info:", companyInfo);
  console.log("Logo:", companyInfo.logo);
  console.log("Banner:", companyInfo.banner);
  return (
    <form onSubmit={handleSave}>
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Logo & Banner Image
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 mb-8">
        <ImageUploadPreview
          label="Upload Logo"
          value={companyInfo.logo}
          onChange={(file) => handleImageChange("logo", file)}
          onRemove={() => handleRemoveImage("logo")}
          boxClassName="h-40"
        />

        <ImageUploadPreview
          label="Banner Image"
          value={companyInfo.banner}
          onChange={(file) => handleImageChange("banner", file)}
          onRemove={() => handleRemoveImage("banner")}
          boxClassName="h-40"
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company name
          </label>

          <input
            type="text"
            name="companyName"
            value={companyInfo.companyName}
            onChange={handleChange}
            className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 ${
              errors.companyName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />

          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About us
          </label>

          <textarea
            name="aboutUs"
            value={companyInfo.aboutUs}
            onChange={handleChange}
            placeholder="Write down about your company here. Let the candidate know who we are..."
            rows={7}
            className={`w-full border rounded-t-md px-4 py-3 text-sm outline-none resize-none focus:ring-2 ${
              errors.aboutUs
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

          {errors.aboutUs && (
            <p className="text-red-500 text-xs mt-1">{errors.aboutUs}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-300"
        >
          {saving ? "Saving..." : "Save Change"}
        </button>
      </div>
    </form>
  );
}

function ImageUploadPreview({
  label,
  value,
  onChange,
  onRemove,
  boxClassName = "",
}) {
  // value is either a plain URL string (already-saved image from the backend)
  // or {file, previewUrl, size} for a newly picked, not-yet-saved file.
  const previewSrc = typeof value === "string" ? value : value?.previewUrl;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <label
        className={`border border-gray-200 rounded-md overflow-hidden bg-gray-50 cursor-pointer flex items-center justify-center ${boxClassName}`}
      >
        {previewSrc ? (
          <img
            src={previewSrc}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center px-4">
            <FiUploadCloud className="text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-600">
              Browse or drop image
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5 MB</p>
          </div>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => onChange(e.target.files[0])}
          className="hidden"
        />
      </label>

      {previewSrc && (
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          {value?.size && <span>{value.size}</span>}

          <button
            type="button"
            onClick={onRemove}
            className="text-gray-600 hover:text-red-500"
          >
            Remove
          </button>

          <label className="text-blue-600 hover:underline cursor-pointer">
            Replace
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(e) => onChange(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}