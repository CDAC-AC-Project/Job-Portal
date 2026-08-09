import { useEffect, useMemo, useState } from "react";
import { FiPlusCircle, FiChevronDown } from "react-icons/fi";

import ApplicationColumn from "../../components/recruiter/ApplicationColumn";
import AddColumnModal from "../../components/recruiter/AddColumnModal";
import {
  getRecruiterApplications,
  shortlistCandidate,
  rejectCandidate,
} from "../../services/recruiterApplicationService";

export default function Applications() {
  const [columns, setColumns] = useState([]);
  const [applications, setApplications] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const data = await getRecruiterApplications();

      setColumns(data?.columns || []);
      setApplications(data?.applications || []);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

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


  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAddColumn = (columnName) => {
    const newColumn = {
      id: columnName.toLowerCase().replace(/\s+/g, "-"),
      title: columnName,
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const sortedApplications = useMemo(() => {
    const copiedApplications = [...applications];

    if (sortBy === "Newest") {
      return copiedApplications.sort((a, b) => b.id - a.id);
    }

    return copiedApplications.sort((a, b) => a.id - b.id);
  }, [applications, sortBy]);

  const getColumnApplications = (columnId) => {
    return sortedApplications.filter((item) => item.column === columnId);
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">
          Home / Job / Senior UI/UX Designer /{" "}
          <span className="text-blue-600 font-medium">Applications</span>
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Job Applications
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage candidates by application status.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Filter
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2"
              >
                Sort
                <FiChevronDown />
              </button>

              {showSortMenu && (
                <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 shadow-lg rounded-md p-4 z-20">
                  <p className="text-xs text-gray-400 font-semibold mb-3">
                    SORT APPLICATION
                  </p>

                  <label className="flex items-center gap-2 text-sm text-gray-700 mb-3 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === "Newest"}
                      onChange={() => {
                        setSortBy("Newest");
                        setShowSortMenu(false);
                      }}
                      className="accent-blue-600"
                    />
                    Newest
                  </label>

                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      checked={sortBy === "Oldest"}
                      onChange={() => {
                        setSortBy("Oldest");
                        setShowSortMenu(false);
                      }}
                      className="accent-blue-600"
                    />
                    Oldest
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Loading applications...
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
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
              type="button"
              onClick={() => setShowAddColumnModal(true)}
              className="min-w-[260px] h-[56px] border border-gray-200 rounded-lg bg-gray-50 text-gray-700 flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600"
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