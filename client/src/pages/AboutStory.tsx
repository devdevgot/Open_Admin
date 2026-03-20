import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const chapters = [
  {
    year: "The Problem",
    title: "A Market Without a Conscience",
    body: "When Sophia Al Nour arrived in Dubai's real estate market in 2013, she found an industry defined by volume, speed, and opaque transactions. Ultra-high-net-worth buyers were signing contracts worth tens of millions without independent legal counsel. Developers were selling off-plan units through commission-driven brokers who understood marketing better than law. Something was fundamentally broken.",
  },
  {
    year: "The Decision",
    title: "Boutique Over Broad",
    body: "In 2016, Aviera Living opened with an explicit philosophy: we will never be the largest real estate firm in Dubai. We will be the most trusted. The boutique model was a conscious rejection of the industry's obsession with headcount and portal rankings. Instead, Aviera would build its reputation one transaction at a time, refusing any client whose expectations could not be met with full integrity.",
  },
  {
    year: "The Identity",
    title: "Editorial Luxury as a Standard",
    body: "Luxury, to Aviera, is not chandeliers and champagne. It is precision. It is the confidence that comes from working with people who have read every line of your contract, who know every material fact about every property, and who will tell you the truth even when it means losing a commission. The editorial identity — sharp, considered, unhurried — reflects this belief that the highest form of service is clarity.",
  },
  {
    year: "Today",
    title: "A Firm That Proves the Model Works",
    body: "Eight years after its founding, Aviera Living has closed over AED 4 billion in transactions, maintained a 98% client satisfaction rate, and built a reputation that generates most of its business through referral alone. The firm has never run a price promotion, never competed on commission, and never deviated from its founding conviction: that the right transaction, done right, is always worth more than the wrong one done quickly.",
  },
];

export default function AboutStory() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[500px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop)" }}
        >
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-14">
          <Link href="/about" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6 inline-block" data-testid="link-back">
            ← About Us
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Our Story & Brand Purpose</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-4 leading-[1.1]" data-testid="text-page-title">
            Why Aviera<br />Exists
          </h1>
          <p className="font-inria text-xl text-[#FAF8F5]/75 max-w-xl">
            The story of a firm built not to grow fastest, but to mean the most to the clients it serves.
          </p>
        </div>
      </section>

      {/* Chapters */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-0">
            {chapters.map((ch, idx) => (
              <div
                key={ch.year}
                className={`py-16 ${idx !== chapters.length - 1 ? "border-b border-[#D8BFAE]/20" : ""}`}
              >
                <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">{ch.year}</p>
                <h2 className="font-symphony text-3xl md:text-4xl text-[#3D2716] mb-8">{ch.title}</h2>
                <p className="font-inria text-lg text-[#3D2716]/70 leading-loose">{ch.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Purpose Statement */}
      <section className="py-24 bg-[#3D2716]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-6">Brand Purpose</p>
              <h2 className="font-symphony text-4xl md:text-5xl text-[#FAF8F5] mb-8 leading-[1.1]">
                To make the most important financial decisions of people's lives feel safe, considered, and right.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                { label: "For buyers", desc: "We make certain you are purchasing the right asset, at the right price, with the right legal protections — not the most expensive unit we have on our books." },
                { label: "For sellers", desc: "We achieve exceptional outcomes because our reputation for honesty attracts buyers who trust us — and buyers who trust their agent pay more willingly." },
                { label: "For investors", desc: "We provide the market intelligence, legal clarity, and patient advisory that turns a single transaction into a multi-generational portfolio strategy." },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-[#995134] pl-6">
                  <p className="font-lejour text-sm text-[#D8BFAE] uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="font-inria text-sm text-[#FAF8F5]/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl text-[#3D2716] mb-6">Experience the Difference</h2>
          <p className="font-inria text-lg text-[#3D2716]/70 mb-10 max-w-xl mx-auto">
            There are hundreds of real estate firms in Dubai. There is only one Aviera. Come and find out why.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about/founder" className="bg-[#424D38] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#3D2716] transition-colors text-center" data-testid="link-founder">
              Meet Our Founder
            </Link>
            <Link href="/about/values" className="border border-[#3D2716] text-[#3D2716] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors text-center" data-testid="link-values">
              Our Core Values
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
