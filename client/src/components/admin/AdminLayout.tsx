import { useState, useEffect } from "react";
import { Link, useLocation, Redirect } from "wouter";
import {
  LayoutDashboard, MessageSquare, Building2, FileText,
  Users, LogOut, Menu, X, ChevronRight, Bell
} from "lucide-react";

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
    fetch("/api/admin/me").then(r => {
      setAuth(r.ok);
      if (r.ok) {
        fetch("/api/admin/stats", { credentials: "include" })
          .then(r => r.json())
          .then(d => setNewInquiries(d.newInquiries || 0))
          .catch(() => {});
      }
    }).catch(() => setAuth(false));
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
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location === href;
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#1C1008] text-white z-30 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="block">
            <p className="text-[11px] text-white/40 uppercase tracking-[0.3em] font-mono mb-1">Admin Panel</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white uppercase tracking-widest" style={{ fontFamily: "serif" }}>Aviera</span>
              <span className="text-base text-amber-400 italic" style={{ fontFamily: "serif" }}>Living</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              data-testid={`nav-${label.toLowerCase().replace(/\s/g, "-")}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all ${
                isActive(href, exact)
                  ? "bg-amber-700/30 text-amber-300 border-l-2 border-amber-400"
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

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-3 px-3">
            <ChevronRight size={12} />
            View Website
          </Link>
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

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
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
            <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
