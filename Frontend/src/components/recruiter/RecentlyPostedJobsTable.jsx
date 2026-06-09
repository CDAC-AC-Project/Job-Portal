import { useState } from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiMoreVertical,
  FiArrowRight,
  FiEye,
  FiTrendingUp,
} from "react-icons/fi";

export default function RecentlyPostedJobsTable({ jobs }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleRowClick = (jobId) => {
    setOpenMenuId(openMenuId === jobId ? null : jobId);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">Recently Posted Jobs</h2>

        <button className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
          View all
          <FiArrowRight />
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full min-w-[850px] text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left font-medium px-5 py-3">Jobs</th>
              <th className="text-left font-medium px-5 py-3">Status</th>
              <th className="text-left font-medium px-5 py-3">Applications</th>
              <th className="text-left font-medium px-5 py-3">Actions</th>
              <th className="text-right font-medium px-5 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => {
              const isMenuOpen = openMenuId === job.id;

              return (
                <tr
                  key={job.id}
                  onClick={() => handleRowClick(job.id)}
                  className={`border-t border-gray-200 hover:bg-blue-50 transition cursor-pointer ${
                    isMenuOpen ? "outline outline-1 outline-blue-500 bg-blue-50" : ""
                  }`}
                >
                  <td className="px-5 py-5">
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <p className="text-gray-500 mt-1">
                      {job.type} <span className="mx-2">•</span> {job.remaining}
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    {job.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <FiCheckCircle />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                        <FiXCircle />
                        Expire
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-5 text-gray-600">
                    <span className="inline-flex items-center gap-2">
                      <FiUsers />
                      {job.applications} Applications
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("View applications:", job.id);
                      }}
                      className={`px-5 py-3 rounded-md font-semibold transition ${
                        isMenuOpen
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      View Applications
                    </button>
                  </td>

                  <td className="px-5 py-5 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(job.id);
                      }}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <FiMoreVertical />
                    </button>

                    {isMenuOpen && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-8 top-12 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-20 text-left"
                      >
                        <button
                          onClick={() => console.log("Promote Job:", job.id)}
                          className="w-full px-4 py-3 text-sm flex items-center gap-2 text-blue-600 bg-blue-50 hover:bg-blue-100"
                        >
                          <FiTrendingUp />
                          Promote Job
                        </button>

                        <button
                          onClick={() => console.log("View Detail:", job.id)}
                          className="w-full px-4 py-3 text-sm flex items-center gap-2 text-gray-600 hover:bg-gray-50"
                        >
                          <FiEye />
                          View Detail
                        </button>

                        <button
                          onClick={() => console.log("Mark as expired:", job.id)}
                          className="w-full px-4 py-3 text-sm flex items-center gap-2 text-gray-600 hover:bg-gray-50"
                        >
                          <FiXCircle />
                          Mark as expired
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}