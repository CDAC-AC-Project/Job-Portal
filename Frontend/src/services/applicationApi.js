import api from "./api";

export const applyJob = async (jobId, candidateId, resumeId) => {

  console.log("Applying to job:", jobId);

  const response = await api.post(
    `/applications/jobs/${jobId}/apply`,
    {
      resumeId,
    },
    {
      headers: {
        candidateId,
      },
    }
  );

  return response.data;
};

export const getMyApplications = async (candidateId) => {
  const response = await api.get(
    "/applications/candidate/my-applications",
    {
      headers: {
        candidateId,
      },
    }
  );

  return response.data;
};

export const getApplicationDetails = async (applicationId) => {
  const response = await api.get(`/applications/${applicationId}`);

  return response.data;
};

export const withdrawApplication = async (
  applicationId,
  candidateId
) => {
  const response = await api.patch(
    `/applications/${applicationId}/withdraw`,
    {},
    {
      headers: {
        candidateId,
      },
    }
  );

  return response.data;
};