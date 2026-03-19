import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Building2, FileText, MessageSquare, Users, Mail, AlertCircle, Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Stats {
  properties: number;
  blogPosts: number;
  inquiries: number;
  subscribers: number;
  agents: number;
  newInquiries: number;
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/admin/stats"],
    queryFn: () => fetch("/api/admin/stats", { credentials: "include" }).then(r => r.json()),
  });

  const cards = [
    { label: "Properties", value: stats?.properties ?? "—", icon: Building2, href: "/admin/properties", color: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: "Blog Articles", value: stats?.blogPosts ?? "—", icon: FileText, href: "/admin/blog", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Inquiries", value: stats?.inquiries ?? "—", icon: MessageSquare, href: "/admin/inquiries", color: "bg-purple-50 text-purple-700 border-purple-200", badge: stats?.newInquiries },
    { label: "Subscribers", value: stats?.subscribers ?? "—", icon: Mail, href: "#", color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Team Members", value: stats?.agents ?? "—", icon: Users, href: "/admin/agents", color: "bg-rose-50 text-rose-700 border-rose-200" },
  ];

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of your Aviera Living site content.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {cards.map(({ label, value, icon: Icon, href, color, badge }) => (
            <Link key={label} href={href} data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${color}`}>
                <div className="flex items-start justify-between mb-3">
                  <Icon size={18} />
                  {badge && badge > 0 ? (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {badge} new
                    </span>
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

        {/* New inquiries alert */}
        {(stats?.newInquiries ?? 0) > 0 && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {stats?.newInquiries} new {stats?.newInquiries === 1 ? "inquiry" : "inquiries"} waiting
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Review and respond to incoming client inquiries.{" "}
                <Link href="/admin/inquiries" className="underline font-medium">View inquiries →</Link>
              </p>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-5">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/admin/properties/new">
              <button className="w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors" data-testid="button-add-property">
                <Plus size={16} className="text-amber-700" />
                Add Property
              </button>
            </Link>
            <Link href="/admin/blog/new">
              <button className="w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors" data-testid="button-add-article">
                <Plus size={16} className="text-blue-700" />
                Write Article
              </button>
            </Link>
            <Link href="/admin/agents/new">
              <button className="w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors" data-testid="button-add-agent">
                <Plus size={16} className="text-rose-700" />
                Add Team Member
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
