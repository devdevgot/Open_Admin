import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeline = [
  { year: "2013", event: "Graduated in Law" },
  { year: "2013 – 2016", event: "Started her career in the legal field, building a strong foundation in contracts and client representation" },
  { year: "2017", event: "Moved into real estate, bringing a legal-first perspective into the industry" },
  { year: "2024", event: "Founded Aviera Living to create a more transparent, client-focused real estate experience" },
];

const principles = [
  { title: "Legal First", desc: "Every transaction begins with legal diligence, not sales pressure. Protecting clients is non-negotiable." },
  { title: "Radical Transparency", desc: "No hidden fees, no ambiguity. Clients receive full documentation at every step." },
  { title: "Long-Term Thinking", desc: "We build relationships, not commission records. Most of our clients return for every subsequent transaction." },
];

export default function AboutFounder() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[calc(100vh-64px)]">

          {/* Photo */}
          <div className="relative overflow-hidden h-[55vw] max-h-[65vh] lg:h-auto lg:max-h-none">
            <img
              src="/IMG_3765_1774274624169.jpeg"
              alt="Rimma Daminova"
              className="absolute inset-0 w-full h-full translate-x-[50px] translate-y-[18px] scale-125 object-cover object-[72%_30%] lg:translate-x-0 lg:translate-y-0 lg:scale-100 lg:object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D2716]/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#3D2716]/10"></div>
          </div>

          {/* Text */}
          <div className="bg-[#3D2716] text-[#FAF8F5] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 lg:py-20">
            <Link href="/about" className="text-xs font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-10 inline-block" data-testid="link-back">
              ← About Us
            </Link>
            <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-5">The Visionary</p>
            <h1 className="font-symphony text-5xl sm:text-6xl lg:text-7xl text-[#FAF8F5] mb-5 leading-[1.08]" data-testid="text-page-title">
              Rimma<br />Daminova
            </h1>
            <div className="w-10 h-[1px] bg-[#D8BFAE]/40 mb-5"></div>
            <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.25em] mb-8">
              Founder & Managing Director
            </p>
            <p className="font-inria text-base lg:text-lg text-[#FAF8F5]/75 leading-relaxed max-w-md">
              With a background in real estate law and over a decade advising Dubai's most sophisticated buyers, Rimma founded Aviera Living to fill a gap no other brokerage had addressed.
            </p>
          </div>

        </div>
      </section>

      {/* Bio */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">The Journey</p>
              <h2 className="font-symphony text-4xl text-[#3D2716] mb-8">Before the Business, There Was Perspective</h2>
              <div className="space-y-6 font-inria text-base text-[#3D2716]/75 leading-loose">
                <p>
                  Before stepping into real estate, Rimma Daminova began her career in law, graduating in 2013. Working closely with legal structures and contracts early on gave her something many in the industry lack — a clear understanding of what clients are actually signing, and what it truly means for them.
                </p>
                <p>
                  In 2017, she transitioned into real estate and quickly noticed a pattern: people weren't lacking ambition or resources — they were lacking clarity and guidance they could trust. That realization shaped everything that followed.
                </p>
                <p>
                  By 2024, Rimma founded Aviera Living with a simple but powerful idea — real estate should feel informed, not overwhelming; personal, not transactional. Her approach combines legal insight with genuine care, creating an experience where clients feel confident, understood, and fully in control of their decisions.
                </p>
              </div>
            </div>
            <div>
              <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Timeline</p>
              <div className="space-y-0">
                {timeline.map((t, idx) => (
                  <div key={t.year} className={`flex gap-8 pb-8 ${idx !== timeline.length - 1 ? "border-b border-[#D8BFAE]/20 mb-8" : ""}`}>
                    <div className="shrink-0">
                      <span className="font-symphony text-3xl text-[#D8BFAE]">{t.year}</span>
                    </div>
                    <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed pt-2">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-[#3D2716]/[0.04] border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4 text-center">Philosophy</p>
          <h2 className="font-symphony text-4xl text-[#3D2716] mb-16 text-center">Three Principles She Never Compromises</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((p) => (
              <div key={p.title} className="bg-white p-10 border border-[#D8BFAE]/20 text-center">
                <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-widest mb-4">{p.title}</h3>
                <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <div className="font-symphony text-6xl text-[#D8BFAE] mb-8">"</div>
          <p className="font-inria text-2xl md:text-3xl leading-relaxed mb-10 text-[#FAF8F5]/90">
            I built Aviera because I believe that the most significant financial decision of a person's life deserves more than a sales pitch. It deserves a partner.
          </p>
          <p className="font-lejour text-base text-[#D8BFAE] uppercase tracking-widest">Rimma Daminova</p>
          <p className="font-inria text-sm text-[#FAF8F5]/50 mt-1">Founder & Managing Director</p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about/agents" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-10 py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-meet-agents">
              Meet the Team
            </Link>
            <Link href="/about/story" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-10 py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-our-story">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
