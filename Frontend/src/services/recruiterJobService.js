import axios from "axios";

const STORAGE_KEY = "recruiterJobs";

const RECRUITER_JOBS_API_URL =
  "http://localhost:8083/recruiter/jobs";

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

const formatJobType = (jobType) => {
  if (!jobType) {
    return "Not specified";
  }

  return jobType
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

const formatJobStatus = (status) => {
  if (status === "ACTIVE") {
    return "Active";
  }

  return "Expire";
};

export const fetchRecruiterJobs = async () => {
  const recruiterId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!recruiterId || !role) {
    throw new Error(
      "Recruiter login details were not found. Please sign in again."
    );
  }

  const response = await axios.get(
    RECRUITER_JOBS_API_URL,
    {
      headers: {
        "X-User-Id": recruiterId,
        "X-User-Role": role,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    }
  );

  return response.data.map((job) => ({
    id: job.id,
    jobTitle: job.title,
    jobType: formatJobType(job.jobType),
    expirationDate: job.expirationDate,
    status: formatJobStatus(job.status),
    applications: job.applicationCount ?? 0,
  }));
};

export const getRecruiterJobs = () => {
  const savedJobs = localStorage.getItem(STORAGE_KEY);

  if (!savedJobs) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultJobs)
    );

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
    expirationDate:
      jobData.expirationDate || "4 days remaining",
    status: "Active",
    applications: 0,
    createdAt: new Date().toISOString(),
    ...jobData,
  };

  const updatedJobs = [newJob, ...jobs];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJobs)
  );

  return newJob;
};

export const updateRecruiterJobStatus = (
  jobId,
  status
) => {
  const jobs = getRecruiterJobs();

  const updatedJobs = jobs.map((job) =>
    job.id === jobId
      ? {
          ...job,
          status,
        }
      : job
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJobs)
  );

  return updatedJobs;
};

export const getRecruiterJobById = (jobId) => {
  const jobs = getRecruiterJobs();

  return jobs.find(
    (job) => String(job.id) === String(jobId)
  );
};

export const updateRecruiterJob = (
  jobId,
  updatedJobData
) => {
  const jobs = getRecruiterJobs();

  const updatedJobs = jobs.map((job) =>
    String(job.id) === String(jobId)
      ? {
          ...job,
          ...updatedJobData,
          id: job.id,
          status: job.status,
          applications: job.applications,
        }
      : job
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJobs)
  );

  return updatedJobs.find(
    (job) => String(job.id) === String(jobId)
  );
};