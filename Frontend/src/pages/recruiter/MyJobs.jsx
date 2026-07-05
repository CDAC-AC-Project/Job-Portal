import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import MyJobsTable from "../../components/recruiter/MyJobsTable";
import { getRecruiterJobs } from "../../services/recruiterJobService";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All Jobs");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 10;

  useEffect(() => {
    setJobs(getRecruiterJobs());
  }, []);

  const filteredJobs = useMemo(() => {
    if (statusFilter === "All Jobs") {
      return jobs;
    }

    return jobs.filter((job) => job.status === statusFilter);
  }, [jobs, statusFilter]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * jobsPerPage;
    return filteredJobs.slice(startIndex, startIndex + jobsPerPage);
  }, [filteredJobs, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Jobs{" "}
            <span className="text-gray-400 font-normal">
              ({filteredJobs.length})
            </span>
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all your posted jobs and track applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Job status</span>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Jobs</option>
            <option>Active</option>
            <option>Expire</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <MyJobsTable jobs={paginatedJobs} />
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 disabled:text-gray-300"
          >
            <FiArrowLeft />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {String(page).padStart(2, "0")}
              </button>
            )
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:text-gray-300"
          >
            <FiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}