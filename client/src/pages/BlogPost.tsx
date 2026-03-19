import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Eye, Clock, Calendar, ArrowLeft, Share2, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const article = {
  id: 1,
  category: "Market Insights",
  title: "Dubai Prime Residential Prices Rise 18% in Q1 2026: What Buyers Need to Know",
  subtitle: "The latest DLD transaction data reveals sustained momentum in Dubai's luxury segment. We break down what this means for buyers and investors entering the market today.",
  author: "Sophia Al Nour",
  authorRole: "Founder & Managing Director",
  authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
  date: "March 14, 2026",
  readTime: "7 min read",
  views: 4821,
  heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=600&fit=crop",
  sections: [
    {
      id: "overview",
      title: "Market Overview",
      content: `Dubai's prime residential market recorded an 18% year-on-year price increase in Q1 2026, according to the latest data from the Dubai Land Department. This marks the sixth consecutive quarter of sustained growth in the luxury segment, driven by continued demand from international buyers and a constrained supply pipeline in premium locations.\n\nTransactions in the AED 5M+ bracket rose by 23% compared to the same period last year, with off-plan sales comprising 61% of total volume — the highest proportion on record.`,
    },
    {
      id: "top-performers",
      title: "Top Performing Areas",
      content: `Palm Jumeirah led all communities with an average price appreciation of 24%, followed by Emirates Hills at 21% and Downtown Dubai at 17%. The data reflects a broad-based trend rather than isolated pockets of demand.\n\nNoteworthy is the performance of newer communities such as Sobha Hartland and Dubai Hills Estate, which both recorded growth exceeding 19% — suggesting that premium suburban living is attracting a new category of buyer.`,
    },
    {
      id: "buyer-profile",
      title: "Who Is Buying",
      content: `The composition of buyers has shifted meaningfully in the past 18 months. European buyers — particularly from the UK, France, and Germany — now represent the fastest-growing nationality cohort, displacing Russian buyers who dominated headlines in 2022–2023.\n\nInvestor-led purchases account for approximately 44% of transactions, with the majority targeting buy-to-let assets in communities with strong rental demand such as Dubai Marina, JBR, and Business Bay.`,
    },
    {
      id: "legal-considerations",
      title: "Legal Considerations for Buyers",
      content: `With competition intensifying, buyers are under pressure to move quickly — a dynamic that increases legal risk. Our team has observed a rise in buyers signing reservation forms without adequate due diligence, only to discover material issues at the SPA stage.\n\nKey areas to verify before committing: developer escrow compliance, title encumbrances, payment plan structure, handover date enforceability, and resale restrictions. None of these checks take long when done properly. Skipping them can be costly.`,
    },
    {
      id: "outlook",
      title: "2026 Outlook",
      content: `Forward indicators remain broadly positive. The pipeline of new luxury supply in Palm Jumeirah, Downtown, and Emirates Hills is limited by land availability, which should support prices in the near term. Expo City's continued activation and Dubai's expanding financial sector are expected to sustain high-income resident inflows.\n\nThat said, the pace of appreciation is likely to moderate through Q3 and Q4 as affordability constraints begin to cap the upper end of demand. Buyers who move decisively in H1 2026 are better positioned than those who wait.`,
    },
    {
      id: "aviera-view",
      title: "The Aviera View",
      content: `Our advisory position has not changed: we do not recommend buying on sentiment or momentum alone. Every acquisition we advise on is stress-tested against rental yield, resale liquidity, legal title quality, and developer track record.\n\nFor buyers currently active in the market: focus on freehold zones, verified developers, and properties with clear title. Avoid off-plan projects where the developer has no completed inventory — the risk profile is materially different from those with proven delivery records.`,
    },
  ],
  relatedPosts: [
    {
      id: 2,
      title: "The Complete Guide to Off-Plan Contracts in Dubai",
      category: "Legal Guide",
      date: "March 8, 2026",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=260&fit=crop",
    },
    {
      id: 3,
      title: "Buy-to-Let in Dubai: The Honest Numbers",
      category: "Investor Tips",
      date: "February 28, 2026",
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=260&fit=crop",
    },
  ],
};

const categoryColors: Record<string, string> = {
  "Market Insights": "bg-[#3D2716] text-[#FAF8F5]",
  "Legal Guide": "bg-[#424D38] text-[#FAF8F5]",
  "Investor Tips": "bg-[#995134] text-[#FAF8F5]",
  "Neighbourhood": "bg-[#917C63] text-[#FAF8F5]",
  "Lifestyle": "bg-[#D8BFAE] text-[#3D2716]",
};

export default function BlogPost() {
  const [activeSection, setActiveSection] = useState<string>(article.sections[0].id);
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    article.sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach(o => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D2716]/90 via-[#3D2716]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6" data-testid="link-back-blog">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <span className={`inline-block px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest mb-4 ${categoryColors[article.category] || "bg-[#3D2716] text-[#FAF8F5]"}`}>
              {article.category}
            </span>
            <h1 className="font-symphony text-3xl md:text-5xl text-[#FAF8F5] leading-[1.15] max-w-3xl" data-testid="text-article-title">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="border-b border-[#D8BFAE]/20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-wrap items-center gap-6 justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img src={article.authorImage} alt={article.author} className="w-9 h-9 object-cover" />
                <div>
                  <p className="font-lejour text-xs text-[#3D2716] uppercase tracking-widest leading-none">{article.author}</p>
                  <p className="font-inria text-xs text-[#917C63] mt-0.5">{article.authorRole}</p>
                </div>
              </div>
              <div className="w-px h-8 bg-[#D8BFAE]/30 hidden sm:block"></div>
              <div className="flex items-center gap-5 text-[#917C63]">
                <span className="flex items-center gap-1.5 font-inria text-xs">
                  <Calendar size={13} />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5 font-inria text-xs">
                  <Clock size={13} />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5 font-inria text-xs" data-testid="text-views">
                  <Eye size={13} />
                  {article.views.toLocaleString()} views
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 font-inria text-xs text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors" data-testid="button-share">
              <Share2 size={13} />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Content area */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">

          {/* Left: Table of Contents — sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen size={14} className="text-[#917C63]" />
                <p className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.25em]">Contents</p>
              </div>
              <nav className="space-y-1">
                {article.sections.map((section, idx) => (
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

              {/* Divider + CTA */}
              <div className="mt-10 pt-8 border-t border-[#D8BFAE]/20">
                <p className="font-inria text-xs text-[#917C63] leading-relaxed mb-4">
                  Need personalised advice on this topic?
                </p>
                <button className="w-full bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#995134] transition-colors" data-testid="button-toc-cta">
                  Speak With Us
                </button>
              </div>
            </div>
          </aside>

          {/* Right: Article body */}
          <article className="min-w-0">
            {/* Subtitle / intro */}
            <p className="font-inria text-xl text-[#3D2716]/75 leading-relaxed mb-12 pb-12 border-b border-[#D8BFAE]/20 italic">
              {article.subtitle}
            </p>

            {/* Sections */}
            <div className="space-y-14">
              {article.sections.map((section, idx) => (
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
            <div className="mt-16 pt-12 border-t border-[#D8BFAE]/20">
              <div className="flex items-start gap-6 bg-[#3D2716]/[0.03] border border-[#D8BFAE]/20 p-8">
                <img src={article.authorImage} alt={article.author} className="w-16 h-16 object-cover shrink-0" />
                <div>
                  <p className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.3em] mb-2">Written by</p>
                  <p className="font-lejour text-lg text-[#3D2716] uppercase tracking-widest">{article.author}</p>
                  <p className="font-inria text-sm text-[#917C63] mb-3">{article.authorRole}, Aviera Living</p>
                  <p className="font-inria text-sm text-[#3D2716]/65 leading-relaxed">
                    With over 15 years in Dubai's luxury real estate market and a background in real estate law, Sophia advises UHNWI clients on acquisition, investment strategy, and portfolio management.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Related posts */}
        <div className="mt-20 pt-12 border-t border-[#D8BFAE]/20">
          <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-8">Continue Reading</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl lg:ml-[256px]">
            {article.relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group" data-testid={`card-related-${post.id}`}>
                <div className="overflow-hidden aspect-[16/9] mb-4">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className={`inline-block px-2.5 py-1 font-inria text-[9px] uppercase tracking-widest mb-3 ${categoryColors[post.category] || "bg-[#3D2716] text-[#FAF8F5]"}`}>
                  {post.category}
                </span>
                <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-wide leading-snug group-hover:text-[#995134] transition-colors">
                  {post.title}
                </h3>
                <p className="font-inria text-xs text-[#917C63] mt-2">{post.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Have Questions About the Market?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-xl mx-auto">
            Speak with one of our senior advisors for a personalised assessment of how these market conditions affect your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-schedule">
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
