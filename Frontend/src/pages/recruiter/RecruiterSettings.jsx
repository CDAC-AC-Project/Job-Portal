import { useEffect, useState } from "react";

import RecruiterHeader from "../../components/recruiter/RecruiterHeader";
import RecruiterSidebar from "../../components/recruiter/RecruiterSidebar";

import RecruiterSettingsTabs from "../../components/recruiter/settings/RecruiterSettingsTabs";
import CompanyInfoSettings from "../../components/recruiter/settings/CompanyInfoSettings";
import FoundingInfoSettings from "../../components/recruiter/settings/FoundingInfoSettings";
import RecruiterSocialSettings from "../../components/recruiter/settings/RecruiterSocialSettings";
import RecruiterAccountSettings from "../../components/recruiter/settings/RecruiterAccountSettings";
import Footer from "../../components/layout/Footer";

import { getRecruiterSettings } from "../../services/recruiterSettingsService";

export default function RecruiterSettings() {
  const [activeTab, setActiveTab] = useState("company");
  const [loading, setLoading] = useState(true);

  const [companyInfo, setCompanyInfo] = useState({
    logo: "",
    banner: "",
    companyName: "",
    aboutUs: "",
  });

  const [foundingInfo, setFoundingInfo] = useState({
    organizationType: "",
    industryType: "",
    teamSize: "",
    yearOfEstablishment: "",
    companyWebsite: "",
    companyVision: "",
  });

  const [socialLinks, setSocialLinks] = useState([]);

  const [accountSettings, setAccountSettings] = useState({
    mapLocation: "",
    countryCode: "+880",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const data = await getRecruiterSettings();

        setCompanyInfo(data.companyInfo);
        setFoundingInfo(data.foundingInfo);
        setSocialLinks(data.socialLinks);
        setAccountSettings(data.accountSettings);
      } catch (error) {
        console.error("Failed to fetch recruiter settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const renderTabContent = () => {
    if (activeTab === "company") {
      return (
        <CompanyInfoSettings
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
        />
      );
    }

    if (activeTab === "founding") {
      return (
        <FoundingInfoSettings
          foundingInfo={foundingInfo}
          setFoundingInfo={setFoundingInfo}
        />
      );
    }

    if (activeTab === "social") {
      return (
        <RecruiterSocialSettings
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />
      );
    }

    if (activeTab === "account") {
      return (
        <RecruiterAccountSettings
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <RecruiterHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
          <RecruiterSidebar />

          <section className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Settings
            </h1>

            <RecruiterSettingsTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {loading ? (
              <div className="py-20 text-center text-gray-500">
                Loading settings...
              </div>
            ) : (
              renderTabContent()
            )}
          </section>
        </div>
      </main>

      <footer/>
    </div>
  );
}