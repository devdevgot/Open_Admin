import { useState, useEffect } from "react";
import { Link, useLocation, Redirect } from "wouter";
import {
  LayoutDashboard, MessageSquare, Building2, FileText,
  Users, LogOut, Menu, X, Bell, ExternalLink
} from "lucide-react";
import { adminFetch, clearAdminToken } from "@/lib/adminAuth";
import { adminConfig } from "@/config/admin";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/blog", label: "Blog Articles", icon: FileText },
  { href: "/admin/agents", label: "Team", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [auth, setAuth] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newInquiries, setNewInquiries] = useState(0);

  useEffect(() => {
    adminFetch("/api/admin/me")
      .then(r => {
        setAuth(r.ok);
        if (r.ok) {
          adminFetch("/api/admin/stats")
            .then(r => r.json())
            .then(d => setNewInquiries(d.newInquiries || 0))
            .catch(() => {});
        }
      })
      .catch(() => setAuth(false));
  }, [location]);

  if (auth === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-300 border-t-stone-800" />
      </div>
    );
  }

  if (auth === false) return <Redirect to="/admin/login" />;

  const handleLogout = async () => {
    await adminFetch("/api/admin/logout", { method: "POST" });
    clearAdminToken();
    window.location.href = "/admin/login";
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location === href;
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-30 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/10">
          <div className="block">
            <p className="text-[11px] text-white/40 uppercase tracking-[0.3em] font-mono mb-1">Admin Panel</p>
            <div className="flex flex-col gap-0.5">
              <span className="text-lg font-bold text-white tracking-wide">{adminConfig.appName}</span>
              {adminConfig.appTagline && (
                <span className="text-xs text-slate-400">{adminConfig.appTagline}</span>
              )}
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              data-testid={`nav-${label.toLowerCase().replace(/\s/g, "-")}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all ${
                isActive(href, exact)
                  ? "bg-slate-700 text-white border-l-2 border-sky-400"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={16} className="shrink-0" />
              <span className="font-medium">{label}</span>
              {label === "Inquiries" && newInquiries > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {newInquiries}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          {adminConfig.websiteUrl && (
            <a
              href={adminConfig.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-3 px-3"
            >
              <ExternalLink size={12} />
              View Website
            </a>
          )}
          <button
            onClick={handleLogout}
            data-testid="button-logout"
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-white/60 hover:text-red-400 transition-colors rounded-md hover:bg-white/5"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-sm font-semibold text-gray-800 uppercase tracking-widest">
            {NAV.find(n => isActive(n.href, n.exact))?.label || "Admin"}
          </h1>
          <div className="ml-auto flex items-center gap-3">
            {newInquiries > 0 && (
              <Link href="/admin/inquiries" className="relative p-2 text-gray-400 hover:text-gray-700">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Link>
            )}
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
              {adminConfig.appName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
