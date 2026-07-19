import { useEffect, useState } from "react";

import CandidateSidebar from "../../components/candidate/CandidateSidebar";
import SettingsTabs from "../../components/candidate/settings/SettingsTabs";
import PersonalSettings from "../../components/candidate/settings/PersonalSettings";
import Loader from "../../components/common/Loader";
import ProfileSettings from "../../components/candidate/settings/ProfileSettings";
import SocialLinksSettings from "../../components/candidate/settings/SocialLinksSettings";
import { getCandidateSettings } from "../../services/candidateSettingsService.js";
import AccountSettings from "../../components/candidate/settings/AccountSettings";

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
  const [accountSettings, setAccountSettings] = useState({
  mapLocation: "",
  countryCode: "+880",
  phone: "",
  email: "",
  notifications: {
    shortlisted: true,
    savedProfile: false,
    appliedJobsExpire: false,
    rejected: true,
    jobAlerts: true,
  },
  jobAlerts: {
    role: "",
    location: "",
  },
  privacy: {
    profilePublic: true,
    resumePrivate: false,
  },
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
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const data = await getCandidateSettings();

        setProfile(data.profile);
        setResumes(data.resumes);
        setProfileDetails(data.profileDetails);
        setSocialLinks(data.socialLinks);
        setAccountSettings(data.accountSettings);
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
    <SocialLinksSettings
      socialLinks={socialLinks}
      setSocialLinks={setSocialLinks}
    />
  );
 }

      if (activeTab === "account") {
      return (
        <AccountSettings
          accountSettings={accountSettings}
          setAccountSettings={setAccountSettings}
        />
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