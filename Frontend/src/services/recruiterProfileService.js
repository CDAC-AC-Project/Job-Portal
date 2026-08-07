import httpClient from "../utils/httpClient";

const PROFILE_API = "/api/profile/recruiters";

export const getRecruiterProfile = async (recruiterId) => {
  const response = await httpClient.get(`${PROFILE_API}/${recruiterId}`);
  return response.data;
};