import { useEffect, useState } from "react";

import CandidateSidebar from "../../components/candidate/CandidateSidebar";
import SettingsTabs from "../../components/candidate/settings/SettingsTabs";
import PersonalSettings from "../../components/candidate/settings/PersonalSettings";
import Loader from "../../components/common/Loader";
import ProfileSettings from "../../components/candidate/settings/ProfileSettings";

import { getCandidateSettings } from "../../services/candidateSettingsService.js";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    headline: "",
    experience: "",
    education: "",
    website: "",
    profilePicture: "",
  });
  const [profileDetails, setProfileDetails] = useState({
  nationality: "",
  dateOfBirth: "",
  gender: "",
  maritalStatus: "",
  education: "",
  experience: "",
  biography: "",
  });

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const data = await getCandidateSettings();

        setProfile(data.profile);
        setResumes(data.resumes);
        setProfileDetails(data.profileDetails);
      } catch (error) {
        console.error("Failed to fetch candidate settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const renderTabContent = () => {
    if (activeTab === "personal") {
      return (
        <PersonalSettings
          profile={profile}
          setProfile={setProfile}
          resumes={resumes}
          setResumes={setResumes}
        />
      );
    }

   if (activeTab === "profile") {
  return (
    <ProfileSettings
      profileDetails={profileDetails}
      setProfileDetails={setProfileDetails}
    />
  );
}

    if (activeTab === "social") {
      return (
        <div className="border border-gray-200 rounded-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Social Links Section
          </h2>
          <p className="text-gray-500 mt-2">
            You can add Facebook, LinkedIn, Twitter, and portfolio links here.
          </p>
        </div>
      );
    }

    if (activeTab === "account") {
      return (
        <div className="border border-gray-200 rounded-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Account Setting Section
          </h2>
          <p className="text-gray-500 mt-2">
            You can add password change and account security settings here.
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-x border-gray-200">
        <CandidateSidebar />

        <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Setting
          </h1>

          <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {loading ? <Loader /> : renderTabContent()}
        </section>
      </div>
    </div>
  );
}