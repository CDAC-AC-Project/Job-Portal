import { jobs } from "../data/jobs.js";
import { getCompanyInitials, getCompanyLogoStyle, formatJobType } from "../utils/jobDisplay.js";

const STORAGE_KEY = "favoriteJobIds";

function readIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function toRowShape(job) {
  const logoStyle = getCompanyLogoStyle(job.id);

  return {
    id: job.id,
    title: job.title,
    company: job.company,
    type: formatJobType(job.type),
    location: job.location,
    salary: job.salary,
    remaining: "Posted recently",
    expired: false,
    logoText: getCompanyInitials(job.company),
    logoBg: logoStyle.bg,
    logoColor: logoStyle.text,
  };
}

export const getFavoriteJobs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ids = readIds();
      const favorites = ids
        .map((id) => jobs.find((job) => job.id === id))
        .filter(Boolean)
        .map(toRowShape);
      resolve(favorites);
    }, 400);
  });
};

export function isJobFavorited(jobId) {
  return readIds().includes(jobId);
}

export function toggleFavoriteJob(jobId) {
  const ids = readIds();
  const isFavorited = ids.includes(jobId);

  const updated = isFavorited
    ? ids.filter((id) => id !== jobId)
    : [...ids, jobId];

  writeIds(updated);
  return !isFavorited;
}

export function removeFavoriteJob(jobId) {
  writeIds(readIds().filter((id) => id !== jobId));
}
