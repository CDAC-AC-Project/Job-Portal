import { useState } from "react";
import { FiFileText, FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ResumeCard( {resume,
  activeMenuId,
  setActiveMenuId,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeName, setResumeName] = useState(resume.name);

  const isMenuOpen = activeMenuId === resume.id;

  const handleRename = () => {
    if (!resumeName.trim()) return;

    onRename(resume.id, resumeName);
    setIsEditing(false);
    setActiveMenuId(null);
  };

  return (
    <div className="relative bg-gray-50 rounded-md p-4 min-h-[76px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="text-blue-600 mt-1">
            <FiFileText className="text-xl" />
          </div>

          <div>
            {isEditing ? (
              <input
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename();
                }}
                autoFocus
                className="border border-blue-400 rounded px-2 py-1 text-sm outline-none"
              />
            ) : (
              <h3 className="text-sm font-semibold text-gray-900">
                {resume.name}
              </h3>
            )}

            <p className="text-xs text-gray-500 mt-1">{resume.size}</p>
          </div>
        </div>

        <button
          onClick={() => setActiveMenuId(isMenuOpen ? null : resume.id)}
          className="text-gray-500 hover:text-blue-600"
        >
          <FiMoreHorizontal />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute right-4 top-12 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden">
          <button
                onClick={() => {
                    onEdit(resume);
                    setActiveMenuId(null);
                }}
                className="w-full px-4 py-3 text-sm flex items-center gap-2 text-blue-600 hover:bg-blue-50"
                >
                <FiEdit2 />
                Edit Resume
         </button>

          <button
            onClick={() => onDelete(resume.id)}
            className="w-full px-4 py-3 text-sm flex items-center gap-2 text-red-500 hover:bg-red-50"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}