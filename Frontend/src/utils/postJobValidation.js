export const validatePostJobForm = (formData) => {
  const errors = {};

  if (!formData.jobTitle.trim()) {
    errors.jobTitle = "Job title is required";
  }

  if (!formData.tags.trim()) {
    errors.tags = "Tags are required";
  }

  if (!formData.jobRole) {
    errors.jobRole = "Please select job role";
  }

  if (!formData.minSalary) {
    errors.minSalary = "Minimum salary is required";
  }

  if (!formData.maxSalary) {
    errors.maxSalary = "Maximum salary is required";
  }

  if (
    formData.minSalary &&
    formData.maxSalary &&
    Number(formData.minSalary) > Number(formData.maxSalary)
  ) {
    errors.maxSalary = "Maximum salary should be greater than minimum salary";
  }

  if (!formData.salaryType) {
    errors.salaryType = "Please select salary type";
  }

  if (!formData.education) {
    errors.education = "Please select education";
  }

  if (!formData.experience) {
    errors.experience = "Please select experience";
  }

  if (!formData.jobType) {
    errors.jobType = "Please select job type";
  }

  if (!formData.vacancies) {
    errors.vacancies = "Please select vacancies";
  }

  if (!formData.expirationDate) {
    errors.expirationDate = "Expiration date is required";
  }

  if (!formData.jobLevel) {
    errors.jobLevel = "Please select job level";
  }

  if (!formData.isRemote) {
    if (!formData.country) {
      errors.country = "Please select country";
    }

    if (!formData.city) {
      errors.city = "Please select city";
    }
  }

  if (!formData.description.trim()) {
    errors.description = "Job description is required";
  } else if (formData.description.trim().length < 30) {
    errors.description = "Description must be at least 30 characters";
  }

  return errors;
};