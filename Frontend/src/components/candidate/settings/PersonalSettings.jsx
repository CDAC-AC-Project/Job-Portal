import { useState } from "react";
import { FiUploadCloud, FiLink } from "react-icons/fi";

import ResumeCard from "./ResumeCard";
import ResumeUploadBox from "./ResumeUploadBox";
import ResumeUploadModal from "./ResumeUploadModal";

import {
  validatePersonalSettings,
  validateProfileImage,
} from "../../../utils/candidateSettingsValidation";

import {
  updateCandidateProfile,
  uploadCandidateResume,
  deleteCandidateResume,
} from "../../../services/candidateSettingsService";

export default function PersonalSettings({
  profile,
  setProfile,
  resumes,
  setResumes,
}) {
  const [errors, setErrors] = useState({});
  const [resumeError, setResumeError] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [previewImage, setPreviewImage] = useState(profile.profilePicture || "");
  const [saving, setSaving] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    const validationErrors = validateProfileImage(file);

    if (Object.keys(validationErrors).length > 0) {
      setErrors({
        ...errors,
        ...validationErrors,
      });
      return;
    }

    const imagePreviewUrl = URL.createObjectURL(file);

    setPreviewImage(imagePreviewUrl);

    setProfile({
      ...profile,
      profilePicture: file,
    });

    setErrors({
      ...errors,
      profilePicture: "",
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const validationErrors = validatePersonalSettings(profile);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSaving(true);
      await updateCandidateProfile(profile);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (file) => {
    try {
      const uploadedResume = await uploadCandidateResume(file);

      setResumes([uploadedResume, ...resumes]);
    } catch (error) {
      console.error(error);
      setResumeError("Failed to upload resume");
    }
  };

  const handleDeleteResume = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCandidateResume(resumeId);

      setResumes(resumes.filter((resume) => resume.id !== resumeId));
      setActiveMenuId(null);
    } catch (error) {
      console.error(error);
      setResumeError("Failed to delete resume");
    }
  };

  const handleRenameResume = (resumeId, newName) => {
    setResumes(
      resumes.map((resume) =>
        resume.id === resumeId ? { ...resume, name: newName } : resume
      )
    );
  };
  const handleOpenAddResumeModal = () => {
  setSelectedResume(null);
  setIsResumeModalOpen(true);
 };

 const handleOpenEditResumeModal = (resume) => {
  setSelectedResume(resume);
  setIsResumeModalOpen(true);
 };

 const handleSaveResumeFromModal = (resumeData) => {
  if (selectedResume) {
    setResumes(
      resumes.map((resume) =>
        resume.id === selectedResume.id
          ? {
              ...resume,
              name: resumeData.name,
              size: resumeData.size,
              fileType: resumeData.fileType,
            }
          : resume
      )
    );
  } else {
    setResumes([
      {
        id: resumeData.id,
        name: resumeData.name,
        size: resumeData.size,
        fileType: resumeData.fileType,
      },
      ...resumes,
    ]);
  }
};

  return (
    <div>
      <form onSubmit={handleSaveChanges}>
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>

            <label className="h-48 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <FiUploadCloud className="text-4xl text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">
                    Browse photo or drop here
                  </p>
                  <p className="text-xs text-gray-400 mt-2 max-w-[160px]">
                    Photo larger than 400 pixels works best. Max photo size 5 MB.
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </label>

            {errors.profilePicture && (
              <p className="text-red-500 text-xs mt-2">
                {errors.profilePicture}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>

              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />

              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title/headline
              </label>

              <input
                type="text"
                name="headline"
                value={profile.headline}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 ${
                  errors.headline
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />

              {errors.headline && (
                <p className="text-red-500 text-xs mt-1">{errors.headline}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>

              <select
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 bg-white ${
                  errors.experience
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select...</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 Years">1-2 Years</option>
                <option value="2-4 Years">2-4 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>

              {errors.experience && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.experience}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Educations
              </label>

              <select
                name="education"
                value={profile.education}
                onChange={handleChange}
                className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 bg-white ${
                  errors.education
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select...</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor Degree">Bachelor Degree</option>
                <option value="Master Degree">Master Degree</option>
                <option value="PhD">PhD</option>
              </select>

              {errors.education && (
                <p className="text-red-500 text-xs mt-1">{errors.education}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Website
              </label>

              <div className="relative">
                <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" />

                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="Website url..."
                  className={`w-full border rounded-md pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ${
                    errors.website
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
              </div>

              {errors.website && (
                <p className="text-red-500 text-xs mt-1">{errors.website}</p>
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
        </div>
      </form>

      {/* Resume Section */}
      <div className="mt-12">
        <h2 className="text-base font-semibold text-gray-900 mb-5">
          Your Cv/Resume
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-5">
          {resumes.map((resume) => (
            <ResumeCard
                key={resume.id}
                resume={resume}
                activeMenuId={activeMenuId}
                setActiveMenuId={setActiveMenuId}
                onDelete={handleDeleteResume}
                onEdit={handleOpenEditResumeModal}
            />
            ))}
        </div>

        <div className="max-w-sm">
          <ResumeUploadBox onClick={handleOpenAddResumeModal} />

          {resumeError && (
            <p className="text-red-500 text-xs mt-2">{resumeError}</p>
          )}
        </div>
      </div>
              {/* Resume Modal */}
            <ResumeUploadModal
                isOpen={isResumeModalOpen}
                onClose={() => setIsResumeModalOpen(false)}
                onSave={handleSaveResumeFromModal}
                selectedResume={selectedResume}
            />
    </div>
  );
}