import { useState, useEffect, useRef } from "react";
import { Link, useSearch } from "wouter";
import { openContactModal } from "@/lib/contact";
import { Heart, MapPin, BedDouble, Bath, Maximize, SlidersHorizontal, X } from "lucide-react";
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
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (urlType) setSelectedType(urlType);
    else setSelectedType("All");
    if (urlLocation) setSelectedLocation(urlLocation);
    else setSelectedLocation("All");
  }, [urlType, urlLocation]);

  useEffect(() => {
    const handleScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      const past = heroBottom < 80;
      setScrolledPastHero(past);
      if (past && filtersOpen) setFiltersOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* Hero */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-12">
          <Link href="/" className="text-sm font-inria text-[#D8BFAE] uppercase tracking-widest hover:text-[#FAF8F5] transition-colors mb-6 inline-block" data-testid="link-back-home">
            ← Back to Home
          </Link>
          <h1 className="font-symphony text-5xl md:text-7xl text-[#FAF8F5] mb-3" data-testid="text-page-title">
            Exceptional Properties
          </h1>
          <p className="font-inria text-lg text-[#FAF8F5]/70 max-w-2xl">
            Curated luxury residences across Dubai's most prestigious locations.
          </p>
          {activeFilterLabel() && (
            <div className="mt-4 flex items-center gap-3">
              <span className="font-inria text-sm text-[#D8BFAE] uppercase tracking-wider">Showing:</span>
              <span className="font-lejour text-sm text-[#FAF8F5] uppercase tracking-widest">{activeFilterLabel()}</span>
              <Link href="/buy" className="font-inria text-xs text-[#995134] uppercase tracking-wider hover:text-[#FAF8F5] ml-2" data-testid="link-clear-filters">
                Clear ×
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-[#D8BFAE]/30 bg-white sticky top-20 z-20 shadow-sm">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Collapsed bar — icon + active filter summary */}
          <div
            className={`flex items-center justify-between transition-all duration-300 ${filtersOpen ? "py-0 h-0 overflow-hidden opacity-0" : "py-3"}`}
          >
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-3 hover:text-[#995134] transition-colors"
              data-testid="button-open-filters"
            >
              <SlidersHorizontal size={18} className="text-[#3D2716]" />
              <span className="font-lejour text-xs text-[#3D2716] uppercase tracking-[0.2em]">Filters</span>
              {(selectedType !== "All" || selectedLocation !== "All") && (
                <span className="bg-[#995134] text-[#FAF8F5] text-[10px] font-inria px-2 py-0.5 uppercase tracking-wider">
                  {[selectedType !== "All" ? selectedType : null, selectedLocation !== "All" ? selectedLocation : null].filter(Boolean).join(" · ")}
                </span>
              )}
            </button>
            <p className="font-inria text-xs text-[#917C63]">
              {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
            </p>
          </div>

          {/* Expanded filters */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${filtersOpen ? "max-h-64 opacity-100 py-5" : "max-h-0 opacity-0 py-0"}`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex flex-wrap gap-2 flex-1">
                <span className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.2em] self-center mr-2">Type</span>
                {["All", "Villa", "Penthouse", "Apartment"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type);
                      setSelectedLocation("All");
                    }}
                    data-testid={`button-filter-type-${type.toLowerCase()}`}
                    className={`px-5 py-2 font-inria text-xs uppercase tracking-widest transition-all ${
                      selectedType === type
                        ? "bg-[#3D2716] text-[#FAF8F5]"
                        : "text-[#3D2716] border border-[#D8BFAE]/50 hover:border-[#3D2716]"
                    }`}
                  >
                    {type}
                  </button>
                ))}

                <div className="hidden md:block w-px h-8 bg-[#D8BFAE]/30 mx-2"></div>

                {locations.length > 1 && (
                  <>
                    <span className="font-lejour text-[10px] text-[#917C63] uppercase tracking-[0.2em] self-center mr-2">Area</span>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        data-testid={`button-filter-location-${loc.toLowerCase().replace(/\s/g, "-")}`}
                        className={`px-4 py-2 font-inria text-xs uppercase tracking-widest transition-all ${
                          selectedLocation === loc
                            ? "bg-[#424D38] text-[#FAF8F5]"
                            : "text-[#3D2716] border border-[#D8BFAE]/50 hover:border-[#424D38]"
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </>
                )}
              </div>

              {scrolledPastHero && (
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="self-start md:self-center p-2 text-[#917C63] hover:text-[#3D2716] transition-colors"
                  data-testid="button-close-filters"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-[#D8BFAE] border-t-[#3D2716] animate-spin mb-4"></div>
            <p className="font-inria text-[#917C63] text-lg">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-symphony text-3xl text-[#3D2716] mb-4">No Properties Found</p>
            <p className="font-inria text-[#917C63] mb-8">Try adjusting your filters to see more results.</p>
            <Link href="/buy" className="bg-[#3D2716] text-[#FAF8F5] px-8 py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#995134] transition-colors" data-testid="link-view-all">
              View All Properties
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <p className="font-inria text-sm text-[#917C63]" data-testid="text-results-count">
                {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div key={property.id} className="group" data-testid={`card-property-${property.id}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden bg-[#D8BFAE]/20 aspect-[4/3] mb-5">
                    <Link href={`/property/${property.id}`}>
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
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteMutation.mutate(property.id);
                      }}
                      data-testid={`button-favorite-${property.id}`}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-10 h-10 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart
                        size={18}
                        className={
                          favoritedIds.includes(property.id)
                            ? "fill-[#995134] text-[#995134]"
                            : "text-[#3D2716]"
                        }
                      />
                    </button>
                    <div className="absolute top-4 left-4 bg-[#3D2716]/90 text-[#FAF8F5] px-3 py-1.5 font-inria text-[10px] uppercase tracking-widest">
                      {property.type}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-12">
                      <p className="font-symphony text-3xl text-[#FAF8F5]" data-testid={`text-price-${property.id}`}>{property.price}</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-lejour text-lg text-[#3D2716] leading-tight uppercase tracking-wider">
                      <Link href={`/property/${property.id}`} className="hover:text-[#995134] transition-colors">
                        {property.title}
                      </Link>
                    </h3>
                    <div className="flex items-center space-x-1.5 text-[#917C63]">
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
                      <Link href={`/property/${property.id}`} className="flex-1 bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#424D38] transition-colors text-center" data-testid={`link-view-details-${property.id}`}>
                        View Details
                      </Link>
                      <button onClick={() => openContactModal({ type: "buy", propertyId: property.id, propertyTitle: property.title })} className="flex-1 border border-[#3D2716] text-[#3D2716] py-3 font-inria text-xs uppercase tracking-widest hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors" data-testid={`button-schedule-tour-${property.id}`}>
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

      {/* CTA */}
      <section className="py-24 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-lejour text-xs text-[#D8BFAE] uppercase tracking-[0.3em] mb-4">Private Advisory</p>
              <h2 className="font-symphony text-4xl md:text-5xl mb-6">
                Can't Find What<br />You're Looking For?
              </h2>
              <p className="font-inria text-lg text-[#FAF8F5]/70 mb-10 leading-relaxed">
                Our advisors have access to exclusive off-market properties and pre-launch projects not listed publicly. Share your criteria and let us find your perfect investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => openContactModal({ type: "buy" })} className="bg-[#995134] text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#D8BFAE] hover:text-[#3D2716] transition-colors" data-testid="button-schedule-consultation">
                  Schedule Consultation
                </button>
                <a href="tel:+97140000000" className="border border-[#FAF8F5]/30 text-[#FAF8F5] px-10 py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#FAF8F5] hover:text-[#3D2716] transition-colors text-center">
                  Call Us Directly
                </a>
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <p className="font-symphony text-8xl text-[#FAF8F5]/5">200+</p>
              <p className="font-inria text-[#FAF8F5]/40 uppercase tracking-widest text-sm -mt-4">Properties in Portfolio</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
