import { NavLink } from "react-router-dom";
import {
  FiBriefcase,
  FiSearch,
  FiBell,
  FiPhone,
  FiChevronDown,
} from "react-icons/fi";

export default function CandidateHeader() {
  const navLinks = [
    { name: "Home", path: "/candidate/home" },
    { name: "Find Job", path: "/candidate/find-job" },
    { name: "Find Employers", path: "/candidate/find-employers" },
    { name: "Dashboard", path: "/candidate/dashboard" },
    { name: "Job Alerts", path: "/candidate/job-alerts" },
    { name: "Customer Supports", path: "/candidate/support" },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Nav */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-10 flex items-center justify-between">
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium border-b-2 border-blue-600 h-10 flex items-center"
                    : "text-gray-500 hover:text-blue-600 h-10 flex items-center"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FiPhone />
              <span>+1-202-555-0178</span>
            </div>

            <div className="flex items-center gap-2">
              <span>🇺🇸</span>
              <span>English</span>
              <FiChevronDown />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-5">
        <div className="flex items-center justify-between">
          <NavLink
            to="/candidate/find-job"
            className="flex items-center gap-2 text-xl font-semibold text-gray-900"
          >
            <FiBriefcase className="text-blue-600 text-2xl" />
            Jobpilot
          </NavLink>

          <div className="lg:hidden flex items-center gap-4">
            <FiBell className="text-gray-500" />
            <div className="w-9 h-9 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="sm:w-40 border border-gray-200 rounded-md px-3 py-3 flex items-center gap-2 text-sm">
            <span>🇮🇳</span>
            <span>India</span>
            <FiChevronDown className="ml-auto text-gray-400" />
          </div>

          <div className="flex-1 border border-gray-200 rounded-md px-4 py-3 flex items-center gap-3">
            <FiSearch className="text-blue-600" />
            <input
              type="text"
              placeholder="Job title, keyword, company"
              className="w-full outline-none text-sm"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <FiBell className="text-gray-500 text-xl" />
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}