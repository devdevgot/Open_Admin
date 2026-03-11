import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { Heart, MapPin } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Property } from "@shared/schema";

export default function Buy() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const urlType = params.get("type");
  const urlLocation = params.get("location");
  const urlCollection = params.get("collection");

  const [selectedType, setSelectedType] = useState<string>(urlType || "All");
  const [selectedLocation, setSelectedLocation] = useState<string>(urlLocation || "All");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (urlType) setSelectedType(urlType);
    else setSelectedType("All");
    if (urlLocation) setSelectedLocation(urlLocation);
    else setSelectedLocation("All");
  }, [urlType, urlLocation]);

  const { data: allProperties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to fetch properties");
      return res.json();
    },
  });

  const filteredProperties = allProperties.filter((p) => {
    if (selectedType !== "All" && p.type !== selectedType) return false;
    if (selectedLocation !== "All" && p.location !== selectedLocation) return false;
    return true;
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

  const locations = ["All", ...Array.from(new Set(allProperties.map((p) => p.location)))];

  const activeFilterLabel = () => {
    const parts: string[] = [];
    if (selectedType !== "All") parts.push(selectedType);
    if (selectedLocation !== "All") parts.push(selectedLocation);
    if (urlCollection) {
      const collectionLabels: Record<string, string> = {
        "off-plan": "Off-Plan Projects",
        investment: "Investment Opportunities",
        waterfront: "Waterfront Living",
        branded: "Branded Developments",
      };
      parts.push(collectionLabels[urlCollection] || urlCollection);
    }
    return parts.length > 0 ? parts.join(" · ") : null;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <div className="pt-32 pb-16 bg-gradient-to-b from-[#3D2716]/5 to-transparent">
        <div className="container mx-auto px-6 lg:px-12">
          <Link href="/" className="text-sm font-inria text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors mb-6 inline-block" data-testid="link-back-home">
              ← Back to Home
          </Link>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#3D2716] mb-4" data-testid="text-page-title">
            Exceptional Properties
          </h1>
          <p className="font-inria text-xl text-[#3D2716]/70 max-w-2xl">
            Curated luxury residences across Dubai's most prestigious locations.
          </p>
          {activeFilterLabel() && (
            <div className="mt-6 flex items-center gap-3">
              <span className="font-inria text-sm text-[#917C63] uppercase tracking-wider">Showing:</span>
              <span className="font-lejour text-sm text-[#3D2716] uppercase tracking-widest">{activeFilterLabel()}</span>
              <Link href="/buy" className="font-inria text-xs text-[#995134] uppercase tracking-wider hover:text-[#3D2716] ml-2" data-testid="link-clear-filters">
                  Clear All ×
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-b border-[#D8BFAE]/30 bg-white sticky top-20 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex flex-wrap gap-3">
              <span className="font-lejour text-xs text-[#917C63] uppercase tracking-widest self-center mr-2">Type:</span>
              {["All", "Villa", "Penthouse", "Apartment"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedLocation("All");
                  }}
                  data-testid={`button-filter-type-${type.toLowerCase()}`}
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

            {locations.length > 1 && (
              <div className="flex flex-wrap gap-3">
                <span className="font-lejour text-xs text-[#917C63] uppercase tracking-widest self-center mr-2">Area:</span>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    data-testid={`button-filter-location-${loc.toLowerCase().replace(/\s/g, "-")}`}
                    className={`px-5 py-2 font-inria text-xs uppercase tracking-widest transition-all ${
                      selectedLocation === loc
                        ? "bg-[#424D38] text-[#FAF8F5]"
                        : "bg-transparent text-[#3D2716] border border-[#D8BFAE] hover:border-[#424D38]"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-20">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="font-inria text-[#917C63] text-lg">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-inria text-[#917C63] text-lg mb-4">No properties found for this filter.</p>
            <Link href="/buy" className="font-inria text-[#995134] uppercase tracking-widest hover:text-[#3D2716]" data-testid="link-view-all">
                View All Properties
            </Link>
          </div>
        ) : (
          <>
            <p className="font-inria text-sm text-[#917C63] mb-10" data-testid="text-results-count">
              {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProperties.map((property) => (
                <div key={property.id} className="group cursor-pointer" data-testid={`card-property-${property.id}`}>
                  <div className="relative overflow-hidden bg-[#D8BFAE]/20 aspect-[4/3] mb-6">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteMutation.mutate(property.id);
                      }}
                      data-testid={`button-favorite-${property.id}`}
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
                    <div className="absolute top-4 left-4 bg-[#3D2716] text-[#FAF8F5] px-4 py-2 font-inria text-xs uppercase tracking-widest">
                      {property.type}
                    </div>
                  </div>

                  <div className="space-y-4 group-hover:opacity-90 transition-opacity">
                    <h3 className="font-symphony text-3xl text-[#3D2716]" data-testid={`text-price-${property.id}`}>
                      {property.price}
                    </h3>
                    <h4 className="font-lejour text-xl text-[#3D2716] leading-tight">
                      {property.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-[#917C63]">
                      <MapPin size={16} />
                      <span className="font-inria text-sm">{property.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D8BFAE]/30">
                      <div>
                        <p className="font-lejour text-[#917C63] uppercase text-xs tracking-widest mb-1">Beds</p>
                        <p className="font-symphony text-2xl text-[#3D2716]">{property.beds}</p>
                      </div>
                      <div>
                        <p className="font-lejour text-[#917C63] uppercase text-xs tracking-widest mb-1">Baths</p>
                        <p className="font-symphony text-2xl text-[#3D2716]">{property.baths}</p>
                      </div>
                      <div>
                        <p className="font-lejour text-[#917C63] uppercase text-xs tracking-widest mb-1">Area</p>
                        <p className="font-inria text-sm text-[#3D2716]">{property.area}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Link href={`/property/${property.id}`} className="flex-1 bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#995134] transition-colors text-center block" data-testid={`link-view-details-${property.id}`}>
                          View Details
                      </Link>
                      <button className="flex-1 border border-[#3D2716] text-[#3D2716] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors" data-testid={`button-schedule-tour-${property.id}`}>
                        Schedule Tour
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl md:text-5xl mb-6">
            Need Expert Guidance?
          </h2>
          <p className="font-inria text-lg text-[#FAF8F5]/80 mb-12 max-w-2xl mx-auto">
            Our advisors are ready to discuss your investment objectives and
            identify opportunities aligned with your strategy.
          </p>
          <button className="bg-[#995134] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-schedule-consultation">
            Schedule Consultation
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
