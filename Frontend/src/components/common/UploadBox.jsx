import { FiUploadCloud } from "react-icons/fi";

export default function UploadBox({
  label,
  title = "Browse photo",
  description,
  onChange,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer h-full min-h-40 p-6 text-center transition">
        <FiUploadCloud className="text-4xl text-gray-400 mb-3" />

        <span className="text-sm font-medium text-gray-700">
          {title}
        </span>

        {description && (
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            {description}
          </p>
        )}

        <input
          type="file"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
}