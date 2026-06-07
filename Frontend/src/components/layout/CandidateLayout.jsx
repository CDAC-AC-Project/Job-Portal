import { Outlet } from "react-router-dom";
import CandidateHeader from "../candidate/CandidateHeader";
import CandidateFooter from "../candidate/CandidateFooter";

export default function CandidateLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CandidateHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <CandidateFooter />
    </div>
  );
}