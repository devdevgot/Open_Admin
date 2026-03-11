import { useState } from "react";
import { Link } from "wouter";
import { Heart, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const properties = [
  {
    id: 1,
    title: "Palm Jumeirah Luxury Villa",
    price: "18.5M AED",
    location: "Palm Jumeirah",
    beds: 5,
    baths: 6,
    area: "8,200 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    type: "Villa"
  },
  {
    id: 2,
    title: "Downtown Dubai Penthouse",
    price: "12.3M AED",
    location: "Downtown Dubai",
    beds: 4,
    baths: 5,
    area: "5,500 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    type: "Penthouse"
  },
  {
    id: 3,
    title: "Dubai Marina Waterfront",
    price: "8.9M AED",
    location: "Dubai Marina",
    beds: 3,
    baths: 4,
    area: "4,100 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    type: "Apartment"
  },
  {
    id: 4,
    title: "Emirates Hills Contemporary",
    price: "15.7M AED",
    location: "Emirates Hills",
    beds: 5,
    baths: 6,
    area: "7,800 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    type: "Villa"
  },
  {
    id: 5,
    title: "Business Bay Modern Residence",
    price: "6.2M AED",
    location: "Business Bay",
    beds: 3,
    baths: 3,
    area: "3,200 sqft",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    type: "Apartment"
  },
  {
    id: 6,
    title: "Beachfront Luxury Estate",
    price: "22.4M AED",
    location: "Al Wasl",
    beds: 6,
    baths: 7,
    area: "9,500 sqft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    type: "Villa"
  }
];

export default function Buy() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProperties = selectedType === "All" 
    ? properties 
    : properties.filter(p => p.type === selectedType);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

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
            {["All", "Villa", "Penthouse", "Apartment"].map(type => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.map((property) => (
            <div key={property.id} className="group cursor-pointer">
              {/* Card Image */}
              <div className="relative overflow-hidden bg-[#D8BFAE]/20 aspect-[4/3] mb-6">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 hover:bg-white transition-colors"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(property.id) ? "fill-[#995134] text-[#995134]" : "text-[#3D2716]"}
                  />
                </button>

                {/* Type Badge */}
                <div className="absolute top-4 left-4 bg-[#3D2716] text-[#FAF8F5] px-4 py-2 font-inria text-xs uppercase tracking-widest">
                  {property.type}
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-4 group-hover:opacity-90 transition-opacity">
                {/* Price */}
                <h3 className="font-symphony text-3xl text-[#3D2716]">
                  {property.price}
                </h3>

                {/* Title */}
                <h4 className="font-lejour text-xl text-[#3D2716] leading-tight">
                  {property.title}
                </h4>

                {/* Location */}
                <div className="flex items-center space-x-2 text-[#917C63]">
                  <MapPin size={16} />
                  <span className="font-inria text-sm">{property.location}</span>
                </div>

                {/* Details Grid */}
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

                {/* CTA Buttons */}
                <div className="flex gap-4 pt-6">
                  <button className="flex-1 bg-[#3D2716] text-[#FAF8F5] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#995134] transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 border border-[#3D2716] text-[#3D2716] py-3 font-inria text-sm uppercase tracking-widest hover:bg-[#3D2716] hover:text-[#FAF8F5] transition-colors">
                    Schedule Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-[#3D2716] text-[#FAF8F5]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-symphony text-4xl md:text-5xl mb-6">
            Need Expert Guidance?
          </h2>
          <p className="font-inria text-lg text-[#FAF8F5]/80 mb-12 max-w-2xl mx-auto">
            Our advisors are ready to discuss your investment objectives and identify opportunities aligned with your strategy.
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
