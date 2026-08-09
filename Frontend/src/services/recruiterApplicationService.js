import axios from "axios";

const BASE_URL = "http://localhost:8084/applications";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "X-User-Id": localStorage.getItem("userId"),
});

export const getRecruiterApplications = async () => {
  const response = await axios.get(
    `${BASE_URL}/recruiter`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

export const shortlistCandidate = async (applicationId) => {
  await axios.patch(
    `${BASE_URL}/${applicationId}/status`,
    {
      status: "SHORTLISTED",
    },
    {
      headers: getAuthHeaders(),
    }
  );
};

export const rejectCandidate = async (applicationId) => {
  await axios.patch(
    `${BASE_URL}/${applicationId}/status`,
    {
      status: "REJECTED",
    },
    {
      headers: getAuthHeaders(),
    }
  );
};