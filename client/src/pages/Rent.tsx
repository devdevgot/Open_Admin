import { useState } from "react";
import { Link } from "wouter";
import { Heart, MapPin, BedDouble, Bath, Maximize, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Property } from "@shared/schema";

const highlights = [
  { value: "500+", label: "Properties Available" },
  { value: "48h", label: "Average Move-In Time" },
  { value: "No", label: "Hidden Fees" },
  { value: "24/7", label: "Tenant Support" },
];

export default function Rent() {
  const [selectedType, setSelectedType] = useState("All");
  const queryClient = useQueryClient();

  const { data: allProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const { data: favoritesData = [] } = useQuery<{ propertyId: number }[]>({
    queryKey: ["/api/favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const favoritedIds = favoritesData.map((f) => f.propertyId);

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId }),
      });
      if (!res.ok) throw new Error("Failed to toggle");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/favorites"] }),
  });

  const filtered = selectedType === "All" ? allProperties : allProperties.filter(p => p.type === selectedType);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-14">
          <Link href="/" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6 inline-block" data-testid="link-back-home">
            ← Back to Home
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Long-Term Rentals</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-4" data-testid="text-page-title">
            Find Your<br />Perfect Home
          </h1>
          <p className="font-inria text-lg text-[#FAF8F5]/70 max-w-xl mb-10">
            Discover Dubai's finest rental properties — from waterfront apartments to gated villa communities.
          </p>
          {/* Search */}
          <div className="flex gap-0 max-w-2xl">
            <input
              type="text"
              placeholder="Search by area, community or property name..."
              className="flex-1 bg-white/95 px-6 py-4 font-inria text-sm text-[#3D2716] placeholder:text-[#917C63] outline-none"
              data-testid="input-search"
            />
            <button className="bg-[#995134] text-[#FAF8F5] px-8 py-4 hover:bg-[#3D2716] transition-colors" data-testid="button-search">
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#3D2716] py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-[#FAF8F5]/10">
            {highlights.map((h) => (
              <div key={h.label} className="text-center md:px-8">
                <p className="font-symphony text-3xl text-[#D8BFAE]">{h.value}</p>
                <p className="font-inria text-xs text-[#FAF8F5]/60 uppercase tracking-wider mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-b border-[#D8BFAE]/20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.2em]">Browse:</span>
            <Link href="/rent/apartments" className="font-inria text-sm text-[#3D2716] border border-[#D8BFAE]/50 px-5 py-2 hover:border-[#3D2716] transition-colors uppercase tracking-wider" data-testid="link-apartments">
              Apartments
            </Link>
            <Link href="/rent/villas" className="font-inria text-sm text-[#3D2716] border border-[#D8BFAE]/50 px-5 py-2 hover:border-[#3D2716] transition-colors uppercase tracking-wider" data-testid="link-villas">
              Villas
            </Link>
            <Link href="/rent/short-term" className="font-inria text-sm text-[#3D2716] border border-[#D8BFAE]/50 px-5 py-2 hover:border-[#3D2716] transition-colors uppercase tracking-wider" data-testid="link-short-term">
              Short-Term Stays
            </Link>
            <span className="hidden md:block w-px h-6 bg-[#D8BFAE]/30"></span>
            <Link href="/rent/landlord" className="font-inria text-sm text-[#917C63] hover:text-[#3D2716] transition-colors uppercase tracking-wider" data-testid="link-landlord">
              For Landlords →
            </Link>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 container mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", "Apartment", "Villa", "Penthouse"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              data-testid={`button-filter-${type.toLowerCase()}`}
              className={`px-5 py-2 font-inria text-xs uppercase tracking-widest transition-all ${
                selectedType === type ? "bg-[#3D2716] text-[#FAF8F5]" : "border border-[#D8BFAE]/50 text-[#3D2716] hover:border-[#3D2716]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-[#D8BFAE] border-t-[#3D2716] animate-spin mb-4"></div>
            <p className="font-inria text-[#917C63]">Loading properties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <div key={property.id} className="group" data-testid={`card-property-${property.id}`}>
                <div className="relative overflow-hidden aspect-[4/3] mb-5">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => toggleFavoriteMutation.mutate(property.id)}
                    className="absolute top-4 right-4 bg-white/90 w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
                    data-testid={`button-favorite-${property.id}`}
                  >
                    <Heart size={18} className={favoritedIds.includes(property.id) ? "fill-[#995134] text-[#995134]" : "text-[#3D2716]"} />
                  </button>
                  <div className="absolute top-4 left-4 bg-[#424D38]/90 text-[#FAF8F5] px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest">
                    {property.type}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-12">
                    <p className="font-symphony text-2xl text-[#FAF8F5]">{property.price}<span className="font-inria text-sm text-[#FAF8F5]/70"> /yr</span></p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-lejour text-lg text-[#3D2716] uppercase tracking-wider">{property.title}</h3>
                  <div className="flex items-center gap-1.5 text-[#917C63]">
                    <MapPin size={14} />
                    <span className="font-inria text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center gap-5 pt-3 border-t border-[#D8BFAE]/20">
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={15} className="text-[#917C63]" />
                      <span className="font-inria text-sm text-[#3D2716]">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath size={15} className="text-[#917C63]" />
                      <span className="font-inria text-sm text-[#3D2716]">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize size={15} className="text-[#917C63]" />
                      <span className="font-inria text-sm text-[#3D2716]">{property.area}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Link href={`/property/${property.id}`} className="flex-1 bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#424D38] transition-colors text-center" data-testid={`link-view-${property.id}`}>
                      View Details
                    </Link>
                    <button className="flex-1 border border-[#3D2716] text-[#3D2716] py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors" data-testid={`button-enquire-${property.id}`}>
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl md:text-5xl mb-6">Looking for Something Specific?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Tell us your requirements and our rental specialists will curate a personal shortlist within 24 hours.
          </p>
          <button className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-cta">
            Speak With a Specialist
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
