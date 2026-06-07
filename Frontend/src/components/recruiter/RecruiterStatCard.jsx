import { FiBriefcase, FiUserCheck } from "react-icons/fi";

const icons = {
  "Open Jobs": FiBriefcase,
  "Saved Candidates": FiUserCheck,
};

export default function RecruiterStatCard({ stat }) {
  const Icon = icons[stat.title] || FiBriefcase;

  return (
    <div
      className={`${stat.bgColor} rounded-lg p-6 flex items-center justify-between`}
    >
      <div>
        <h3 className="text-3xl font-semibold text-gray-900">
          {stat.value}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
      </div>

      <div className="w-14 h-14 rounded-md bg-white flex items-center justify-center">
        <Icon className={`text-2xl ${stat.iconColor}`} />
      </div>
    </div>
  );
}