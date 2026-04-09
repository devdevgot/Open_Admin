import { Link } from "wouter";

const heroBg = "/pexels-abbas-mohammed-1990079-3680912_1774271811528.jpg";

export default function Hero() {
  return (
    <>
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-[#3D2716]/80 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <p className="font-lejour text-[#D8BFAE] uppercase tracking-[0.3em] md:text-sm mb-6 md:mb-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 letter-spacing-wide text-[25px]">Boutique Real Estate Advisory</p>
          
          <h1 className="font-lejour text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] xl:text-8xl text-[#FAF8F5] mb-8 md:mb-10 leading-[1.15] md:leading-[1.08] tracking-tight animate-in slide-in-from-bottom-8 fade-in duration-1000 font-light" style={{letterSpacing: '-0.02em'}}>
            Luxury Real Estate,<br className="hidden md:block" />
            <span className="font-symphony">Redefined</span> by <em>Trust.</em>
          </h1>
          
          <p className="font-inria text-lg md:text-2xl text-[#FAF8F5]/85 mb-10 md:mb-14 max-w-3xl animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both px-4 md:px-0 leading-relaxed font-normal">
            Transparency. Legal Precision. Boutique Guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-both px-4 md:px-0">
            <Link href="/buy" className="text-[#FAF8F5] font-lejour uppercase tracking-widest text-xs md:text-sm px-10 py-5 md:py-4 hover:bg-[#995134] transition-colors border border-[#FAF8F5]/20 text-center bg-[#424d38]">
              Explore Properties
            </Link>
            <Link href="/about/agents" className="bg-transparent text-[#FAF8F5] border border-[#FAF8F5]/40 font-lejour uppercase tracking-widest text-xs md:text-sm px-10 py-5 md:py-4 hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center">
              Speak With An Advisor
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[#FAF8F5] py-6 md:py-8 border-b border-[#D8BFAE]/30 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#D8BFAE]/30">
            <div className="flex flex-col md:px-6 py-2 md:py-0">
              <span className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[10px] mb-1">Location</span>
              <select className="bg-transparent border-none outline-none font-inria text-[#3D2716] text-base md:text-lg appearance-none cursor-pointer">
                <option>All Locations</option>
                <option>Downtown Dubai</option>
                <option>Palm Jumeirah</option>
                <option>Dubai Marina</option>
                <option>Business Bay</option>
                <option>Emirates Hills</option>
              </select>
            </div>
            <div className="flex flex-col md:px-6 py-2 md:py-0">
              <span className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[10px] mb-1">Property Type</span>
              <select className="bg-transparent border-none outline-none font-inria text-[#3D2716] text-base md:text-lg appearance-none cursor-pointer">
                <option>All Types</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Apartment</option>
              </select>
            </div>
            <div className="flex flex-col md:px-6 py-2 md:py-0">
              <span className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[10px] mb-1">Budget</span>
              <select className="bg-transparent border-none outline-none font-inria text-[#3D2716] text-base md:text-lg appearance-none cursor-pointer">
                <option>Any Price</option>
                <option>Under 10M AED</option>
                <option>10M – 20M AED</option>
                <option>Over 20M AED</option>
              </select>
            </div>
          </div>
          <Link href="/buy" className="bg-[#3D2716] text-[#FAF8F5] p-5 md:p-4 hover:bg-[#995134] transition-colors w-full md:w-auto flex justify-center mt-2 md:mt-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
