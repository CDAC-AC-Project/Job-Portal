import { useState } from "react";

export default function CompanyInfo() {
  const [companyName, setCompanyName] = useState("");
  const [about, setAbout] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <div className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          JobPilot
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full py-8">

        {/* Step Navigation */}
        <div className="flex justify-center gap-8 border-b pb-4 mb-8">

          <button className="text-blue-600 font-semibold">
            Company Info
          </button>

          <button className="text-gray-400">
            Founding Info
          </button>

          <button className="text-gray-400">
            Social Media
          </button>

          <button className="text-gray-400">
            Contact
          </button>

        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div>
            <label className="block mb-2 font-medium">
              Upload Logo
            </label>

            <div className="border-2 border-dashed rounded-lg h-48 flex items-center justify-center text-gray-400">
              Browse Photo
            </div>
          </div>

          <div className="col-span-2">
            <label className="block mb-2 font-medium">
              Banner Image
            </label>

            <div className="border-2 border-dashed rounded-lg h-48 flex items-center justify-center text-gray-400">
              Browse Banner
            </div>
          </div>

        </div>

        {/* Company Name */}
        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />

        </div>

        {/* About Us */}
        <div className="mb-8">

          <label className="block mb-2 font-medium">
            About Us
          </label>

          <textarea
            rows="6"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Write down about your company..."
            className="w-full border rounded-md px-3 py-2"
          />

        </div>

        {/* Button */}
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700"
        >
          Save & Next →
        </button>

      </div>

      {/* Footer */}
      <div className="mt-auto text-center text-gray-500 py-4 border-t">
        © 2025 Job Portal
      </div>

    </div>
  );
}