import { Link } from "wouter";
import { CheckCircle2, Clock, Phone, FileText, Star, Users } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const promises = [
  {
    icon: Clock,
    title: "Response Within 4 Hours",
    desc: "Every client communication receives a substantive response — not an automated message — within four business hours. Your time is as valuable as ours.",
  },
  {
    icon: FileText,
    title: "Full Documentation at Every Step",
    desc: "You will never receive a verbal summary where a written document should exist. We provide complete written records of every conversation, offer, and legal obligation.",
  },
  {
    icon: Users,
    title: "A Dedicated Advisor for the Life of Your Journey",
    desc: "You will work with one senior advisor from your first meeting to your final key handover. No handoffs, no call centres, no junior staff managing your account.",
  },
  {
    icon: CheckCircle2,
    title: "Independent Legal Review on Every Contract",
    desc: "Our in-house legal counsel reviews every tenancy agreement, SPA, and title document before you sign — at no additional charge. This is not optional. It is standard.",
  },
  {
    icon: Phone,
    title: "Post-Completion Support for 12 Months",
    desc: "Our relationship does not end at handover. For one full year after every transaction, your advisor remains available to assist with any issues arising from your property.",
  },
  {
    icon: Star,
    title: "No Commission Conflicts",
    desc: "Our advisors are not incentivised to sell any specific property over another. Recommendations are driven solely by client fit — never by commission structure.",
  },
];

const journey = [
  { step: "01", title: "First Consultation", desc: "A 60-minute strategy session at no cost. We listen, we ask questions, and we tell you honestly whether we are the right firm for your needs.", time: "Week 1" },
  { step: "02", title: "Personalised Shortlist", desc: "Within 72 hours, you receive a curated selection of properties matched precisely to your criteria — not the widest possible net.", time: "Week 1–2" },
  { step: "03", title: "Guided Viewings", desc: "Private viewings arranged at your convenience. Your advisor attends every viewing, not an assistant.", time: "Week 2–4" },
  { step: "04", title: "Offer & Legal Review", desc: "We draft, review, and negotiate your offer. Our legal team conducts due diligence before any document is signed.", time: "Week 3–6" },
  { step: "05", title: "Completion & Handover", desc: "We accompany you through every stage of registration, payment, and key collection — ensuring nothing is missed.", time: "Week 4–8" },
  { step: "06", title: "12-Month Follow Up", desc: "Your advisor checks in at 1, 3, 6, and 12 months post-completion. We are a long-term partner, not a one-time transaction.", time: "Ongoing" },
];

export default function AboutExperience() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-[#3D2716]/72"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <Link href="/about" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-8 inline-block" data-testid="link-back">
            ← About Us
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-6">Our Commitment to You</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-6 leading-[1.1]" data-testid="text-page-title">
            The Client<br />Experience<br />Promise
          </h1>
          <p className="font-inria text-xl text-[#FAF8F5]/80 max-w-xl">
            Six specific commitments we make to every client — and hold ourselves accountable to keeping.
          </p>
        </div>
      </section>

      {/* The 6 Promises */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Written Commitments</p>
            <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716]">Six Promises We Keep</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promises.map((p, idx) => (
              <div key={p.title} className="bg-white border border-[#D8BFAE]/20 p-10 hover:border-[#995134]/30 hover:shadow-md transition-all" data-testid={`card-promise-${idx}`}>
                <div className="flex items-center gap-4 mb-6">
                  <p.icon size={28} className="text-[#424D38]" strokeWidth={1.5} />
                </div>
                <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-widest mb-4">{p.title}</h3>
                <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section className="py-24 bg-[#3D2716]/[0.04] border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">The Process</p>
            <h2 className="font-symphony text-4xl md:text-5xl text-[#3D2716]">Your Journey With Aviera</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journey.map((j) => (
              <div key={j.step} className="relative bg-white p-10 border border-[#D8BFAE]/20" data-testid={`card-journey-${j.step}`}>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-symphony text-5xl text-[#D8BFAE]">{j.step}</span>
                  <span className="font-inria text-xs text-[#917C63] uppercase tracking-wider">{j.time}</span>
                </div>
                <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-widest mb-3">{j.title}</h3>
                <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4 text-center">Client Words</p>
          <h2 className="font-symphony text-4xl text-[#3D2716] mb-16 text-center">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { quote: "Aviera is the only firm I have worked with that made me feel like the decision was entirely mine. No pressure, no manufactured urgency. Just excellent advice.", author: "Sarah M.", role: "Penthouse Owner, Dubai Marina" },
              { quote: "The legal review alone was worth more than the commission they earned. They found a clause in my SPA that could have cost me significantly at resale. Extraordinary service.", author: "Robert K.", role: "Investor, Palm Jumeirah" },
            ].map((t) => (
              <div key={t.author} className="bg-[#3D2716]/[0.03] p-10 border border-[#D8BFAE]/20">
                <div className="font-symphony text-4xl text-[#D8BFAE] mb-6">"</div>
                <p className="font-inria text-lg text-[#3D2716]/80 italic leading-relaxed mb-8">{t.quote}</p>
                <div>
                  <p className="font-lejour text-sm text-[#3D2716] uppercase tracking-widest">{t.author}</p>
                  <p className="font-inria text-xs text-[#917C63] mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Ready to Experience the Difference?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Schedule your complimentary 60-minute consultation and discover what considered, client-first advisory really feels like.
          </p>
          <button onClick={() => openContactModal({ type: "general" })} className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-schedule">
            Book Your Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
