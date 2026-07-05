import { Outlet } from "react-router-dom";
import RecruiterHeader from "../recruiter/RecruiterHeader";
import RecruiterSidebar from "../recruiter/RecruiterSidebar";
import DashboardFooter from "./Footer";

export default function RecruiterLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RecruiterHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
          <RecruiterSidebar />

          <section className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
            <Outlet />
          </section>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}