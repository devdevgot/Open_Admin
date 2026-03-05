import heroBg from "@/assets/images/hero-dubai.jpg";

export default function Hero() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Cacao 80% Overlay */}
        <div className="absolute inset-0 bg-[#3D2716]/80 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pt-20 pb-40 md:pt-0 md:pb-0">
        <h1 className="font-symphony text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#FAF8F5] mb-6 leading-[1.2] md:leading-[1.1] animate-in slide-in-from-bottom-8 fade-in duration-1000">
          Luxury Real Estate,<br className="hidden md:block" />
          Redefined by Trust.
        </h1>
        
        <p className="font-inria text-lg md:text-2xl text-[#FAF8F5]/90 mb-10 md:mb-12 max-w-3xl animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both px-4 md:px-0">
          Transparency. Legal Precision. Boutique Guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both px-4 md:px-0">
          <button className="bg-[#3D2716] text-[#FAF8F5] font-inria uppercase tracking-widest text-xs md:text-sm px-10 py-5 md:py-4 hover:bg-[#995134] transition-colors border border-[#FAF8F5]/20">
            Explore Properties
          </button>
          <button className="bg-transparent text-[#FAF8F5] border border-[#FAF8F5]/40 font-inria uppercase tracking-widest text-xs md:text-sm px-10 py-5 md:py-4 hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors">
            Speak With An Advisor
          </button>
        </div>
      </div>

      {/* Minimal Search Bar */}
      <div className="absolute bottom-0 w-full bg-[#FAF8F5] py-4 md:py-6 animate-in slide-in-from-bottom-full duration-1000 delay-700 fill-mode-both border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#D8BFAE]/30">
            <div className="flex flex-col md:px-6 py-2 md:py-0">
              <span className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[10px] mb-1">Location</span>
              <select className="bg-transparent border-none outline-none font-inria text-[#3D2716] text-base md:text-lg appearance-none cursor-pointer">
                <option>All Locations</option>
                <option>Downtown Dubai</option>
                <option>Palm Jumeirah</option>
              </select>
            </div>
            <div className="flex flex-col md:px-6 py-2 md:py-0">
              <span className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[10px] mb-1">Property Type</span>
              <select className="bg-transparent border-none outline-none font-inria text-[#3D2716] text-base md:text-lg appearance-none cursor-pointer">
                <option>All Types</option>
                <option>Villa</option>
                <option>Penthouse</option>
              </select>
            </div>
            <div className="flex flex-col md:px-6 py-2 md:py-0">
              <span className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[10px] mb-1">Budget</span>
              <select className="bg-transparent border-none outline-none font-inria text-[#3D2716] text-base md:text-lg appearance-none cursor-pointer">
                <option>Any Price</option>
                <option>Over 10M AED</option>
                <option>Over 50M AED</option>
              </select>
            </div>
          </div>
          <button className="bg-[#3D2716] text-[#FAF8F5] p-5 md:p-4 hover:bg-[#995134] transition-colors w-full md:w-auto flex justify-center mt-2 md:mt-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}