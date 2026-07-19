const PLAN_LIMITS = {
  FREE: 3,
  STANDARD: 6,
  PREMIUM: Infinity,
};

export const getRecruiterPlan = () => {
  return localStorage.getItem("recruiterPlan") || "FREE";
};

export const setRecruiterPlan = (plan) => {
  localStorage.setItem("recruiterPlan", plan);
};

export const getPostedJobCount = () => {
  return Number(localStorage.getItem("postedJobCount")) || 0;
};

export const incrementPostedJobCount = () => {
  const currentCount = getPostedJobCount();
  localStorage.setItem("postedJobCount", currentCount + 1);
};

export const canPostJob = () => {
  const plan = getRecruiterPlan();
  const postedJobs = getPostedJobCount();
  const limit = PLAN_LIMITS[plan];

  return postedJobs < limit;
};

export const getRemainingJobPosts = () => {
  const plan = getRecruiterPlan();
  const postedJobs = getPostedJobCount();
  const limit = PLAN_LIMITS[plan];

  if (limit === Infinity) {
    return "Unlimited";
  }

  return Math.max(limit - postedJobs, 0);
};

export const getPlanLimit = () => {
  const plan = getRecruiterPlan();
  return PLAN_LIMITS[plan];
};