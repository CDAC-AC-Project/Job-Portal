import RecruiterHeader from "../../components/recruiter/RecruiterHeader";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";
import RecruiterStatCard from "../../components/recruiter/RecruiterStatCard";
import RecentlyPostedJobsTable from "../../components/recruiter/RecentlyPostedJobsTable";
import Footer from "../../components/layout/Footer";

import {
  recruiterStats,
  recentlyPostedJobs,
} from "../../data/recruiterDashboardData";

export default function RecruiterDashboard() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RecruiterHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
          <RecruiterSidebar />

          <section className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-gray-900">
                Hello, Instagram
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Here is your daily activities and applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mb-8">
              {recruiterStats.map((stat) => (
                <RecruiterStatCard key={stat.id} stat={stat} />
              ))}
            </div>

            <RecentlyPostedJobsTable jobs={recentlyPostedJobs} />
          </section>
        </div>
      </main>

      <footer/>
    </div>
  );
}