export const validateCompanyInfo = (data) => {
  const errors = {};

  if (!data.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!data.aboutUs.trim()) {
    errors.aboutUs = "About company is required";
  } else if (data.aboutUs.trim().length < 30) {
    errors.aboutUs = "About company must be at least 30 characters";
  }

  return errors;
};

export const validateFoundingInfo = (data) => {
  const errors = {};

  if (!data.organizationType) {
    errors.organizationType = "Please select organization type";
  }

  if (!data.industryType) {
    errors.industryType = "Please select industry type";
  }

  if (!data.teamSize) {
    errors.teamSize = "Please select team size";
  }

  if (!data.yearOfEstablishment) {
    errors.yearOfEstablishment = "Year of establishment is required";
  }

  if (data.companyWebsite.trim()) {
    const websiteRegex =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (!websiteRegex.test(data.companyWebsite.trim())) {
      errors.companyWebsite = "Enter a valid website URL";
    }
  }

  if (!data.companyVision.trim()) {
    errors.companyVision = "Company vision is required";
  }

  return errors;
};

export const validateRecruiterSocialLinks = (socialLinks) => {
  const errors = {};

  socialLinks.forEach((link) => {
    if (!link.platform) {
      errors[`platform_${link.id}`] = "Please select platform";
    }

    if (link.url.trim()) {
      const urlRegex =
        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

      if (!urlRegex.test(link.url.trim())) {
        errors[`url_${link.id}`] = "Enter a valid profile URL";
      }
    }
  });

  return errors;
};

export const validateRecruiterAccountSettings = (data) => {
  const errors = {};

  if (!data.mapLocation.trim()) {
    errors.mapLocation = "Map location is required";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (data.phone.trim().length < 8) {
    errors.phone = "Enter a valid phone number";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email.trim())) {
      errors.email = "Enter a valid email address";
    }
  }

  return errors;
};

export const validateRecruiterPassword = (data) => {
  const errors = {};

  if (!data.currentPassword.trim()) {
    errors.currentPassword = "Current password is required";
  }

  if (!data.newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else if (data.newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  }

  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};