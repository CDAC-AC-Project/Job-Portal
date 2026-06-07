import { Bell } from "lucide-react";

function AdminNavbar() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome back, Admin
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h4 className="font-semibold">Admin</h4>
            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;