const AUTH_KEY = "authUser";

export const ROLES = {
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
  ADMIN: "admin",
};

export const roleHomePath = {
  [ROLES.CANDIDATE]: "/candidate/home",
  [ROLES.RECRUITER]: "/recruiter/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
};

// There is no Auth Service yet to hand back a real user id after login, but
// Profile-Service endpoints are keyed by userId. Derive a stable pseudo id from
// the email so the same account always resolves to the same profile across
// sessions, instead of minting a new (and colliding) profile every login.
function derivePseudoUserId(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || 1;
}

export function login(role, profile = {}) {
  const email = profile.email || "";

  const authUser = {
    role,
    name: profile.name || "",
    email,
    userId: derivePseudoUserId(`${role}:${email}`),
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
  return authUser;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(role) {
  const user = getAuthUser();
  if (!user) return false;
  return role ? user.role === role : true;
}
