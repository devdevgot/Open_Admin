const TOKEN_KEY = "aviera_admin_token";

export function getAdminToken(): string {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function adminHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const token = getAdminToken();
  const headers: Record<string, string> = { ...extra };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// General purpose admin fetch — automatically attaches the auth token
export function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = {};

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const token = getAdminToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string> | undefined),
    },
  });
}
