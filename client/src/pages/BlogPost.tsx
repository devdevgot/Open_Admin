import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "wouter";
import { openContactModal } from "@/lib/contact";
import { useQuery } from "@tanstack/react-query";
import { Eye, Clock, Calendar, ArrowLeft, Share2, BookOpen, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  authorName: string;
  authorRole: string | null;
  authorImage: string | null;
  heroImage: string | null;
  excerpt: string;
  content: string;
  featured: boolean;
  views: number;
  readTime: string | null;
  publishedAt: string;
}

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

const relatedPostImages: Record<string, string> = {
  "Market Insights": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=260&fit=crop",
  "Legal Guide": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=260&fit=crop",
  "Investor Tips": "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=260&fit=crop",
  "Neighbourhood": "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=260&fit=crop",
  "Lifestyle": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=260&fit=crop",
};

export default function BlogPost() {
  const params = useParams<{ id: string }>();
  const postId = params.id;

  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${postId}`],
    enabled: !!postId,
  });

  const { data: allPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    enabled: !!post,
  });

  const sections: Section[] = post ? (() => {
    try { return JSON.parse(post.content) as Section[]; }
    catch { return []; }
  })() : [];

  const relatedPosts = allPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 2);

  useEffect(() => {
    if (!sections.length) return;
    setActiveSection(sections[0].id);

    const observers: IntersectionObserver[] = [];
    sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section.id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [sections.length]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin text-[#917C63]" size={36} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
          <h2 className="font-symphony text-4xl text-[#3D2716] mb-4">Article Not Found</h2>
          <p className="font-inria text-[#917C63] mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" className="bg-[#3D2716] text-[#FAF8F5] px-8 py-3 font-inria uppercase tracking-widest hover:bg-[#995134] transition-colors">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={post.heroImage || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=600&fit=crop"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D2716]/90 via-[#3D2716]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6" data-testid="link-back-blog">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <span className={`inline-block px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest mb-4 ${categoryColors[post.category] || "bg-[#3D2716] text-[#FAF8F5]"}`}>
              {post.category}
            </span>
            <h1 className="font-symphony text-3xl md:text-5xl text-[#FAF8F5] leading-[1.15] max-w-3xl" data-testid="text-article-title">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="border-b border-[#D8BFAE]/20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-wrap items-center gap-6 justify-between">
            <div className="flex items-center gap-6">
              {post.authorImage && (
                <div className="flex items-center gap-3">
                  <img src={post.authorImage} alt={post.authorName} className="w-9 h-9 object-cover" />
                  <div>
                    <p className="font-lejour text-xs text-[#3D2716] uppercase tracking-widest leading-none">{post.authorName}</p>
                    {post.authorRole && <p className="font-inria text-xs text-[#917C63] mt-0.5">{post.authorRole}</p>}
                  </div>
                </div>
              )}
              <div className="w-px h-8 bg-[#D8BFAE]/30 hidden sm:block" />
              <div className="flex items-center gap-5 text-[#917C63]">
                <span className="flex items-center gap-1.5 font-inria text-xs">
                  <Calendar size={13} />
                  {formatDate(post.publishedAt)}
                </span>
                {post.readTime && (
                  <span className="flex items-center gap-1.5 font-inria text-xs">
                    <Clock size={13} />
                    {post.readTime}
                  </span>
                )}
                <span className="flex items-center gap-1.5 font-inria text-xs" data-testid="text-views">
                  <Eye size={13} />
                  {post.views.toLocaleString()} views
                </span>
              </div>
            </div>
            <button
              onClick={() => navigator.share?.({ title: post.title, url: window.location.href }).catch(() => {})}
              className="flex items-center gap-2 font-inria text-xs text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors"
              data-testid="button-share"
            >
              <Share2 size={13} />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Content area */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">

          {/* Left: Table of Contents */}
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen size={14} className="text-[#917C63]" />
                  <p className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.25em]">Contents</p>
                </div>
                <nav className="space-y-1">
                  {sections.map((section, idx) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      data-testid={`toc-link-${section.id}`}
                      className={`group w-full text-left flex items-start gap-3 py-2.5 px-3 transition-all ${
                        activeSection === section.id
                          ? "bg-[#3D2716]/[0.05] border-l-2 border-[#995134]"
                          : "border-l-2 border-transparent hover:border-[#D8BFAE]"
                      }`}
                    >
                      <span className={`font-symphony text-sm shrink-0 mt-0.5 transition-colors ${activeSection === section.id ? "text-[#995134]" : "text-[#D8BFAE] group-hover:text-[#917C63]"}`}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-inria text-xs leading-snug transition-colors ${activeSection === section.id ? "text-[#3D2716]" : "text-[#917C63] group-hover:text-[#3D2716]"}`}>
                        {section.title}
                      </span>
                    </button>
                  ))}
                </nav>

                <div className="mt-10 pt-8 border-t border-[#D8BFAE]/20">
                  <p className="font-inria text-xs text-[#917C63] leading-relaxed mb-4">
                    Need personalised advice on this topic?
                  </p>
                  <Link href="/about" className="block w-full bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-xs uppercase tracking-widest text-center hover:bg-[#995134] transition-colors" data-testid="button-toc-cta">
                    Speak With Us
                  </Link>
                </div>
              </div>
            </aside>
          )}

          {/* Right: Article body */}
          <article className="min-w-0">
            {post.subtitle && (
              <p className="font-inria text-xl text-[#3D2716]/75 leading-relaxed mb-12 pb-12 border-b border-[#D8BFAE]/20 italic">
                {post.subtitle}
              </p>
            )}

            <div className="space-y-14">
              {sections.map((section, idx) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                  className="scroll-mt-28"
                  data-testid={`section-${section.id}`}
                >
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-symphony text-4xl text-[#D8BFAE]/70 shrink-0 leading-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-lejour text-xl text-[#3D2716] uppercase tracking-widest leading-snug">
                      {section.title}
                    </h2>
                  </div>
                  <div className="max-w-2xl space-y-5">
                    {section.content.split("\n\n").map((para, pIdx) => (
                      <p key={pIdx} className="font-inria text-base text-[#3D2716]/75 leading-loose">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Author card */}
            {post.authorImage && (
              <div className="mt-16 pt-12 border-t border-[#D8BFAE]/20">
                <div className="flex items-start gap-6 bg-[#3D2716]/[0.03] border border-[#D8BFAE]/20 p-8">
                  <img src={post.authorImage} alt={post.authorName} className="w-16 h-16 object-cover shrink-0" />
                  <div>
                    <p className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.3em] mb-2">Written by</p>
                    <p className="font-lejour text-lg text-[#3D2716] uppercase tracking-widest">{post.authorName}</p>
                    {post.authorRole && <p className="font-inria text-sm text-[#917C63] mb-3">{post.authorRole}, Aviera Living</p>}
                    <p className="font-inria text-sm text-[#3D2716]/65 leading-relaxed">
                      An advisor at Aviera Living with deep expertise in Dubai's luxury real estate market, delivering transparent analysis and legal precision on every mandate.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#D8BFAE]/20">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-8">Continue Reading</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl lg:ml-[256px]">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.id}`} className="group" data-testid={`card-related-${related.id}`}>
                  <div className="overflow-hidden aspect-[16/9] mb-4">
                    <img
                      src={related.heroImage || relatedPostImages[related.category] || "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=260&fit=crop"}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <span className={`inline-block px-2.5 py-1 font-inria text-[9px] uppercase tracking-widest mb-3 ${categoryColors[related.category] || "bg-[#3D2716] text-[#FAF8F5]"}`}>
                    {related.category}
                  </span>
                  <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-wide leading-snug group-hover:text-[#995134] transition-colors">
                    {related.title}
                  </h3>
                  <p className="font-inria text-xs text-[#917C63] mt-2">{formatDate(related.publishedAt)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Have Questions About the Market?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-xl mx-auto">
            Speak with one of our senior advisors for a personalised assessment of how these market conditions affect your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openContactModal({ type: "general" })} className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors text-center" data-testid="button-schedule">
              Schedule a Consultation
            </button>
            <Link href="/blog" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-more-articles">
              More Articles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
