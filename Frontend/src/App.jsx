import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyInfo from "./pages/recruiter/CompanyInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CompanyInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;44
