import { useEffect, useState } from "react";

import CandidateSidebar from "../../components/candidate/CandidateSidebar";
import AppliedJobTable from "../../components/candidate/applications/AppliedJobTable";
import Loader from "../../components/common/Loader";
import { getAppliedJobs } from "../../services/jobApplicationService";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const data = await getAppliedJobs();
        setAppliedJobs(data);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
        <CandidateSidebar />

        <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900">
              Applied Jobs
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all jobs you have applied for.
            </p>
          </div>

          {loading ? <Loader /> : <AppliedJobTable jobs={appliedJobs} />}
        </section>
      </div>
    </div>
  );
}
