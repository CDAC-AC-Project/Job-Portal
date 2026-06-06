import {
  FiHome,
  FiPlusCircle,
  FiBriefcase,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

const menuItems = [
  { label: "Dashboard", icon: FiHome },
  { label: "Post Job", icon: FiPlusCircle },
  { label: "Manage Jobs", icon: FiBriefcase },
  { label: "Applicants", icon: FiUsers },
  { label: "Settings", icon: FiSettings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Recruiter Panel
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Icon className="text-lg" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}