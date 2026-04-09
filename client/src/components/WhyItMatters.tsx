import { openContactModal } from "@/lib/contact";

export default function WhyItMatters() {
  return (
    <section className="py-32 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[30px] mb-6">Why It Matters</h2>
          <p className="font-symphony text-4xl md:text-5xl text-[#3D2716] leading-[1.15] mb-10">
            In a market defined by complexity, precision is not optional.
          </p>
          <div className="space-y-6 text-left max-w-3xl mx-auto">
            <p className="font-inria text-lg text-[#3D2716]/70 leading-loose">
              Dubai's luxury real estate landscape is one of the world's most dynamic — and most complex. Regulatory frameworks shift. Off-plan risks are real. Developer reputations vary wildly. For high-net-worth investors and discerning homebuyers, the stakes are too high to navigate without expert counsel.
            </p>
            <p className="font-inria text-lg text-[#3D2716]/70 leading-loose">
              Aviera Living acts as the critical filter. We mitigate risk by applying stringent legal and financial stress tests to every property we represent. We don't just sell real estate; we underwrite confidence. When you partner with us, you are assured that your capital is deployed intelligently, securely, and with maximum strategic impact.
            </p>
          </div>
          
          <div className="mt-16">
            <button
              onClick={() => openContactModal({ type: "general" })}
              className="bg-[#424D38] text-[#FAF8F5] font-lejour uppercase tracking-widest text-sm px-10 py-4 hover:bg-[#3D2716] transition-colors"
              data-testid="button-schedule-consultation"
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
