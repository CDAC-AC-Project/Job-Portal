import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8083",
});

export const searchJobs = async (params = {}) => {
  const response = await API.get("/jobs/search", {
    params,
  });

  return response.data;
};

// Most-recently-posted active jobs, capped server-side (see Jobs-service's
// HOME_JOBS_LIMIT) - also what powers the candidate Job Alerts feed.
export const getHomeJobs = async () => {
  const response = await API.get("/jobs/home");
  return response.data;
};

export const getJobDetails = async (jobId) => {
  const response = await axios.get(
    `http://localhost:8083/jobs/${jobId}`
  );

  return response.data;
};