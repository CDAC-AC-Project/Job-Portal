import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";
import StatCard from "../../components/admin/StatCard";

import {
  Users,
  Briefcase,
  UserRound,
  FileText,
} from "lucide-react";

import {
  stats,
  pendingJobs,
  recentUsers,
  recentJobs,
} from "../../data/dashboardData";

function Dashboard() {
  const icons = [
    <Users size={32} />,
    <Briefcase size={32} />,
    <UserRound size={32} />,
    <FileText size={32} />,
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="flex-1">

        <AdminNavbar />

        <div className="p-6">

          {/* Stats Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {stats.map((item, index) => (
              <StatCard
                key={item.id}
                title={item.title}
                value={item.value}
                icon={icons[index]}
              />
            ))}

          </div>

          {/* Pending Jobs + Recent Users */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

            <div className="bg-white rounded-xl shadow-sm p-5">

              <h3 className="font-semibold text-lg mb-4">
                Pending Job Approvals
              </h3>

              {pendingJobs.map((job) => (
                <div
                  key={job.id}
                  className="py-3 border-b"
                >
                  {job.title}
                </div>
              ))}

            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">

              <h3 className="font-semibold text-lg mb-4">
                Recent Users
              </h3>

              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between py-3 border-b"
                >
                  <span>{user.name}</span>

                  <span className="text-gray-500 text-sm">
                    {user.role}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* Recent Jobs Table */}

          <div className="bg-white rounded-xl shadow-sm p-5 mt-6">

            <h3 className="font-semibold text-lg mb-4">
              Recently Posted Jobs
            </h3>

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Job Title
                  </th>

                  <th className="text-left">
                    Company
                  </th>

                  <th className="text-left">
                    Location
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b"
                  >
                    <td className="py-4">
                      {job.title}
                    </td>

                    <td>{job.company}</td>

                    <td>{job.location}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm
                        ${
                          job.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;