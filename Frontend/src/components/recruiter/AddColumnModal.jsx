import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function AddColumnModal({ isOpen, onClose, onAddColumn }) {
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!columnName.trim()) {
      setError("Column name is required");
      return;
    }

    onAddColumn(columnName.trim());

    setColumnName("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setColumnName("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-md relative shadow-xl">
        <button
          onClick={handleClose}
          className="absolute -right-4 -top-4 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
        >
          <FiX className="text-xl" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Add New Column
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Column Name
            </label>

            <input
              type="text"
              value={columnName}
              onChange={(e) => {
                setColumnName(e.target.value);
                setError("");
              }}
              className={`w-full border rounded-md px-4 py-3 text-sm outline-none focus:ring-2 ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-blue-50 text-blue-600 px-5 py-3 rounded-md font-medium hover:bg-blue-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              Add Column
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}