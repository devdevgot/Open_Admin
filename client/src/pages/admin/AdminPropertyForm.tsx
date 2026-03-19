import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Upload, X, Plus, Loader2, ArrowLeft } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const PROPERTY_TYPES = ["Apartment", "Villa", "Penthouse", "Townhouse", "Office", "Land"];
const LISTING_TYPES = ["buy", "rent", "short-term"];
const STATUSES = ["available", "sold", "rented"];

const EMPTY_FORM = {
  title: "", description: "", price: "", priceValue: "",
  location: "", community: "", beds: "1", baths: "1",
  area: "", type: "Apartment", listingType: "buy", status: "available",
  featured: false, yearBuilt: new Date().getFullYear().toString(),
  features: "", amenities: "",
  agentName: "", agentTitle: "", agentPhone: "", agentEmail: "",
  images: [] as string[],
};

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
}

export default function AdminPropertyForm() {
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";
  const [, navigate] = useLocation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/properties`, { credentials: "include" })
        .then(r => r.json())
        .then((props: any[]) => {
          const prop = props.find(p => p.id === parseInt(params.id));
          if (prop) {
            setForm({
              title: prop.title || "",
              description: prop.description || "",
              price: prop.price || "",
              priceValue: prop.priceValue?.toString() || "",
              location: prop.location || "",
              community: prop.community || "",
              beds: prop.beds?.toString() || "1",
              baths: prop.baths?.toString() || "1",
              area: prop.area || "",
              type: prop.type || "Apartment",
              listingType: prop.listingType || "buy",
              status: prop.status || "available",
              featured: prop.featured || false,
              yearBuilt: prop.yearBuilt?.toString() || "",
              features: Array.isArray(prop.features) ? prop.features.join(", ") : prop.features || "",
              amenities: prop.amenities || "",
              agentName: prop.agentName || "",
              agentTitle: prop.agentTitle || "",
              agentPhone: prop.agentPhone || "",
              agentEmail: prop.agentEmail || "",
              images: prop.images || [],
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id, isNew]);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      setForm(f => ({ ...f, images: [...f.images, ...urls] }));
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = {
        ...form,
        priceValue: form.priceValue ? parseInt(form.priceValue) : null,
        beds: parseInt(form.beds),
        baths: parseInt(form.baths),
        yearBuilt: parseInt(form.yearBuilt),
        features: form.features.split(",").map(s => s.trim()).filter(Boolean),
        featured: form.featured,
        images: form.images,
      };
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/admin/properties" : `/api/admin/properties/${params.id}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Save failed");
      }
      navigate("/admin/properties");
    } catch (err: any) {
      setError(err.message || "Save failed. Please check all required fields.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gray-400" size={28} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/admin/properties")} className="p-2 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {isNew ? "Add Property" : "Edit Property"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <Section title="Basic Information">
            <Field label="Title *">
              <input required value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Skyline Penthouse — Palm Jumeirah" className={INPUT} data-testid="input-title" />
            </Field>
            <Field label="Description *">
              <textarea required value={form.description} onChange={e => set("description", e.target.value)} rows={4} placeholder="Describe the property..." className={INPUT} data-testid="input-description" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (display) *">
                <input required value={form.price} onChange={e => set("price", e.target.value)} placeholder="AED 5,000,000" className={INPUT} data-testid="input-price" />
              </Field>
              <Field label="Price Value (number)">
                <input type="number" value={form.priceValue} onChange={e => set("priceValue", e.target.value)} placeholder="5000000" className={INPUT} data-testid="input-price-value" />
              </Field>
            </div>
          </Section>

          {/* Location */}
          <Section title="Location">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location *">
                <input required value={form.location} onChange={e => set("location", e.target.value)} placeholder="Palm Jumeirah, Dubai" className={INPUT} />
              </Field>
              <Field label="Community">
                <input value={form.community} onChange={e => set("community", e.target.value)} placeholder="Palm Jumeirah" className={INPUT} />
              </Field>
            </div>
          </Section>

          {/* Property details */}
          <Section title="Property Details">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Property Type *">
                <select value={form.type} onChange={e => set("type", e.target.value)} className={INPUT} data-testid="select-type">
                  {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Listing Type *">
                <select value={form.listingType} onChange={e => set("listingType", e.target.value)} className={INPUT} data-testid="select-listing-type">
                  {LISTING_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Status *">
                <select value={form.status} onChange={e => set("status", e.target.value)} className={INPUT} data-testid="select-status">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Bedrooms *">
                <input type="number" min="0" required value={form.beds} onChange={e => set("beds", e.target.value)} className={INPUT} />
              </Field>
              <Field label="Bathrooms *">
                <input type="number" min="0" required value={form.baths} onChange={e => set("baths", e.target.value)} className={INPUT} />
              </Field>
              <Field label="Area *">
                <input required value={form.area} onChange={e => set("area", e.target.value)} placeholder="3,500 sqft" className={INPUT} />
              </Field>
              <Field label="Year Built *">
                <input type="number" required value={form.yearBuilt} onChange={e => set("yearBuilt", e.target.value)} placeholder="2023" className={INPUT} />
              </Field>
            </div>
            <Field label="Features (comma separated)">
              <input value={form.features} onChange={e => set("features", e.target.value)} placeholder="Private pool, Home cinema, Smart home" className={INPUT} />
            </Field>
            <Field label="Amenities">
              <textarea value={form.amenities} onChange={e => set("amenities", e.target.value)} rows={2} placeholder="Concierge, Valet, Beach club, Spa" className={INPUT} />
            </Field>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-amber-700" data-testid="checkbox-featured" />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured property</label>
            </div>
          </Section>

          {/* Images */}
          <Section title="Photos">
            <div className="flex flex-wrap gap-3 mb-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative w-24 h-24 rounded-md overflow-hidden group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-amber-600 transition-colors">
                {uploading ? <Loader2 size={18} className="animate-spin text-gray-400" /> : (
                  <>
                    <Upload size={18} className="text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-400 text-center">Upload</span>
                  </>
                )}
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} data-testid="input-image-upload" />
              </label>
            </div>
            <Field label="Or paste image URL">
              <div className="flex gap-2">
                <input id="img-url-input" placeholder="https://..." className={INPUT} />
                <button
                  type="button"
                  onClick={() => {
                    const v = (document.getElementById("img-url-input") as HTMLInputElement)?.value;
                    if (v) { setForm(f => ({ ...f, images: [...f.images, v] })); (document.getElementById("img-url-input") as HTMLInputElement).value = ""; }
                  }}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors shrink-0"
                >
                  <Plus size={14} />
                </button>
              </div>
            </Field>
          </Section>

          {/* Agent */}
          <Section title="Agent Information">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Agent Name">
                <input value={form.agentName} onChange={e => set("agentName", e.target.value)} placeholder="Jane Smith" className={INPUT} />
              </Field>
              <Field label="Agent Title">
                <input value={form.agentTitle} onChange={e => set("agentTitle", e.target.value)} placeholder="Senior Advisor" className={INPUT} />
              </Field>
              <Field label="Agent Phone">
                <input value={form.agentPhone} onChange={e => set("agentPhone", e.target.value)} placeholder="+971 50 000 0000" className={INPUT} />
              </Field>
              <Field label="Agent Email">
                <input value={form.agentEmail} onChange={e => set("agentEmail", e.target.value)} placeholder="agent@avieraliving.com" className={INPUT} />
              </Field>
            </div>
          </Section>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              data-testid="button-save-property"
              className="flex items-center gap-2 bg-[#1C1008] text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-amber-800 transition-colors disabled:opacity-60"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Saving..." : isNew ? "Create Property" : "Save Changes"}
            </button>
            <button type="button" onClick={() => navigate("/admin/properties")} className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

const INPUT = "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
