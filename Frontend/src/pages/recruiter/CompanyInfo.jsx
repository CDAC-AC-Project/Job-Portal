import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import UploadBox from "../../components/common/UploadBox";
import Footer from "../../components/layout/Footer";

export default function CompanyInfo() {
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-10 py-5 border-b">
        <h1 className="text-xl font-semibold text-gray-900">
          JobPilot
        </h1>
      </header>

      <main className="max-w-5xl mx-auto w-full py-10 px-6">
        <div className="flex justify-center gap-10 border-b border-gray-200 pb-4 mb-8 text-sm">
          <button className="text-blue-600 font-semibold">Company Info</button>
          <button className="text-gray-400">Founding Info</button>
          <button className="text-gray-400">Social Media Profile</button>
          <button className="text-gray-400">Contact</button>
        </div>

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