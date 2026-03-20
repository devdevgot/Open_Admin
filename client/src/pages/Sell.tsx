import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Shield, TrendingUp, Users, FileCheck, Eye, Handshake } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { end: 97, decimals: 0, suffix: "%", label: "Asking Price Achieved" },
  { end: 21, decimals: 0, suffix: "", label: "Average Days on Market" },
  { end: 200, decimals: 0, suffix: "+", label: "Properties Sold" },
  { end: 1.2, decimals: 1, suffix: "B", label: "AED Total Volume" },
];

function AnimatedCounter({ end, decimals, suffix }: { end: number; decimals: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * end).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}{suffix}
    </span>
  );
}

const steps = [
  {
    number: "01",
    title: "Property Assessment",
    description: "Our specialists conduct a comprehensive evaluation using current market data, comparable transactions, and location-specific insights to determine optimal positioning.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Strategic Marketing",
    description: "Bespoke marketing campaigns featuring professional photography, cinematic video tours, targeted digital advertising, and exclusive off-market channels.",
    icon: TrendingUp,
  },
  {
    number: "03",
    title: "Buyer Qualification",
    description: "Every prospective buyer undergoes thorough vetting. We ensure only qualified, serious purchasers gain access to your property.",
    icon: Users,
  },
  {
    number: "04",
    title: "Negotiation & Closing",
    description: "Our legal team and negotiation specialists work in concert to secure the strongest possible terms, managing every detail through to completion.",
    icon: FileCheck,
  },
];

const advantages = [
  {
    icon: Shield,
    title: "Legal Precision",
    description: "Every transaction is reviewed by our in-house legal counsel, ensuring complete compliance with RERA regulations and DLD requirements.",
  },
  {
    icon: TrendingUp,
    title: "Maximum Exposure",
    description: "Access to a curated network of 5,000+ qualified investors, family offices, and HNWI clients actively seeking Dubai property.",
  },
  {
    icon: Handshake,
    title: "Transparent Process",
    description: "Real-time reporting, weekly updates, and full visibility into every stage of your property sale — no surprises, only results.",
  },
];

export default function Sell() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop)" }}
        >
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <Link href="/" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-8 inline-block" data-testid="link-back-home">
            ← Back to Home
          </Link>
          <div className="max-w-3xl">
            <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-6">Selling with confidence</p>
            <h1 className="font-symphony text-5xl md:text-7xl lg:text-8xl text-[#FAF8F5] mb-6 leading-[1.1]" data-testid="text-page-title">
              Your Property,<br />Our Expertise.
            </h1>
            <p className="font-inria text-lg md:text-xl text-[#FAF8F5]/80 max-w-xl mb-10">
              Achieve exceptional results with Dubai's most trusted luxury brokerage. We combine market intelligence with legal precision to maximize your return.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => openContactModal({ type: "valuation" })} className="bg-[#995134] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-get-valuation">
                Get Free Valuation
              </button>
              <button onClick={() => openContactModal({ type: "sell" })} className="border border-[#FAF8F5]/40 text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors" data-testid="button-speak-advisor">
                Speak With An Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#3D2716] py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#FAF8F5]/10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:px-8">
                <p className="font-symphony text-4xl md:text-5xl text-[#D8BFAE] mb-2">
                  <AnimatedCounter end={stat.end} decimals={stat.decimals} suffix={stat.suffix} />
                </p>
                <p className="font-inria text-sm text-[#FAF8F5]/60 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">The Aviera Advantage</p>
            <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716] mb-6">Why Sell With Us</h2>
            <p className="font-inria text-lg text-[#3D2716]/70 max-w-2xl mx-auto">
              We don't just list properties — we architect outcomes. Every sale is a tailored campaign designed to exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {advantages.map((adv) => (
              <div key={adv.title} className="group" data-testid={`card-advantage-${adv.title.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="bg-white p-10 border border-[#D8BFAE]/20 h-full transition-all group-hover:border-[#995134]/30 group-hover:shadow-lg">
                  <adv.icon size={32} className="text-[#995134] mb-6" strokeWidth={1.5} />
                  <h3 className="font-lejour text-xl text-[#3D2716] uppercase tracking-widest mb-4">{adv.title}</h3>
                  <p className="font-inria text-[#3D2716]/70 leading-relaxed">{adv.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selling Process */}
      <section className="py-24 bg-[#3D2716]/[0.03]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">How It Works</p>
              <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716] mb-6">Our Selling Process</h2>
              <p className="font-inria text-lg text-[#3D2716]/70 leading-relaxed mb-10">
                From initial consultation to keys handover, our four-phase approach ensures transparency, legal compliance, and the highest achievable sale price for your property.
              </p>
              <button className="bg-[#424D38] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#3D2716] transition-colors" data-testid="button-start-process">
                Start the Process <ArrowRight className="inline ml-2" size={16} />
              </button>
            </div>

            <div className="space-y-0">
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className={`relative pl-16 py-10 ${idx !== steps.length - 1 ? "border-b border-[#D8BFAE]/20" : ""}`}
                  data-testid={`step-${step.number}`}
                >
                  <div className="absolute left-0 top-10 w-10 h-10 bg-[#424D38] flex items-center justify-center">
                    <span className="font-symphony text-sm text-[#FAF8F5]">{step.number}</span>
                  </div>
                  <h3 className="font-lejour text-xl text-[#3D2716] uppercase tracking-widest mb-3">{step.title}</h3>
                  <p className="font-inria text-[#3D2716]/70 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valuation CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="bg-[#3D2716] p-12 md:p-16 flex flex-col justify-center">
              <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Complimentary Service</p>
              <h2 className="font-symphony text-4xl md:text-5xl text-[#FAF8F5] mb-6">Get Your Free<br />Property Valuation</h2>
              <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 leading-relaxed">
                Our market specialists will provide you with a comprehensive property assessment, including comparable sales analysis, current market positioning, and a recommended listing strategy.
              </p>
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
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-transparent border border-[#FAF8F5]/20 px-6 py-4 text-[#FAF8F5] font-inria placeholder:text-[#FAF8F5]/40 focus:border-[#D8BFAE] outline-none"
                  data-testid="input-phone"
                />
                <select
                  className="w-full bg-transparent border border-[#FAF8F5]/20 px-6 py-4 text-[#FAF8F5]/40 font-inria focus:border-[#D8BFAE] outline-none appearance-none"
                  data-testid="select-property-type"
                >
                  <option value="" className="text-[#3D2716]">Property Type</option>
                  <option value="villa" className="text-[#3D2716]">Villa</option>
                  <option value="apartment" className="text-[#3D2716]">Apartment</option>
                  <option value="penthouse" className="text-[#3D2716]">Penthouse</option>
                  <option value="townhouse" className="text-[#3D2716]">Townhouse</option>
                </select>
                <button className="w-full bg-[#995134] text-[#FAF8F5] py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors mt-2" data-testid="button-submit-valuation">
                  Request Valuation
                </button>
              </div>
            </div>
            <div
              className="hidden lg:block bg-cover bg-center min-h-[500px]"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop)" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-[#3D2716]/[0.03]">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <div className="font-symphony text-6xl text-[#D8BFAE] mb-8">"</div>
          <blockquote className="font-inria text-2xl md:text-3xl text-[#3D2716] leading-relaxed italic mb-10">
            Aviera Living handled the sale of our Emirates Hills villa with extraordinary professionalism. They achieved 12% above our expected price within three weeks. Their legal team made the entire process seamless.
          </blockquote>
          <div>
            <p className="font-lejour text-lg text-[#3D2716] uppercase tracking-widest">Khalid Al-Mansoori</p>
            <p className="font-inria text-sm text-[#917C63] mt-1">Former Owner, Emirates Hills</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl md:text-6xl mb-6">
            Ready to Sell?
          </h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-12 max-w-2xl mx-auto">
            Schedule a confidential consultation with one of our senior advisors to discuss your property and explore the best strategy for achieving your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openContactModal({ type: "sell" })} className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-contact-advisor">
              Schedule Consultation
            </button>
            <a href="tel:+97140000000" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center" data-testid="link-call">
              Call +971 4 000 0000
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
