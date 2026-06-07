import { Route, Navigate } from "react-router-dom";

import CandidateLayout from "../components/layout/CandidateLayout.jsx";
import FindJob from "../pages/candidate/FindJob.jsx";
import CandidateDashboard from "../pages/candidate/CandidateDashboard.jsx";
import AppliedJobs from "../pages/candidate/AppliedJobs.jsx";
import FavoriteJobs from "../pages/candidate/FavoriteJobs.jsx";
import Settings from "../pages/candidate/Settings.jsx";

const CandidateRoutes = (
  <Route path="/candidate" element={<CandidateLayout />}>
    <Route index element={<Navigate to="/candidate/find-job" />} />

    {/* Header based routes */}
    <Route
      path="home"
      element={<h1 className="p-10 text-3xl font-bold">Home Page</h1>}
    />

    <Route path="find-job" element={<FindJob />} />

    <Route
      path="find-employers"
      element={<h1 className="p-10 text-3xl font-bold">Find Employers</h1>}
    />

    <Route path="dashboard" element={<CandidateDashboard />} />

    <Route
      path="job-alerts"
      element={<h1 className="p-10 text-3xl font-bold">Job Alerts</h1>}
    />

    <Route
      path="support"
      element={<h1 className="p-10 text-3xl font-bold">Customer Support</h1>}
    />

    {/* Dashboard sidebar routes */}
    <Route path="applied-jobs" element={<AppliedJobs />} />

    <Route
      path="favorite-jobs"
      element={<FavoriteJobs />}
    />

    <Route
      path="settings"
      element={<Settings />}
    />
  </Route>
);

export default CandidateRoutes;