export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  if (!formData.username.trim()) {
    errors.username = "Username is required";
  } else if (formData.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Password must contain at least one number";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!formData.agree) {
    errors.agree = "You must agree to the Terms of Services";
  }

  return errors;
};