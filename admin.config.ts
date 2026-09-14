/**
 * Connect Admin — configuration
 *
 * Copy this file and customize for your project, or set values via environment variables.
 * See README.md for integration guide.
 */

export interface AdminModuleConfig {
  enabled: boolean;
  label: string;
  path: string;
}

export interface AdminConfig {
  app: {
    name: string;
    tagline: string;
    /** Link to your public website (shown in sidebar). Empty = hidden */
    websiteUrl: string;
  };
  modules: {
    catalog: AdminModuleConfig;
    blog: AdminModuleConfig;
    inquiries: AdminModuleConfig;
    team: AdminModuleConfig;
    newsletter: AdminModuleConfig;
  };
  /** Origins allowed to call public API (inquiries, newsletter, headless CMS). Comma-separated in env. */
  corsOrigins: string[];
}

function env(key: string, fallback: string): string {
  return process.env[key]?.trim() || fallback;
}

function envBool(key: string, fallback: boolean): boolean {
  const v = process.env[key];
  if (v === undefined) return fallback;
  return v === "1" || v.toLowerCase() === "true";
}

export const adminConfig: AdminConfig = {
  app: {
    name: env("ADMIN_APP_NAME", "Connect Admin"),
    tagline: env("ADMIN_APP_TAGLINE", "Headless CMS & Admin Panel"),
    websiteUrl: env("ADMIN_WEBSITE_URL", ""),
  },
  modules: {
    catalog: {
      enabled: envBool("ADMIN_MODULE_CATALOG", true),
      label: env("ADMIN_MODULE_CATALOG_LABEL", "Catalog"),
      path: "/admin/catalog",
    },
    blog: {
      enabled: envBool("ADMIN_MODULE_BLOG", true),
      label: env("ADMIN_MODULE_BLOG_LABEL", "Blog"),
      path: "/admin/blog",
    },
    inquiries: {
      enabled: envBool("ADMIN_MODULE_INQUIRIES", true),
      label: env("ADMIN_MODULE_INQUIRIES_LABEL", "Inquiries"),
      path: "/admin/inquiries",
    },
    team: {
      enabled: envBool("ADMIN_MODULE_TEAM", true),
      label: env("ADMIN_MODULE_TEAM_LABEL", "Team"),
      path: "/admin/team",
    },
    newsletter: {
      enabled: envBool("ADMIN_MODULE_NEWSLETTER", true),
      label: env("ADMIN_MODULE_NEWSLETTER_LABEL", "Subscribers"),
      path: "#",
    },
  },
  corsOrigins: env("ADMIN_CORS_ORIGINS", "*")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};

/** Client-safe subset (no secrets) */
export function getPublicAdminConfig() {
  return {
    app: adminConfig.app,
    modules: adminConfig.modules,
  };
}
