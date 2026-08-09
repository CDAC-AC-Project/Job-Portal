import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiPlusCircle,
  FiBriefcase,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const sidebarLinks = [
  {
    label: "Overview",
    path: "/recruiter/dashboard",
    icon: FiGrid,
  },
  {
    label: "Employers Profile",
    path: "/recruiter/profile",
    icon: FiUser,
  },
  {
    label: "Post a Job",
    path: "/recruiter/post-job",
    icon: FiPlusCircle,
  },
  {
    label: "My Jobs",
    path: "/recruiter/my-jobs",
    icon: FiBriefcase,
  },
  {
    label: "Applications",
    path: "/recruiter/applications",
    icon: FiUsers,
  },
  {
    label: "Settings",
    path: "/recruiter/settings",
    icon: FiSettings,
  },
];

export default function RecruiterSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex lg:w-72 flex-col border-r border-gray-200 bg-white h-screen sticky top-0">

      {/* Header */}

      <div className="border-b border-gray-200 px-6 py-6">

        <h2 className="text-xl font-semibold text-gray-900">
          Employers Dashboard
        </h2>

      </div>

      {/* Navigation */}

      <div className="flex-1 p-5">

        <nav className="space-y-2">

          {sidebarLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/recruiter/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${isActive
                    ? "bg-blue-50 font-medium text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                  }`
                }
              >
                <Icon className="text-lg" />
                {link.label}
              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* Logout */}

      <div className="border-t border-gray-200 p-5">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>

      </div>

    </aside>
  );
}