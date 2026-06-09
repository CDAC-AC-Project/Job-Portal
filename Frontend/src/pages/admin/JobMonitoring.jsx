import { useState } from "react";
import { Search } from "lucide-react";
import { jobs as initialJobs } from "../../data/jobsData";

function JobMonitoring() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");

  const handleApprove = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, status: "Approved" }
          : job
      )
    );
  };

  const handleRemove = (id) => {
    setJobs((prev) =>
      prev.filter((job) => job.id !== id)
    );
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Job Monitoring
        </h1>

        <p className="text-gray-500 mt-1">
          Approve and manage job postings
        </p>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="text-left px-6 py-4">
                Job Title
              </th>

              <th className="text-left px-6 py-4">
                Company
              </th>

              <th className="text-left px-6 py-4">
                Recruiter
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {filteredJobs.map((job) => (

              <tr
                key={job.id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {job.title}
                </td>

                <td className="px-6 py-4">
                  {job.company}
                </td>

                <td className="px-6 py-4">
                  {job.recruiter}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      job.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.status}
                  </span>

                </td>

                <td className="px-6 py-4 flex gap-2">

                  {job.status === "Pending" && (
                    <button
                      onClick={() =>
                        handleApprove(job.id)
                      }
                      className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleRemove(job.id)
                    }
                    className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                  >
                    Remove
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

export default JobMonitoring;