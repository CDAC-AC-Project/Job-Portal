import { useNavigate } from "react-router-dom";
import { FiTrendingUp } from "react-icons/fi";

import RecentlyPostedJobsTable from "../../components/recruiter/RecentlyPostedJobsTable";
import RecruiterStatCard from "../../components/recruiter/RecruiterStatCard";

import { recruiterStats, recentlyPostedJobs } from "../../data/recruiterDashboardData";

export default function RecruiterDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-8 text-white">
        <p className="text-sm font-medium text-blue-100">Welcome back</p>

        <h1 className="mt-2 text-2xl sm:text-3xl font-bold">
          Hello, Instagram
        </h1>

        <p className="mt-2 text-blue-100">
          Here is your daily recruitment activity and application summary.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {recruiterStats.map((stat) => (
          <RecruiterStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bg={stat.bg}
            iconBg={stat.iconBg}
          />
        ))}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recently Posted Jobs
            </h2>

            <p className="text-sm text-gray-500">
              Track your latest job postings and applications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/recruiter/my-jobs")}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
            <FiTrendingUp />
          </button>
        </div>

        <RecentlyPostedJobsTable jobs={recentlyPostedJobs} />
      </section>
    </div>
  );
}