const STORAGE_KEY = "recruiterJobs";

const defaultJobs = [
  {
    id: 1,
    jobTitle: "UI/UX Designer",
    jobType: "Full Time",
    expirationDate: "27 days remaining",
    status: "Active",
    applications: 798,
  },
  {
    id: 2,
    jobTitle: "Senior UX Designer",
    jobType: "Internship",
    expirationDate: "8 days remaining",
    status: "Active",
    applications: 185,
  },
  {
    id: 3,
    jobTitle: "Junior Graphic Designer",
    jobType: "Full Time",
    expirationDate: "24 days remaining",
    status: "Active",
    applications: 583,
  },
  {
    id: 4,
    jobTitle: "Front End Developer",
    jobType: "Full Time",
    expirationDate: "Dec 7, 2019",
    status: "Expire",
    applications: 740,
  },
];

export const getRecruiterJobs = () => {
  const savedJobs = localStorage.getItem(STORAGE_KEY);

  if (!savedJobs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultJobs));
    return defaultJobs;
  }

  return JSON.parse(savedJobs);
};

export const saveRecruiterJob = (jobData) => {
  const jobs = getRecruiterJobs();

  const newJob = {
    id: Date.now(),
    jobTitle: jobData.jobTitle,
    jobType: jobData.jobType,
    expirationDate: jobData.expirationDate || "4 days remaining",
    status: "Active",
    applications: 0,
    createdAt: new Date().toISOString(),
    ...jobData,
  };

  const updatedJobs = [newJob, ...jobs];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));

  return newJob;
};

export const updateRecruiterJobStatus = (jobId, status) => {
  const jobs = getRecruiterJobs();

  const updatedJobs = jobs.map((job) =>
    job.id === jobId ? { ...job, status } : job
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));

  return updatedJobs;
};