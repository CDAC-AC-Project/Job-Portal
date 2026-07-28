const STORAGE_KEY = "candidateNotifications";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = [
        {
          id: "seed-welcome",
          type: "system",
          title: "Welcome to Jobpilot",
          message: "Complete your profile to get better job matches and stand out to recruiters.",
          createdAt: new Date().toISOString(),
          read: false,
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeAll(notifications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export function getNotifications() {
  return readAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getUnreadCount() {
  return readAll().filter((n) => !n.read).length;
}

export function addNotification({ title, message, type = "system" }) {
  const notifications = readAll();

  const notification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };

  const updated = [notification, ...notifications];
  writeAll(updated);
  return updated;
}

export function markAsRead(notificationId) {
  const updated = readAll().map((n) =>
    n.id === notificationId ? { ...n, read: true } : n
  );
  writeAll(updated);
  return updated;
}

export function markAllAsRead() {
  const updated = readAll().map((n) => ({ ...n, read: true }));
  writeAll(updated);
  return updated;
}
