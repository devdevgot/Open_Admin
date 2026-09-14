import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MessageSquare, Trash2, ChevronDown, Phone, Mail, Building2,
  User, Clock, TrendingUp, AlertCircle, CheckCircle2, Circle,
  Filter, Search, Download
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminFetch } from "@/lib/adminAuth";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  message: string;
  propertyId: number | null;
  status: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof Circle }> = {
  new: { label: "New", color: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle },
  "in-progress": { label: "In Progress", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  resolved: { label: "Resolved", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
};

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  buy: { label: "Purchase", color: "bg-blue-50 text-blue-700 border-blue-200" },
  sell: { label: "Sale", color: "bg-purple-50 text-purple-700 border-purple-200" },
  rent: { label: "Rental", color: "bg-teal-50 text-teal-700 border-teal-200" },
  valuation: { label: "Valuation", color: "bg-orange-50 text-orange-700 border-orange-200" },
  general: { label: "General", color: "bg-gray-100 text-gray-600 border-gray-200" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);
  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH}h ago`;
  if (diffD < 7) return `${diffD}d ago`;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateFull(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminInquiries() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/admin/inquiries"],
    queryFn: () => adminFetch("/api/admin/inquiries").then(r => r.json()),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      adminFetch(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/inquiries"] }),
  });

  const deleteInquiry = useMutation({
    mutationFn: (id: number) => adminFetch(`/api/admin/inquiries/${id}`, { method: "DELETE" }),
    onSuccess: (_, id) => {
      if (expanded === id) setExpanded(null);
      qc.invalidateQueries({ queryKey: ["/api/admin/inquiries"] });
    },
  });

  const stats = useMemo(() => ({
    total: inquiries.length,
    new: inquiries.filter(i => i.status === "new").length,
    inProgress: inquiries.filter(i => i.status === "in-progress").length,
    resolved: inquiries.filter(i => i.status === "resolved").length,
  }), [inquiries]);

  const filtered = useMemo(() => {
    return inquiries.filter(i => {
      if (filterStatus && i.status !== filterStatus) return false;
      if (filterType && i.type !== filterType) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          i.name.toLowerCase().includes(q) ||
          i.email.toLowerCase().includes(q) ||
          (i.phone || "").includes(q) ||
          i.message.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [inquiries, filterStatus, filterType, search]);

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Type", "Status", "Message", "Property ID", "Received"];
    const rows = filtered.map(i => [
      i.id, i.name, i.email, i.phone || "", i.type, i.status,
      `"${i.message.replace(/"/g, '""')}"`, i.propertyId || "", formatDateFull(i.createdAt),
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `aviera-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
            <p className="text-sm text-gray-500 mt-0.5">Track and manage all client enquiries</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 text-xs border border-gray-200 rounded-md px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
            data-testid="button-export-csv"
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Leads", value: stats.total, icon: TrendingUp, color: "text-gray-600", bg: "bg-gray-100" },
            { label: "New", value: stats.new, icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
            { label: "Resolved", value: stats.resolved, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-lg px-5 py-4" data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
                <span className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center`}>
                  <Icon size={14} className={color} />
                </span>
              </div>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
          <Filter size={14} className="text-gray-400 shrink-0" />

          <div className="flex items-center gap-2 flex-1 min-w-[180px]">
            <Search size={13} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or message…"
              className="text-sm flex-1 outline-none text-gray-700 placeholder-gray-400 min-w-0"
              data-testid="input-search"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="text-xs border border-gray-200 rounded px-2 py-1.5 text-gray-700 focus:outline-none"
              data-testid="select-status-filter"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="text-xs border border-gray-200 rounded px-2 py-1.5 text-gray-700 focus:outline-none"
              data-testid="select-type-filter"
            >
              <option value="">All Types</option>
              <option value="buy">Purchase</option>
              <option value="sell">Sale</option>
              <option value="rent">Rental</option>
              <option value="valuation">Valuation</option>
              <option value="general">General</option>
            </select>

            {(filterStatus || filterType || search) && (
              <button
                onClick={() => { setFilterStatus(""); setFilterType(""); setSearch(""); }}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 transition-colors"
                data-testid="button-clear-filters"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        {(filterStatus || filterType || search) && (
          <p className="text-xs text-gray-500 -mt-3">
            Showing {filtered.length} of {inquiries.length} leads
          </p>
        )}

        {/* Lead list */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Loading leads…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <MessageSquare size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No leads found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(inq => {
              const statusCfg = STATUS_CONFIG[inq.status] || STATUS_CONFIG.new;
              const typeCfg = TYPE_CONFIG[inq.type] || TYPE_CONFIG.general;
              const StatusIcon = statusCfg.icon;
              const isOpen = expanded === inq.id;

              return (
                <div key={inq.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-sm" data-testid={`inquiry-${inq.id}`}>
                  {/* Row */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                    onClick={() => setExpanded(isOpen ? null : inq.id)}
                  >
                    {/* Status dot */}
                    <div className="shrink-0">
                      <StatusIcon size={16} className={statusCfg.color.split(" ")[1]} />
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-semibold text-sm text-gray-900">{inq.name}</span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 border rounded-full uppercase tracking-wide ${typeCfg.color}`}>
                          {typeCfg.label}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 border rounded-full ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1"><Mail size={10} />{inq.email}</span>
                        {inq.phone && <span className="flex items-center gap-1"><Phone size={10} />{inq.phone}</span>}
                        {inq.propertyId && (
                          <span className="flex items-center gap-1"><Building2 size={10} />Property #{inq.propertyId}</span>
                        )}
                      </div>
                    </div>

                    {/* Date + chevron */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-gray-400 hidden sm:block">{formatDate(inq.createdAt)}</span>
                      <ChevronDown
                        size={15}
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-5 space-y-5">
                      {/* Contact info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white border border-gray-100 rounded-md px-4 py-3">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">Contact</p>
                          <p className="text-sm text-gray-900 font-medium">{inq.name}</p>
                          <a href={`mailto:${inq.email}`} className="text-xs text-blue-600 hover:underline block">{inq.email}</a>
                          {inq.phone && <a href={`tel:${inq.phone}`} className="text-xs text-gray-600 block">{inq.phone}</a>}
                        </div>
                        <div className="bg-white border border-gray-100 rounded-md px-4 py-3">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">Enquiry Type</p>
                          <p className="text-sm font-medium text-gray-900">{typeCfg.label}</p>
                          {inq.propertyId && (
                            <p className="text-xs text-gray-500">Property ID: {inq.propertyId}</p>
                          )}
                        </div>
                        <div className="bg-white border border-gray-100 rounded-md px-4 py-3">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-1">Received</p>
                          <p className="text-sm text-gray-900">{formatDateFull(inq.createdAt)}</p>
                          <p className="text-xs text-gray-400">{formatDate(inq.createdAt)}</p>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2">Message</p>
                        <div className="bg-white border border-gray-100 rounded-md p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {inq.message}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-gray-500 mr-1">Status:</span>
                        {(["new", "in-progress", "resolved"] as const).map(s => {
                          const cfg = STATUS_CONFIG[s];
                          const SIcon = cfg.icon;
                          return (
                            <button
                              key={s}
                              onClick={e => { e.stopPropagation(); updateStatus.mutate({ id: inq.id, status: s }); }}
                              disabled={inq.status === s || updateStatus.isPending}
                              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border font-medium transition-all ${
                                inq.status === s
                                  ? `${cfg.color} cursor-default`
                                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
                              }`}
                              data-testid={`button-status-${s}-${inq.id}`}
                            >
                              <SIcon size={12} />
                              {cfg.label}
                            </button>
                          );
                        })}

                        <div className="ml-auto flex items-center gap-3">
                          <a
                            href={`mailto:${inq.email}?subject=Re: Your enquiry`}
                            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                            data-testid={`button-reply-${inq.id}`}
                          >
                            <Mail size={12} />
                            Reply
                          </a>
                          {inq.phone && (
                            <a
                              href={`tel:${inq.phone}`}
                              className="flex items-center gap-1.5 text-xs text-green-600 hover:text-green-800 transition-colors"
                              data-testid={`button-call-${inq.id}`}
                            >
                              <Phone size={12} />
                              Call
                            </a>
                          )}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              if (confirm(`Delete enquiry from ${inq.name}? This cannot be undone.`)) {
                                deleteInquiry.mutate(inq.id);
                              }
                            }}
                            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
                            data-testid={`button-delete-${inq.id}`}
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
