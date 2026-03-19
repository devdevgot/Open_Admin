import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageSquare, Trash2, ChevronDown } from "lucide-react";
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

const STATUS_COLORS: Record<string, string> = {
  new: "bg-red-100 text-red-700",
  "in-progress": "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
};

const TYPE_COLORS: Record<string, string> = {
  buy: "bg-blue-100 text-blue-700",
  sell: "bg-purple-100 text-purple-700",
  rent: "bg-teal-100 text-teal-700",
  valuation: "bg-orange-100 text-orange-700",
  general: "bg-gray-100 text-gray-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function AdminInquiries() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/admin/inquiries", filterStatus],
    queryFn: () => {
      const url = filterStatus ? `/api/admin/inquiries?status=${filterStatus}` : "/api/admin/inquiries";
      return adminFetch(url).then(r => r.json());
    },
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/inquiries"] }),
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Inquiries</h2>
            <p className="text-sm text-gray-500 mt-1">{inquiries.length} total</p>
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
            data-testid="select-status-filter"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <MessageSquare size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No inquiries yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden" data-testid={`inquiry-${inq.id}`}>
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-sm text-gray-900">{inq.name}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${TYPE_COLORS[inq.type] || "bg-gray-100 text-gray-700"}`}>
                        {inq.type}
                      </span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${STATUS_COLORS[inq.status] || "bg-gray-100 text-gray-700"}`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{inq.email}</span>
                      {inq.phone && <span>· {inq.phone}</span>}
                      <span>· {formatDate(inq.createdAt)}</span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 shrink-0 transition-transform ${expanded === inq.id ? "rotate-180" : ""}`}
                  />
                </div>

                {expanded === inq.id && (
                  <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                    <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-700 leading-relaxed">
                      {inq.message}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-medium text-gray-600">Change status:</span>
                      {["new", "in-progress", "resolved"].map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus.mutate({ id: inq.id, status: s })}
                          disabled={inq.status === s}
                          className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                            inq.status === s
                              ? `${STATUS_COLORS[s]} opacity-100 cursor-default`
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          data-testid={`button-status-${s}`}
                        >
                          {s.replace("-", " ")}
                        </button>
                      ))}
                      <button
                        onClick={() => { if (confirm("Delete this inquiry?")) deleteInquiry.mutate(inq.id); }}
                        className="ml-auto flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
                        data-testid="button-delete-inquiry"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
