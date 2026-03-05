import founderImg from "@/assets/images/founder.jpg";

export default function FounderMessage() {
  return (
    <section className="py-32 bg-[#FAF8F5]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div className="w-full lg:w-5/12 relative">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src={founderImg} 
                alt="Aviera Living Founder" 
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Accent Block */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#D8BFAE] -z-10 hidden md:block"></div>
          </div>
          
          <div className="w-full lg:w-7/12">
            <h2 className="font-lejour text-[#917C63] uppercase tracking-widest text-sm mb-6">A Letter from the Founder</h2>
            <h3 className="font-symphony text-4xl lg:text-5xl text-[#3D2716] leading-tight mb-10">
              "True luxury is not defined by the transaction, but by the legal precision and absolute trust that precedes it."
            </h3>
            <div className="space-y-6 font-inria text-lg text-[#3D2716]/80 leading-relaxed max-w-2xl">
              <p>
                In a market driven by volume, we chose to be driven by values. Aviera Living was founded on the principle that high-net-worth individuals require more than just property access—they require institutional-grade advisory, rigorous due diligence, and absolute transparency.
              </p>
              <p>
                Our approach is boutique, yet our standards are uncompromising. We navigate the complexities of Dubai's luxury real estate landscape with the precision of legal counsel and the foresight of seasoned investors.
              </p>
            </div>
            
            <div className="mt-12">
              <p className="font-lejour text-2xl text-[#3D2716]">Alexander Vance</p>
              <p className="font-inria text-sm text-[#917C63] uppercase tracking-widest mt-1">Founder & CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}