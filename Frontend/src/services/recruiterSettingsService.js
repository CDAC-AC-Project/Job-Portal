import {
  recruiterCompanyInfoData,
  recruiterFoundingInfoData,
  recruiterSocialLinksData,
  recruiterAccountSettingsData,
} from "../data/recruiterSettingsData";

export const getRecruiterSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        companyInfo: recruiterCompanyInfoData,
        foundingInfo: recruiterFoundingInfoData,
        socialLinks: recruiterSocialLinksData,
        accountSettings: recruiterAccountSettingsData,
      });
    }, 300);
  });
};

export const updateRecruiterCompanyInfo = async (companyInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Company info updated:", companyInfo);
      resolve({ success: true });
    }, 300);
  });
};

export const updateRecruiterFoundingInfo = async (foundingInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Founding info updated:", foundingInfo);
      resolve({ success: true });
    }, 300);
  });
};

export const updateRecruiterSocialLinks = async (socialLinks) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Social links updated:", socialLinks);
      resolve({ success: true });
    }, 300);
  });
};

export const updateRecruiterAccountSettings = async (accountSettings) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Account settings updated:", accountSettings);
      resolve({ success: true });
    }, 300);
  });
};

export const updateRecruiterPassword = async (passwordData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Password updated:", passwordData);
      resolve({ success: true });
    }, 300);
  });
};

export const deleteRecruiterCompany = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Company account deleted");
      resolve({ success: true });
    }, 300);
  });
};