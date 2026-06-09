export const validatePersonalSettings = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  if (!formData.headline.trim()) {
    errors.headline = "Title/headline is required";
  }

  if (!formData.experience) {
    errors.experience = "Please select experience";
  }

  if (!formData.education) {
    errors.education = "Please select education";
  }

  if (formData.website.trim()) {
    const websiteRegex =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (!websiteRegex.test(formData.website.trim())) {
      errors.website = "Enter a valid website URL";
    }
  }

  return errors;
};

export const validateProfileImage = (file) => {
  const errors = {};

  if (!file) {
    errors.profilePicture = "Please select an image";
    return errors;
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    errors.profilePicture = "Only JPG, JPEG, and PNG images are allowed";
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    errors.profilePicture = "Image size must be less than 5 MB";
  }

  return errors;
};

export const validateResumeFile = (file) => {
  const errors = {};

  if (!file) {
    errors.resume = "Please select a resume file";
    return errors;
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    errors.resume = "Only PDF, DOC, and DOCX files are allowed";
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    errors.resume = "Resume size must be less than 5 MB";
  }

  return errors;
};
export const validateProfileSettings = (formData) => {
  const errors = {};

  if (!formData.nationality) {
    errors.nationality = "Please select nationality";
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  }

  if (!formData.gender) {
    errors.gender = "Please select gender";
  }

  if (!formData.maritalStatus) {
    errors.maritalStatus = "Please select marital status";
  }

  if (!formData.education) {
    errors.education = "Please select education";
  }

  if (!formData.experience) {
    errors.experience = "Please select experience";
  }

  if (!formData.biography.trim()) {
    errors.biography = "Biography is required";
  } else if (formData.biography.trim().length < 30) {
    errors.biography = "Biography must be at least 30 characters";
  }

  return errors;
};
export const validateSocialLinks = (socialLinks) => {
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
export const validateContactInfo = (contactInfo) => {
  const errors = {};

  if (!contactInfo.mapLocation.trim()) {
    errors.mapLocation = "Map location is required";
  }

  if (!contactInfo.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (contactInfo.phone.trim().length < 8) {
    errors.phone = "Enter a valid phone number";
  }

  if (!contactInfo.email.trim()) {
    errors.email = "Email address is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(contactInfo.email.trim())) {
      errors.email = "Enter a valid email address";
    }
  }

  return errors;
};

export const validateJobAlertsSettings = (jobAlerts) => {
  const errors = {};

  if (!jobAlerts.role.trim()) {
    errors.role = "Job role is required";
  }

  if (!jobAlerts.location.trim()) {
    errors.location = "Location is required";
  }

  return errors;
};

export const validatePasswordSettings = (passwordData) => {
  const errors = {};

  if (!passwordData.currentPassword.trim()) {
    errors.currentPassword = "Current password is required";
  }

  if (!passwordData.newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else if (passwordData.newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  }

  if (!passwordData.confirmPassword.trim()) {
    errors.confirmPassword = "Confirm password is required";
  } else if (passwordData.newPassword !== passwordData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};