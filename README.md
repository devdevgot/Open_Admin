# Connect Admin

Open-source headless CMS admin panel. Run it standalone or connect it to any frontend project via REST API.

**Stack:** React · Express · PostgreSQL · Drizzle ORM · Tailwind CSS

## Features

- Admin UI with auth (session + bearer token)
- Configurable modules: Catalog, Blog, Inquiries, Team, Newsletter
- Public REST API for connected frontends (headless CMS + form submissions)
- CORS support for cross-origin frontends
- Image upload (base64 inline storage)
- Environment-based configuration — no code changes needed

## Quick Start (from GitHub)

```bash
git clone https://github.com/devdevgot/aviera_living.git connect-admin
cd connect-admin
npm install
npm run setup          # creates .env with secure credentials
# Edit .env — set DATABASE_URL
npm run db:push        # create database tables
npm run dev            # http://localhost:5000/admin
```

Default login after `npm run setup`: username `admin`, password printed in terminal.

## Connect to Your Project

Connect Admin runs as a separate service. Your frontend calls its public API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/properties` | GET | List catalog items |
| `/api/properties/:id` | GET | Single item |
| `/api/blog` | GET | List blog posts |
| `/api/blog/:slugOrId` | GET | Single post |
| `/api/agents` | GET | Team members |
| `/api/inquiries` | POST | Submit contact form |
| `/api/newsletter` | POST | Subscribe to newsletter |

### Example: submit inquiry from your site

```javascript
await fetch("https://admin.yourdomain.com/api/inquiries", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1234567890",
    type: "general",
    message: "Hello!",
  }),
});
```

### Example: fetch blog posts (headless CMS)

```javascript
const posts = await fetch("https://admin.yourdomain.com/api/blog?limit=10")
  .then(r => r.json());
```

Set `ADMIN_CORS_ORIGINS` in `.env` to your frontend domain(s).

## Configuration

All settings via environment variables (see `.env.example`):

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin credentials |
| `ADMIN_APP_NAME` | Brand name in admin UI |
| `ADMIN_WEBSITE_URL` | Link to your public site (sidebar) |
| `ADMIN_CORS_ORIGINS` | Allowed origins for public API |
| `ADMIN_MODULE_*` | Enable/disable modules and rename labels |

Or edit `admin.config.ts` directly for advanced customization.

## Admin API

All admin endpoints require authentication (`POST /api/admin/login`):

```
POST   /api/admin/login
GET    /api/admin/me
GET    /api/admin/config
GET    /api/admin/stats
POST   /api/admin/upload
GET|POST|PUT|DELETE  /api/admin/properties/:id?
GET|POST|PUT|DELETE  /api/admin/blog/:id?
GET|PATCH|DELETE     /api/admin/inquiries/:id?
GET|POST|PUT|DELETE  /api/admin/agents/:id?
GET                  /api/admin/subscribers
```

Use the returned bearer token in `Authorization: Bearer <token>` header.

## Production

```bash
npm run build
NODE_ENV=production npm start
```

Deploy to any Node.js host (Railway, Render, Fly.io, VPS). Set all env vars from `.env.example`.

## Project Structure

```
connect-admin/
├── admin.config.ts      # App & module configuration
├── client/              # React admin UI
├── server/              # Express API
│   ├── routes/admin.ts  # Protected admin CRUD
│   └── routes/public.ts # Public API for connected frontends
├── shared/schema.ts     # Database schema (Drizzle + Zod)
└── script/setup.ts      # One-command setup
```

## License

MIT — see [LICENSE](LICENSE)
