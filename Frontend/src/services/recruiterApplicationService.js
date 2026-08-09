import axios from "axios";

const API = "http://localhost:8084/applications";

const getHeaders = () => ({
  "X-User-Id": localStorage.getItem("userId"),
  "X-User-Role": localStorage.getItem("role"),
});

export const getRecruiterApplications = async () => {
  const response = await axios.get(`${API}/recruiter`, {
    headers: getHeaders(),
  });

  return response.data;
};

export const shortlistCandidate = async (applicationId) => {
  return axios.patch(
    `${API}/${applicationId}/status`,
    {
      status: "SHORTLISTED",
    },
    {
      headers: getHeaders(),
    }
  );
};

export const rejectCandidate = async (applicationId) => {
  return axios.patch(
    `${API}/${applicationId}/status`,
    {
      status: "REJECTED",
    },
    {
      headers: getHeaders(),
    }
  );
};