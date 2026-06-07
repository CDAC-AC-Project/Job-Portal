import { FiMapPin, FiCheck, FiArrowRight } from "react-icons/fi";

export default function AppliedJobTable({ jobs, showViewAll = false }) {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">
          {showViewAll ? "Recently Applied" : "Applied Jobs"}
        </h2>

        {showViewAll && (
          <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
            View all
            <FiArrowRight />
          </button>
        )}
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="text-left font-medium px-5 py-3">Job</th>
              <th className="text-left font-medium px-5 py-3">Date Applied</th>
              <th className="text-left font-medium px-5 py-3">Status</th>
              <th className="text-right font-medium px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-t border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-md ${job.companyColor} text-white flex items-center justify-center font-semibold`}
                    >
                      {job.companyLogo}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {job.title}
                        </h3>

                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                          {job.type}
                        </span>
                      </div>

                      <p className="text-gray-500 flex items-center gap-2">
                        <FiMapPin />
                        {job.location}
                        <span>•</span>
                        <span>{job.salary}</span>
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {job.dateApplied}
                </td>

                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    <FiCheck />
                    {job.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-600 hover:text-white transition">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}