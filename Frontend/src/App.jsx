import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CompanyInfo from "./pages/recruiter/CompanyInfo";
import FoundingInfo from "./pages/recruiter/FoundingInfo";
import SocialMediaProfile from "./pages/recruiter/SocialMediaProfile";
import ContactInfo from "./pages/recruiter/ContactInfo";
import ProfileComplete from "./pages/recruiter/ProfileComplete";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/candidate/dashboard"
          element={<h1 className="text-3xl font-bold">Candidate Dashboard</h1>}
        />

        <Route
          path="/recruiter/dashboard"
          element={<h1 className="text-3xl font-bold">Recruiter Dashboard</h1>}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* modify it when you are working on recruiter */}
        {/* <Route path="/" element={<Navigate to="/recruiter/company-info" />} /> */}

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

        {/* Temporary routes */}
        <Route path="/recruiter/dashboard" element={<h1>Recruiter Dashboard</h1>} />
        <Route path="/recruiter/post-job" element={<h1>Post Job Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;