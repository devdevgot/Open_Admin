import { drizzle } from "drizzle-orm/node-postgres";
import { properties, blogPosts, agents } from "@shared/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("Seeding database...");

  // ─── Properties ─────────────────────────────────────────────────────────────

  const existingProps = await db.select().from(properties);
  if (existingProps.length === 0) {
    await db.insert(properties).values([
      {
        title: "Skyline Penthouse — Palm Jumeirah",
        description: "A full-floor penthouse perched above the iconic Palm crescent, offering 360° views of the Arabian Gulf and Dubai skyline. Designed by Studio Anise with custom Italian marble and bespoke joinery throughout.",
        price: "AED 28,500,000",
        priceValue: 28500000,
        location: "Palm Jumeirah, Dubai",
        community: "Palm Jumeirah",
        beds: 5, baths: 6, area: "7,200 sqft",
        type: "Penthouse", listingType: "buy", status: "available", featured: true,
        yearBuilt: 2022,
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&h=800&fit=crop",
        ],
        features: ["Private pool", "Home cinema", "Staff quarters", "Private elevator", "Smart home"],
        amenities: "Concierge, Valet, Beach club, Spa, Fitness centre",
        agentName: "James Carrington", agentTitle: "Senior Sales Director",
        agentPhone: "+971 50 123 4567", agentEmail: "james@avieraliving.com",
      },
      {
        title: "Garden Villa — Emirates Hills",
        description: "A supremely private gated villa set within a double plot in the most prestigious enclave of Emirates Hills. Designed by an award-winning architect, finished to a standard that rivals the finest addresses in London and Geneva.",
        price: "AED 52,000,000",
        priceValue: 52000000,
        location: "Emirates Hills, Dubai",
        community: "Emirates Hills",
        beds: 7, baths: 8, area: "14,500 sqft",
        type: "Villa", listingType: "buy", status: "available", featured: true,
        yearBuilt: 2020,
        images: [
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
        ],
        features: ["Infinity pool", "Tennis court", "Guest house", "Wine cellar", "Home gym", "Cinema room"],
        amenities: "24/7 security, Dedicated parking, Landscaped gardens",
        agentName: "Sophia Al Nour", agentTitle: "Founder & Managing Director",
        agentPhone: "+971 50 987 6543", agentEmail: "sophia@avieraliving.com",
      },
      {
        title: "Downtown Residence — Burj Khalifa District",
        description: "An ultra-refined three-bedroom apartment in the heart of Downtown Dubai, with direct views of the Burj Khalifa and Dubai Fountain. Recently refurbished with contemporary detailing and premium European fixtures.",
        price: "AED 8,750,000",
        priceValue: 8750000,
        location: "Downtown Dubai",
        community: "Downtown Dubai",
        beds: 3, baths: 4, area: "3,100 sqft",
        type: "Apartment", listingType: "buy", status: "available", featured: false,
        yearBuilt: 2019,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        ],
        features: ["Burj Khalifa view", "Fountain view", "Full renovation", "Smart home"],
        amenities: "Concierge, Pool, Gym, Direct mall access",
        agentName: "Layla Hassan", agentTitle: "Luxury Residential Specialist",
        agentPhone: "+971 50 456 7890", agentEmail: "layla@avieraliving.com",
      },
      {
        title: "Waterfront Apartment — Dubai Marina",
        description: "A beautifully appointed two-bedroom apartment on a high floor in Dubai Marina with unobstructed sea views. Ideal for long-term tenants seeking a prestigious address with world-class amenities.",
        price: "AED 240,000 / year",
        priceValue: 240000,
        location: "Dubai Marina",
        community: "Dubai Marina",
        beds: 2, baths: 3, area: "1,650 sqft",
        type: "Apartment", listingType: "rent", status: "available", featured: true,
        yearBuilt: 2021,
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop",
        ],
        features: ["Sea view", "High floor", "Fully furnished", "New appliances"],
        amenities: "Infinity pool, Gym, Concierge, Valet parking",
        agentName: "Priya Sharma", agentTitle: "Rental & Yield Specialist",
        agentPhone: "+971 50 234 5678", agentEmail: "priya@avieraliving.com",
      },
      {
        title: "Heritage Villa — Al Barari",
        description: "A rare four-bedroom villa within Al Barari's lush botanical setting. Surrounded by landscaped gardens and natural waterways, this property offers absolute tranquillity just minutes from the city.",
        price: "AED 380,000 / year",
        priceValue: 380000,
        location: "Al Barari, Dubai",
        community: "Al Barari",
        beds: 4, baths: 5, area: "5,800 sqft",
        type: "Villa", listingType: "rent", status: "available", featured: false,
        yearBuilt: 2018,
        images: [
          "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop",
        ],
        features: ["Private garden", "Private pool", "Botanical surroundings", "Maid's room"],
        amenities: "Community pool, Restaurant, Spa, Fitness centre",
        agentName: "Marcus Webb", agentTitle: "Legal & Compliance Lead",
        agentPhone: "+971 50 345 6789", agentEmail: "marcus.w@avieraliving.com",
      },
      {
        title: "Luxury Suite — DIFC",
        description: "A premium short-term suite in the heart of DIFC, perfect for business travellers and executives on extended stays. Fully serviced with hotel-grade amenities and a dedicated concierge.",
        price: "AED 35,000 / month",
        priceValue: 35000,
        location: "DIFC, Dubai",
        community: "DIFC",
        beds: 1, baths: 2, area: "980 sqft",
        type: "Apartment", listingType: "short-term", status: "available", featured: false,
        yearBuilt: 2023,
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=800&fit=crop",
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop",
        ],
        features: ["Fully serviced", "Business lounge access", "High-speed internet", "Daily housekeeping"],
        amenities: "Hotel concierge, Restaurant, Rooftop pool, Spa",
        agentName: "Andrei Volkov", agentTitle: "Investment Portfolio Advisor",
        agentPhone: "+971 50 678 9012", agentEmail: "andrei@avieraliving.com",
      },
    ]);
    console.log("✓ Properties seeded");
  } else {
    console.log("— Properties already seeded, skipping");
  }

  // ─── Blog Posts ─────────────────────────────────────────────────────────────

  const existingPosts = await db.select().from(blogPosts);
  if (existingPosts.length === 0) {
    await db.insert(blogPosts).values([
      {
        slug: "dubai-prime-prices-q1-2026",
        title: "Dubai Prime Residential Prices Rise 18% in Q1 2026: What Buyers Need to Know",
        subtitle: "The latest DLD transaction data reveals sustained momentum in Dubai's luxury segment. We break down what this means for buyers and investors entering the market today.",
        category: "Market Insights",
        authorName: "Sophia Al Nour",
        authorRole: "Founder & Managing Director",
        authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=600&fit=crop",
        excerpt: "The latest DLD transaction data reveals sustained momentum in Dubai's luxury segment, with Palm Jumeirah and Emirates Hills leading price appreciation.",
        readTime: "7 min read",
        featured: true,
        views: 4821,
        content: JSON.stringify([
          {
            id: "overview", title: "Market Overview",
            content: "Dubai's prime residential market recorded an 18% year-on-year price increase in Q1 2026, according to the latest data from the Dubai Land Department. This marks the sixth consecutive quarter of sustained growth in the luxury segment.\n\nTransactions in the AED 5M+ bracket rose by 23% compared to the same period last year, with off-plan sales comprising 61% of total volume.",
          },
          {
            id: "top-performers", title: "Top Performing Areas",
            content: "Palm Jumeirah led all communities with an average price appreciation of 24%, followed by Emirates Hills at 21% and Downtown Dubai at 17%. The data reflects a broad-based trend rather than isolated pockets of demand.\n\nNoteworthy is the performance of newer communities such as Sobha Hartland and Dubai Hills Estate, both recording growth exceeding 19%.",
          },
          {
            id: "buyer-profile", title: "Who Is Buying",
            content: "The composition of buyers has shifted meaningfully in the past 18 months. European buyers — particularly from the UK, France, and Germany — now represent the fastest-growing nationality cohort.\n\nInvestor-led purchases account for approximately 44% of transactions, with the majority targeting buy-to-let assets in Dubai Marina, JBR, and Business Bay.",
          },
          {
            id: "legal-considerations", title: "Legal Considerations for Buyers",
            content: "With competition intensifying, buyers are under pressure to move quickly — a dynamic that increases legal risk. Key areas to verify before committing: developer escrow compliance, title encumbrances, payment plan structure, handover date enforceability, and resale restrictions.",
          },
          {
            id: "outlook", title: "2026 Outlook",
            content: "Forward indicators remain broadly positive. The pipeline of new luxury supply in Palm Jumeirah, Downtown, and Emirates Hills is limited by land availability, which should support prices in the near term.\n\nThe pace of appreciation is likely to moderate through Q3 and Q4 as affordability constraints begin to cap the upper end of demand.",
          },
          {
            id: "aviera-view", title: "The Aviera View",
            content: "Our advisory position has not changed: we do not recommend buying on sentiment or momentum alone. Every acquisition we advise on is stress-tested against rental yield, resale liquidity, legal title quality, and developer track record.",
          },
        ]),
      },
      {
        slug: "off-plan-contracts-guide",
        title: "The Complete Guide to Off-Plan Contracts in Dubai: What Every Buyer Must Verify",
        subtitle: "Off-plan purchases offer compelling returns — but they carry risks that too many buyers discover only after signing. Our legal team outlines what every SPA must contain.",
        category: "Legal Guide",
        authorName: "Marcus Webb",
        authorRole: "Legal & Compliance Lead",
        authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&h=600&fit=crop",
        excerpt: "Off-plan purchases offer compelling returns — but they carry risks that too many buyers discover only after signing. Our legal team outlines the ten clauses every SPA must contain.",
        readTime: "12 min read",
        featured: false,
        views: 3214,
        content: JSON.stringify([
          {
            id: "what-is-offplan", title: "What Is Off-Plan?",
            content: "Off-plan refers to purchasing a property before it is completed — typically directly from a developer. The buyer pays in instalments tied to construction milestones, with final handover upon practical completion.\n\nThis model is prevalent in Dubai and accounts for over 60% of all residential transactions in 2025.",
          },
          {
            id: "spa-essentials", title: "SPA Essentials",
            content: "The Sales Purchase Agreement (SPA) is the binding contract between buyer and developer. Before signing, verify: the precise unit specifications including floor plan and finish schedule, the payment schedule tied to specific milestones, and the handover date with consequences for developer delay.",
          },
          {
            id: "escrow-oqood", title: "Escrow & Oqood Registration",
            content: "Under Dubai Law No. 8 of 2007, all off-plan developers must deposit buyer payments into a RERA-registered escrow account, used exclusively for project construction.\n\nOqood (Arabic for contracts) is the mandatory pre-registration system for off-plan sales. Ensure your contract is registered — it protects your ownership rights.",
          },
          {
            id: "red-flags", title: "Red Flags to Watch",
            content: "Be cautious if: the developer cannot provide a valid escrow registration number, the payment plan is front-loaded with over 40% due before groundbreaking, the SPA lacks a specific handover date, or the project has no visible construction activity.",
          },
        ]),
      },
      {
        slug: "buy-to-let-honest-numbers",
        title: "Buy-to-Let in Dubai: Gross Yield vs Net Yield — The Numbers Developers Don't Show You",
        subtitle: "A 7% gross yield sounds attractive. But once service charges, DEWA deposits, and vacancy periods are accounted for, what is the real return?",
        category: "Investor Tips",
        authorName: "Priya Sharma",
        authorRole: "Rental & Yield Specialist",
        authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1400&h=600&fit=crop",
        excerpt: "A 7% gross yield sounds attractive. But once service charges, DEWA deposits, agency fees and vacancy periods are accounted for, what is the real return? We do the honest maths.",
        readTime: "9 min read",
        featured: false,
        views: 2780,
        content: JSON.stringify([
          {
            id: "gross-vs-net", title: "Gross vs Net Yield",
            content: "Gross yield is calculated as annual rent divided by purchase price. Net yield deducts all costs: service charges, DEWA deposit, agency management fees (typically 5–8%), maintenance, and vacancy periods.\n\nOn a typical Dubai Marina apartment with a 7% advertised gross yield, net yield after costs typically lands between 4.2% and 5.1%.",
          },
          {
            id: "hidden-costs", title: "The Hidden Costs",
            content: "Buyers consistently underestimate the following: Annual service charges (AED 12–35 per sqft depending on community), DEWA security deposit (refundable but tied up), agency management fee, minor maintenance costs averaging AED 8,000–15,000 per year, and vacancy of 4–8 weeks between tenancies.",
          },
          {
            id: "best-areas", title: "Best Areas for Net Yield",
            content: "Based on our 2025 rental data: Business Bay delivers 5.5–6.2% net, Dubai Silicon Oasis 5.8–6.5% net, Jumeirah Village Circle 5.2–5.9% net. Luxury communities (Palm, Emirates Hills) typically yield 3–4% net but offer capital appreciation upside.",
          },
        ]),
      },
      {
        slug: "emirates-hills-vs-palm-jumeirah",
        title: "Emirates Hills vs Palm Jumeirah: Which Is Right for You in 2026?",
        subtitle: "Two icons of Dubai luxury living — but profoundly different in character, community, lifestyle, and investment profile.",
        category: "Neighbourhood",
        authorName: "Layla Hassan",
        authorRole: "Luxury Residential Specialist",
        authorImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1400&h=600&fit=crop",
        excerpt: "Two icons of Dubai luxury living — but profoundly different in character, community, lifestyle, and investment profile. Our neighbourhood guide compares them honestly.",
        readTime: "10 min read",
        featured: false,
        views: 1950,
        content: JSON.stringify([
          {
            id: "character", title: "Character & Community",
            content: "Emirates Hills is Dubai's most private residential enclave — a gated community modelled loosely on Beverly Hills, where discretion is paramount. Residents are predominantly families and long-term UAE residents. Palm Jumeirah by contrast is more cosmopolitan, with a transient international population and a vibrant social scene.",
          },
          {
            id: "price-comparison", title: "Price Comparison",
            content: "Emirates Hills villas currently trade between AED 35M and AED 120M+ for larger plots. Palm Jumeirah offers a wider range: from AED 4M for signature apartments to AED 100M+ for beachfront villas and penthouses. Both command significant premiums over the wider market.",
          },
          {
            id: "investment-profile", title: "Investment Profile",
            content: "Emirates Hills has limited resale liquidity — transactions are rare, and when they occur, they are negotiated privately. Palm Jumeirah is far more liquid, with a deep market of both buyers and tenants. For pure investment, Palm offers better liquidity; for lifestyle and legacy, Emirates Hills is unmatched.",
          },
        ]),
      },
      {
        slug: "ejari-guide-tenants-landlords",
        title: "Ejari Registration in Dubai: A Step-by-Step Guide for Tenants and Landlords",
        subtitle: "Every tenancy in Dubai must be registered through Ejari. Yet many tenants still don't understand the process — or why skipping it leaves them legally exposed.",
        category: "Legal Guide",
        authorName: "Marcus Webb",
        authorRole: "Legal & Compliance Lead",
        authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&h=600&fit=crop",
        excerpt: "Every tenancy in Dubai must be registered through Ejari. Yet many tenants still don't understand the process — or why skipping it leaves them legally exposed.",
        readTime: "6 min read",
        featured: false,
        views: 3456,
        content: JSON.stringify([
          {
            id: "what-is-ejari", title: "What Is Ejari?",
            content: "Ejari (Arabic for 'my rent') is the mandatory tenancy registration system administered by RERA (Real Estate Regulatory Agency). It creates an official record of all tenancy contracts in Dubai and is required for DEWA connection, residency visa renewals, and dispute resolution.",
          },
          {
            id: "registration-process", title: "The Registration Process",
            content: "Step 1: Gather documents — signed tenancy contract, landlord passport/Emirates ID, tenant passport/Emirates ID, property title deed. Step 2: Register via the Ejari app, DLD website, or authorised typing centres. Step 3: Pay the registration fee (AED 220 online or AED 365 at typing centres). Step 4: Receive your Ejari certificate.",
          },
          {
            id: "why-it-matters", title: "Why It Matters",
            content: "Without Ejari registration: you cannot connect DEWA utilities in your name, you lose standing in RERA rent dispute tribunals, your landlord can claim no binding tenancy exists, and residency visa renewals linked to the property become impossible. Registration protects both parties.",
          },
        ]),
      },
      {
        slug: "branded-residences-dubai",
        title: "The Rise of Branded Residences in Dubai: Investment Opportunity or Marketing Premium?",
        subtitle: "From Armani to Four Seasons, branded residences command a 30–50% price premium. We examine whether that premium is justified — and when it isn't.",
        category: "Market Insights",
        authorName: "James Carrington",
        authorRole: "Senior Sales Director",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&h=600&fit=crop",
        excerpt: "From Armani to Four Seasons, branded residences command a 30–50% price premium over comparable non-branded units. We examine whether that premium is justified — and when it isn't.",
        readTime: "8 min read",
        featured: false,
        views: 2341,
        content: JSON.stringify([
          {
            id: "the-premium", title: "The Brand Premium",
            content: "Branded residences in Dubai carry an average 35% premium over comparable non-branded units in the same area. This premium is driven by perceived quality assurance, hotel services, and the reputational cache of the associated brand.\n\nThe key question is whether this premium is sustained at resale — and the evidence is mixed.",
          },
          {
            id: "where-it-works", title: "Where the Premium Is Justified",
            content: "Established luxury hotel brands (Four Seasons, Armani, Bulgari) have demonstrated price resilience and consistent resale premiums. These brands enforce strict quality standards and provide ongoing hotel-grade services that genuinely differentiate the ownership experience.",
          },
          {
            id: "where-it-fails", title: "Where It Doesn't Hold",
            content: "Lesser-known brand affiliations — lifestyle brands, regional hotel chains — often fail to sustain premiums at resale. Buyers who paid a 40% premium discover that the market values the property on its physical merits, not its branding. Conduct brand-specific transaction research before committing.",
          },
        ]),
      },
      {
        slug: "property-investment-non-resident",
        title: "How to Structure Your Dubai Property Investment as a Non-Resident",
        subtitle: "The optimal ownership structure depends heavily on your tax residency, estate planning needs, and exit strategy.",
        category: "Investor Tips",
        authorName: "Andrei Volkov",
        authorRole: "Investment Portfolio Advisor",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=600&fit=crop",
        excerpt: "Foreign nationals own billions in Dubai real estate. But the optimal ownership structure depends heavily on your tax residency, estate planning needs, and exit strategy.",
        readTime: "11 min read",
        featured: false,
        views: 1876,
        content: JSON.stringify([
          {
            id: "ownership-structures", title: "Ownership Structures",
            content: "Non-residents typically choose between three structures: personal name (simplest, most common), UAE mainland company (offers operational flexibility), or offshore holding company (Cayman, BVI, Channel Islands — used for estate planning and multi-asset portfolio management).\n\nEach has distinct tax, succession, and liquidity implications depending on your jurisdiction.",
          },
          {
            id: "personal-name", title: "Personal Name Ownership",
            content: "The majority of non-resident buyers hold property in their personal name. This is the simplest approach: no company administration costs, straightforward mortgage eligibility, and easy resale. The downside is estate law exposure — UAE succession law may apply to UAE-situated assets.",
          },
          {
            id: "offshore-structure", title: "Offshore Holding Structures",
            content: "An offshore holding company (typically BVI or Cayman) can own the Dubai property, making the asset subject to the laws of the holding jurisdiction rather than UAE. This is favoured for estate planning, privacy, and multi-generational wealth transfer.\n\nCosts are higher (USD 3,000–8,000 annually to maintain) and DLD transfer fees still apply.",
          },
        ]),
      },
      {
        slug: "living-in-downtown-dubai",
        title: "Living in Downtown Dubai: An Honest Resident's Perspective After Two Years",
        subtitle: "Downtown Dubai is one of the world's most photographed postcodes. But what is it actually like to live there?",
        category: "Lifestyle",
        authorName: "Layla Hassan",
        authorRole: "Luxury Residential Specialist",
        authorImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&h=600&fit=crop",
        excerpt: "Downtown Dubai is one of the world's most photographed postcodes. But what is it actually like to live there? Our resident client shares what the listing brochures never mention.",
        readTime: "7 min read",
        featured: false,
        views: 4102,
        content: JSON.stringify([
          {
            id: "the-reality", title: "The Reality of Downtown Living",
            content: "Downtown Dubai is spectacular to visit and genuinely impressive to live in — with important caveats. The Burj Khalifa view never gets old. The walkability to Dubai Mall, restaurants, and the metro is excellent. But the area is dense, tourist footfall on weekends is intense, and noise levels can be significant during peak season.",
          },
          {
            id: "what-works", title: "What Works Well",
            content: "The infrastructure is excellent: road access, the metro, grocery delivery, and restaurant options are all outstanding. Security is high. The concierge services in premium buildings are comparable to a five-star hotel. For professionals without children, Downtown is arguably the best all-round address in Dubai.",
          },
          {
            id: "what-doesnt", title: "What Doesn't Work",
            content: "School options within walking distance are limited — families typically drive to schools 10–20 minutes away. Green space is scarce. Weekend tourist congestion around the Fountain and Mall can be genuinely frustrating for residents. Service charges are among the highest in the city at AED 25–40 per sqft annually.",
          },
        ]),
      },
      {
        slug: "business-bay-residential-transformation",
        title: "Business Bay in 2026: Still a Business District, or Dubai's Most Undervalued Residential Quarter?",
        subtitle: "Five years ago, Business Bay was where people worked. Today it is increasingly where Dubai's most design-conscious residents choose to live.",
        category: "Neighbourhood",
        authorName: "James Carrington",
        authorRole: "Senior Sales Director",
        authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&h=600&fit=crop",
        excerpt: "Five years ago, Business Bay was where people worked. Today it is increasingly where Dubai's most design-conscious residents choose to live. We examine the transformation.",
        readTime: "8 min read",
        featured: false,
        views: 1643,
        content: JSON.stringify([
          {
            id: "the-shift", title: "The Residential Shift",
            content: "Business Bay has undergone a genuine transformation. The canal-front promenade, a proliferation of independent restaurants and cafes, and a wave of architecturally ambitious residential towers have turned a predominantly commercial district into one of the most dynamic places to live in Dubai.\n\nAverage rents have risen 31% since 2023 — outpacing even Downtown.",
          },
          {
            id: "who-lives-here", title: "Who Lives Here Now",
            content: "The new Business Bay resident skews younger, design-conscious, and professionally senior. Creative industries, finance, and technology professionals are the dominant cohort. The area attracts residents who want Downtown proximity without the tourist intensity.",
          },
          {
            id: "investment-case", title: "The Investment Case",
            content: "Business Bay currently offers yields of 5.5–6.5% net — among the highest for canal-front property in Dubai. The area still trades at a meaningful discount to Downtown on a per-sqft basis despite similar (and in some cases superior) lifestyle amenities. We consider it undervalued relative to its trajectory.",
          },
        ]),
      },
    ]);
    console.log("✓ Blog posts seeded");
  } else {
    console.log("— Blog posts already seeded, skipping");
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
