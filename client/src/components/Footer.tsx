import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#424D38] text-[#FAF8F5] pt-24 pb-12 border-t border-[#FAF8F5]/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1 border-b border-[#FAF8F5]/10 pb-12 sm:border-0 sm:pb-0">
            <div className="flex flex-col items-start leading-tight mb-6"><span className="font-lejour uppercase text-2xl tracking-widest">Aviera</span><span className="font-symphony italic -mt-1 ml-[80px] text-[25px]">Living</span></div>
            <p className="font-inria text-[#FAF8F5]/70 text-sm leading-relaxed mb-8 max-w-xs">
              Luxury Real Estate, Redefined by Trust. Legal Precision. Boutique Guidance.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/avieraliving?igsh=MWUwZ25tNjJwaGRycQ==" target="_blank" rel="noopener noreferrer" className="text-[#FAF8F5]/70 hover:text-[#D8BFAE] transition-colors border border-[#FAF8F5]/30 rounded-lg p-2 flex items-center justify-center" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/aviera-living/about/" target="_blank" rel="noopener noreferrer" className="text-[#FAF8F5]/70 hover:text-[#D8BFAE] transition-colors border border-[#FAF8F5]/30 rounded-lg p-2 flex items-center justify-center" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586981953546&sk=directory_offers" target="_blank" rel="noopener noreferrer" className="text-[#FAF8F5]/70 hover:text-[#D8BFAE] transition-colors border border-[#FAF8F5]/30 rounded-lg p-2 flex items-center justify-center" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="border-b border-[#FAF8F5]/10 pb-8 sm:border-0 sm:pb-0">
            <h3 className="font-lejour text-[#D8BFAE] uppercase tracking-[0.2em] text-[10px] mb-6">Explore</h3>
            <ul className="space-y-4 font-inria text-[#FAF8F5]/80 text-sm">
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Buy Properties</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Sell Your Property</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Rentals</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Off-Plan Projects</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="border-b border-[#FAF8F5]/10 pb-8 sm:border-0 sm:pb-0">
            <h3 className="font-lejour text-[#D8BFAE] uppercase tracking-[0.2em] text-[10px] mb-6">Company</h3>
            <ul className="space-y-4 font-inria text-[#FAF8F5]/80 text-sm">
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FAF8F5] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="pb-8 sm:pb-0">
            <h3 className="font-lejour text-[#D8BFAE] uppercase tracking-[0.2em] text-[10px] mb-6">Contact</h3>
            <ul className="space-y-4 font-inria text-[#FAF8F5]/80 text-sm">
              <li>Churchill Tower</li>
              <li>Business Bay, Dubai</li>
              <li>Office N 1809, UAE</li>
              <li className="pt-4"><a href="mailto:advisory@avieraliving.com" className="hover:text-[#FAF8F5] transition-colors">advisory@avieraliving.com</a></li>
              <li><a href="tel:+971502915941" className="hover:text-[#FAF8F5] transition-colors">+971 50 291 5941</a></li>
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