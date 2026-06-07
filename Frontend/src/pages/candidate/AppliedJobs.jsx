import CandidateSidebar from "../../components/candidate/CandidateSidebar";
import AppliedJobTable from "../../components/candidate/AppliedJobTable";
import { recentlyAppliedJobs } from "../../data/candidateDashboardData";

export default function AppliedJobs() {
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

          <AppliedJobTable jobs={recentlyAppliedJobs} />
        </section>
      </div>
    </div>
  );
}