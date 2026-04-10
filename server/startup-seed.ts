import { drizzle } from "drizzle-orm/node-postgres";
import { properties } from "@shared/schema";
import { seedBlogArticles } from "./seeds/blog-articles.js";

const db = drizzle(process.env.DATABASE_URL!);

export async function runStartupSeed() {
  try {
    // ─── Properties ──────────────────────────────────────────────────────────
    const existing = await db.select().from(properties);
    if (existing.length === 0) {
      await db.insert(properties).values([
        {
          title: "Skyline Penthouse — Palm Jumeirah",
          description:
            "A full-floor penthouse perched above the iconic Palm crescent, offering 360° views of the Arabian Gulf and Dubai skyline. Designed by Studio Anise with custom Italian marble and bespoke joinery throughout.",
          price: "AED 28,500,000",
          priceValue: 28500000,
          location: "Palm Jumeirah, Dubai",
          community: "Palm Jumeirah",
          beds: 5,
          baths: 6,
          area: "7,200 sqft",
          type: "Penthouse",
          listingType: "buy",
          status: "available",
          featured: true,
          yearBuilt: 2022,
          images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop",
          ],
          features: ["Private pool", "Home cinema", "Staff quarters", "Private elevator", "Smart home"],
          amenities: "Concierge, Valet, Beach club, Spa, Fitness centre",
          agentName: "James Carrington",
          agentTitle: "Senior Sales Director",
          agentPhone: "+971 50 123 4567",
          agentEmail: "james@avieraliving.com",
        },
        {
          title: "Garden Villa — Emirates Hills",
          description:
            "A supremely private gated villa set within a double plot in the most prestigious enclave of Emirates Hills. Designed by an award-winning architect, finished to a standard that rivals the finest addresses in London and Geneva.",
          price: "AED 52,000,000",
          priceValue: 52000000,
          location: "Emirates Hills, Dubai",
          community: "Emirates Hills",
          beds: 7,
          baths: 8,
          area: "14,500 sqft",
          type: "Villa",
          listingType: "buy",
          status: "available",
          featured: true,
          yearBuilt: 2020,
          images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
          ],
          features: ["Infinity pool", "Tennis court", "Guest house", "Wine cellar", "Home gym", "Cinema room"],
          amenities: "24/7 security, Dedicated parking, Landscaped gardens",
          agentName: "Sophia Al Nour",
          agentTitle: "Founder & Managing Director",
          agentPhone: "+971 50 987 6543",
          agentEmail: "sophia@avieraliving.com",
        },
        {
          title: "Downtown Residence — Burj Khalifa District",
          description:
            "An ultra-refined three-bedroom apartment in the heart of Downtown Dubai, with direct views of the Burj Khalifa and Dubai Fountain. Recently refurbished with contemporary detailing and premium European fixtures.",
          price: "AED 8,750,000",
          priceValue: 8750000,
          location: "Downtown Dubai",
          community: "Downtown Dubai",
          beds: 3,
          baths: 4,
          area: "3,100 sqft",
          type: "Apartment",
          listingType: "buy",
          status: "available",
          featured: false,
          yearBuilt: 2019,
          images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
          ],
          features: ["Burj Khalifa view", "Fountain view", "Full renovation", "Smart home"],
          amenities: "Concierge, Pool, Gym, Direct mall access",
          agentName: "Layla Hassan",
          agentTitle: "Luxury Residential Specialist",
          agentPhone: "+971 50 456 7890",
          agentEmail: "layla@avieraliving.com",
        },
        {
          title: "Waterfront Apartment — Dubai Marina",
          description:
            "A beautifully appointed two-bedroom apartment on a high floor in Dubai Marina with unobstructed sea views. Ideal for long-term tenants seeking a prestigious address with world-class amenities.",
          price: "AED 240,000 / year",
          priceValue: 240000,
          location: "Dubai Marina",
          community: "Dubai Marina",
          beds: 2,
          baths: 3,
          area: "1,650 sqft",
          type: "Apartment",
          listingType: "rent",
          status: "available",
          featured: true,
          yearBuilt: 2021,
          images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop",
          ],
          features: ["Sea view", "High floor", "Fully furnished", "New appliances"],
          amenities: "Infinity pool, Gym, Concierge, Valet parking",
          agentName: "Priya Sharma",
          agentTitle: "Rental & Yield Specialist",
          agentPhone: "+971 50 234 5678",
          agentEmail: "priya@avieraliving.com",
        },
        {
          title: "Heritage Villa — Al Barari",
          description:
            "A rare four-bedroom villa within Al Barari's lush botanical setting. Surrounded by landscaped gardens and natural waterways, this property offers absolute tranquillity just minutes from the city.",
          price: "AED 380,000 / year",
          priceValue: 380000,
          location: "Al Barari, Dubai",
          community: "Al Barari",
          beds: 4,
          baths: 5,
          area: "5,800 sqft",
          type: "Villa",
          listingType: "rent",
          status: "available",
          featured: false,
          yearBuilt: 2018,
          images: [
            "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop",
          ],
          features: ["Private garden", "Private pool", "Botanical surroundings", "Maid's room"],
          amenities: "Community pool, Restaurant, Spa, Fitness centre",
          agentName: "Marcus Webb",
          agentTitle: "Legal & Compliance Lead",
          agentPhone: "+971 50 345 6789",
          agentEmail: "marcus.w@avieraliving.com",
        },
        {
          title: "Luxury Suite — DIFC",
          description:
            "A premium short-term suite in the heart of DIFC, perfect for business travellers and executives on extended stays. Fully serviced with hotel-grade amenities and a dedicated concierge.",
          price: "AED 35,000 / month",
          priceValue: 35000,
          location: "DIFC, Dubai",
          community: "DIFC",
          beds: 1,
          baths: 2,
          area: "980 sqft",
          type: "Apartment",
          listingType: "short-term",
          status: "available",
          featured: false,
          yearBuilt: 2023,
          images: [
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop",
          ],
          features: ["Fully serviced", "Business lounge access", "High-speed internet", "Daily housekeeping"],
          amenities: "Hotel concierge, Restaurant, Rooftop pool, Spa",
          agentName: "Andrei Volkov",
          agentTitle: "Investment Portfolio Advisor",
          agentPhone: "+971 50 678 9012",
          agentEmail: "andrei@avieraliving.com",
        },
      ]);
      console.log("[seed] ✓ Properties seeded");
    }

    // ─── Blog articles ────────────────────────────────────────────────────────
    await seedBlogArticles();
  } catch (err) {
    console.error("[seed] Startup seed failed:", err);
  }
}
