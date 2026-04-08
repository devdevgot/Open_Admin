export default function MissionVision() {
  return (
    <section className="py-32 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Mission */}
          <div className="border-t border-[#3D2716] pt-12">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-8">Our</p>
            <h2 className="font-symphony text-5xl md:text-6xl text-[#3D2716] mb-2 leading-none">Mission</h2>
            <h3 className="font-lejour italic text-xl text-[#995134] mb-8">Navigating Complexity with Clarity.</h3>
            <p className="font-inria text-lg text-[#3D2716]/80 leading-relaxed">
              To deliver institutional-grade real estate advisory and acquisition services to private clients, safeguarding their wealth through meticulous legal frameworks and unparalleled market intelligence.
            </p>
          </div>

          {/* Vision */}
          <div className="border-t border-[#3D2716] pt-12">
            <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-8">Our</p>
            <h2 className="font-symphony text-5xl md:text-6xl text-[#3D2716] mb-2 leading-none">Vision</h2>
            <h3 className="font-lejour italic text-xl text-[#995134] mb-8">The Benchmark for Trust.</h3>
            <p className="font-inria text-lg text-[#3D2716]/80 leading-relaxed">
              To be the most trusted and legally proficient luxury real estate brokerage in Dubai, recognized globally by discerning investors as the definitive partner for secure and curated property acquisitions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
