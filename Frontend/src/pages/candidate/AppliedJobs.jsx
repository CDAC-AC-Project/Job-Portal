import { useEffect, useState } from "react";

import CandidateSidebar from "../../components/candidate/CandidateSidebar";
import AppliedJobTable from "../../components/candidate/applications/AppliedJobTable";
import Loader from "../../components/common/Loader";
import { getMyApplications } from "../../services/applicationApi";

export default function AppliedJobs() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  console.log("AppliedJobs mounted");

  const fetchAppliedJobs = async () => {
    console.log("fetchAppliedJobs called");

    try {
      setLoading(true);

      const data = await getMyApplications(1);
      console.log("API Response:", data);

      const formatted = data.map((app) => ({
        id: app.id,
        applicationId: app.id,
        jobId: app.jobId,
        title: app.jobTitleSnapshot,
        company: app.companyNameSnapshot,
        status: app.status,
        dateApplied: app.appliedAt,
      }));

      console.log("Formatted:", formatted);

      setAppliedJobs(formatted);
    } catch (err) {
      console.error("Error:", err);
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
