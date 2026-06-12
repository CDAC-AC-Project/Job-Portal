import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminRoutes from "./routes/AdminRoutes";
import CompanyInfo from "./pages/recruiter/CompanyInfo";
import FoundingInfo from "./pages/recruiter/FoundingInfo";
import SocialMediaProfile from "./pages/recruiter/SocialMediaProfile";
import ContactInfo from "./pages/recruiter/ContactInfo";
import ProfileComplete from "./pages/recruiter/ProfileComplete";


import AuthRoutes from "./routes/AuthRoutes";
import CandidateRoutes from "./routes/CandidateRoutes";
import RecruiterRoutes from "./routes/RecruiterRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {AuthRoutes}
        {CandidateRoutes}
        {RecruiterRoutes}
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;