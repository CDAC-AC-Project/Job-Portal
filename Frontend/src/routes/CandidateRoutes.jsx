import { Route, Navigate } from "react-router-dom";

import CandidateLayout from "../components/layout/CandidateLayout.jsx";
import FindJob from "../pages/candidate/FindJob.jsx";
import CandidateDashboard from "../pages/candidate/CandidateDashboard.jsx";
import AppliedJobs from "../pages/candidate/AppliedJobs.jsx";
import FavoriteJobs from "../pages/candidate/FavoriteJobs.jsx";
import Settings from "../pages/candidate/Settings.jsx";
import JobAlerts from "../pages/candidate/JobAlerts";
import CustomerSupport from "../pages/candidate/support/CustomerSupport.jsx";
import Home from "../pages/Home.jsx";

const CandidateRoutes = (
  <Route path="/candidate" element={<CandidateLayout />}>
    <Route index element={<Navigate to="/candidate/find-job" />} />

    {/* Header based routes */}
     <Route path="home" element={<Home />} />

    <Route path="find-job" element={<FindJob />} />


    <Route path="dashboard" element={<CandidateDashboard />} />

    <Route path="job-alerts" element={<JobAlerts />} />

    <Route
      path="support"
      element={<CustomerSupport/>}
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