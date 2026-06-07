import CandidateSidebar from "../../components/candidate/CandidateSidebar";
import DashboardStatCard from "../../components/candidate/DashboardStatCard";
import AppliedJobTable from "../../components/candidate/AppliedJobTable";
import {
  dashboardStats,
  recentlyAppliedJobs,
} from "../../data/candidateDashboardData";
import { FiArrowRight } from "react-icons/fi";

export default function CandidateDashboard() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
        <CandidateSidebar />

        <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-gray-900">
              Hello, Esther Howard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here is your daily activities and job alerts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {dashboardStats.map((stat) => (
              <DashboardStatCard key={stat.id} stat={stat} />
            ))}
          </div>

          <div className="bg-red-500 rounded-lg px-6 py-5 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="candidate"
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h2 className="text-white font-semibold">
                  Your profile editing is not completed.
                </h2>
                <p className="text-red-100 text-sm mt-1">
                  Complete your profile editing & build your custom Resume
                </p>
              </div>
            </div>

            <button className="bg-white text-red-500 px-5 py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-red-50">
              Edit Profile
              <FiArrowRight />
            </button>
          </div>

          <AppliedJobTable jobs={recentlyAppliedJobs} showViewAll={true} />
        </section>
      </div>
    </div>
  );
}