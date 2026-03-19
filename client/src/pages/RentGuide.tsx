import { Link } from "wouter";
import { BookOpen, FileText, Scale, Home, CreditCard, Key, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const chapters = [
  {
    icon: BookOpen,
    number: "Chapter 01",
    title: "Understanding the Dubai Rental Market",
    summary: "An overview of how the Dubai rental market operates, key neighbourhoods, typical price ranges, and what drives fluctuations in rent.",
    content: "Dubai's rental market is governed by RERA (Real Estate Regulatory Agency), a division of the Dubai Land Department. All rental transactions must be registered through Ejari — the official online system for documenting tenancy contracts. Rental prices vary significantly by area, property type, number of cheques accepted, and whether the unit is furnished. Premium locations such as Palm Jumeirah, Emirates Hills and Downtown Dubai command the highest rates, while areas like JVC and Al Furjan offer more accessible options without sacrificing quality.",
  },
  {
    icon: FileText,
    number: "Chapter 02",
    title: "Documents You Will Need",
    summary: "A complete checklist of identification and financial documents required to secure a rental property in Dubai.",
    content: "To rent in Dubai you will typically need: a valid UAE Residence Visa (or valid passport for tourists on short-term stays), Emirates ID (for residents), a recent bank statement (3–6 months), and post-dated cheques or a bank reference letter. Employers may also be asked to provide a salary certificate. Our advisors will prepare your documentation package to ensure a smooth application process.",
  },
  {
    icon: Scale,
    number: "Chapter 03",
    title: "Your Legal Rights as a Tenant",
    summary: "Know your rights under Dubai tenancy law — from rent increases to eviction notice requirements and dispute resolution.",
    content: "Dubai tenancy law (Law No. 26 of 2007, amended by Law No. 33 of 2008) protects tenants from arbitrary rent increases and unlawful eviction. Rent increases are capped by RERA's Rental Increase Calculator based on current market values. Landlords must provide 90 days written notice for rent increases and 12 months notice for eviction (except in specific circumstances). All disputes can be raised at the Dubai Rental Dispute Centre (RDC), which provides a fast and affordable resolution process.",
  },
  {
    icon: Home,
    number: "Chapter 04",
    title: "Ejari Registration",
    summary: "Why Ejari registration is mandatory, how it works, and what happens if you skip it.",
    content: "Ejari (Arabic for 'my rent') is the official system for registering all tenancy contracts in Dubai. Registration is mandatory by law and protects both landlord and tenant. Without an Ejari certificate, you cannot obtain a residency visa, connect utilities (DEWA), or access government services tied to your address. Registration is typically completed within 24–48 hours and costs a nominal fee split between landlord and tenant. Aviera Living handles Ejari registration on behalf of all our clients.",
  },
  {
    icon: CreditCard,
    number: "Chapter 05",
    title: "Understanding Your Rent Payments",
    summary: "How cheque-based rent payments work in Dubai, security deposits, and what to expect at signing.",
    content: "Most Dubai landlords require rent to be paid by post-dated cheques — typically 1, 2, 4, or 12 cheques per year. Fewer cheques generally command a premium price but offer convenience. A security deposit of 5% of annual rent (unfurnished) or 10% (furnished) is collected at the start of the tenancy and held until the property is vacated in satisfactory condition. DEWA (Dubai Electricity & Water Authority) deposits are paid separately at move-in. Our advisors will walk you through every payment obligation before you sign.",
  },
  {
    icon: Key,
    number: "Chapter 06",
    title: "Moving In & Handing Over",
    summary: "What to inspect on move-in day, how to protect your deposit, and how to handle maintenance responsibly.",
    content: "Before receiving your keys, conduct a thorough property inspection with your agent. Document all existing damage in a written handover report signed by both parties. Photograph every room and any pre-existing issues. Throughout your tenancy, report maintenance issues promptly — tenants are responsible for minor maintenance (light bulbs, minor repairs under AED 500), while the landlord covers structural issues and major appliance failures. At handover, professional cleaning is typically expected. Your deposit will be returned within 30 days of vacating.",
  },
];

const faqs = [
  { q: "Can a landlord increase my rent mid-tenancy?", a: "No. A landlord can only adjust rent at renewal, with 90 days written notice, and only within the limits set by the RERA Rental Calculator." },
  { q: "What happens if my landlord doesn't return my deposit?", a: "You can file a case at the Rental Dispute Centre (RDC). The process is straightforward and typically resolved within 30–60 days." },
  { q: "Can I sublet my rented apartment?", a: "Only with written permission from your landlord. Subletting without consent is a breach of your tenancy agreement and can result in eviction." },
  { q: "Is it mandatory to have rental insurance?", a: "It is not legally required but strongly recommended. Contents insurance protects your personal belongings and is available at very affordable rates." },
  { q: "How much notice must I give to vacate?", a: "Your notice period is stipulated in your tenancy contract — typically 60–90 days. Always provide notice in writing." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#D8BFAE]/20">
      <button
        className="w-full flex justify-between items-center py-5 text-left"
        onClick={() => setOpen(!open)}
        data-testid={`button-faq-${q.toLowerCase().replace(/\s/g, "-").slice(0, 30)}`}
      >
        <span className="font-inria text-base text-[#3D2716] pr-8">{q}</span>
        <ChevronDown size={18} className={`text-[#917C63] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

export default function RentGuide() {
  const [activeChapter, setActiveChapter] = useState(0);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#3D2716]/[0.03]"></div>
        <div className="relative container mx-auto px-6 lg:px-12">
          <Link href="/rent" className="text-sm font-inria text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors mb-8 inline-block" data-testid="link-back">
            ← Rental Properties
          </Link>
          <div className="max-w-3xl">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Essential Reading</p>
            <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-6" data-testid="text-page-title">
              The Complete<br />Dubai Rental Guide
            </h1>
            <p className="font-inria text-xl text-[#3D2716]/70 max-w-2xl leading-relaxed">
              Everything you need to know about renting in Dubai — from understanding your legal rights to navigating Ejari registration and deposit protection.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {chapters.map((ch, idx) => (
              <button
                key={ch.number}
                onClick={() => setActiveChapter(idx)}
                className={`font-inria text-xs uppercase tracking-widest px-5 py-2.5 transition-all ${activeChapter === idx ? "bg-[#3D2716] text-[#FAF8F5]" : "border border-[#D8BFAE]/50 text-[#3D2716] hover:border-[#3D2716]"}`}
                data-testid={`button-chapter-${idx}`}
              >
                {ch.number}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {chapters.map((ch, idx) => (
                  <button
                    key={ch.number}
                    onClick={() => setActiveChapter(idx)}
                    className={`w-full text-left p-4 transition-all border-l-2 ${activeChapter === idx ? "border-[#995134] bg-white" : "border-transparent hover:border-[#D8BFAE]"}`}
                    data-testid={`button-chapter-nav-${idx}`}
                  >
                    <span className="block font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.2em] mb-1">{ch.number}</span>
                    <span className={`block font-inria text-sm leading-snug ${activeChapter === idx ? "text-[#3D2716]" : "text-[#3D2716]/60"}`}>{ch.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {chapters.map((ch, idx) =>
                activeChapter === idx ? (
                  <div key={ch.number} className="animate-in fade-in duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <ch.icon size={32} className="text-[#995134]" strokeWidth={1.5} />
                      <span className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em]">{ch.number}</span>
                    </div>
                    <h2 className="font-symphony text-3xl md:text-4xl text-[#3D2716] mb-6">{ch.title}</h2>
                    <p className="font-inria text-lg text-[#3D2716]/80 italic mb-8 leading-relaxed border-l-4 border-[#D8BFAE] pl-6">
                      {ch.summary}
                    </p>
                    <p className="font-inria text-base text-[#3D2716]/70 leading-loose">{ch.content}</p>

                    <div className="mt-10 p-8 bg-[#3D2716]/[0.04] border border-[#D8BFAE]/20">
                      <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-3">Need Personalised Advice?</p>
                      <p className="font-inria text-sm text-[#3D2716]/70 mb-5">Our rental advisors are available seven days a week to walk you through this step in person.</p>
                      <button className="bg-[#3D2716] text-[#FAF8F5] px-8 py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#995134] transition-colors" data-testid="button-speak-advisor">
                        Speak With an Advisor
                      </button>
                    </div>

                    <div className="flex justify-between mt-10 pt-6 border-t border-[#D8BFAE]/20">
                      {idx > 0 && (
                        <button onClick={() => setActiveChapter(idx - 1)} className="font-inria text-sm text-[#917C63] hover:text-[#3D2716] transition-colors">
                          ← {chapters[idx - 1].number}
                        </button>
                      )}
                      {idx < chapters.length - 1 && (
                        <button onClick={() => setActiveChapter(idx + 1)} className="font-inria text-sm text-[#917C63] hover:text-[#3D2716] transition-colors ml-auto">
                          {chapters[idx + 1].number} →
                        </button>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </section>

      {/* All Chapters Overview */}
      <section className="py-20 bg-[#3D2716]/[0.03] border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="font-symphony text-3xl text-[#3D2716] mb-12 text-center">All Chapters at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch, idx) => (
              <button
                key={ch.number}
                onClick={() => { setActiveChapter(idx); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group text-left bg-white p-8 border border-[#D8BFAE]/20 hover:border-[#995134]/30 hover:shadow-md transition-all"
                data-testid={`card-chapter-${idx}`}
              >
                <ch.icon size={24} className="text-[#424D38] mb-4" strokeWidth={1.5} />
                <p className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.3em] mb-2">{ch.number}</p>
                <h3 className="font-inria text-base text-[#3D2716] mb-2 group-hover:text-[#995134] transition-colors">{ch.title}</h3>
                <p className="font-inria text-xs text-[#3D2716]/50 leading-snug">{ch.summary}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4 text-center">Common Questions</p>
            <h2 className="font-symphony text-4xl text-[#3D2716] mb-12 text-center">Frequently Asked</h2>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Ready to Find Your Home?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Browse our curated rental portfolio or speak with an advisor who can match you with the perfect property today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rent" className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors text-center" data-testid="link-browse-rentals">
              Browse Rentals
            </Link>
            <button className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors" data-testid="button-speak-advisor">
              Speak With Advisor
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
