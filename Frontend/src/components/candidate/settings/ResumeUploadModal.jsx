import { useState } from "react";
import { FiX, FiUploadCloud } from "react-icons/fi";
import { validateResumeFile } from "../../../utils/candidateSettingsValidation";

export default function ResumeUploadModal({
  isOpen,
  onClose,
  onSave,
  selectedResume,
}) {
  const [resumeName, setResumeName] = useState(selectedResume?.name || "");
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const validationErrors = validateResumeFile(file);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors.resume);
      return;
    }

    setResumeFile(file);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resumeName.trim()) {
      setError("CV/Resume name is required");
      return;
    }

    if (!resumeFile && !selectedResume) {
      setError("Please upload your CV/Resume");
      return;
    }

    onSave({
      id: selectedResume?.id || Date.now(),
      name: resumeName,
      file: resumeFile,
      size: resumeFile
        ? `${(resumeFile.size / (1024 * 1024)).toFixed(1)} MB`
        : selectedResume?.size,
      fileType: resumeFile
        ? resumeFile.name.split(".").pop().toUpperCase()
        : selectedResume?.fileType,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-md relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
        >
          <FiX className="text-xl" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            {selectedResume ? "Edit Cv/Resume" : "Add Cv/Resume"}
          </h2>

          {/* Resume Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cv/Resume Name
            </label>

            <input
              type="text"
              value={resumeName}
              onChange={(e) => {
                setResumeName(e.target.value);
                setError("");
              }}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Upload Resume */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload your Cv/Resume
            </label>

            <label className="border-2 border-dashed border-gray-300 rounded-md h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50">
              <FiUploadCloud className="text-4xl text-gray-400 mb-2" />

              <p className="text-sm text-gray-700">
                <span className="font-medium">Browse File</span> or drop here
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Only PDF format available. Max file size 12 MB.
              </p>

              {resumeFile && (
                <p className="text-xs text-blue-600 mt-2">
                  Selected: {resumeFile.name}
                </p>
              )}

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-blue-50 text-blue-600 px-5 py-3 rounded-md font-medium hover:bg-blue-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              {selectedResume ? "Update Cv/Resume" : "Add Cv/Resume"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}