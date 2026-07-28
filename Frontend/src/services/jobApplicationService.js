import { addNotification } from "./notificationService";

const STORAGE_KEY = "candidateApplications";

export const APPLICATION_STATUS = {
  APPLIED: "Applied",
  UNDER_REVIEW: "Under Review",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview Scheduled",
};

export const STATUS_ORDER = [
  APPLICATION_STATUS.APPLIED,
  APPLICATION_STATUS.UNDER_REVIEW,
  APPLICATION_STATUS.SHORTLISTED,
  APPLICATION_STATUS.INTERVIEW,
];

// Demo-only: simulates a recruiter reviewing the application over time,
// since there is no backend wiring applications to recruiter decisions yet.
const STATUS_THRESHOLDS_MINUTES = [
  { minutes: 10, status: APPLICATION_STATUS.INTERVIEW },
  { minutes: 5, status: APPLICATION_STATUS.SHORTLISTED },
  { minutes: 2, status: APPLICATION_STATUS.UNDER_REVIEW },
  { minutes: 0, status: APPLICATION_STATUS.APPLIED },
];

function computeStatus(dateApplied) {
  const elapsedMinutes = (Date.now() - new Date(dateApplied).getTime()) / 60000;
  const match = STATUS_THRESHOLDS_MINUTES.find((t) => elapsedMinutes >= t.minutes);
  return match ? match.status : APPLICATION_STATUS.APPLIED;
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export async function getAppliedJobs() {
  const applications = readAll();
  let changed = false;

  const withCurrentStatus = applications.map((application) => {
    const currentStatus = computeStatus(application.dateApplied);

    if (currentStatus !== application.status) {
      changed = true;
      addNotification({
        type: "status",
        title: "Application update",
        message: `Your application for ${application.title} at ${application.company} moved to "${currentStatus}".`,
      });
      return { ...application, status: currentStatus };
    }

    return application;
  });

  if (changed) {
    writeAll(withCurrentStatus);
  }

  return withCurrentStatus.sort(
    (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
  );
}

export function hasAppliedToJob(jobId) {
  if (jobId === undefined || jobId === null) return false;
  return readAll().some((application) => application.jobId === jobId);
}

export async function applyToJob(job, { note = "" } = {}) {
  const applications = readAll();

  const application = {
    id: `app-${Date.now()}`,
    jobId: job.id ?? null,
    title: job.title,
    company: job.company,
    location: job.location,
    salary: job.salary,
    type: job.type,
    note,
    dateApplied: new Date().toISOString(),
    status: APPLICATION_STATUS.APPLIED,
  };

  const updated = [application, ...applications];
  writeAll(updated);

  addNotification({
    type: "application",
    title: "Application submitted",
    message: `You applied to ${job.title} at ${job.company}.`,
  });

  return application;
}

export function withdrawApplication(applicationId) {
  const updated = readAll().filter(
    (application) => application.id !== applicationId
  );
  writeAll(updated);
  return updated;
}
