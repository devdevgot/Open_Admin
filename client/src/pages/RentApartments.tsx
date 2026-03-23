import { Link } from "wouter";
import { Heart, MapPin, BedDouble, Bath, Maximize, CheckCircle2 } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Property } from "@shared/schema";

const perks = [
  "RERA-verified listings only",
  "Transparent pricing, no hidden fees",
  "Same-day viewing appointments",
  "Dedicated tenancy advisor",
];

export default function RentApartments() {
  const queryClient = useQueryClient();

  const { data: allProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const apartments = allProperties.filter(p => p.type === "Apartment");

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

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-14">
          <Link href="/rent" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6 inline-block" data-testid="link-back">
            ← Rental Properties
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Long-Term Rentals</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-4" data-testid="text-page-title">
            Apartments<br />for Rent
          </h1>
          <p className="font-inria text-lg text-[#FAF8F5]/70 max-w-xl">
            Studio to four-bedroom apartments in Dubai's most sought-after residential towers and communities.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="bg-[#424D38] py-6">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-x-10 gap-y-3 justify-center md:justify-start">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#D8BFAE]" />
                <span className="font-inria text-sm text-[#FAF8F5]/80">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Filters */}
      <section className="border-b border-[#D8BFAE]/20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.2em]">Popular Areas:</span>
            {["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "JBR"].map((area) => (
              <button key={area} className="font-inria text-xs text-[#3D2716] border border-[#D8BFAE]/50 px-4 py-1.5 hover:border-[#3D2716] transition-colors uppercase tracking-wider" data-testid={`button-area-${area.toLowerCase().replace(/\s/g, "-")}`}>
                {area}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center mb-10">
          <p className="font-inria text-sm text-[#917C63]" data-testid="text-count">
            {apartments.length} apartments available
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-[#D8BFAE] border-t-[#3D2716] animate-spin"></div>
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-symphony text-3xl text-[#3D2716] mb-4">No Apartments Found</p>
            <Link href="/rent" className="font-inria text-[#995134] uppercase tracking-widest hover:text-[#3D2716]">View All Rentals</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apartments.map((property) => (
              <div key={property.id} className="group" data-testid={`card-property-${property.id}`}>
                <div className="relative overflow-hidden aspect-[4/3] mb-5">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#D8BFAE]/30 to-[#917C63]/20 flex items-center justify-center">
                      <span className="text-[#917C63] text-sm">No image</span>
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavoriteMutation.mutate(property.id)}
                    className="absolute top-4 right-4 bg-white/90 w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
                    data-testid={`button-favorite-${property.id}`}
                  >
                    <Heart size={18} className={favoritedIds.includes(property.id) ? "fill-[#995134] text-[#995134]" : "text-[#3D2716]"} />
                  </button>
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
                    <button onClick={() => openContactModal({ type: "rent", propertyId: property.id, propertyTitle: property.title })} className="flex-1 border border-[#3D2716] text-[#3D2716] py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors" data-testid={`button-enquire-${property.id}`}>
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl mb-6">Can't Find Your Ideal Apartment?</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Our rental team has access to exclusive listings not yet published. Share your criteria and we'll find the perfect match.
          </p>
          <button onClick={() => openContactModal({ type: "rent" })} className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-cta">
            Contact Rental Team
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
