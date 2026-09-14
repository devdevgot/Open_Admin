export interface AdminModuleConfig {
  enabled: boolean;
  label: string;
  path: string;
}

export interface PublicAdminConfig {
  app: { name: string; tagline: string; websiteUrl: string };
  modules: {
    catalog: AdminModuleConfig;
    blog: AdminModuleConfig;
    inquiries: AdminModuleConfig;
    team: AdminModuleConfig;
    newsletter: AdminModuleConfig;
  };
}

const DEFAULT: PublicAdminConfig = {
  app: { name: "Connect Admin", tagline: "Headless CMS & Admin Panel", websiteUrl: "" },
  modules: {
    catalog: { enabled: true, label: "Catalog", path: "/admin/catalog" },
    blog: { enabled: true, label: "Blog", path: "/admin/blog" },
    inquiries: { enabled: true, label: "Inquiries", path: "/admin/inquiries" },
    team: { enabled: true, label: "Team", path: "/admin/team" },
    newsletter: { enabled: true, label: "Subscribers", path: "#" },
  },
};

let cached: PublicAdminConfig | null = null;

export async function loadAdminConfig(): Promise<PublicAdminConfig> {
  if (cached) return cached;
  try {
    const res = await fetch("/api/admin/config");
    if (res.ok) cached = await res.json();
  } catch {
    /* use defaults */
  }
  return cached ?? DEFAULT;
}

export function useAdminConfigDefaults(): PublicAdminConfig {
  return cached ?? DEFAULT;
}
