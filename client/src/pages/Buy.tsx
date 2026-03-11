import { useState } from "react";
import { Link } from "wouter";
import { Heart, MapPin } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Property } from "@shared/schema";

export default function Buy() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", selectedType],
    queryFn: async () => {
      const params = selectedType !== "All" ? `?type=${selectedType}` : "";
      const res = await fetch(`/api/properties${params}`);
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
  });

  const { data: favoritesData = [] } = useQuery<{ propertyId: number }[]>({
    queryKey: ["/api/favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites");
      if (!res.ok) throw new Error("Failed to fetch favorites");
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
      if (!res.ok) throw new Error("Failed to toggle favorite");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
    },
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      {/* Header */}
      <div className="pt-32 pb-16 bg-gradient-to-b from-[#3D2716]/5 to-transparent">
        <div className="container mx-auto px-6 lg:px-12">
          <Link href="/">
            <a className="text-sm font-inria text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors mb-6 inline-block">
              ← Back to Home
            </a>
          </Link>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-4">
            Exceptional Properties
          </h1>
          <p className="font-inria text-xl text-[#3D2716]/70 max-w-2xl">
            Curated luxury residences across Dubai's most prestigious locations.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#D8BFAE]/30 bg-white sticky top-20 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-wrap gap-3">
            {["All", "Villa", "Penthouse", "Apartment"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 font-inria text-sm uppercase tracking-widest transition-all ${
                  selectedType === type
                    ? "bg-[#3D2716] text-[#FAF8F5]"
                    : "bg-transparent text-[#3D2716] border border-[#D8BFAE] hover:border-[#3D2716]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-6 lg:px-12 py-20">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="font-inria text-[#917C63] text-lg">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-inria text-[#917C63] text-lg">No properties found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property) => (
              <div key={property.id} className="group cursor-pointer">
                {/* Card Image */}
                <div className="relative overflow-hidden bg-[#D8BFAE]/20 aspect-[4/3] mb-6">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteMutation.mutate(property.id);
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 hover:bg-white transition-colors"
                  >
                    <Heart
                      size={20}
                      className={
                        favoritedIds.includes(property.id)
                          ? "fill-[#995134] text-[#995134]"
                          : "text-[#3D2716]"
                      }
                    />
                  </button>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 bg-[#3D2716] text-[#FAF8F5] px-4 py-2 font-inria text-xs uppercase tracking-widest">
                    {property.type}
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-4 group-hover:opacity-90 transition-opacity">
                  <h3 className="font-symphony text-3xl text-[#3D2716]">
                    {property.price}
                  </h3>
                  <h4 className="font-lejour text-xl text-[#3D2716] leading-tight">
                    {property.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-[#917C63]">
                    <MapPin size={16} />
                    <span className="font-inria text-sm">{property.location}</span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D8BFAE]/30">
                    <div>
                      <p className="font-lejour text-[#917C63] uppercase text-xs tracking-widest mb-1">
                        Beds
                      </p>
                      <p className="font-symphony text-2xl text-[#3D2716]">
                        {property.beds}
                      </p>
                    </div>
                    <div>
                      <p className="font-lejour text-[#917C63] uppercase text-xs tracking-widest mb-1">
                        Baths
                      </p>
                      <p className="font-symphony text-2xl text-[#3D2716]">
                        {property.baths}
                      </p>
                    </div>
                    <div>
                      <p className="font-lejour text-[#917C63] uppercase text-xs tracking-widest mb-1">
                        Area
                      </p>
                      <p className="font-inria text-sm text-[#3D2716]">
                        {property.area}
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Link href={`/property/${property.id}`}>
                      <a className="flex-1 bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#995134] transition-colors text-center block">
                        View Details
                      </a>
                    </Link>
                    <button className="flex-1 border border-[#3D2716] text-[#3D2716] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors">
                      Schedule Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl md:text-5xl mb-6">
            Need Expert Guidance?
          </h2>
          <p className="font-inria text-lg text-[#FAF8F5]/80 mb-12 max-w-2xl mx-auto">
            Our advisors are ready to discuss your investment objectives and
            identify opportunities aligned with your strategy.
          </p>
          <button className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors">
            Schedule Consultation
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
