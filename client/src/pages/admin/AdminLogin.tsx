import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { setAdminToken } from "@/lib/adminAuth";
import { loadAdminConfig, type PublicAdminConfig } from "@/lib/adminConfig";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<PublicAdminConfig | null>(null);

  useEffect(() => {
    loadAdminConfig().then(setConfig);
  }, []);

  const appName = config?.app.name ?? "Connect Admin";
  const tagline = config?.app.tagline ?? "Headless CMS & Admin Panel";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) setAdminToken(data.token);
        navigate("/admin");
      } else {
        const d = await res.json();
        setError(d.message || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1008] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-mono mb-3">Admin Panel</p>
          <h1 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "serif" }}>{appName}</h1>
          <p className="text-sm text-white/40 mt-2">{tagline}</p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="admin"
                required
                data-testid="input-username"
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                required
                data-testid="input-password"
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              data-testid="button-login"
              className="w-full bg-[#1C1008] text-white py-3 rounded-md text-sm font-semibold hover:bg-amber-800 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">{appName} © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
