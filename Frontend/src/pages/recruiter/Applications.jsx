import { useEffect, useMemo, useState } from "react";
import { FiPlusCircle, FiChevronDown } from "react-icons/fi";

import ApplicationColumn from "../../components/recruiter/ApplicationColumn";
import AddColumnModal from "../../components/recruiter/AddColumnModal";

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
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

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

        // Used by ApplicationColumn
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

  const handleAddColumn = (columnName) => {
    console.log("New Column:", columnName);
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
    <div className="p-6">

      <div className="mb-8">

        <p className="text-sm text-gray-500">
          Home / Job / Applications
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-3">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Job Applications
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage candidates by application status.
            </p>
          </div>

          <div className="relative">

            <button
              type="button"
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              Sort
              <FiChevronDown />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-12 bg-white border rounded-md shadow-md p-4 w-44">

                <label className="flex gap-2">

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

                <label className="flex gap-2 mt-3">

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

      </div>

      {loading ? (
        <div className="text-center py-20">
          Loading applications...
        </div>
      ) : (
        <div className="overflow-x-auto">

          <div className="flex gap-6 min-w-max">

            {columns.map((column) => (

              <ApplicationColumn
                key={column.id}
                column={column}
                applications={getColumnApplications(column.id)}
                onShortlist={handleShortlist}
                onReject={handleReject}
              />

            ))}

            <button
              onClick={() => setShowAddColumnModal(true)}
              className="min-w-[260px] h-[56px] border rounded-lg flex items-center justify-center gap-2"
            >
              <FiPlusCircle />
              Create New Column
            </button>

          </div>

        </div>
      )}

      <AddColumnModal
        isOpen={showAddColumnModal}
        onClose={() => setShowAddColumnModal(false)}
        onAddColumn={handleAddColumn}
      />

    </div>
  );
}