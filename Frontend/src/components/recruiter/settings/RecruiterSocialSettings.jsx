import { useState } from "react";
import {
  FiPlusCircle,
  FiXCircle,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiGlobe,
} from "react-icons/fi";

import { validateRecruiterSocialLinks } from "../../../utils/recruiterSettingsValidation";
import { updateRecruiterSocialLinks } from "../../../services/recruiterSettingsService";

const socialPlatforms = [
  { name: "Facebook", icon: FiFacebook },
  { name: "Twitter", icon: FiTwitter },
  { name: "Instagram", icon: FiInstagram },
  { name: "Youtube", icon: FiYoutube },
  { name: "LinkedIn", icon: FiGlobe },
  { name: "Website", icon: FiGlobe },
];

export default function RecruiterSocialSettings({
  socialLinks,
  setSocialLinks,
}) {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (id, field, value) => {
    setSocialLinks(
      socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );

    setErrors({
      ...errors,
      [`${field}_${id}`]: "",
    });
  };

  const handleAddLink = () => {
    setSocialLinks([
      ...socialLinks,
      {
        id: Date.now(),
        platform: "Facebook",
        url: "",
      },
    ]);
  };

  const handleRemoveLink = (id) => {
    if (socialLinks.length === 1) {
      alert("At least one social link is required");
      return;
    }

    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const validationErrors = validateRecruiterSocialLinks(socialLinks);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      await updateRecruiterSocialLinks(socialLinks);
      alert("Social media profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update social media profile");
    } finally {
      setSaving(false);
    }
  };

  const getPlatformIcon = (platformName) => {
    const platform = socialPlatforms.find((item) => item.name === platformName);
    return platform ? platform.icon : FiGlobe;
  };

  return (
    <form onSubmit={handleSave} className="max-w-5xl">
      <div className="space-y-5">
        {socialLinks.map((link, index) => {
          const Icon = getPlatformIcon(link.platform);

          return (
            <div key={link.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Link {index + 1}
              </label>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="md:w-56 border border-gray-300 rounded-md flex items-center">
                  <div className="px-4 text-blue-600">
                    <Icon />
                  </div>

                  <select
                    value={link.platform}
                    onChange={(e) =>
                      handleChange(link.id, "platform", e.target.value)
                    }
                    className="w-full py-3 pr-4 text-sm bg-white outline-none"
                  >
                    {socialPlatforms.map((platform) => (
                      <option key={platform.name} value={platform.name}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  value={link.url}
                  onChange={(e) =>
                    handleChange(link.id, "url", e.target.value)
                  }
                  placeholder="Profile link/url..."
                  className={`flex-1 border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 ${
                    errors[`url_${link.id}`]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => handleRemoveLink(link.id)}
                  className="md:w-12 h-12 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-red-50 hover:text-red-500"
                >
                  <FiXCircle />
                </button>
              </div>

              {(errors[`platform_${link.id}`] ||
                errors[`url_${link.id}`]) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`platform_${link.id}`] || errors[`url_${link.id}`]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleAddLink}
        className="w-full mt-5 bg-gray-100 text-gray-700 py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600"
      >
        <FiPlusCircle />
        Add New Social Link
      </button>

      <button
        type="submit"
        disabled={saving}
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-300"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}