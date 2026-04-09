import servicesImg from "@/assets/images/services.jpg";

const services = [
  "Sales & Acquisition",
  "Investment Advisory",
  "High-Yield & Off-Plan",
  "Luxury Curation",
  "End-to-End Management",
  "Legal & Due Diligence",
  "Golden Visa Assistance",
  "Portfolio Review",
  "Property Management",
  "Secure Investment Guidance"
];

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-[#D8BFAE]/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="font-lejour text-[#917C63] uppercase tracking-[0.2em] text-[10px] md:text-sm mb-6">Our Expertise</h2>
            <h3 className="font-symphony text-3xl md:text-4xl lg:text-6xl text-[#3D2716] leading-tight mb-10 md:mb-12">
              Comprehensive<br />Boutique Services.
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3 group cursor-pointer border-b border-[#3D2716]/10 pb-3 md:pb-4">
                  <span className="text-[#995134] text-2xl font-black shrink-0 leading-none">•</span>
                  <span className="font-inria text-base md:text-lg text-[#3D2716] group-hover:text-[#995134] transition-colors">{service}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square lg:aspect-[4/5] overflow-hidden">
              <img 
                src={servicesImg} 
                alt="Luxury Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}