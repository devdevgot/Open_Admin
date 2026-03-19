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

## Public Routes
- `/` — Homepage
- `/buy` — Property listings with filtering
- `/property/:id` — Property detail page
- `/sell`, `/rent`, `/rent/*` — Rental section
- `/about`, `/about/*` — About Us pages
- `/blog` — Blog listing
- `/blog/:id` — Blog post with sticky TOC

## Admin Panel
- **URL**: `/admin` (requires login)
- **Login**: `/admin/login`
- **Credentials**: username `admin`, password `Aviera2026!`
- **Env vars**: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`
- **Pages**: Dashboard, Inquiries, Properties, Blog, Team (Agents)
- **Auth**: express-session with MemoryStore

### Admin API Endpoints (`/api/admin/*`)
- `POST /api/admin/login` — Session login
- `POST /api/admin/logout` — Logout
- `GET /api/admin/me` — Auth check
- `GET /api/admin/stats` — Dashboard counts
- `POST /api/admin/upload` — Image upload to `/uploads/`
- `GET|POST|PUT|DELETE /api/admin/properties/:id?`
- `GET|POST|PUT|DELETE /api/admin/blog/:id?`
- `GET|PATCH|DELETE /api/admin/inquiries/:id?`
- `GET|POST|PUT|DELETE /api/admin/agents/:id?`
- `GET /api/admin/subscribers`

### Public API Endpoints
- `GET /api/properties` — List (optional filters: type, listingType, beds, community, status, priceMin, priceMax)
- `GET /api/properties/:id` — Single property
- `GET|POST /api/favorites` — Toggle favorites
- `GET /api/blog` — Blog posts (optional: category, featured, limit, offset)
- `GET /api/blog/:id` — Single post (by ID or slug), auto-increments views
- `POST /api/inquiries` — Submit inquiry
- `POST /api/newsletter` — Subscribe
- `GET /api/agents` — List agents

## Database Schema (6 tables)
- `properties` — id, title, description, price, priceValue, location, community, beds, baths, area, type, listingType, status, featured, yearBuilt, images[], features[], amenities, agentName, agentTitle, agentPhone, agentEmail
- `favorites` — id, propertyId, createdAt
- `blog_posts` — id, slug, title, subtitle, category, authorName, authorRole, authorImage, heroImage, excerpt, content (JSON sections), readTime, featured, views, publishedAt
- `inquiries` — id, name, email, phone, type, message, propertyId, status, createdAt
- `newsletter_subscribers` — id, email, subscribedAt
- `agents` — id, name, role, phone, email, image, bio, specialties[], languages[], transactions, yearsExperience, sortOrder

## Key Files
- `shared/schema.ts` — Drizzle schema + Zod validation
- `server/storage.ts` — Full CRUD storage interface
- `server/routes.ts` — Route mounting
- `server/routes/admin.ts` — All admin CRUD routes
- `server/middleware/adminAuth.ts` — Auth middleware + session type
- `server/index.ts` — Express app setup (session, uploads, vite)
- `client/src/App.tsx` — All frontend routes including admin
- `client/src/components/admin/AdminLayout.tsx` — Sidebar with auth check
- `client/src/pages/admin/` — All admin pages

## Notes
- Tailwind v4: Uses `@theme inline` block in index.css; CSS variable colors use raw `H S% L%` format
- wouter Link: Use `className` directly on `<Link>`, not nested `<a>` inside
- Blog content stored as JSON string of `{id, title, content}[]` sections
- Uploaded images served from `/uploads/` static directory (multer, 10MB limit)
- Admin session is cookie-based (24h), stored in MemoryStore
