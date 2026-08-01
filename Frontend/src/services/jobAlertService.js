import { jobAlertsData } from "../data/jobAlertsData";

const SAVED_KEY = "savedJobAlertIds";

export const getJobAlertCount = () => {
  return jobAlertsData.length;
};

export const getSavedJobAlertCount = () => {
    return readSavedIds().length;
};

function readSavedIds() {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (raw) return JSON.parse(raw);

    const seeded = jobAlertsData.filter((alert) => alert.saved).map((alert) => alert.id);
    localStorage.setItem(SAVED_KEY, JSON.stringify(seeded));
    return seeded;
  } catch {
    return [];
  }
}

function writeSavedIds(ids) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}

export const getJobAlerts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedIds = readSavedIds();
      resolve(
        jobAlertsData.map((alert) => ({ ...alert, saved: savedIds.includes(alert.id) }))
      );
    }, 400);
  });
};

export function toggleJobAlertSaved(alertId) {
  const ids = readSavedIds();
  const isSaved = ids.includes(alertId);
  const updated = isSaved ? ids.filter((id) => id !== alertId) : [...ids, alertId];
  writeSavedIds(updated);
  return !isSaved;
}

/*
Later backend API:

import axios from "axios";

const API_URL = "http://localhost:8080/api/candidate/job-alerts";

export const getJobAlerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
*/
