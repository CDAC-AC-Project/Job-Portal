import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Footer from "../../components/layout/Footer";
import RecruiterSetupSteps from "../../components/recruiter/RecruiterSetupSteps";
import SetupProgressBar from "../../components/recruiter/SetupProgressBar";

export default function SocialMediaProfile() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSocialLinks({
      ...socialLinks,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Social Media Links:", socialLinks);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
       <header className="bg-white px-10 py-5 border-b border-gray-200">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">JobPilot</h1>
            <SetupProgressBar progress={75} />
          </div>
          </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto w-full py-10 px-6">
        <RecruiterSetupSteps />

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Social Media Profile
          </h2>

          <div className="space-y-5">
            <Input
              label="Facebook"
              name="facebook"
              type="url"
              placeholder="https://www.facebook.com/company"
              value={socialLinks.facebook}
              onChange={handleChange}
            />

            <Input
              label="Twitter"
              name="twitter"
              type="url"
              placeholder="https://www.twitter.com/company"
              value={socialLinks.twitter}
              onChange={handleChange}
            />

            <Input
              label="Instagram"
              name="instagram"
              type="url"
              placeholder="https://www.instagram.com/company"
              value={socialLinks.instagram}
              onChange={handleChange}
            />

            <Input
              label="LinkedIn"
              name="linkedin"
              type="url"
              placeholder="https://www.linkedin.com/company/company-name"
              value={socialLinks.linkedin}
              onChange={handleChange}
            />

            <Input
              label="YouTube"
              name="youtube"
              type="url"
              placeholder="https://www.youtube.com/company"
              value={socialLinks.youtube}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="secondary">Previous</Button>
            <Button type="submit">Save & Next →</Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}