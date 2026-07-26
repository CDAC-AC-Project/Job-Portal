import axios from "axios";

const API_URL = "http://localhost:8083/recruiter/dashboard";

export const getRecruiterDashboardCounts = async () => {
  const recruiterId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!recruiterId || !role) {
    throw new Error(
      "Recruiter login details were not found. Please sign in again."
    );
  }

  const response = await axios.get(API_URL, {
    headers: {
      "X-User-Id": recruiterId,
      "X-User-Role": role,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  return response.data;
};