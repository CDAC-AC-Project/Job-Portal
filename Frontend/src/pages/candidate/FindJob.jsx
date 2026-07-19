import { useMemo, useState } from "react";
import {
  FiSearch,
  FiMapPin,
  FiSliders,
  FiTarget,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import JobCard from "../../components/candidate/JobCard";
import { jobs } from "../../data/jobs";

const popularSearches = [
  "Front-end",
  "Back-end",
  "Development",
  "PHP",
  "Laravel",
  "Bootstrap",
  "Developer",
  "Team Lead",
  "Product Testing",
  "Javascript",
];

export default function FindJob() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 15;

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keywordMatch =
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.category.toLowerCase().includes(keyword.toLowerCase());

      const locationMatch = job.location
        .toLowerCase()
        .includes(location.toLowerCase());

      const typeMatch = jobType === "ALL" || job.type === jobType;

      return keywordMatch && locationMatch && typeMatch;
    });
  }, [keyword, location, jobType]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePopularSearch = (value) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white">
      {/* Page Title Strip */}
      <section className="bg-gray-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Find Job</h1>

          <p className="text-sm text-gray-500">
            Home / <span className="text-gray-900">Find job</span>
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3 flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <FiSearch className="text-blue-600 text-xl" />
            <input
              type="text"
              placeholder="Search by: Job title, Position, Keyword..."
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-t lg:border-t-0 lg:border-l border-gray-200">
            <FiMapPin className="text-blue-600 text-xl" />
            <input
              type="text"
              placeholder="City, state or zip code"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full outline-none text-sm"
            />
            <FiTarget className="text-gray-400" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-5 py-3 rounded-md bg-gray-100 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-200"
          >
            <FiSliders />
            Filters
          </button>

          <button
            onClick={handleSearch}
            className="px-8 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Find Job
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 border border-gray-200 rounded-lg p-5 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>

            <select
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-64 border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Jobs</option>
              <option value="FULL-TIME">Full Time</option>
              <option value="PART-TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
        )}

        {/* Popular Searches */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-gray-500">Popular searches:</span>

          {popularSearches.map((item) => (
            <button
              key={item}
              onClick={() => handlePopularSearch(item)}
              className={`${
                keyword === item
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                highlighted={index === 0 || index === 8}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h2 className="text-xl font-semibold text-gray-900">
                No jobs found
              </h2>
              <p className="text-gray-500 mt-2">
                Try changing your search keyword or filters.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
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
  );
}