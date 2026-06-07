import { FcGoogle } from "react-icons/fc";
import { FiMapPin, FiBookmark } from "react-icons/fi";

export default function JobCard({ job, highlighted = false }) {
  const typeColors = {
    "FULL-TIME": "bg-green-100 text-green-700",
    "PART-TIME": "bg-blue-100 text-blue-700",
    INTERNSHIP: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div
      className={`border rounded-lg p-5 transition hover:shadow-md ${
        highlighted
          ? "bg-orange-50 border-orange-100"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>

          <div className="flex flex-wrap items-center gap-2 text-xs mb-5">
            <span
              className={`px-2 py-1 rounded-sm font-semibold ${
                typeColors[job.type] || "bg-gray-100 text-gray-600"
              }`}
            >
              {job.type}
            </span>

            <span className="text-gray-500">Salary: {job.salary}</span>
          </div>
        </div>

        <button className="text-gray-400 hover:text-blue-600">
          <FiBookmark />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-md bg-gray-100 flex items-center justify-center">
          <FcGoogle className="text-2xl" />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900">{job.company}</h4>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FiMapPin />
            {job.location}
          </p>
        </div>
      </div>
    </div>
  );
}