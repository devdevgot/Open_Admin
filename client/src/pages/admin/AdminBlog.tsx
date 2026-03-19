import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, FileText, Star, Eye } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  authorName: string;
  featured: boolean;
  views: number;
  publishedAt: string;
  heroImage: string | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Market Insights": "bg-blue-100 text-blue-700",
  "Legal Guide": "bg-green-100 text-green-700",
  "Investor Tips": "bg-amber-100 text-amber-700",
  "Neighbourhood": "bg-purple-100 text-purple-700",
  "Lifestyle": "bg-rose-100 text-rose-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminBlog() {
  const qc = useQueryClient();

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog"],
    queryFn: () => fetch("/api/admin/blog", { credentials: "include" }).then(r => r.json()),
  });

  const deletePost = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/admin/blog/${id}`, { method: "DELETE", credentials: "include" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/admin/blog"] }),
  });

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Articles</h2>
            <p className="text-sm text-gray-500 mt-1">{posts.length} articles</p>
          </div>
          <Link href="/admin/blog/new">
            <button className="flex items-center gap-2 bg-[#1C1008] text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors" data-testid="button-new-article">
              <Plus size={16} />
              Write Article
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <FileText size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No articles yet</p>
            <Link href="/admin/blog/new">
              <button className="bg-[#1C1008] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors">
                Write First Article
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg border border-gray-200 flex items-center gap-4 p-4" data-testid={`post-${post.id}`}>
                {/* Image */}
                <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 bg-gray-100">
                  {post.heroImage ? (
                    <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FileText size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">{post.title}</p>
                    {post.featured && <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">By {post.authorName} · {formatDate(post.publishedAt)}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-700"}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Eye size={10} />
                      {post.views.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/blog/${post.id}`}>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors text-xs" title="View on site">
                      <Eye size={15} />
                    </button>
                  </Link>
                  <Link href={`/admin/blog/${post.id}`}>
                    <button className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors" data-testid={`button-edit-post-${post.id}`}>
                      <Pencil size={15} />
                    </button>
                  </Link>
                  <button
                    onClick={() => { if (confirm(`Delete "${post.title}"?`)) deletePost.mutate(post.id); }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    data-testid={`button-delete-post-${post.id}`}
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
