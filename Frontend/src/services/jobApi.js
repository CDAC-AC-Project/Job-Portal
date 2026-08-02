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

export const getJobDetails = async (jobId) => {
  const response = await axios.get(
    `http://localhost:8083/jobs/${jobId}`
  );

  return response.data;
};