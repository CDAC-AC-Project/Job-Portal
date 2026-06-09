import { FiDownload } from "react-icons/fi";

export default function ApplicantCard({ applicant }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
        <img
          src={applicant.avatar}
          alt={applicant.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {applicant.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{applicant.role}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>• {applicant.experience}</p>
        <p>• Education: {applicant.education}</p>
        <p>• Applied: {applicant.appliedDate}</p>
      </div>

      <button className="mt-4 text-blue-600 text-sm font-semibold flex items-center gap-2 hover:underline">
        <FiDownload />
        Download Cv
      </button>
    </div>
  );
}