import { useState } from "react";
import { Link } from "wouter";
import { Clock, ArrowRight, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Market Insights", "Legal Guide", "Investor Tips", "Neighbourhood", "Lifestyle"];

const posts = [
  {
    id: 1,
    category: "Market Insights",
    title: "Dubai Prime Residential Prices Rise 18% in Q1 2026: What Buyers Need to Know",
    excerpt: "The latest DLD transaction data reveals sustained momentum in Dubai's luxury segment, with Palm Jumeirah and Emirates Hills leading price appreciation. We break down what this means for buyers and investors.",
    author: "Sophia Al Nour",
    authorRole: "Founder & MD",
    date: "March 14, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 2,
    category: "Legal Guide",
    title: "The Complete Guide to Off-Plan Contracts in Dubai: What Every Buyer Must Verify",
    excerpt: "Off-plan purchases offer compelling returns — but they carry risks that too many buyers discover only after signing. Our legal team outlines the ten clauses every SPA must contain before you commit.",
    author: "Marcus Webb",
    authorRole: "Legal & Compliance Lead",
    date: "March 8, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 3,
    category: "Investor Tips",
    title: "Buy-to-Let in Dubai: Gross Yield vs Net Yield — The Numbers Developers Don't Show You",
    excerpt: "A 7% gross yield sounds attractive. But once service charges, DEWA deposits, agency fees and vacancy periods are accounted for, what is the real return? We do the honest maths.",
    author: "Priya Sharma",
    authorRole: "Rental & Yield Specialist",
    date: "February 28, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 4,
    category: "Neighbourhood",
    title: "Emirates Hills vs Palm Jumeirah: Which Is Right for You in 2026?",
    excerpt: "Two icons of Dubai luxury living — but profoundly different in character, community, lifestyle, and investment profile. Our neighbourhood guide compares them honestly, without the developer spin.",
    author: "Layla Hassan",
    authorRole: "Luxury Residential Specialist",
    date: "February 20, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 5,
    category: "Legal Guide",
    title: "Ejari Registration in Dubai: A Step-by-Step Guide for Tenants and Landlords",
    excerpt: "Every tenancy in Dubai must be registered through Ejari. Yet many tenants still don't understand the process — or why skipping it leaves them legally exposed. Here is exactly what you need to do.",
    author: "Marcus Webb",
    authorRole: "Legal & Compliance Lead",
    date: "February 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 6,
    category: "Market Insights",
    title: "The Rise of Branded Residences in Dubai: Investment Opportunity or Marketing Premium?",
    excerpt: "From Armani to Four Seasons, branded residences command a 30–50% price premium over comparable non-branded units. We examine whether that premium is justified — and when it isn't.",
    author: "James Carrington",
    authorRole: "Senior Sales Director",
    date: "February 5, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 7,
    category: "Investor Tips",
    title: "How to Structure Your Dubai Property Investment as a Non-Resident",
    excerpt: "Foreign nationals own billions in Dubai real estate. But the optimal ownership structure — personal name, UAE company, offshore holding — depends heavily on your tax residency, estate planning needs, and exit strategy.",
    author: "Andrei Volkov",
    authorRole: "Investment Portfolio Advisor",
    date: "January 29, 2026",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 8,
    category: "Lifestyle",
    title: "Living in Downtown Dubai: An Honest Resident's Perspective After Two Years",
    excerpt: "Downtown Dubai is one of the world's most photographed postcodes. But what is it actually like to live there? Our resident client shares what the listing brochures never mention.",
    author: "Layla Hassan",
    authorRole: "Luxury Residential Specialist",
    date: "January 22, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 9,
    category: "Neighbourhood",
    title: "Business Bay in 2026: Still a Business District, or Dubai's Most Undervalued Residential Quarter?",
    excerpt: "Five years ago, Business Bay was where people worked. Today it is increasingly where Dubai's most design-conscious residents choose to live. We examine the transformation — and whether it has further to run.",
    author: "James Carrington",
    authorRole: "Senior Sales Director",
    date: "January 15, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "Market Insights": "bg-[#3D2716] text-[#FAF8F5]",
  "Legal Guide": "bg-[#424D38] text-[#FAF8F5]",
  "Investor Tips": "bg-[#995134] text-[#FAF8F5]",
  "Neighbourhood": "bg-[#917C63] text-[#FAF8F5]",
  "Lifestyle": "bg-[#D8BFAE] text-[#3D2716]",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured = posts.find(p => p.featured);
  const regular = filtered.filter(p => !p.featured);
  const showFeatured = activeCategory === "All" && featured;

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

      {/* Featured Post */}
      {showFeatured && (
        <section className="py-16 border-b border-[#D8BFAE]/20">
          <div className="container mx-auto px-6 lg:px-12">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-8">Featured Article</p>
            <Link href={`/blog/${featured!.id}`} className="grid grid-cols-1 lg:grid-cols-2 gap-0 group" data-testid="card-featured-post">
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-auto">
                <img
                  src={featured!.image}
                  alt={featured!.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="bg-[#3D2716] p-10 md:p-14 flex flex-col justify-center">
                <span className={`inline-block px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest mb-6 self-start ${categoryColors[featured!.category]}`}>
                  {featured!.category}
                </span>
                <h2 className="font-symphony text-3xl md:text-4xl text-[#FAF8F5] mb-6 leading-[1.2]">
                  {featured!.title}
                </h2>
                <p className="font-inria text-base text-[#FAF8F5]/70 leading-relaxed mb-8">
                  {featured!.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-widest">{featured!.author}</p>
                    <p className="font-inria text-xs text-[#FAF8F5]/50 mt-0.5">{featured!.date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[#995134] group-hover:text-[#D8BFAE] transition-colors">
                    <span className="font-inria text-xs uppercase tracking-widest">Read More</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="border-b border-[#D8BFAE]/20 bg-white sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Tag size={14} className="text-[#917C63] mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`button-category-${cat.toLowerCase().replace(/\s/g, "-")}`}
                className={`font-inria text-xs uppercase tracking-widest px-5 py-2 transition-all ${
                  activeCategory === cat
                    ? "bg-[#3D2716] text-[#FAF8F5]"
                    : "border border-[#D8BFAE]/50 text-[#3D2716] hover:border-[#3D2716]"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto font-inria text-xs text-[#917C63]">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 container mx-auto px-6 lg:px-12">
        {regular.length === 0 && !showFeatured ? (
          <div className="text-center py-20">
            <p className="font-symphony text-3xl text-[#3D2716] mb-4">No Articles Found</p>
            <button onClick={() => setActiveCategory("All")} className="font-inria text-[#995134] uppercase tracking-widest hover:text-[#3D2716]">
              View All Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regular.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block" data-testid={`card-post-${post.id}`}>
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest ${categoryColors[post.category] || "bg-[#3D2716] text-[#FAF8F5]"}`}>
                    {post.category}
                  </span>
                </div>
                {/* Content */}
                <div className="space-y-3">
                  <h2 className="font-lejour text-lg text-[#3D2716] leading-snug tracking-wide group-hover:text-[#995134] transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-inria text-sm text-[#3D2716]/65 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#D8BFAE]/20">
                    <div>
                      <p className="font-lejour text-[10px] text-[#3D2716] uppercase tracking-widest">{post.author}</p>
                      <p className="font-inria text-xs text-[#917C63] mt-0.5">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#917C63]">
                      <Clock size={12} />
                      <span className="font-inria text-xs">{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#995134] group-hover:text-[#3D2716] transition-colors pt-1">
                    <span className="font-inria text-xs uppercase tracking-widest">Read Article</span>
                    <ArrowRight size={13} />
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
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent border border-[#FAF8F5]/20 px-6 py-4 text-[#FAF8F5] font-inria placeholder:text-[#FAF8F5]/40 focus:border-[#D8BFAE] outline-none"
                data-testid="input-name"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border border-[#FAF8F5]/20 px-6 py-4 text-[#FAF8F5] font-inria placeholder:text-[#FAF8F5]/40 focus:border-[#D8BFAE] outline-none"
                data-testid="input-email"
              />
              <button className="w-full bg-[#995134] text-[#FAF8F5] py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-subscribe">
                Subscribe to the Blog
              </button>
              <p className="font-inria text-xs text-[#FAF8F5]/40 text-center">Monthly digest. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
