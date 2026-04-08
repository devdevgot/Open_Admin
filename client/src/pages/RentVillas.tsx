import { Link } from "wouter";
import { Heart, MapPin, BedDouble, Bath, Maximize, Trees } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Property } from "@shared/schema";

const communities = [
  { name: "Emirates Hills", desc: "Gated lakeside community" },
  { name: "Palm Jumeirah", desc: "Exclusive island living" },
  { name: "Arabian Ranches", desc: "Serene desert landscape" },
  { name: "Jumeirah Golf Estates", desc: "World-class golf views" },
];

export default function RentVillas() {
  const queryClient = useQueryClient();

  const { data: allProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const villas = allProperties.filter(p => p.type === "Villa");

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
      <section className="relative h-[60vh] min-h-[450px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-14">
          <Link href="/rent" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6 inline-block" data-testid="link-back">
            ← Rental Properties
          </Link>
          <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Private Residences</p>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-4" data-testid="text-page-title">
            Villas<br />for Rent
          </h1>
          <p className="font-inria text-lg text-[#FAF8F5]/70 max-w-xl">
            Exceptional standalone villas with private pools, gardens and garages in Dubai's most prestigious gated communities.
          </p>
        </div>
      </section>

      {/* Communities */}
      <section className="bg-[#3D2716]/[0.04] border-b border-[#D8BFAE]/20 py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communities.map((c) => (
              <div key={c.name} className="group cursor-pointer" data-testid={`card-community-${c.name.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="flex items-start gap-3">
                  <Trees size={18} className="text-[#424D38] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-lejour text-sm text-[#3D2716] uppercase tracking-widest group-hover:text-[#424D38] transition-colors">{c.name}</p>
                    <p className="font-inria text-xs text-[#917C63] mt-0.5">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16 container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center mb-10">
          <p className="font-inria text-sm text-[#917C63]" data-testid="text-count">
            {villas.length} villas available
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-[#D8BFAE] border-t-[#3D2716] animate-spin"></div>
          </div>
        ) : villas.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-symphony text-3xl text-[#3D2716] mb-4">No Villas Listed</p>
            <p className="font-inria text-[#917C63] mb-8">We may have off-market villas matching your needs — contact us.</p>
            <Link href="/rent" className="font-inria text-[#995134] uppercase tracking-widest hover:text-[#3D2716]">View All Rentals</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((property) => (
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
                  <div className="absolute top-4 left-4 bg-[#424D38]/90 text-[#FAF8F5] px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest">
                    Villa
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
                    <Link href={`/property/${property.id}`} className="flex-1 bg-[#3D2716] text-[#FAF8F5] py-3 font-lejour text-xs uppercase tracking-widest hover:bg-[#424D38] transition-colors text-center" data-testid={`link-view-${property.id}`}>
                      View Details
                    </Link>
                    <button onClick={() => openContactModal({ type: "rent", propertyId: property.id, propertyTitle: property.title })} className="flex-1 border border-[#3D2716] text-[#3D2716] py-3 font-lejour text-xs uppercase tracking-widest hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors" data-testid={`button-enquire-${property.id}`}>
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
          <h2 className="font-symphony text-4xl mb-6">Private Villa Search</h2>
          <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 max-w-2xl mx-auto">
            Many of our premium villas are available exclusively through direct inquiry. Let us arrange a private viewing.
          </p>
          <button onClick={() => openContactModal({ type: "rent" })} className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-lejour uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-cta">
            Arrange Private Viewing
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
