import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CompanyInfo from "./pages/recruiter/CompanyInfo";
import FoundingInfo from "./pages/recruiter/FoundingInfo";
import SocialMediaProfile from "./pages/recruiter/SocialMediaProfile";
import ContactInfo from "./pages/recruiter/ContactInfo";
import ProfileComplete from "./pages/recruiter/ProfileComplete";

import AuthRoutes from "./routes/AuthRoutes";
import CandidateRoutes from "./routes/CandidateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {AuthRoutes}
        {CandidateRoutes}

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

        {/* Temporary recruiter routes */}
        <Route
          path="/recruiter/dashboard"
          element={<h1>Recruiter Dashboard</h1>}
        />
        <Route path="/recruiter/post-job" element={<h1>Post Job Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;