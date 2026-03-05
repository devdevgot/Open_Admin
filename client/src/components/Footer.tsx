export default function Footer() {
  return (
    <footer className="bg-[#3D2716] text-[#FAF8F5] pt-24 pb-12 border-t border-[#FAF8F5]/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-lejour text-2xl tracking-widest uppercase mb-6">Aviera Living</h2>
            <p className="font-inria text-[#FAF8F5]/70 text-sm leading-relaxed mb-8 max-w-xs">
              Luxury Real Estate, Redefined by Trust. Legal Precision. Boutique Guidance.
            </p>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              <a href="#" className="text-[#FAF8F5]/70 hover:text-[#D8BFAE] transition-colors">IN</a>
              <a href="#" className="text-[#FAF8F5]/70 hover:text-[#D8BFAE] transition-colors">FB</a>
              <a href="#" className="text-[#FAF8F5]/70 hover:text-[#D8BFAE] transition-colors">X</a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-lejour text-[#D8BFAE] uppercase tracking-widest text-xs mb-6">Explore</h3>
            <ul className="space-y-4 font-inria text-[#FAF8F5]/80">
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Buy Properties</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Sell Your Property</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Rentals</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Off-Plan Projects</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-lejour text-[#D8BFAE] uppercase tracking-widest text-xs mb-6">Company</h3>
            <ul className="space-y-4 font-inria text-[#FAF8F5]/80">
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-lejour text-[#D8BFAE] uppercase tracking-widest text-xs mb-6">Contact</h3>
            <ul className="space-y-4 font-inria text-[#FAF8F5]/80 text-sm">
              <li>Level 42, ICD Brookfield Place</li>
              <li>Dubai International Financial Centre</li>
              <li>Dubai, UAE</li>
              <li className="pt-4"><a href="mailto:advisory@avieraliving.com" className="hover:text-[#FAF8F5] transition-colors">advisory@avieraliving.com</a></li>
              <li><a href="tel:+97140000000" className="hover:text-[#FAF8F5] transition-colors">+971 4 000 0000</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-[#FAF8F5]/10 flex flex-col md:flex-row justify-between items-center text-[#FAF8F5]/50 font-inria text-xs">
          <p>&copy; {new Date().getFullYear()} Aviera Living. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FAF8F5] transition-colors">Legal Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}