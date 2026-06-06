import { FiBriefcase } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiBriefcase className="text-blue-600 text-2xl" />
          <span className="text-xl font-semibold text-gray-900">
            JobPilot
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">Find Job</a>
          <a href="#" className="hover:text-blue-600">Employers</a>
          <a href="#" className="hover:text-blue-600">Candidates</a>
          <a href="#" className="hover:text-blue-600">Pricing</a>
        </nav>
      </div>
    </header>
  );
}