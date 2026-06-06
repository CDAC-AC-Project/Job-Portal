import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyInfo from "./pages/recruiter/CompanyInfo";
import FoundingInfo from "./pages/recruiter/FoundingInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompanyInfo />} />
        <Route path="/recruiter/founding-info" element={<FoundingInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;