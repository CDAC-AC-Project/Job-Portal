import { useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import ApplicationColumn from "../../components/recruiter/ApplicationColumn";

import {
  getRecruiterApplications,
  shortlistCandidate,
  rejectCandidate,
} from "../../services/recruiterApplicationService";

const DEFAULT_COLUMNS = [
  {
    id: "APPLIED",
    title: "Applied",
  },
  {
    id: "SHORTLISTED",
    title: "Shortlisted",
  },
  {
    id: "REJECTED",
    title: "Rejected",
  },
];

export default function Applications() {
  const [columns] = useState(DEFAULT_COLUMNS);
  const [applications, setApplications] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const data = await getRecruiterApplications();

      const mappedApplications = (data || []).map((item) => ({
        id: item.id,
        jobTitle: item.jobTitle,
        companyName: item.companyName,
        location: item.location,
        status: item.status,
        resumeId: item.resumeId,
        column: item.status,
      }));

      setApplications(mappedApplications);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleShortlist = async (applicationId) => {
    try {
      await shortlistCandidate(applicationId);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await rejectCandidate(applicationId);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const sortedApplications = useMemo(() => {
    const copiedApplications = [...applications];

    if (sortBy === "Newest") {
      return copiedApplications.sort((a, b) => b.id - a.id);
    }

    return copiedApplications.sort((a, b) => a.id - b.id);
  }, [applications, sortBy]);

  const getColumnApplications = (columnId) => {
    return sortedApplications.filter(
      (item) => item.column === columnId
    );
  };

  return (
  <div className="w-full px-8 py-6">

    {/* Header */}

    <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

      <div>
        <p className="text-sm text-gray-500">
          Home / Recruiter / Applications
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Job Applications
        </h1>

        <p className="mt-2 text-gray-500">
          Review, shortlist and reject candidate applications.
        </p>
      </div>

      <div className="relative">

        <button
          type="button"
          onClick={() => setShowSortMenu(!showSortMenu)}
          className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium shadow-sm transition hover:border-blue-500 hover:text-blue-600"
        >
          Sort
          <FiChevronDown />
        </button>

        {showSortMenu && (
          <div className="absolute right-0 top-14 z-20 w-48 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                checked={sortBy === "Newest"}
                onChange={() => {
                  setSortBy("Newest");
                  setShowSortMenu(false);
                }}
              />

              Newest

            </label>

            <label className="mt-4 flex items-center gap-3 cursor-pointer">

              <input
                type="radio"
                checked={sortBy === "Oldest"}
                onChange={() => {
                  setSortBy("Oldest");
                  setShowSortMenu(false);
                }}
              />

              Oldest

            </label>

          </div>
        )}

      </div>

    </div>

    {loading ? (

      <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center shadow-sm">

        <p className="text-gray-500">
          Loading applications...
        </p>

      </div>

    ) : (

      <div className="overflow-x-auto pb-4">

        <div className="flex items-start gap-8 min-w-max">

          {columns.map((column) => (

            <ApplicationColumn
              key={column.id}
              column={column}
              applications={getColumnApplications(column.id)}
              onShortlist={handleShortlist}
              onReject={handleReject}
            />

          ))}

        </div>

      </div>

    )}

  </div>
);
}