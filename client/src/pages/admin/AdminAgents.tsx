import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil, Users, Save, X, Upload, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Agent {
  id: number;
  name: string;
  role: string;
  phone: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  specialties: string[] | null;
  languages: string[] | null;
  transactions: number | null;
  yearsExperience: number | null;
  sortOrder: number | null;
}

const EMPTY: Omit<Agent, "id"> = {
  name: "", role: "", phone: "", email: "", image: "", bio: "",
  specialties: [], languages: [], transactions: 0, yearsExperience: 0, sortOrder: 0,
};

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
  if (!res.ok) throw new Error("Upload failed");
  return (await res.json()).url;
}

export default function AdminAgents() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Agent | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Agent, "id">>(EMPTY);
  const [uploading, setUploading] = useState(false);

  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ["/api/admin/agents"],
    queryFn: () => fetch("/api/admin/agents", { credentials: "include" }).then(r => r.json()),
  });

  const save = useMutation({
    mutationFn: async (data: typeof form) => {
      const url = editing ? `/api/admin/agents/${editing.id}` : "/api/admin/agents";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Save failed");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/admin/agents"] });
      setEditing(null);
      setCreating(false);
      setForm(EMPTY);
    },
  });

  const del = useMutation({
    mutationFn: (id: number) => fetch(`/api/admin/agents/${id}`, { method: "DELETE", credentials: "include" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/agents"] }),
  });

  const startEdit = (agent: Agent) => {
    setEditing(agent);
    setCreating(false);
    setForm({ ...agent });
  };

  const startCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm(EMPTY);
  };

  const cancel = () => { setEditing(null); setCreating(false); setForm(EMPTY); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setForm(f => ({ ...f, image: url }));
    } catch { }
    finally { setUploading(false); }
  };

  const setArr = (k: "specialties" | "languages", v: string) => {
    setForm(f => ({ ...f, [k]: v.split(",").map(s => s.trim()).filter(Boolean) }));
  };

  const showForm = creating || !!editing;

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            <p className="text-sm text-gray-500 mt-1">{agents.length} agents</p>
          </div>
          {!showForm && (
            <button
              onClick={startCreate}
              className="flex items-center gap-2 bg-[#1C1008] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors"
              data-testid="button-new-agent"
            >
              <Plus size={16} />
              Add Member
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{editing ? "Edit" : "New"} Team Member</h3>
              <button onClick={cancel} className="text-gray-400 hover:text-gray-700"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <F label="Name *"><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={IN} data-testid="input-agent-name" /></F>
              <F label="Role *"><input required value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className={IN} data-testid="input-agent-role" /></F>
              <F label="Phone"><input value={form.phone || ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={IN} /></F>
              <F label="Email"><input type="email" value={form.email || ""} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={IN} /></F>
              <F label="Photo URL">
                <div className="flex items-center gap-2">
                  {form.image && <img src={form.image} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />}
                  <input value={form.image || ""} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className={IN} placeholder="URL or upload" />
                  <label className="cursor-pointer shrink-0 p-2 bg-gray-100 rounded-md hover:bg-gray-200">
                    {uploading ? <Loader2 size={14} className="animate-spin text-gray-500" /> : <Upload size={14} className="text-gray-500" />}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
              </F>
              <F label="Years Experience"><input type="number" value={form.yearsExperience || ""} onChange={e => setForm(f => ({ ...f, yearsExperience: parseInt(e.target.value) || 0 }))} className={IN} /></F>
              <F label="Specialties (comma separated)"><input value={(form.specialties || []).join(", ")} onChange={e => setArr("specialties", e.target.value)} className={IN} placeholder="Luxury sales, Off-plan, Rentals" /></F>
              <F label="Languages (comma separated)"><input value={(form.languages || []).join(", ")} onChange={e => setArr("languages", e.target.value)} className={IN} placeholder="English, Arabic" /></F>
              <F label="Bio" className="sm:col-span-2">
                <textarea value={form.bio || ""} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className={IN} />
              </F>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => save.mutate(form)}
                disabled={save.isPending || !form.name || !form.role}
                className="flex items-center gap-2 bg-[#1C1008] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors disabled:opacity-60"
                data-testid="button-save-agent"
              >
                <Save size={14} />
                {save.isPending ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={cancel} className="text-sm text-gray-500 hover:text-gray-800 px-4">Cancel</button>
            </div>
          </div>
        )}

        {/* List */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : agents.length === 0 && !showForm ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <Users size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No team members yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agents.map(agent => (
              <div key={agent.id} className="bg-white rounded-lg border border-gray-200 flex items-center gap-4 p-4" data-testid={`agent-${agent.id}`}>
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-100">
                  {agent.image
                    ? <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg font-bold">{agent.name[0]}</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.role}</p>
                  {(agent.languages?.length || 0) > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">{agent.languages?.join(" · ")}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(agent)} className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-md">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => { if (confirm(`Delete ${agent.name}?`)) del.mutate(agent.id); }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

const IN = "w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600";

function F({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
