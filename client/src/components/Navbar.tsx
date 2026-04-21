import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { openContactModal } from "@/lib/contact";

type NavLink = {
  label: string;
  href: string;
};

type NavCategory = {
  title: string;
  links: NavLink[];
};

type NavItem = {
  name: string;
  categories: NavCategory[];
  href?: string;
};

const navItems: NavItem[] = [
  {
    name: "BUY",
    categories: [
      {
        title: "Property Types",
        links: [
          { label: "Apartments for Sale", href: "/buy?type=Apartment" },
          { label: "Villas for Sale", href: "/buy?type=Villa" },
          { label: "Townhouses", href: "/buy?type=Townhouse" },
          { label: "Penthouses", href: "/buy?type=Penthouse" },
          { label: "All Properties", href: "/buy" },
        ],
      },
      {
        title: "Collections",
        links: [
          { label: "Off-Plan Projects", href: "/buy?collection=off-plan" },
          { label: "Investment Opportunities", href: "/buy?collection=investment" },
          { label: "Waterfront Living", href: "/buy?collection=waterfront" },
          { label: "Branded Developments", href: "/buy?collection=branded" },
        ],
      },
      {
        title: "Areas",
        links: [
          { label: "Downtown Dubai", href: "/buy?location=Downtown+Dubai" },
          { label: "Dubai Marina", href: "/buy?location=Dubai+Marina" },
          { label: "Palm Jumeirah", href: "/buy?location=Palm+Jumeirah" },
          { label: "Business Bay", href: "/buy?location=Business+Bay" },
          { label: "Emirates Hills", href: "/buy?location=Emirates+Hills" },
        ],
      },
    ],
  },
  {
    name: "SELL",
    href: "/sell",
    categories: [],
  },
  {
    name: "RENT",
    categories: [
      {
        title: "Properties",
        links: [
          { label: "Apartments for Rent", href: "/rent/apartments" },
          { label: "Villas for Rent", href: "/rent/villas" },
          { label: "Short-Term Stays", href: "/rent/short-term" },
          { label: "All Rentals", href: "/rent" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Landlord Services", href: "/rent/landlord" },
          { label: "Rental Guide", href: "/rent/guide" },
        ],
      },
    ],
  },
  {
    name: "OUR BLOG",
    href: "/blog",
    categories: [],
  },
  {
    name: "ABOUT US",
    categories: [
      {
        title: "Company",
        links: [
          { label: "Our Founder", href: "/about/founder" },
          { label: "Our Story", href: "/about/story" },
          { label: "Our Agents", href: "/about/agents" },
          { label: "About Aviera", href: "/about" },
        ],
      },
      {
        title: "Values",
        links: [
          { label: "Mission & Vision", href: "/about/mission" },
          { label: "Core Values", href: "/about/values" },
          { label: "Client Experience Promise", href: "/about/experience" },
          { label: "Why It Matters to Investors", href: "/about/investors" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveMenu(null);

    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      if (window.location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      setLocation("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      setLocation(href);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled || activeMenu ? "bg-[#FAF8F5] text-[#3D2716] py-4" : "bg-transparent text-[#FAF8F5] py-6"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <Link href="/" className="flex flex-col items-start leading-tight">
              <span className="font-lejour uppercase text-2xl tracking-widest">Aviera</span>
              <span className="font-symphony italic -mt-1 text-right ml-[80px] text-[25px] font-normal">Living</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) =>
              item.href ? (
                <button
                  key={item.name}
                  className="font-lejour text-sm tracking-[0.2em] uppercase hover:text-[#995134] transition-colors"
                  onClick={() => handleLinkClick(item.href!)}
                >
                  {item.name}
                </button>
              ) : (
                <button
                  key={item.name}
                  className={cn(
                    "font-lejour text-sm tracking-[0.2em] uppercase hover:text-[#995134] transition-colors",
                    activeMenu === item.name && "text-[#995134]"
                  )}
                  onClick={() => setActiveMenu(activeMenu === item.name ? null : item.name)}
                >
                  {item.name}
                </button>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <span onClick={() => openContactModal({ type: "general" })} className="font-lejour text-sm uppercase tracking-wider cursor-pointer hover:text-[#995134] transition-colors">Contact</span>
            <button onClick={() => openContactModal({ type: "general" })} className="bg-[#424D38] text-[#FAF8F5] font-lejour uppercase tracking-wider text-xs px-8 py-3 hover:bg-[#3D2716] transition-colors" data-testid="button-get-in-touch-desktop">
              Get in Touch
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setActiveMenu(activeMenu === "MOBILE" ? null : "MOBILE")}
              className="p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {activeMenu === "MOBILE" ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Fullscreen Mega Menu (Desktop) */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-[#FAF8F5] text-[#3D2716] transition-all duration-500 ease-in-out hidden lg:block",
          activeMenu && activeMenu !== "MOBILE" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="container mx-auto px-12 py-16 h-full border-t border-[#D8BFAE]/30">
          {navItems.map((item) => (
            item.name === activeMenu && (
              <div key={item.name} className="grid grid-cols-3 gap-16 h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                {item.categories.map((cat) => (
                  <div key={cat.title}>
                    <h4 className="font-lejour text-lg text-[#917C63] mb-8 uppercase tracking-widest">{cat.title}</h4>
                    <ul className="space-y-4">
                      {cat.links.map((link) => (
                        <li key={link.label}>
                          <button
                            onClick={() => handleLinkClick(link.href)}
                            className="font-inria text-xl hover:text-[#995134] transition-colors text-left"
                          >
                            {link.label}
                          </button>
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
          "fixed inset-0 z-40 bg-[#FAF8F5] text-[#3D2716] transition-all duration-500 lg:hidden overflow-y-auto",
          activeMenu === "MOBILE" ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-12">
          <div className="flex-1 space-y-10">
            {navItems.map((item) => (
              <div key={item.name} className="group">
                {item.href ? (
                  <button
                    className="w-full flex justify-between items-center py-2 border-b border-[#D8BFAE]/20 text-left"
                    onClick={() => handleLinkClick(item.href!)}
                  >
                    <span className="font-lejour text-3xl tracking-widest">{item.name}</span>
                    <span className="text-[#917C63] text-xl">→</span>
                  </button>
                ) : (
                  <>
                    <button 
                      className="w-full flex justify-between items-center py-2 border-b border-[#D8BFAE]/20 text-left"
                      onClick={(e) => {
                        const icon = e.currentTarget.querySelector('.toggle-icon');
                        const next = e.currentTarget.nextElementSibling;
                        if (next) {
                          next.classList.toggle('hidden');
                          if (icon) icon.textContent = next.classList.contains('hidden') ? '+' : '−';
                        }
                      }}
                    >
                      <span className="font-lejour text-3xl tracking-widest">{item.name}</span>
                      <span className="text-[#917C63] toggle-icon text-xl">+</span>
                    </button>
                    <div className="hidden mt-6 space-y-8 pl-4 animate-in fade-in slide-in-from-top-2">
                      {item.categories.map((cat) => (
                        <div key={cat.title}>
                          <h4 className="font-lejour text-xs text-[#917C63] mb-4 uppercase tracking-widest">{cat.title}</h4>
                          <ul className="space-y-4">
                            {cat.links.map((link) => (
                              <li key={link.label}>
                                <button
                                  onClick={() => handleLinkClick(link.href)}
                                  className="font-inria text-xl text-[#3D2716]/80 active:text-[#995134] text-left"
                                >
                                  {link.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 space-y-6 pt-8 border-t border-[#D8BFAE]/30">
            <div className="flex flex-col space-y-2">
              <span className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.2em]">Contact</span>
              <a href="tel:+97140000000" className="font-inria text-lg">+971 4 000 0000</a>
            </div>
            <button onClick={() => openContactModal({ type: "general" })} className="group relative w-full overflow-hidden bg-[#424D38] text-[#FAF8F5] font-lejour uppercase tracking-widest py-5 text-sm transition-all duration-500 ease-out active:bg-[#3D2716] hover:-translate-y-1 hover:bg-[#3D2716] hover:shadow-[0_18px_45px_rgba(61,39,22,0.28)]" data-testid="button-get-in-touch-mobile">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FAF8F5]/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="absolute inset-[1px] border border-[#D8BFAE]/0 transition-all duration-500 group-hover:inset-[6px] group-hover:border-[#D8BFAE]/35" />
              <span className="relative inline-flex items-center justify-center gap-3">
                Get in Touch
                <span className="inline-block translate-x-0 opacity-70 transition-all duration-500 group-hover:translate-x-1.5 group-hover:opacity-100">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
