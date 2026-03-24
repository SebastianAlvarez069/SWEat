const API_BASE = "http://192.168.1.186:8000";
 // change to your LAN IP when testing on real device

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Login failed");
  }

  return res.json(); // { access_token, token_type, user_id }
}

export async function getDashboardSummary(userId) {
  const res = await fetch(`${API_BASE}/dashboard/summary?user_id=${userId}`);
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

export async function getRecommendedTasks(userId) {
  const res = await fetch(`${API_BASE}/recommend/tasks?user_id=${userId}`);
  if (!res.ok) throw new Error("Failed to load tasks");
  return res.json();
}

export async function createSession(note) {
  const res = await fetch(`${API_BASE}/workouts/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note }),
  });
  if (!res.ok) throw new Error("Failed to create session");
  return res.json(); // returns session with id
}

export async function addSet(sessionId, { exercise, reps, weight }) {
  const res = await fetch(`${API_BASE}/workouts/sessions/${sessionId}/sets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exercise, reps, weight }),
  });
  if (!res.ok) throw new Error("Failed to add set");
  return res.json();
}

export async function getSession(sessionId) {
    const res = await fetch(`${API_BASE}/workouts/sessions/${sessionId}`);
    if (!res.ok) throw new Error("Failed to load session");
    return res.json();
  }