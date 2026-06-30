import { Route } from "react-router-dom";

import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import PlansBilling from "../pages/recruiter/PlansBilling";
import PostJob from "../pages/recruiter/PostJob";
import MyJobs from "../pages/recruiter/MyJobs";
import Applications from "../pages/recruiter/Applications";
import SavedCandidates from "../pages/recruiter/SavedCandidates";
import CandidateProfile from "../pages/recruiter/CandidateProfile";
import RecruiterSettings from "../pages/recruiter/RecruiterSettings";

const RecruiterRoutes = (
  <>
    <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />

    <Route path="/recruiter/plans-billing" element={<PlansBilling />} />

    <Route path="/recruiter/post-job" element={<PostJob />} />

    <Route path="/recruiter/edit-job/:jobId" element={<PostJob />} />

    <Route path="/recruiter/my-jobs" element={<MyJobs />} />

    <Route path="/recruiter/applications" element={<Applications />} />

    <Route path="/recruiter/saved-candidates" element={<SavedCandidates />} />

    <Route
      path="/recruiter/candidate-profile/:candidateId"
      element={<CandidateProfile />}
    />

    <Route path="/recruiter/settings" element={<RecruiterSettings />} />
  </>
);

export default RecruiterRoutes;