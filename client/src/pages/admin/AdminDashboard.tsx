import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Building2, FileText, MessageSquare, Users, Mail, AlertCircle, Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminFetch } from "@/lib/adminAuth";
import { loadAdminConfig, type PublicAdminConfig } from "@/lib/adminConfig";

interface Stats {
  properties: number;
  blogPosts: number;
  inquiries: number;
  subscribers: number;
  agents: number;
  newInquiries: number;
}

export default function AdminDashboard() {
  const [config, setConfig] = useState<PublicAdminConfig | null>(null);

  useEffect(() => {
    loadAdminConfig().then(setConfig);
  }, []);

  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/admin/stats"],
    queryFn: () => adminFetch("/api/admin/stats").then(r => r.json()),
  });

  const modules = config?.modules;
  const appName = config?.app.name ?? "Connect Admin";

  const cards = [
    modules?.catalog.enabled !== false && {
      label: modules?.catalog.label ?? "Catalog",
      value: stats?.properties ?? "—",
      icon: Building2,
      href: "/admin/catalog",
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    modules?.blog.enabled !== false && {
      label: modules?.blog.label ?? "Blog",
      value: stats?.blogPosts ?? "—",
      icon: FileText,
      href: "/admin/blog",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    modules?.inquiries.enabled !== false && {
      label: modules?.inquiries.label ?? "Inquiries",
      value: stats?.inquiries ?? "—",
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "bg-purple-50 text-purple-700 border-purple-200",
      badge: stats?.newInquiries,
    },
    modules?.newsletter.enabled !== false && {
      label: modules?.newsletter.label ?? "Subscribers",
      value: stats?.subscribers ?? "—",
      icon: Mail,
      href: "#",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    modules?.team.enabled !== false && {
      label: modules?.team.label ?? "Team",
      value: stats?.agents ?? "—",
      icon: Users,
      href: "/admin/team",
      color: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ].filter(Boolean) as { label: string; value: string | number; icon: typeof Building2; href: string; color: string; badge?: number }[];

  const quickActions = [
    modules?.catalog.enabled !== false && { href: "/admin/catalog/new", label: `Add ${modules?.catalog.label ?? "Item"}`, icon: Plus, color: "text-amber-700" },
    modules?.blog.enabled !== false && { href: "/admin/blog/new", label: "Write Article", icon: Plus, color: "text-blue-700" },
    modules?.team.enabled !== false && { href: "/admin/team", label: `Add ${modules?.team.label ?? "Member"}`, icon: Plus, color: "text-rose-700" },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Plus; color: string }[];

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of {appName} content.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {cards.map(({ label, value, icon: Icon, href, color, badge }) => (
            <Link key={label} href={href} data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${color}`}>
                <div className="flex items-start justify-between mb-3">
                  <Icon size={18} />
                  {badge && badge > 0 ? (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge} new</span>
                  ) : null}
                </div>
                {isLoading ? (
                  <div className="h-7 w-10 bg-current opacity-20 rounded animate-pulse mb-1" />
                ) : (
                  <p className="text-2xl font-bold">{value}</p>
                )}
                <p className="text-xs font-medium opacity-80 mt-1">{label}</p>
              </div>
            </Link>
          ))}
        </div>

        {(stats?.newInquiries ?? 0) > 0 && modules?.inquiries.enabled !== false && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {stats?.newInquiries} new {stats?.newInquiries === 1 ? "inquiry" : "inquiries"} waiting
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Review incoming form submissions.{" "}
                <Link href="/admin/inquiries" className="underline font-medium">View inquiries →</Link>
              </p>
            </div>
          </div>
        )}

        {quickActions.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickActions.map(({ href, label, icon: Icon, color }) => (
                <Link key={href} href={href}>
                  <button className="w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                    <Icon size={16} className={color} />
                    {label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
