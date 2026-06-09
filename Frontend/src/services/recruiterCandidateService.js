import { savedCandidatesData } from "../data/savedCandidatesData";

export const getSavedCandidates = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(savedCandidatesData);
    }, 300);
  });
};

export const getCandidateById = async (candidateId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const candidate = savedCandidatesData.find(
        (item) => item.id === Number(candidateId)
      );

      resolve(candidate || null);
    }, 300);
  });
};

/*
Later backend API:

import axios from "axios";

const API_URL = "http://localhost:8080/api/recruiter/candidates";

export const getSavedCandidates = async () => {
  const response = await axios.get(`${API_URL}/saved`);
  return response.data;
};

export const getCandidateById = async (candidateId) => {
  const response = await axios.get(`${API_URL}/${candidateId}`);
  return response.data;
};
*/