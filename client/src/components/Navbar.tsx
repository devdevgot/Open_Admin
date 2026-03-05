import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const navItems = [
  {
    name: "BUY",
    categories: {
      "Property Types": ["Apartments for Sale", "Villas for Sale", "Townhouses", "Penthouses", "Luxury Residences"],
      "Collections": ["Off-Plan Projects", "Investment Opportunities", "Waterfront Living", "Branded Developments"],
      "Areas": ["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "Dubai Hills Estate"]
    }
  },
  {
    name: "SELL",
    categories: {
      "Services": ["List Your Property", "Book Valuation", "Selling Process", "Why Aviera Living", "Recently Sold"]
    }
  },
  {
    name: "RENT",
    categories: {
      "Properties": ["Apartments for Rent", "Villas for Rent", "Short-Term Stays"],
      "Services": ["Landlord Services", "Rental Guide"]
    }
  },
  {
    name: "ABOUT US",
    categories: {
      "Company": ["Our Founder", "Our Story", "Our Agents", "Brand Purpose"],
      "Values": ["Mission & Vision", "Core Values", "Client Experience Promise", "Why It Matters to Investors"]
    }
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled || activeMenu ? "bg-[#FAF8F5] text-[#3D2716] py-4" : "bg-transparent text-[#FAF8F5] py-6"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="font-lejour text-2xl tracking-widest uppercase">
              Aviera Living
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="font-lejour text-sm tracking-[0.2em] uppercase hover:text-[#995134] transition-colors"
                onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-8">
            <span className="font-inria text-sm uppercase tracking-wider">Contact</span>
            <button className="bg-[#3D2716] text-[#FAF8F5] font-inria uppercase tracking-wider text-xs px-8 py-3 hover:bg-[#995134] transition-colors">
              Get in Touch
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setActiveMenu(activeMenu === "MOBILE" ? null : "MOBILE")}>
              {activeMenu === "MOBILE" ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mega Menu (Desktop) */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-[#FAF8F5] text-[#3D2716] transition-all duration-500 ease-in-out",
          activeMenu && activeMenu !== "MOBILE" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="container mx-auto px-12 py-16 h-full border-t border-[#D8BFAE]/30">
          {navItems.map((item) => (
            item.name === activeMenu && (
              <div key={item.name} className="grid grid-cols-3 gap-16 h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {Object.entries(item.categories).map(([category, links]) => (
                  <div key={category}>
                    <h4 className="font-lejour text-lg text-[#917C63] mb-8 uppercase tracking-widest">{category}</h4>
                    <ul className="space-y-4">
                      {links.map((link) => (
                         <li key={link}>
                           <a href="#" className="font-inria text-xl hover:text-[#995134] transition-colors">
                             {link}
                           </a>
                         </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#FAF8F5] text-[#3D2716] transition-all duration-500 lg:hidden overflow-y-auto pt-24",
          activeMenu === "MOBILE" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="px-6 py-8 space-y-8">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-[#D8BFAE]/30 pb-6">
              <h3 className="font-lejour text-2xl tracking-widest mb-6">{item.name}</h3>
              {Object.entries(item.categories).map(([category, links]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="font-lejour text-sm text-[#917C63] mb-4 uppercase tracking-wider">{category}</h4>
                  <ul className="space-y-3 pl-4 border-l border-[#D8BFAE]/30">
                    {links.map((link) => (
                        <li key={link}>
                          <a href="#" className="font-inria text-lg hover:text-[#995134]">
                            {link}
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <div className="pt-4">
            <button className="w-full bg-[#3D2716] text-[#FAF8F5] font-inria uppercase tracking-wider py-4 hover:bg-[#995134] transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}