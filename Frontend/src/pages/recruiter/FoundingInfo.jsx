import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Footer from "../../components/layout/Footer";

export default function FoundingInfo() {
  const [formData, setFormData] = useState({
    organizationType: "",
    industryType: "",
    teamSize: "",
    yearOfEstablishment: "",
    companyWebsite: "",
    companyVision: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Founding Info Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-10 py-5 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">JobPilot</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full py-10 px-6">
        {/* Step Navigation */}
        <div className="flex justify-center gap-10 border-b border-gray-200 pb-4 mb-8 text-sm">
          <button className="text-gray-400">Company Info</button>
          <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-4 -mb-4">
            Founding Info
          </button>
          <button className="text-gray-400">Social Media Profile</button>
          <button className="text-gray-400">Contact</button>
        </div>

        <form onSubmit={handleNext}>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Founding Information
          </h2>

          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Organization Type
              </label>

              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="private">Private Company</option>
                <option value="public">Public Company</option>
                <option value="startup">Startup</option>
                <option value="government">Government</option>
                <option value="ngo">NGO</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Industry Type
              </label>

              <select
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="it">Information Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Team Size
              </label>

              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="1-10">1 - 10 Employees</option>
                <option value="11-50">11 - 50 Employees</option>
                <option value="51-100">51 - 100 Employees</option>
                <option value="101-500">101 - 500 Employees</option>
                <option value="500+">500+ Employees</option>
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="Year of Establishment"
              type="number"
              name="yearOfEstablishment"
              placeholder="Enter year"
              value={formData.yearOfEstablishment}
              onChange={handleChange}
            />

            <Input
              label="Company Website"
              type="url"
              name="companyWebsite"
              placeholder="https://example.com"
              value={formData.companyWebsite}
              onChange={handleChange}
            />
          </div>

          <div className="mb-8">
            <TextArea
              label="Company Vision"
              name="companyVision"
              placeholder="Tell candidates about your company vision..."
              value={formData.companyVision}
              onChange={handleChange}
              rows={6}
            />
          </div>

          <div className="flex gap-4">
            <Button variant="secondary">Previous</Button>
            <Button type="submit">Save & Next →</Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}