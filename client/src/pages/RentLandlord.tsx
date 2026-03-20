import { Link } from "wouter";
import { ArrowRight, Shield, TrendingUp, FileCheck, Users, Clock, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Users,
    title: "Tenant Sourcing & Vetting",
    description: "We qualify every applicant with employment verification, credit screening, and reference checks before presenting them to you.",
  },
  {
    icon: FileCheck,
    title: "Tenancy Agreement Drafting",
    description: "RERA-compliant tenancy contracts prepared by our in-house legal team, protecting your interests at every clause.",
  },
  {
    icon: Clock,
    title: "Rent Collection",
    description: "Automated collection, reminders, and direct disbursement. Never chase a cheque again.",
  },
  {
    icon: Shield,
    title: "Property Maintenance",
    description: "24/7 maintenance coordination with vetted contractors. Issues resolved swiftly, keeping tenants satisfied.",
  },
  {
    icon: BarChart3,
    title: "Annual Market Reviews",
    description: "We review rental rates annually and advise on optimal pricing to keep pace with the Dubai market.",
  },
  {
    icon: TrendingUp,
    title: "Portfolio Management",
    description: "For investors with multiple units, we provide consolidated reporting and strategic occupancy management.",
  },
];

const steps = [
  { number: "01", title: "Free Property Assessment", desc: "We evaluate your property, advise on presentation improvements, and set a competitive rental price." },
  { number: "02", title: "Marketing & Listing", desc: "Professional photography, premium portal listings, and targeted outreach to our tenant database." },
  { number: "03", title: "Tenant Selection", desc: "We shortlist qualified tenants, arrange viewings, and present you with our recommended applicant." },
  { number: "04", title: "Contract & Handover", desc: "Legal contract, Ejari registration, security deposit collection and smooth key handover." },
  { number: "05", title: "Ongoing Management", desc: "Continuous support for maintenance, rent collection and tenancy renewals for the life of the lease." },
];

export default function RentLandlord() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-[#3D2716]/72"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <Link href="/rent" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-8 inline-block" data-testid="link-back">
            ← Rental Properties
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-6">For Property Owners</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-6 leading-[1.1]" data-testid="text-page-title">
            Landlord<br />Services
          </h1>
          <p className="font-inria text-xl text-[#FAF8F5]/80 max-w-xl mb-10">
            Let your property work harder. Our full-service landlord management takes the burden off your hands — from finding the right tenant to collecting rent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#995134] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-list-property">
              List My Property
            </button>
            <button className="border border-[#FAF8F5]/40 text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors" data-testid="button-learn-more">
              Learn More <ArrowRight className="inline ml-2" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#424D38] py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-[#FAF8F5]/10">
            {[
              { v: "98%", l: "Occupancy Rate" },
              { v: "14 days", l: "Avg. Time to Tenant" },
              { v: "0", l: "Rent Defaults in 2024" },
              { v: "350+", l: "Properties Managed" },
            ].map((s) => (
              <div key={s.l} className="text-center md:px-8">
                <p className="font-symphony text-4xl text-[#D8BFAE]">{s.v}</p>
                <p className="font-inria text-xs text-[#FAF8F5]/60 uppercase tracking-wider mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">What We Offer</p>
            <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716]">Complete Landlord Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white p-10 border border-[#D8BFAE]/20 hover:border-[#995134]/30 hover:shadow-lg transition-all" data-testid={`card-service-${s.title.toLowerCase().replace(/[\s&]/g, "-")}`}>
                <s.icon size={30} className="text-[#424D38] mb-6" strokeWidth={1.5} />
                <h3 className="font-inria text-lg text-[#3D2716] font-medium mb-3">{s.title}</h3>
                <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#3D2716]/[0.03]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="lg:sticky lg:top-32 self-start">
              <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Simple Process</p>
              <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716] mb-6">
                From Listing to<br />Long-Term Income
              </h2>
              <p className="font-inria text-lg text-[#3D2716]/70 leading-relaxed mb-10">
                Our end-to-end landlord service is built for the investor who values results over process. We handle everything so you can focus on what matters.
              </p>
              <button className="bg-[#424D38] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#3D2716] transition-colors" data-testid="button-get-started">
                Get Started Today
              </button>
            </div>
            <div>
              {steps.map((step, idx) => (
                <div key={step.number} className={`flex gap-8 pb-10 ${idx !== steps.length - 1 ? "border-b border-[#D8BFAE]/20 mb-10" : ""}`}>
                  <div className="w-10 h-10 bg-[#424D38] flex items-center justify-center shrink-0 mt-1">
                    <span className="font-symphony text-sm text-[#FAF8F5]">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-inria text-lg text-[#3D2716] font-medium mb-2">{step.title}</h3>
                    <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <div className="font-symphony text-6xl text-[#D8BFAE] mb-8">"</div>
          <blockquote className="font-inria text-2xl text-[#3D2716] leading-relaxed italic mb-8">
            Aviera manages three of our apartments in Marina and the Peninsula. Zero hassle, zero vacancies, and rent always arrives on the 1st. The landlord dashboard is exceptional.
          </blockquote>
          <p className="font-lejour text-base text-[#3D2716] uppercase tracking-widest">Mr. Abdullah Al Rashid</p>
          <p className="font-inria text-sm text-[#917C63] mt-1">Property Investor, Dubai Marina</p>
        </div>
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Ready to Maximise Your Rental Income?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Schedule a free property assessment and receive a detailed rental projection within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-free-assessment">
              Free Property Assessment
            </button>
            <a href="tel:+97140000000" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center">
              Call +971 4 000 0000
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
