import {
  recruiterApplicationsData,
  applicationColumnsData,
} from "../data/recruiterApplicationsData";

export const getRecruiterApplications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        columns: applicationColumnsData,
        applications: recruiterApplicationsData,
      });
    }, 300);
  });
};

/*
Later backend API:

import axios from "axios";

const API_URL = "http://localhost:8080/api/recruiter/applications";

export const getRecruiterApplications = async (jobId) => {
  const response = await axios.get(`${API_URL}/${jobId}`);
  return response.data;
};
*/