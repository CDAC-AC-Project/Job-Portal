import axios from "axios";

const STORAGE_KEY = "recruiterJobs";

const JOBS_API_URL =
  "http://localhost:8083/jobs/recruiter/my-jobs";

const recruiterJobStatuses = [
  "ACTIVE",
  "CLOSED",
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
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

const formatJobStatus = (status) => {
  switch (status) {
    case "ACTIVE":
      return "Active";

    case "CLOSED":
      return "Expire";

    case "DELETED":
      return "Deleted";

    default:
      return status || "Unknown";
  }
};

const mapBackendJob = (job) => ({
  id: job.id,
  jobTitle: job.title,
  jobType: formatJobType(job.jobType),
  expirationDate:
    job.expirationDate ||
    job.expiryDate ||
    "Not specified",
  status: formatJobStatus(job.status),
  applications:
    job.applicationCount ??
    job.applications ??
    0,
  createdAt: job.createdAt,
});

export const fetchRecruiterJobs = async () => {
  const recruiterId =
    localStorage.getItem("userId");

  const role =
    localStorage.getItem("role");

  const token =
    localStorage.getItem("token");

  if (!recruiterId || !role) {
    throw new Error(
      "Recruiter login details were not found. Please sign in again."
    );
  }

  const headers = {
    "X-User-Id": recruiterId,
    "X-User-Role": role,
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  try {
    const requests =
      recruiterJobStatuses.map(
        (status) =>
          axios.get(JOBS_API_URL, {
            params: {
              status,
            },
            headers,
          })
      );

    const responses =
      await Promise.all(requests);

    const mergedJobs =
      responses.flatMap((response) => {
        const responseData =
          response.data;

        if (Array.isArray(responseData)) {
          return responseData;
        }

        if (
          Array.isArray(
            responseData?.content
          )
        ) {
          return responseData.content;
        }

        if (
          Array.isArray(responseData?.data)
        ) {
          return responseData.data;
        }

        return [];
      });

    const uniqueJobs = Array.from(
      new Map(
        mergedJobs.map((job) => [
          job.id,
          job,
        ])
      ).values()
    );

    return uniqueJobs
      .sort(
        (
          firstJob,
          secondJob
        ) => {
          const firstCreatedAt =
            firstJob.createdAt
              ? new Date(
                  firstJob.createdAt
                ).getTime()
              : 0;

          const secondCreatedAt =
            secondJob.createdAt
              ? new Date(
                  secondJob.createdAt
                ).getTime()
              : 0;

          return (
            secondCreatedAt -
            firstCreatedAt
          );
        }
      )
      .map(mapBackendJob);
  } catch (error) {
    console.error(
      "Failed to fetch recruiter jobs:",
      error.response?.data ||
        error.message
    );

    throw new Error(
      error.response?.data?.message ||
        "Unable to fetch recruiter jobs."
    );
  }
};