import {
  candidateProfileData,
  candidateResumeData,
  candidateProfileDetailsData,
   candidateSocialLinksData,
   candidateAccountSettingsData,
} from "../data/candidateSettingsData";

export const getCandidateSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profile: candidateProfileData,
        resumes: candidateResumeData,
        profileDetails: candidateProfileDetailsData,
        socialLinks: candidateSocialLinksData,
        accountSettings: candidateAccountSettingsData,
      });
    }, 400);
  });
};

export const updateCandidateProfile = async (profileData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Profile updated:", profileData);
      resolve({
        success: true,
        message: "Profile updated successfully",
      });
    }, 400);
  });
};

export const uploadCandidateResume = async (resumeFile) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        name: resumeFile.name.replace(/\.[^/.]+$/, ""),
        size: `${(resumeFile.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: resumeFile.name.split(".").pop().toUpperCase(),
      });
    }, 400);
  });
};

export const deleteCandidateResume = async (resumeId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Deleted resume id:", resumeId);
      resolve({
        success: true,
      });
    }, 300);
  });
};
export const updateCandidateProfileDetails = async (profileDetails) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Profile details updated:", profileDetails);

      resolve({
        success: true,
        message: "Profile details updated successfully",
      });
    }, 400);
  });
};
export const updateCandidateSocialLinks = async (socialLinks) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Social links updated:", socialLinks);

      resolve({
        success: true,
        message: "Social links updated successfully",
      });
    }, 400);
  });
};
export const updateCandidateContactInfo = async (contactInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Contact info updated:", contactInfo);
      resolve({
        success: true,
        message: "Contact info updated successfully",
      });
    }, 400);
  });
};

export const updateCandidateNotifications = async (notifications) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Notifications updated:", notifications);
      resolve({
        success: true,
        message: "Notifications updated successfully",
      });
    }, 400);
  });
};

export const updateCandidateJobAlerts = async (jobAlerts) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Job alerts updated:", jobAlerts);
      resolve({
        success: true,
        message: "Job alerts updated successfully",
      });
    }, 400);
  });
};

export const updateCandidatePrivacy = async (privacy) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Privacy updated:", privacy);
      resolve({
        success: true,
        message: "Privacy updated successfully",
      });
    }, 400);
  });
};

export const updateCandidatePassword = async (passwordData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Password updated:", passwordData);
      resolve({
        success: true,
        message: "Password updated successfully",
      });
    }, 400);
  });
};

export const deleteCandidateAccount = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Candidate account deleted");
      resolve({
        success: true,
        message: "Account deleted successfully",
      });
    }, 400);
  });
};
/*
Later backend API structure:

import axios from "axios";

const API_URL = "http://localhost:8080/api/candidate/settings";

export const getCandidateSettings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateCandidateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/profile`, profileData);
  return response.data;
};

export const uploadCandidateResume = async (resumeFile) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);

  const response = await axios.post(`${API_URL}/resume`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteCandidateResume = async (resumeId) => {
  const response = await axios.delete(`${API_URL}/resume/${resumeId}`);
  return response.data;
};
*/