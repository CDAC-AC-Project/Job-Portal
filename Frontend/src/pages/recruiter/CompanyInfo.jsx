import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import UploadBox from "../../components/common/UploadBox";
import Footer from "../../components/layout/Footer";
import RecruiterSetupSteps from "../../components/recruiter/RecruiterSetupSteps";
import SetupProgressBar from "../../components/recruiter/SetupProgressBar";

export default function CompanyInfo() {
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-10 py-5 border-b border-gray-200">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900">JobPilot</h1>
      <SetupProgressBar progress={25} />
    </div>
    </header>

      <main className="max-w-5xl mx-auto w-full py-10 px-6">
       <RecruiterSetupSteps />

        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Logo & Banner Image
        </h2>

        <div className="grid grid-cols-3 gap-5 mb-8">
          <UploadBox
            label="Upload Logo"
            title="Browse photo or drop here"
            description="A photo larger than 400 pixels works best. Max photo size 5 MB."
            className="h-44"
          />

          <UploadBox
            label="Banner Image"
            title="Browse photo or drop here"
            description="Banner image optimal dimension 1520x400. Supported format JPEG, PNG."
            className="col-span-2 h-44"
          />
        </div>

        <div className="space-y-6">
          <Input
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <TextArea
            label="About Us"
            placeholder="Write down about your company here. Let the candidate know who we are..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <Button>Save & Next →</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}