import { Link } from "wouter";
import { TrendingUp, Shield, Globe, BarChart3, Building2, Landmark } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const advantages = [
  {
    icon: Shield,
    title: "Legal Due Diligence as Standard",
    desc: "Every investment opportunity we present has passed our internal legal review: title verification, developer background check, payment plan analysis, and resale restriction assessment. Investors access our findings before making any decision.",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence, Not Marketing",
    desc: "We provide investors with actual transaction data, neighbourhood yield analysis, and honest projections — not developer marketing decks. Our advisors are legally trained and market-tested; their analysis reflects reality.",
  },
  {
    icon: Globe,
    title: "Off-Market Access",
    desc: "The most compelling investment opportunities in Dubai rarely reach public portals. Our relationships with developers, family offices, and institutional sellers give investors access to a curated pipeline of pre-market transactions.",
  },
  {
    icon: BarChart3,
    title: "Yield Optimisation Strategy",
    desc: "For buy-to-let investors, we provide a full yield analysis: gross yield, net yield after service charges, occupancy projections, and 5-year capital growth modelling — enabling truly informed investment decisions.",
  },
  {
    icon: Building2,
    title: "Portfolio Management",
    desc: "For investors with multiple assets, Aviera provides consolidated portfolio reporting, strategic review meetings, and proactive advice on when to hold, when to sell, and where the next best opportunity lies.",
  },
  {
    icon: Landmark,
    title: "Regulatory & Tax Clarity",
    desc: "Dubai's zero-income-tax environment is attractive — but nuanced. We help international investors understand DLD fees, service charge structures, ownership structures, and the regulatory framework specific to their nationality.",
  },
];

const marketData = [
  { label: "Average Gross Rental Yield", value: "6.5–8%", note: "Depending on property type and location" },
  { label: "Capital Growth (2020–2024)", value: "+78%", note: "Prime residential market, CBRE data" },
  { label: "DLD Registration Fee", value: "4%", note: "Of property purchase price" },
  { label: "Annual Service Charge", value: "AED 10–35 / sqft", note: "Varies by building and community" },
  { label: "Visa Threshold", value: "AED 750K+", note: "Investor visa eligibility for freehold purchase" },
  { label: "Off-Plan RERA Escrow", value: "Mandatory", note: "All developer funds held in escrow" },
];

export default function AboutInvestors() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D2716]/90 via-[#3D2716]/70 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <Link href="/about" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-8 inline-block" data-testid="link-back">
            ← About Us
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-6">Investment Advisory</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-6 leading-[1.1] max-w-2xl" data-testid="text-page-title">
            Why It Matters<br />to Investors
          </h1>
          <p className="font-inria text-xl text-[#FAF8F5]/80 max-w-xl mb-10">
            Dubai is one of the world's great investment markets. The question is not whether to invest — it is who you trust to guide you through it.
          </p>
          <button onClick={() => openContactModal({ type: "buy", prefillMessage: "I am interested in investment opportunities in Dubai real estate and would like to schedule a consultation." })} className="bg-[#995134] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-investor-consultation">
            Investor Consultation
          </button>
        </div>
      </section>

      {/* Why Dubai */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">The Market Case</p>
              <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716] mb-8 leading-[1.1]">
                Why Dubai Belongs in Every Serious Portfolio
              </h2>
              <div className="space-y-6 font-inria text-base text-[#3D2716]/75 leading-loose">
                <p>
                  Dubai's real estate market offers a rare convergence of attributes: zero income tax, freehold ownership rights for foreign nationals, a stable currency pegged to the US dollar, strong rental yields, and one of the world's most business-friendly regulatory environments.
                </p>
                <p>
                  The city's population is projected to reach 5.8 million by 2040, driven by continued inflows of HNWI residents, a growing financial services sector, and its position as the gateway between East and West. Demand fundamentals are structural, not speculative.
                </p>
                <p>
                  What Dubai's market also requires, however, is navigation. Not every developer is equal. Not every off-plan project reaches completion on schedule. Not every location delivers the yields its marketing material promises. The difference between an exceptional investment and a poor one is often the quality of advisory behind it.
                </p>
              </div>
            </div>
            <div className="bg-[#3D2716]/[0.04] p-10 border border-[#D8BFAE]/20">
              <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-8">Key Market Data</p>
              <div className="space-y-0">
                {marketData.map((d, idx) => (
                  <div key={d.label} className={`py-5 ${idx !== marketData.length - 1 ? "border-b border-[#D8BFAE]/20" : ""}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="font-inria text-sm text-[#3D2716]">{d.label}</p>
                        <p className="font-inria text-xs text-[#917C63] mt-0.5">{d.note}</p>
                      </div>
                      <p className="font-symphony text-2xl text-[#3D2716] shrink-0">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Aviera Advantage for Investors */}
      <section className="py-24 bg-[#3D2716]/[0.04] border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">The Aviera Edge</p>
            <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716]">What Investors Get With Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((a, idx) => (
              <div key={a.title} className="bg-white p-10 border border-[#D8BFAE]/20 hover:border-[#995134]/30 hover:shadow-md transition-all" data-testid={`card-advantage-${idx}`}>
                <a.icon size={28} className="text-[#424D38] mb-6" strokeWidth={1.5} />
                <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-widest mb-4">{a.title}</h3>
                <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Testimonial */}
      <section className="py-24 border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <div className="font-symphony text-6xl text-[#D8BFAE] mb-8">"</div>
          <p className="font-inria text-2xl md:text-3xl text-[#3D2716] italic leading-relaxed mb-10">
            I have invested in property in London, Singapore, and Dubai. Aviera is the only broker I have worked with that briefed me on the risks before the opportunity. That is rare. That is why I have given them every subsequent transaction.
          </p>
          <p className="font-lejour text-lg text-[#3D2716] uppercase tracking-widest">David Chen</p>
          <p className="font-inria text-sm text-[#917C63] mt-1">Multi-Unit Investor, 7 Properties Across Dubai</p>
        </div>
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Begin Your Investment Conversation</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Whether you are entering Dubai real estate for the first time or expanding an existing portfolio, we will provide the intelligence, access, and legal certainty you need to invest with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openContactModal({ type: "buy" })} className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-consultation">
              Book Investor Consultation
            </button>
            <Link href="/buy" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-portfolio">
              Browse Investment Properties
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
