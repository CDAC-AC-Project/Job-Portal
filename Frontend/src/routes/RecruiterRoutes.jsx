import { Route } from "react-router-dom";

import CompanyInfo from "../pages/recruiter/CompanyInfo";
import FoundingInfo from "../pages/recruiter/FoundingInfo";
import SocialMediaProfile from "../pages/recruiter/SocialMediaProfile";
import ContactInfo from "../pages/recruiter/ContactInfo";
import ProfileComplete from "../pages/recruiter/ProfileComplete";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import PlansBilling from "../pages/recruiter/PlansBilling";
import PostJob from "../pages/recruiter/PostJob";
import MyJobs from "../pages/recruiter/MyJobs";
import Applications from "../pages/recruiter/Applications";

const RecruiterRoutes = (
  <>
    {/* Recruiter setup routes */}
    <Route path="/recruiter/company-info" element={<CompanyInfo />} />
    <Route path="/recruiter/founding-info" element={<FoundingInfo />} />
    <Route
      path="/recruiter/social-media-profile"
      element={<SocialMediaProfile />}
    />
    <Route path="/recruiter/contact" element={<ContactInfo />} />
    <Route
      path="/recruiter/profile-complete"
      element={<ProfileComplete />}
    />

    {/* Recruiter dashboard routes */}
    <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
    <Route path="/recruiter/plans-billing" element={<PlansBilling />} />
    <Route path="/recruiter/post-job" element={<PostJob/>} />
    <Route path="/recruiter/my-jobs" element={<MyJobs />} />
    <Route path="/recruiter/applications" element={<Applications />} />
  </>
);

export default RecruiterRoutes;