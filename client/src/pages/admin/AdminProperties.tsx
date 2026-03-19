import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, Building2, Star } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  type: string;
  listingType: string;
  status: string;
  featured: boolean;
  images: string[];
}

const STATUS_COLORS: Record<string, string> = {
  available: "bg-green-100 text-green-700",
  sold: "bg-gray-100 text-gray-700",
  rented: "bg-blue-100 text-blue-700",
};

const TYPE_COLORS: Record<string, string> = {
  buy: "bg-amber-100 text-amber-700",
  rent: "bg-teal-100 text-teal-700",
  "short-term": "bg-purple-100 text-purple-700",
};

export default function AdminProperties() {
  const qc = useQueryClient();

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/admin/properties"],
    queryFn: () => fetch("/api/admin/properties", { credentials: "include" }).then(r => r.json()),
  });

  const deleteProperty = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/admin/properties/${id}`, { method: "DELETE", credentials: "include" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/properties"] }),
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
            <p className="text-sm text-gray-500 mt-1">{properties.length} listings</p>
          </div>
          <Link href="/admin/properties/new">
            <button className="flex items-center gap-2 bg-[#1C1008] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors" data-testid="button-new-property">
              <Plus size={16} />
              Add Property
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <Building2 size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No properties yet</p>
            <Link href="/admin/properties/new">
              <button className="bg-[#1C1008] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors">
                Add First Property
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {properties.map(prop => (
              <div key={prop.id} className="bg-white rounded-lg border border-gray-200 flex items-center gap-4 p-4" data-testid={`property-${prop.id}`}>
                {/* Image */}
                <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 bg-gray-100">
                  {prop.images?.[0] ? (
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Building2 size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">{prop.title}</p>
                    {prop.featured && <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{prop.location} · {prop.beds}BR · {prop.type}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-gray-800">{prop.price}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[prop.listingType] || "bg-gray-100 text-gray-700"}`}>
                      {prop.listingType}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[prop.status] || "bg-gray-100 text-gray-700"}`}>
                      {prop.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/properties/${prop.id}`}>
                    <button className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors" data-testid={`button-edit-property-${prop.id}`}>
                      <Pencil size={15} />
                    </button>
                  </Link>
                  <button
                    onClick={() => { if (confirm(`Delete "${prop.title}"?`)) deleteProperty.mutate(prop.id); }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    data-testid={`button-delete-property-${prop.id}`}
                  >
                    <Trash2 size={15} />
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
