import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Clock, ArrowRight, Tag, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  heroImage: string | null;
  readTime: string | null;
  featured: boolean;
  views: number;
  publishedAt: string;
}

const categories = ["All", "Market Insights", "Legal Guide", "Investor Tips", "Neighbourhood", "Lifestyle"];

const categoryColors: Record<string, string> = {
  "Market Insights": "bg-[#3D2716] text-[#FAF8F5]",
  "Legal Guide": "bg-[#424D38] text-[#FAF8F5]",
  "Investor Tips": "bg-[#995134] text-[#FAF8F5]",
  "Neighbourhood": "bg-[#917C63] text-[#FAF8F5]",
  "Lifestyle": "bg-[#D8BFAE] text-[#3D2716]",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-20 border-b border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Editorial</p>
            <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-6 leading-[1.05]" data-testid="text-page-title">
              Our Blog
            </h1>
            <p className="font-inria text-xl text-[#3D2716]/70 leading-relaxed max-w-xl">
              Market intelligence, legal clarity, and considered perspectives on Dubai real estate — written by our advisors, not our marketing department.
            </p>
          </div>
        </div>
      </section>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="animate-spin text-[#917C63]" size={32} />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Filter Bar */}
          <section className="border-b border-[#D8BFAE]/20 bg-white sticky top-20 z-20 shadow-sm">
            <div className="container mx-auto px-6 lg:px-12 py-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Tag size={14} className="text-[#917C63] mr-1" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    data-testid={`button-category-${cat.toLowerCase().replace(/\s/g, "-")}`}
                    className={`font-lejour text-xs uppercase tracking-widest px-5 py-2 transition-all ${
                      activeCategory === cat
                        ? "bg-[#3D2716] text-[#FAF8F5]"
                        : "border border-[#D8BFAE]/50 text-[#3D2716] hover:border-[#3D2716]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <span className="ml-auto font-inria text-xs text-[#917C63]">
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-16 container mx-auto px-6 lg:px-12">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-symphony text-3xl text-[#3D2716] mb-4">No Articles Found</p>
                <button onClick={() => setActiveCategory("All")} className="font-inria text-[#995134] uppercase tracking-widest hover:text-[#3D2716]">
                  View All Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group block" data-testid={`card-post-${post.id}`}>
                    <div className="relative overflow-hidden aspect-[16/10] mb-5">
                      <img
                        src={post.heroImage || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`inline-block px-2.5 py-1 font-inria text-[9px] uppercase tracking-widest ${categoryColors[post.category] || "bg-[#3D2716] text-[#FAF8F5]"}`}>
                          {post.category}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1.5 font-inria text-xs text-[#917C63]">
                            <Clock size={12} />
                            {post.readTime}
                          </span>
                        )}
                      </div>
                      <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-wide leading-snug group-hover:text-[#995134] transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-inria text-sm text-[#3D2716]/65 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#D8BFAE]/20">
                        <div>
                          <p className="font-lejour text-[10px] text-[#3D2716] uppercase tracking-widest">{post.authorName}</p>
                          <p className="font-inria text-xs text-[#917C63] mt-0.5">{formatDate(post.publishedAt)}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[#995134] group-hover:text-[#3D2716] transition-colors pt-1">
                          <span className="font-inria text-xs uppercase tracking-widest">Read Article</span>
                          <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Newsletter */}
          <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Stay Informed</p>
                  <h2 className="font-symphony text-4xl md:text-5xl mb-6 leading-[1.1]">
                    Market Intelligence,<br />Direct to Your Inbox
                  </h2>
                  <p className="font-inria text-lg text-[#FAF8F5]/70 leading-relaxed">
                    New articles, market data, and legal guides — delivered once a month. No promotional content, no sales pitches. Only the analysis you actually need.
                  </p>
                </div>
                <NewsletterForm />
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      setStatus("success");
      setEmail("");
    } catch {
      setMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4">
      {status === "success" ? (
        <div className="bg-[#424D38] border border-[#FAF8F5]/10 p-6">
          <p className="font-inria text-[#FAF8F5] leading-relaxed">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First name (optional)"
            className="w-full bg-transparent border border-[#FAF8F5]/20 text-[#FAF8F5] placeholder-[#FAF8F5]/40 px-5 py-4 font-inria focus:border-[#D8BFAE] outline-none transition-colors"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            data-testid="input-newsletter-email"
            className="w-full bg-transparent border border-[#FAF8F5]/20 text-[#FAF8F5] placeholder-[#FAF8F5]/40 px-5 py-4 font-inria focus:border-[#D8BFAE] outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            data-testid="button-newsletter-submit"
            className="w-full bg-[#995134] text-[#FAF8F5] py-4 font-lejour uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe to Intelligence"}
          </button>
          {status === "error" && (
            <p className="font-inria text-sm text-red-300">{message}</p>
          )}
          <p className="font-inria text-xs text-[#FAF8F5]/40 leading-relaxed">
            We publish monthly. You can unsubscribe at any time. We do not share your data.
          </p>
        </form>
      )}
    </div>
  );
}
