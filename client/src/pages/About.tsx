import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { label: "Our Founder", href: "/about/founder", desc: "The vision behind Aviera Living" },
  { label: "Our Story", href: "/about/story", desc: "How we became Dubai's most trusted boutique firm" },
  { label: "Our Agents", href: "/about/agents", desc: "Meet the team behind every transaction" },
  { label: "Mission & Vision", href: "/about/mission", desc: "Where we are going and why it matters" },
  { label: "Core Values", href: "/about/values", desc: "The principles that define how we work" },
  { label: "Client Experience Promise", href: "/about/experience", desc: "Our commitment to you, in writing" },
  { label: "Why It Matters to Investors", href: "/about/investors", desc: "The Aviera edge in an investor's world" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#3D2716]/[0.03]"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <div
            className="h-full bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=960&h=1200&fit=crop)" }}
          >
            <div className="h-full bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/20 to-transparent"></div>
          </div>
        </div>
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="max-w-xl">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-6">Who We Are</p>
            <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-8 leading-[1.05]" data-testid="text-page-title">
              Built on Trust.<br />Defined by<br />Precision.
            </h1>
            <p className="font-inria text-xl text-[#3D2716]/70 leading-relaxed mb-12">
              Aviera Living is Dubai's boutique luxury real estate firm — where legal precision, editorial design, and human connection converge to create an experience unlike any other.
            </p>
            <Link href="/about/founder" className="bg-[#3D2716] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#995134] transition-colors inline-block" data-testid="link-meet-founder">
              Meet Our Founder
            </Link>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-[#3D2716] py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-[#FAF8F5]/10">
            {[
              { v: "2016", l: "Founded" },
              { v: "AED 4.2B", l: "Transaction Volume" },
              { v: "98%", l: "Client Satisfaction" },
              { v: "12", l: "Team Members" },
            ].map((s) => (
              <div key={s.l} className="text-center md:px-8">
                <p className="font-symphony text-3xl md:text-4xl text-[#D8BFAE]">{s.v}</p>
                <p className="font-inria text-xs text-[#FAF8F5]/60 uppercase tracking-wider mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pages Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Explore</p>
            <h2 className="font-symphony text-4xl text-[#3D2716]">Everything About Aviera</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className="group block bg-white border border-[#D8BFAE]/20 p-10 hover:border-[#995134]/40 hover:shadow-lg transition-all"
                data-testid={`card-about-${i}`}
              >
                <p className="font-symphony text-5xl text-[#D8BFAE]/60 mb-4 group-hover:text-[#995134]/30 transition-colors">0{i + 1}</p>
                <h3 className="font-lejour text-lg text-[#3D2716] uppercase tracking-widest mb-3">{s.label}</h3>
                <p className="font-inria text-sm text-[#3D2716]/60 mb-6 leading-relaxed">{s.desc}</p>
                <span className="font-inria text-xs text-[#995134] uppercase tracking-widest group-hover:text-[#3D2716] transition-colors">
                  Read More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Quote */}
      <section className="py-24 bg-[#3D2716]/[0.04] border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <div className="font-symphony text-6xl text-[#D8BFAE] mb-8">"</div>
          <p className="font-inria text-2xl md:text-3xl text-[#3D2716] italic leading-relaxed mb-10">
            Real estate is not just about property — it is about people, trust, and the life each transaction enables. We built Aviera to be the firm we wished existed.
          </p>
          <p className="font-lejour text-base text-[#3D2716] uppercase tracking-widest">Sophia Al Nour</p>
          <p className="font-inria text-sm text-[#917C63] mt-1">Founder & Managing Director, Aviera Living</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
