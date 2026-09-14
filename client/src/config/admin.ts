/**
 * Admin panel branding and integration settings.
 * Override via Vite environment variables at build time.
 */
export const adminConfig = {
  appName: import.meta.env.VITE_APP_NAME || "Open Admin",
  appTagline: import.meta.env.VITE_APP_TAGLINE || "",
  websiteUrl: import.meta.env.VITE_WEBSITE_URL || "",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
} as const;

export function apiUrl(path: string): string {
  const base = adminConfig.apiBaseUrl.replace(/\/$/, "");
  return base ? `${base}${path}` : path;
}
