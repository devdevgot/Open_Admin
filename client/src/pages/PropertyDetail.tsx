import { useParams, Link } from "wouter";
import { Share2, Heart, MapPin, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

// Mock property data - in a real app, this would come from an API
const propertyDatabase: Record<string, any> = {
  "1": {
    id: 1,
    title: "Palm Jumeirah Luxury Villa",
    price: "18.5M AED",
    location: "Palm Jumeirah",
    beds: 5,
    baths: 6,
    area: "8,200 sqft",
    type: "Villa",
    yearBuilt: 2021,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"
    ],
    description: "An exceptional waterfront villa showcasing sophisticated design and uncompromising luxury. This Palm Jumeirah masterpiece features floor-to-ceiling windows, private beach access, and state-of-the-art amenities.",
    features: [
      "Private beach access",
      "Infinity pool with ocean views",
      "Home cinema system",
      "Underground parking",
      "Smart home automation",
      "Wine cellar",
      "Spa and sauna",
      "Private elevator"
    ],
    amenities: [
      { icon: "🏊", name: "Swimming Pool", desc: "Heated infinity pool" },
      { icon: "🌳", name: "Garden", desc: "Lush landscaped grounds" },
      { icon: "🏋️", name: "Gym", desc: "Fully equipped fitness center" },
      { icon: "🍽️", name: "Chef's Kitchen", desc: "Premium appliances" },
      { icon: "🛁", name: "Spa", desc: "Luxury wellness space" },
      { icon: "🚗", name: "Garage", desc: "Multi-car parking" }
    ]
  },
  "2": {
    id: 2,
    title: "Downtown Dubai Penthouse",
    price: "12.3M AED",
    location: "Downtown Dubai",
    beds: 4,
    baths: 5,
    area: "5,500 sqft",
    type: "Penthouse",
    yearBuilt: 2022,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop"
    ],
    description: "Ultra-modern penthouse with iconic Burj Khalifa views. This corner unit offers panoramic vistas and curated finishes with premium European appliances.",
    features: [
      "Burj Khalifa views",
      "Terrace with hot tub",
      "Premium finishes",
      "Concierge service",
      "Maid's room",
      "Study",
      "Home office",
      "Italian marble flooring"
    ],
    amenities: [
      { icon: "👁️", name: "City Views", desc: "Iconic skyline vista" },
      { icon: "🌃", name: "Balcony", desc: "Private terrace space" },
      { icon: "🏛️", name: "Concierge", desc: "24/7 service" },
      { icon: "🔐", name: "Security", desc: "Advanced systems" },
      { icon: "🛗", name: "Private Lift", desc: "Direct access" },
      { icon: "💼", name: "Office", desc: "Home workspace" }
    ]
  }
};

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const property = propertyDatabase[id || "1"];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
          <h1 className="font-symphony text-4xl text-[#3D2716] mb-4">Property Not Found</h1>
          <Link href="/buy">
            <a className="font-inria text-[#995134] uppercase tracking-widest hover:text-[#3D2716]">
              Return to Listings
            </a>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Gallery Section */}
      <div className="pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 container mx-auto px-6 lg:px-12 pb-12">
          {/* Main Image */}
          <div className="lg:col-span-3">
            <div className="aspect-video overflow-hidden bg-[#D8BFAE]/20">
              <img 
                src={property.images[selectedImage]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Thumbnails */}
          <div className="lg:col-span-1 flex lg:flex-col gap-4">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
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

      {/* Content Section */}
      <div className="container mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="border-b border-[#D8BFAE]/30 pb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-[#3D2716] text-[#FAF8F5] px-4 py-2 font-inria text-xs uppercase tracking-widest mb-6">
                    {property.type}
                  </span>
                  <h1 className="font-symphony text-4xl md:text-5xl text-[#3D2716] mb-4">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-2 text-[#917C63]">
                    <MapPin size={18} />
                    <span className="font-inria">{property.location}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-3 hover:bg-[#D8BFAE]/20 transition-colors"
                >
                  <Heart 
                    size={28} 
                    className={isFavorited ? "fill-[#995134] text-[#995134]" : "text-[#3D2716]"}
                  />
                </button>
              </div>

              {/* Price */}
              <h2 className="font-symphony text-5xl text-[#3D2716]">
                {property.price}
              </h2>
            </div>

            {/* Key Details */}
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
                  <p className="font-symphony text-2xl text-[#3D2716]">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-[#D8BFAE]/30 pt-8">
              <h3 className="font-lejour text-2xl text-[#3D2716] mb-6 uppercase tracking-widest">
                Overview
              </h3>
              <p className="font-inria text-lg text-[#3D2716]/80 leading-relaxed mb-8">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="border-t border-[#D8BFAE]/30 pt-8">
              <h3 className="font-lejour text-2xl text-[#3D2716] mb-6 uppercase tracking-widest">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <Check size={20} className="text-[#995134] flex-shrink-0 mt-1" />
                    <span className="font-inria text-[#3D2716]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t border-[#D8BFAE]/30 pt-8">
              <h3 className="font-lejour text-2xl text-[#3D2716] mb-8 uppercase tracking-widest">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl mb-3">{amenity.icon}</div>
                    <h4 className="font-lejour text-[#3D2716] mb-1">{amenity.name}</h4>
                    <p className="font-inria text-sm text-[#917C63]">{amenity.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white p-8 border border-[#D8BFAE]/30 sticky top-32 space-y-6">
              <h4 className="font-lejour text-xl text-[#3D2716] uppercase tracking-widest">
                Interested?
              </h4>
              
              <p className="font-inria text-sm text-[#3D2716]/70">
                Schedule a private viewing or get more information about this exceptional property.
              </p>

              <div className="space-y-3">
                <button className="w-full bg-[#3D2716] text-[#FAF8F5] py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#995134] transition-colors">
                  Schedule Tour
                </button>
                <button className="w-full border border-[#3D2716] text-[#3D2716] py-4 font-inria uppercase tracking-widest text-sm hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors flex items-center justify-center space-x-2">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>

              <div className="border-t border-[#D8BFAE]/30 pt-6 space-y-4">
                <div>
                  <p className="font-lejour text-xs text-[#917C63] uppercase tracking-widest mb-2">
                    Contact Agent
                  </p>
                  <p className="font-lejour text-xl text-[#3D2716]">Marcus Thorne</p>
                  <p className="font-inria text-sm text-[#917C63]">Director of Private Office</p>
                </div>

                <div className="space-y-2">
                  <a href="tel:+97140000000" className="block font-inria text-[#995134] hover:text-[#3D2716]">
                    +971 4 000 0000
                  </a>
                  <a href="mailto:marcus@avieraliving.com" className="block font-inria text-[#995134] hover:text-[#3D2716] break-all">
                    marcus@avieraliving.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties CTA */}
      <section className="bg-[#D8BFAE]/10 py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h3 className="font-symphony text-3xl md:text-4xl text-[#3D2716] mb-6">
            Explore More Properties
          </h3>
          <Link href="/buy">
            <a className="inline-block bg-[#3D2716] text-[#FAF8F5] px-12 py-4 font-inria uppercase tracking-widest hover:bg-[#995134] transition-colors">
              Back to Listings
            </a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
