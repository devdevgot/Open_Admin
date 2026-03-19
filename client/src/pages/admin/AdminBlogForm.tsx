import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Upload, X, Plus, Loader2, ArrowLeft, Grip, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminFetch, getAdminToken } from "@/lib/adminAuth";

const CATEGORIES = ["Market Insights", "Legal Guide", "Investor Tips", "Neighbourhood", "Lifestyle"];

interface Section {
  id: string;
  title: string;
  content: string;
}

const EMPTY_FORM = {
  slug: "", title: "", subtitle: "", category: "Market Insights",
  authorName: "", authorRole: "", authorImage: "", heroImage: "",
  excerpt: "", readTime: "", featured: false,
  sections: [{ id: "section-1", title: "", content: "" }] as Section[],
};

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const token = getAdminToken();
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: fd,
    credentials: "include",
    headers: token ? { "Authorization": `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Upload failed");
  return (await res.json()).url;
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminBlogForm() {
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";
  const [, navigate] = useLocation();
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew) {
      adminFetch(`/api/admin/blog`)
        .then(r => r.json())
        .then((posts: any[]) => {
          const post = posts.find(p => p.id === parseInt(params.id));
          if (post) {
            let sections: Section[] = [];
            try { sections = JSON.parse(post.content); } catch { sections = [{ id: "s1", title: "", content: post.content }]; }
            setForm({
              slug: post.slug || "",
              title: post.title || "",
              subtitle: post.subtitle || "",
              category: post.category || "Market Insights",
              authorName: post.authorName || "",
              authorRole: post.authorRole || "",
              authorImage: post.authorImage || "",
              heroImage: post.heroImage || "",
              excerpt: post.excerpt || "",
              readTime: post.readTime || "",
              featured: post.featured || false,
              sections: sections.length > 0 ? sections : [{ id: "s1", title: "", content: "" }],
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params.id, isNew]);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleTitleChange = (v: string) => {
    setForm(f => ({ ...f, title: v, slug: isNew ? generateSlug(v) : f.slug }));
  };

  const addSection = () => {
    setForm(f => ({ ...f, sections: [...f.sections, { id: `s-${Date.now()}`, title: "", content: "" }] }));
  };

  const updateSection = (idx: number, field: keyof Section, value: string) => {
    setForm(f => ({ ...f, sections: f.sections.map((s, i) => i === idx ? { ...s, [field]: value } : s) }));
  };

  const removeSection = (idx: number) => {
    setForm(f => ({ ...f, sections: f.sections.filter((_, i) => i !== idx) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "heroImage" | "authorImage") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(field);
    try {
      const url = await uploadFile(file);
      set(field, url);
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const body = { ...form, content: JSON.stringify(form.sections) };
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${params.id}`;
      const res = await adminFetch(url, { method, body: JSON.stringify(body) });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || "Save failed");
      }
      navigate("/admin/blog");
    } catch (err: any) {
      setError(err.message || "Save failed.");
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
          <button onClick={() => navigate("/admin/blog")} className="p-2 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {isNew ? "Write Article" : "Edit Article"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section title="Article Details">
            <Field label="Title *">
              <input required value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Article headline..." className={INPUT} data-testid="input-title" />
            </Field>
            <Field label="Slug *">
              <input required value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="auto-generated-from-title" className={INPUT} data-testid="input-slug" />
            </Field>
            <Field label="Subtitle / Lead">
              <textarea value={form.subtitle} onChange={e => set("subtitle", e.target.value)} rows={2} placeholder="One sentence that expands on the headline..." className={INPUT} />
            </Field>
            <Field label="Excerpt *">
              <textarea required value={form.excerpt} onChange={e => set("excerpt", e.target.value)} rows={3} placeholder="Short description shown on the blog listing page..." className={INPUT} data-testid="input-excerpt" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category *">
                <select value={form.category} onChange={e => set("category", e.target.value)} className={INPUT} data-testid="select-category">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Read Time">
                <input value={form.readTime} onChange={e => set("readTime", e.target.value)} placeholder="7 min read" className={INPUT} />
              </Field>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="w-4 h-4 accent-amber-700" data-testid="checkbox-featured" />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured article (shown prominently)</label>
            </div>
          </Section>

          <Section title="Author">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Author Name *">
                <input required value={form.authorName} onChange={e => set("authorName", e.target.value)} placeholder="Sophia Al Nour" className={INPUT} data-testid="input-author-name" />
              </Field>
              <Field label="Author Role">
                <input value={form.authorRole} onChange={e => set("authorRole", e.target.value)} placeholder="Founder & Managing Director" className={INPUT} />
              </Field>
            </div>
            <Field label="Author Photo">
              <div className="flex items-center gap-3">
                {form.authorImage && <img src={form.authorImage} alt="Author" className="w-12 h-12 rounded-full object-cover" />}
                <div className="flex-1">
                  <input value={form.authorImage} onChange={e => set("authorImage", e.target.value)} placeholder="Paste URL or upload..." className={`${INPUT} mb-2`} />
                  <label className="cursor-pointer flex items-center gap-2 text-sm text-amber-700 hover:text-amber-800">
                    {uploading === "authorImage" ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    Upload photo
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "authorImage")} disabled={!!uploading} />
                  </label>
                </div>
              </div>
            </Field>
          </Section>

          <Section title="Hero Image">
            {form.heroImage && (
              <div className="relative w-full aspect-[3/1] rounded-md overflow-hidden mb-3">
                <img src={form.heroImage} alt="Hero" className="w-full h-full object-cover" />
                <button type="button" onClick={() => set("heroImage", "")} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <X size={12} />
                </button>
              </div>
            )}
            <Field label="Image URL">
              <input value={form.heroImage} onChange={e => set("heroImage", e.target.value)} placeholder="https://..." className={INPUT} data-testid="input-hero-image" />
            </Field>
            <label className="mt-2 cursor-pointer flex items-center gap-2 text-sm text-amber-700 hover:text-amber-800">
              {uploading === "heroImage" ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              Or upload image
              <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "heroImage")} disabled={!!uploading} />
            </label>
          </Section>

          <Section title="Article Content">
            <p className="text-xs text-gray-500 mb-4">Add sections that make up your article. Each section will appear in the table of contents.</p>
            <div className="space-y-4">
              {form.sections.map((section, idx) => (
                <div key={section.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <Grip size={12} className="text-gray-300" />
                      Section {idx + 1}
                    </div>
                    {form.sections.length > 1 && (
                      <button type="button" onClick={() => removeSection(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <Field label="Section Title *">
                    <input required value={section.title} onChange={e => updateSection(idx, "title", e.target.value)} placeholder="Section heading..." className={INPUT} data-testid={`input-section-title-${idx}`} />
                  </Field>
                  <div className="mt-3">
                    <Field label="Content *">
                      <textarea required value={section.content} onChange={e => updateSection(idx, "content", e.target.value)} rows={5} placeholder="Section body text. Use double line breaks to separate paragraphs." className={INPUT} data-testid={`input-section-content-${idx}`} />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addSection} className="mt-3 flex items-center gap-2 text-sm text-amber-700 hover:text-amber-800 font-medium" data-testid="button-add-section">
              <Plus size={14} />
              Add Section
            </button>
          </Section>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              data-testid="button-save-article"
              className="flex items-center gap-2 bg-[#1C1008] text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-amber-800 transition-colors disabled:opacity-60"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? "Publishing..." : isNew ? "Publish Article" : "Save Changes"}
            </button>
            <button type="button" onClick={() => navigate("/admin/blog")} className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
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
