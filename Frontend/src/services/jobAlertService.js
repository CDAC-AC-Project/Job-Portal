import { jobAlertsData } from "../data/jobAlertsData";

export const getJobAlerts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobAlertsData);
    }, 400);
  });
};

/*
Later backend API:

import axios from "axios";

const API_URL = "http://localhost:8080/api/candidate/job-alerts";

export const getJobAlerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
*/