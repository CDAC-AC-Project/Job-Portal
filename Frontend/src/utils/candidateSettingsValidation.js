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