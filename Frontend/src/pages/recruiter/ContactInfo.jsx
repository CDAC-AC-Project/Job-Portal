import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Footer from "../../components/layout/Footer";
import RecruiterSetupSteps from "../../components/recruiter/RecruiterSetupSteps";
import SetupProgressBar from "../../components/recruiter/SetupProgressBar";
import { useNavigate } from "react-router-dom";

export default function ContactInfo() {
  const [contactData, setContactData] = useState({
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Contact Info:", contactData);
  navigate("/recruiter/profile-complete");
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
       <header className="bg-white px-10 py-5 border-b border-gray-200">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">JobPilot</h1>
            <SetupProgressBar progress={100} />
          </div>
          </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto w-full py-10 px-6">
        <RecruiterSetupSteps />

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91 9876543210"
              value={contactData.phone}
              onChange={handleChange}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="hr@company.com"
              value={contactData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <TextArea
              label="Address"
              name="address"
              placeholder="Enter company full address..."
              value={contactData.address}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <Input
              label="City"
              name="city"
              placeholder="Pune"
              value={contactData.city}
              onChange={handleChange}
            />

            <Input
              label="State"
              name="state"
              placeholder="Maharashtra"
              value={contactData.state}
              onChange={handleChange}
            />

            <Input
              label="Country"
              name="country"
              placeholder="India"
              value={contactData.country}
              onChange={handleChange}
            />

            <Input
              label="Zip Code"
              name="zipCode"
              placeholder="411001"
              value={contactData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="secondary">Previous</Button>
            <Button type="submit">Finish Setup →</Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}