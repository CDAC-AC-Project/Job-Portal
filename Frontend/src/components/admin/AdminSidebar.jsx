import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "User Management",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Job Monitoring",
    path: "/admin/jobs",
    icon: Briefcase,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: BarChart3,
  },
];

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          JobPortal
        </h1>

        <p className="text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      <nav className="mt-6 px-3">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        <button
          className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-lg hover:bg-slate-800"
        >
          <LogOut size={18} />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default AdminSidebar;