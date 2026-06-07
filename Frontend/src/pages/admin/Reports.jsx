import StatCard from "../../components/admin/StatCard";
import { reportStats, recentActivity } from "../../data/reportsData";

import {
  Briefcase,
  Building2,
  Users,
  UserRound,
} from "lucide-react";

function Reports() {
  const icons = [
    <Briefcase size={32} />,
    <Building2 size={32} />,
    <Users size={32} />,
    <UserRound size={32} />,
  ];

  return (
    <div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Reports & Analytics
        </h1>

        <p className="text-gray-500 mt-1">
          Platform statistics overview
        </p>
      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {reportStats.map((item, index) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={icons[index]}
          />
        ))}

      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

        <h2 className="text-xl font-semibold mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3">

          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="border-b pb-3"
            >
              {activity}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Reports;