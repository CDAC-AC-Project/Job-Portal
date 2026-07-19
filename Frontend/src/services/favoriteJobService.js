import { favoriteJobsData } from "../data/favoriteJobsData.js";

export const getFavoriteJobs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(favoriteJobsData);
    }, 400);
  });
};

/*
Later when backend is ready, replace above code with axios:

import axios from "axios";

const API_URL = "http://localhost:8080/api/candidate/favorite-jobs";

export const getFavoriteJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
*/