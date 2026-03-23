import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const timeline = [
  { year: "2008", event: "Graduated with distinction in Real Estate Law from UCL, London" },
  { year: "2010", event: "Joined a leading Abu Dhabi family office managing AED 800M in property assets" },
  { year: "2013", event: "Moved to Dubai; led transactions for Knight Frank's UHNWI division" },
  { year: "2016", event: "Founded Aviera Living with a vision to redefine the luxury real estate experience in Dubai" },
  { year: "2019", event: "Aviera closes its first AED 1 billion in total transaction volume" },
  { year: "2023", event: "Recognised by Arabian Business as one of Dubai's 50 most influential business leaders" },
];

const principles = [
  { title: "Legal First", desc: "Every transaction begins with legal diligence, not sales pressure. Protecting clients is non-negotiable." },
  { title: "Radical Transparency", desc: "No hidden fees, no ambiguity. Clients receive full documentation at every step." },
  { title: "Long-Term Thinking", desc: "We build relationships, not commission records. Most of our clients return for every subsequent transaction." },
];

export default function AboutFounder() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Photo */}
      <section className="relative pt-0 overflow-hidden mt-16">
        <div
          className="w-full h-[50vh] lg:h-[60vh] bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=960&h=1200&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-[#3D2716]/20"></div>
        </div>
      </section>

      {/* Hero Text */}
      <section className="bg-[#3D2716] text-[#FAF8F5] py-20 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <Link href="/about" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-10 inline-block" data-testid="link-back">
            ← About Us
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-6">The Visionary</p>
          <h1 className="font-symphony text-5xl md:text-6xl text-[#FAF8F5] mb-6 leading-[1.1]" data-testid="text-page-title">
            Sophia<br />Al Nour
          </h1>
          <p className="font-lejour text-sm text-[#D8BFAE] uppercase tracking-widest mb-8">
            Founder & Managing Director
          </p>
          <p className="font-inria text-lg text-[#FAF8F5]/80 leading-relaxed">
            With a background in real estate law and over a decade advising Dubai's most sophisticated buyers, Sophia founded Aviera Living to fill a gap no other brokerage had addressed: a firm where trust, legal precision, and editorial luxury converge.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">The Journey</p>
              <h2 className="font-symphony text-4xl text-[#3D2716] mb-8">A Decade Before the Desk</h2>
              <div className="space-y-6 font-inria text-base text-[#3D2716]/75 leading-loose">
                <p>
                  Sophia Al Nour did not arrive in real estate by accident. Trained as a real estate lawyer at University College London, she spent her early career navigating the legal architecture of high-value transactions before ever setting foot in a show apartment.
                </p>
                <p>
                  That foundation — built in the legal frameworks of RERA, the nuances of DLD registration, and the complexity of off-plan investment contracts — became the bedrock of everything Aviera Living stands for.
                </p>
                <p>
                  "I watched too many clients — intelligent, successful people — sign documents they didn't fully understand," she recalls. "I decided that the firm I would build would never allow that to happen."
                </p>
                <p>
                  In 2016, she opened Aviera's first office in DIFC with a team of four. The mandate was simple: fewer clients, deeper service, zero compromise on legal excellence.
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
          <p className="font-inria text-2xl md:text-3xl italic leading-relaxed mb-10 text-[#FAF8F5]/90">
            I built Aviera because I believe that the most significant financial decision of a person's life deserves more than a sales pitch. It deserves a partner.
          </p>
          <p className="font-lejour text-base text-[#D8BFAE] uppercase tracking-widest">Sophia Al Nour</p>
          <p className="font-inria text-sm text-[#FAF8F5]/50 mt-1">Founder & Managing Director</p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about/agents" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-meet-agents">
              Meet the Team
            </Link>
            <Link href="/about/story" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-our-story">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
