import { Link } from "wouter";
import { Eye, Target, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const missions = [
  {
    icon: Target,
    label: "Mission",
    heading: "To be the most trusted name in Dubai luxury real estate.",
    body: "We exist to ensure that every client — buyer, seller, or investor — makes their most consequential financial decisions with complete clarity, legal security, and the confidence that comes from working with a team that places their interests absolutely first. Not mostly first. Absolutely first.",
  },
  {
    icon: Eye,
    label: "Vision",
    heading: "A world where real estate transactions feel the way they should: considered, fair, and human.",
    body: "We envision a Dubai property market defined by transparency, where boutique excellence sets the benchmark that the rest of the industry aspires to reach. Where investors come to us not because we are the biggest firm in the city, but because we are the one they trust with the decisions that matter most.",
  },
  {
    icon: Compass,
    label: "Purpose",
    heading: "To prove that legal precision and human empathy are not opposites — they are the same thing.",
    body: "Aviera was founded on the belief that the most sophisticated service is also the most honest. That knowing a client's legal rights, understanding their life goals, and aligning every recommendation to their long-term interest is not just ethically right — it is the only sustainable business model in an industry built on referrals.",
  },
];

export default function AboutMission() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-14">
          <Link href="/about" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6 inline-block" data-testid="link-back">
            ← About Us
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Direction & Intent</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-4" data-testid="text-page-title">
            Mission &<br />Vision
          </h1>
          <p className="font-inria text-xl text-[#FAF8F5]/75 max-w-xl">
            The convictions that guide every decision we make — from the properties we list to the advisors we hire.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Purpose */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-0">
            {missions.map((m, idx) => (
              <div
                key={m.label}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 py-20 items-center ${idx !== missions.length - 1 ? "border-b border-[#D8BFAE]/20" : ""} ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#424D38]/[0.08] flex items-center justify-center">
                      <m.icon size={22} className="text-[#995134]" strokeWidth={1.5} />
                    </div>
                    <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em]">{m.label}</p>
                  </div>
                  <h2 className="font-symphony text-3xl md:text-4xl text-[#3D2716] mb-8 leading-[1.2]">{m.heading}</h2>
                  <p className="font-inria text-lg text-[#3D2716]/70 leading-loose">{m.body}</p>
                </div>
                <div className={`hidden lg:block ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div className="aspect-square bg-[#424D38]/[0.05] flex items-center justify-center">
                    <m.icon size={120} className="text-[#D8BFAE]/60" strokeWidth={0.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic commitments */}
      <section className="py-20 bg-[#3D2716]/[0.04] border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4 text-center">Strategic Commitments</p>
          <h2 className="font-symphony text-4xl text-[#3D2716] mb-16 text-center">How We Pursue Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Remain Boutique", desc: "We will never grow faster than our ability to maintain quality. Selectivity is a competitive advantage, not a limitation." },
              { num: "02", title: "Legal-First Operations", desc: "Every engagement begins with legal due diligence. No property is recommended until it passes our internal compliance review." },
              { num: "03", title: "Education as Service", desc: "Informed clients make better decisions. We invest in educating every client about the Dubai market, their rights, and their options." },
              { num: "04", title: "Long-Term Relationships", desc: "We measure success by how many clients return — not by the number of new leads generated. 78% of our business comes from referrals." },
            ].map((c) => (
              <div key={c.num} className="flex gap-8 bg-white p-8 border border-[#D8BFAE]/20" data-testid={`card-commitment-${c.num}`}>
                <span className="font-symphony text-4xl text-[#D8BFAE] shrink-0">{c.num}</span>
                <div>
                  <h3 className="font-lejour text-lg text-[#3D2716] uppercase tracking-wider mb-3">{c.title}</h3>
                  <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">See Our Mission in Action</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Browse our curated portfolio or speak with an advisor to experience firsthand what mission-led real estate advisory looks like.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buy" className="bg-[#995134] text-[#FAF8F5] px-10 py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors text-center" data-testid="link-properties">
              Browse Properties
            </Link>
            <Link href="/about/values" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-10 py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-values">
              Our Core Values
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
