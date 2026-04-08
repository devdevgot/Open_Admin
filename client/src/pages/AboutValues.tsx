import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  {
    number: "01",
    title: "Legal Precision",
    colour: "#3D2716",
    tagline: "Every clause. Every time.",
    desc: "We believe that the highest form of client service is legal protection. Before any recommendation is made, our team verifies titles, reviews developer track records, checks RERA compliance, and ensures that every document a client signs is one we would sign ourselves. Legal precision is not a department at Aviera. It is a culture.",
    example: "We once walked away from a AED 12M commission because the developer's payment plan contained a clause that posed unacceptable risk to our client. That is what this value means in practice.",
  },
  {
    number: "02",
    title: "Radical Transparency",
    colour: "#424D38",
    tagline: "The truth, even when it costs us.",
    desc: "In an industry where withholding information is common practice, we believe in giving clients every relevant fact — including the facts that might lead them to choose a different property, or no property at all. Our reputation is built on clients who trusted us to tell them the truth, and who came back years later because of that trust.",
    example: "We maintain a 'Red List' of properties we will not sell under any circumstances — not due to legal issues alone, but because we believe the investment thesis is weak. Clients can request access.",
  },
  {
    number: "03",
    title: "Considered Counsel",
    colour: "#995134",
    tagline: "Advice over acceleration.",
    desc: "We do not create urgency. We do not use scarcity tactics. We do not pressure clients to decide before they are ready. Great outcomes emerge from patient, thoughtful decision-making — and we create the conditions for that in every conversation, every viewings, and every proposal we prepare.",
    example: "The average time from first client meeting to signed contract at Aviera is 47 days — significantly longer than the industry average. We consider this a mark of quality, not inefficiency.",
  },
  {
    number: "04",
    title: "Human Connection",
    colour: "#917C63",
    tagline: "Relationships before revenue.",
    desc: "Every client is a person making one of the most significant decisions of their life. We treat every engagement accordingly — with patience, attentiveness, and a genuine interest in their goals beyond the transaction. 78% of our business comes from referrals and repeat clients. People refer us because they trust us. They trust us because we listen.",
    example: "We limit advisor caseloads to 8 active clients at any time. This is not a marketing statement — it is a structural policy enforced by the Managing Director.",
  },
  {
    number: "05",
    title: "Boutique Excellence",
    colour: "#3D2716",
    tagline: "Small is a strategy.",
    desc: "We have been offered opportunities to expand aggressively — additional offices, franchise partnerships, regional expansion. We have declined all of them. The boutique model is not a limitation of ambition. It is the expression of it. Staying small allows us to stay excellent, and excellence is the only competitive advantage that cannot be copied.",
    example: "Aviera has turned down over AED 50M in potential revenue by declining to work with clients whose expectations, timelines, or ethical standards were misaligned with our own.",
  },
];

export default function AboutValues() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-44 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="h-full bg-[#3D2716]/[0.025]"></div>
        </div>
        <div className="relative container mx-auto px-6 lg:px-12">
          <Link href="/about" className="text-sm font-inria text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors mb-8 inline-block" data-testid="link-back">
            ← About Us
          </Link>
          <div className="max-w-2xl">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">What We Stand For</p>
            <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-6 leading-[1.05]" data-testid="text-page-title">
              Core<br />Values
            </h1>
            <p className="font-inria text-xl text-[#3D2716]/70 leading-relaxed">
              These are not aspirations. They are the principles that govern every decision, every conversation, and every transaction at Aviera Living — without exception.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="space-y-0">
            {values.map((v, idx) => (
              <div
                key={v.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-0 ${idx !== values.length - 1 ? "border-b border-[#D8BFAE]/20" : ""}`}
                data-testid={`card-value-${v.number}`}
              >
                {/* Number strip */}
                <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start justify-start gap-4 lg:gap-0 py-10 lg:py-16 pr-0 lg:pr-8 border-b lg:border-b-0 lg:border-r border-[#D8BFAE]/20">
                  <span className="font-symphony text-4xl lg:text-6xl text-[#D8BFAE]">{v.number}</span>
                </div>
                {/* Content */}
                <div className="lg:col-span-5 py-10 lg:py-16 px-0 lg:px-12 border-b lg:border-b-0 lg:border-r border-[#D8BFAE]/20">
                  <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-3">{v.tagline}</p>
                  <h2 className="font-symphony text-4xl text-[#3D2716] mb-6">{v.title}</h2>
                  <p className="font-inria text-base text-[#3D2716]/70 leading-loose">{v.desc}</p>
                </div>
                {/* Example */}
                <div className="lg:col-span-6 py-10 lg:py-16 px-0 lg:px-12 bg-[#3D2716]/[0.02] flex items-center">
                  <div>
                    <p className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.3em] mb-4">In Practice</p>
                    <p className="font-inria text-base text-[#3D2716]/75 leading-loose italic">"{v.example}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Values Without Action Are Just Words</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            We invite you to test these values against our work. Speak with a past client, review a property with us, or simply ask the hard questions. We welcome the scrutiny.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about/experience" className="bg-[#995134] text-[#FAF8F5] px-10 py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors text-center" data-testid="link-experience">
              Client Experience Promise
            </Link>
            <Link href="/about/agents" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-10 py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-agents">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
