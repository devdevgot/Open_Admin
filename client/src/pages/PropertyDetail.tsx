import { useParams, Link } from "wouter";
import { Share2, Heart, MapPin, Check } from "lucide-react";
import { openContactModal } from "@/lib/contact";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import type { Property } from "@shared/schema";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const queryClient = useQueryClient();

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", id],
    queryFn: async () => {
      const res = await fetch(`/api/properties/${id}`);
      if (!res.ok) throw new Error("Property not found");
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

  const isFavorited = favoritesData.some((f) => f.propertyId === Number(id));

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

  const amenities = property?.amenities
    ? (() => {
        try {
          return JSON.parse(property.amenities);
        } catch {
          return [];
        }
      })()
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
          <p className="font-inria text-[#917C63] text-lg">Loading property...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
          <h1 className="font-symphony text-4xl text-[#3D2716] mb-4">Property Not Found</h1>
          <Link href="/buy" className="font-inria text-[#995134] uppercase tracking-widest hover:text-[#3D2716]" data-testid="link-return-listings">
              Return to Listings
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <div className="pt-24">
        <div className="container mx-auto px-6 lg:px-12 pb-4">
          <Link href="/buy" className="text-sm font-inria text-[#917C63] uppercase tracking-widest hover:text-[#3D2716] transition-colors inline-block mb-6" data-testid="link-back-listings">
              ← Back to Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 container mx-auto px-6 lg:px-12 pb-12">
          <div className="lg:col-span-3">
            <div className="aspect-video overflow-hidden bg-[#D8BFAE]/20">
              <img 
                src={property.images[selectedImage]} 
                alt={property.title}
                className="w-full h-full object-cover"
                data-testid="img-main-gallery"
              />
            </div>
          </div>

          <div className="lg:col-span-1 flex lg:flex-col gap-4">
            {property.images.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                data-testid={`button-thumbnail-${idx}`}
                className={`aspect-square overflow-hidden transition-all ${
                  selectedImage === idx ? "ring-2 ring-[#3D2716]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-[#D8BFAE]/30 pb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-[#424D38] text-[#FAF8F5] px-4 py-2 font-inria text-xs uppercase tracking-widest mb-6" data-testid="text-property-type">
                    {property.type}
                  </span>
                  <h1 className="font-symphony text-4xl md:text-5xl text-[#3D2716] mb-4" data-testid="text-property-title">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-2 text-[#917C63]">
                    <MapPin size={18} />
                    <span className="font-lejour text-xs uppercase tracking-wider" data-testid="text-property-location">{property.location}</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFavoriteMutation.mutate(property.id)}
                  className="p-3 hover:bg-[#D8BFAE]/20 transition-colors"
                  data-testid="button-favorite-detail"
                >
                  <Heart 
                    size={28} 
                    className={isFavorited ? "fill-[#995134] text-[#995134]" : "text-[#3D2716]"}
                  />
                </button>
              </div>

              <h2 className="font-lejour text-4xl text-[#3D2716] uppercase tracking-wider" data-testid="text-property-price">
                {property.price}
              </h2>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {[
                { label: "Bedrooms", value: property.beds },
                { label: "Bathrooms", value: property.baths },
                { label: "Size", value: property.area },
                { label: "Year", value: property.yearBuilt }
              ].map((detail) => (
                <div key={detail.label}>
                  <p className="font-lejour text-[#917C63] uppercase text-xs tracking-widest mb-2">
                    {detail.label}
                  </p>
                  <p className="font-symphony text-2xl text-[#3D2716]" data-testid={`text-detail-${detail.label.toLowerCase()}`}>
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D8BFAE]/30 pt-8">
              <h3 className="font-lejour text-2xl text-[#3D2716] mb-6 uppercase tracking-widest">
                Overview
              </h3>
              <p className="font-inria text-lg text-[#3D2716]/80 leading-relaxed mb-8" data-testid="text-property-description">
                {property.description}
              </p>
            </div>

            <div className="border-t border-[#D8BFAE]/30 pt-8">
              <h3 className="font-lejour text-2xl text-[#3D2716] mb-6 uppercase tracking-widest">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3" data-testid={`text-feature-${idx}`}>
                    <Check size={20} className="text-[#995134] flex-shrink-0 mt-1" />
                    <span className="font-inria text-[#3D2716]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {amenities.length > 0 && (
              <div className="border-t border-[#D8BFAE]/30 pt-8">
                <h3 className="font-lejour text-2xl text-[#3D2716] mb-8 uppercase tracking-widest">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {amenities.map((amenity: { icon: string; name: string; desc: string }, idx: number) => (
                    <div key={idx} className="text-center" data-testid={`amenity-${idx}`}>
                      <div className="text-4xl mb-3">{amenity.icon}</div>
                      <h4 className="font-lejour text-[#3D2716] mb-1">{amenity.name}</h4>
                      <p className="font-inria text-sm text-[#917C63]">{amenity.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 border border-[#D8BFAE]/30 sticky top-32 space-y-6">
              <h4 className="font-lejour text-xl text-[#3D2716] uppercase tracking-widest">
                Interested?
              </h4>
              
              <p className="font-inria text-sm text-[#3D2716]/70">
                Schedule a private viewing or get more information about this exceptional property.
              </p>

              <div className="space-y-3">
                <button onClick={() => openContactModal({ type: "buy", propertyId: property.id, propertyTitle: property.title })} className="w-full bg-[#424D38] text-[#FAF8F5] py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#3D2716] transition-colors" data-testid="button-schedule-viewing">
                  Schedule Tour
                </button>
                <button className="w-full border border-[#3D2716] text-[#3D2716] py-4 font-lejour uppercase tracking-widest text-sm hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors flex items-center justify-center space-x-2" data-testid="button-share">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>

              <div className="border-t border-[#D8BFAE]/30 pt-6 space-y-4">
                <div>
                  <p className="font-lejour text-xs text-[#917C63] uppercase tracking-widest mb-2">
                    Contact Agent
                  </p>
                  <p className="font-lejour text-xl text-[#3D2716]" data-testid="text-agent-name">{property.agentName}</p>
                  <p className="font-inria text-sm text-[#917C63]" data-testid="text-agent-title">{property.agentTitle}</p>
                </div>

                <div className="space-y-2">
                  <a href={`tel:${property.agentPhone}`} className="block font-inria text-[#995134] hover:text-[#3D2716]" data-testid="link-agent-phone">
                    {property.agentPhone}
                  </a>
                  <a href={`mailto:${property.agentEmail}`} className="block font-inria text-[#995134] hover:text-[#3D2716] break-all" data-testid="link-agent-email">
                    {property.agentEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-[#D8BFAE]/10 py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h3 className="font-symphony text-3xl md:text-4xl text-[#3D2716] mb-6">
            Explore More Properties
          </h3>
          <Link href="/buy" className="inline-block bg-[#424D38] text-[#FAF8F5] px-12 py-4 font-lejour uppercase tracking-widest hover:bg-[#3D2716] transition-colors" data-testid="link-explore-more">
              Back to Listings
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
