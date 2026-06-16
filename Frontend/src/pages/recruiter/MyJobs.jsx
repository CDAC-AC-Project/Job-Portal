import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import RecruiterHeader from "../../components/recruiter/RecruiterHeader";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import MyJobsTable from "../../components/recruiter/MyJobsTable";
import { getRecruiterJobs } from "../../services/recruiterJobService";
import Footer from "../../components/layout/Footer";

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
    <div className="min-h-screen bg-white flex flex-col">
      <RecruiterHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
          <RecruiterSidebar />

          <section className="flex-1 px-4 sm:px-6 lg:px-10 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-xl font-semibold text-gray-900">
                My Jobs{" "}
                <span className="text-gray-400 font-normal">
                  ({jobs.length})
                </span>
              </h1>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Job status</span>

                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-md px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Jobs</option>
                  <option>Active</option>
                  <option>Expire</option>
                </select>
              </div>
            </div>

            <MyJobsTable jobs={paginatedJobs} />

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-3">
                <button
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
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:text-gray-300"
                >
                  <FiArrowRight />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer/>
    </div>
  );
}