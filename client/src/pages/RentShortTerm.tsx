import { Link } from "wouter";
import { Star, MapPin, Wifi, Car, Waves, Utensils, ArrowRight } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stays = [
  {
    title: "Marina Sky Penthouse",
    location: "Dubai Marina",
    type: "Penthouse",
    beds: 3,
    pricePerNight: "AED 2,800",
    rating: "4.9",
    reviews: 47,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    amenities: ["wifi", "pool", "parking", "kitchen"],
  },
  {
    title: "Palm Beach Retreat",
    location: "Palm Jumeirah",
    type: "Villa",
    beds: 5,
    pricePerNight: "AED 8,500",
    rating: "5.0",
    reviews: 23,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    amenities: ["wifi", "pool", "parking", "kitchen"],
  },
  {
    title: "Downtown Luxury Suite",
    location: "Downtown Dubai",
    type: "Apartment",
    beds: 2,
    pricePerNight: "AED 1,400",
    rating: "4.8",
    reviews: 89,
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
    amenities: ["wifi", "parking", "kitchen"],
  },
  {
    title: "Burj Khalifa View Studio",
    location: "Business Bay",
    type: "Apartment",
    beds: 1,
    pricePerNight: "AED 950",
    rating: "4.7",
    reviews: 134,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    amenities: ["wifi", "pool", "kitchen"],
  },
  {
    title: "JBR Beachfront Apartment",
    location: "Jumeirah Beach Residence",
    type: "Apartment",
    beds: 2,
    pricePerNight: "AED 1,750",
    rating: "4.9",
    reviews: 61,
    image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=800&h=600&fit=crop",
    amenities: ["wifi", "pool", "parking", "kitchen"],
  },
  {
    title: "Emirates Hills Manor",
    location: "Emirates Hills",
    type: "Villa",
    beds: 6,
    pricePerNight: "AED 12,000",
    rating: "5.0",
    reviews: 14,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
    amenities: ["wifi", "pool", "parking", "kitchen"],
  },
];

const amenityIcon = (type: string) => {
  switch (type) {
    case "wifi": return <Wifi size={14} />;
    case "pool": return <Waves size={14} />;
    case "parking": return <Car size={14} />;
    case "kitchen": return <Utensils size={14} />;
    default: return null;
  }
};

const filters = ["All", "1–3 nights", "Weekly", "Monthly"];

export default function RentShortTerm() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-14">
          <Link href="/rent" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6 inline-block" data-testid="link-back">
            ← Rental Properties
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Short-Term Stays</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-4" data-testid="text-page-title">
            Stay in Luxury,<br />Pay by the Night
          </h1>
          <p className="font-inria text-lg text-[#FAF8F5]/70 max-w-xl mb-10">
            Fully serviced, hotel-quality residences available from one night to several months. No compromise on standard.
          </p>
          {/* Date picker row */}
          <div className="flex flex-col sm:flex-row gap-0 max-w-2xl">
            <input type="date" className="flex-1 bg-white/95 px-6 py-4 font-inria text-sm text-[#3D2716] outline-none border-r border-[#D8BFAE]/30" data-testid="input-check-in" />
            <input type="date" className="flex-1 bg-white/95 px-6 py-4 font-inria text-sm text-[#3D2716] outline-none border-r border-[#D8BFAE]/30" data-testid="input-check-out" />
            <select className="bg-white/95 px-6 py-4 font-inria text-sm text-[#917C63] outline-none border-r border-[#D8BFAE]/30 appearance-none" data-testid="select-guests">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3–5 Guests</option>
              <option>6+ Guests</option>
            </select>
            <button className="bg-[#995134] text-[#FAF8F5] px-8 py-4 font-inria text-xs uppercase tracking-widest hover:bg-[#3D2716] transition-colors" data-testid="button-search">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Duration tabs */}
      <section className="border-b border-[#D8BFAE]/20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex gap-3 flex-wrap">
            {filters.map((f, i) => (
              <button
                key={f}
                className={`font-inria text-xs uppercase tracking-widest px-5 py-2 transition-all ${i === 0 ? "bg-[#3D2716] text-[#FAF8F5]" : "border border-[#D8BFAE]/50 text-[#3D2716] hover:border-[#3D2716]"}`}
                data-testid={`button-filter-${f.toLowerCase().replace(/\s/g, "-")}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stays.map((stay) => (
            <div key={stay.title} className="group cursor-pointer" data-testid={`card-stay-${stay.title.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="relative overflow-hidden aspect-[4/3] mb-5">
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#3D2716]/90 text-[#FAF8F5] px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest">
                  {stay.type}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 flex items-center gap-1.5 px-3 py-1.5">
                  <Star size={12} className="fill-[#995134] text-[#995134]" />
                  <span className="font-inria text-xs text-[#3D2716]">{stay.rating}</span>
                  <span className="font-inria text-xs text-[#917C63]">({stay.reviews})</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-wider">{stay.title}</h3>
                  <div className="text-right shrink-0 ml-3">
                    <p className="font-symphony text-xl text-[#3D2716]">{stay.pricePerNight}</p>
                    <p className="font-inria text-xs text-[#917C63]">per night</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[#917C63]">
                  <MapPin size={14} />
                  <span className="font-inria text-sm">{stay.location}</span>
                </div>
                <div className="flex items-center gap-4 pt-3 border-t border-[#D8BFAE]/20">
                  <span className="font-inria text-sm text-[#3D2716]">{stay.beds} Bed{stay.beds > 1 ? "s" : ""}</span>
                  <div className="flex gap-2 ml-auto">
                    {stay.amenities.map((a) => (
                      <span key={a} className="text-[#917C63]">{amenityIcon(a)}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => openContactModal({ type: "rent", prefillMessage: `I am interested in the ${stay.title} short-term stay.` })} className="w-full bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#995134] transition-colors mt-2" data-testid={`button-book-${stay.title.toLowerCase().replace(/\s/g, "-")}`}>
                  Check Availability
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="py-16 bg-[#3D2716]/[0.04] border-t border-[#D8BFAE]/20">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-lejour text-xs text-[#917C63] uppercase tracking-[0.3em] mb-4">Why Book With Aviera</p>
          <h2 className="font-symphony text-4xl text-[#3D2716] mb-12">The Short-Term Standard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Hotel-Grade Servicing", desc: "Professional cleaning, linen, and concierge on every booking." },
              { title: "Instant Confirmation", desc: "All properties are pre-vetted and available with immediate booking confirmation." },
              { title: "Legal Peace of Mind", desc: "Every rental is DTCM-licensed and fully insured for your protection." },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 bg-white border border-[#D8BFAE]/20">
                <h3 className="font-lejour text-base text-[#3D2716] uppercase tracking-widest mb-3">{item.title}</h3>
                <p className="font-inria text-sm text-[#3D2716]/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Group or Corporate Stay?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            We specialise in corporate relocations, family getaways and extended executive stays. Contact our team for tailored rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => openContactModal({ type: "rent", prefillMessage: "I am enquiring about corporate or extended stay packages." })} className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-corporate">
              Corporate Enquiry
            </button>
            <a href="tel:+97140000000" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center">
              Call +971 4 000 0000
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
