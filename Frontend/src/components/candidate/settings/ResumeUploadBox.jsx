import { FiPlusCircle } from "react-icons/fi";

export default function ResumeUploadBox({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-dashed border-gray-300 rounded-md p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition text-left"
    >
      <FiPlusCircle className="text-blue-600 text-xl" />

      <div>
        <h3 className="text-sm font-semibold text-gray-900">
          Add Cv/Resume
        </h3>
        <p className="text-xs text-gray-500">
          Browse file or drop here. Only PDF.
        </p>
      </div>
    </button>
  );
}