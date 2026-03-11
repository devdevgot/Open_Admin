# Aviera Living — Luxury Real Estate Platform

## Overview
A luxury real estate multi-page website for "Aviera Living" — a Dubai boutique firm emphasizing legal precision, trust, and transparency. Editorial luxury aesthetic with sharp edges, warm earth tones, and serif typography.

## Architecture
- **Frontend**: React + TypeScript, Vite, Tailwind CSS v4, wouter routing, TanStack Query
- **Backend**: Express.js API with Drizzle ORM and PostgreSQL
- **Styling**: Custom fonts (Cinzel, Cormorant Garamond, Inria Serif), CSS variable design tokens

## Design System
- **Colors**: Cacao `#3D2716`, Forest `#424D38`, Stone `#D8BFAE`, Terra `#995134`, Sand `#917C63`, Pearl `#FAF8F5`
- **Fonts**: `Cinzel` (Symphony/display), `Cormorant Garamond` (Lejour/headers), `Inria Serif` (body)
- **Style**: Sharp edges (radius: 0), editorial luxury

## Routes
- `/` — Homepage (Hero, Founder, Services, Brand, Mission, Values, Agents, Client Experience)
- `/buy` — Property listings with type & location filtering via URL params
- `/property/:id` — Property detail page with gallery, features, amenities, agent contact

## API Endpoints
- `GET /api/properties` — List all properties (optional `?type=` filter)
- `GET /api/properties/:id` — Get single property
- `GET /api/favorites` — List favorites
- `POST /api/favorites` — Toggle favorite (body: `{ propertyId }`)

## Database Schema
- `properties` — id, title, description, price, location, beds, baths, area, type, yearBuilt, images[], features[], amenities (JSON string), agent info
- `favorites` — id, propertyId, createdAt

## Key Files
- `shared/schema.ts` — Drizzle schema + Zod validation
- `server/storage.ts` — Database storage interface with Drizzle queries
- `server/routes.ts` — Express API routes
- `client/src/components/Navbar.tsx` — Navigation with mega menu + subcategory routing
- `client/src/pages/Buy.tsx` — Property listing page with filtering
- `client/src/pages/PropertyDetail.tsx` — Property detail page
- `client/src/pages/Home.tsx` — Homepage with section IDs for anchor nav
- `client/src/index.css` — Tailwind v4 theme with CSS variables

## Navigation
- BUY subcategories link to `/buy?type=` or `/buy?location=` with proper filters
- ABOUT US subcategories scroll to corresponding sections on homepage using `id` anchors
- SELL/RENT link to placeholder pages (not yet built)

## Notes
- Tailwind v4: Uses `@theme inline` block in index.css; CSS variable colors use raw `H S% L%` format
- wouter Link: Use `className` directly on `<Link>`, not nested `<a>` inside
- Property amenities stored as JSON string, parsed on frontend
- 6 seed properties in database (3 Villas, 1 Penthouse, 2 Apartments)
