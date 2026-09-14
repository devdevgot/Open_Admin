# Open Admin

Open-source admin panel for managing content in web projects. Includes a React UI and Express API backed by PostgreSQL.

**Modules:** Properties, Blog, Inquiries, Team (agents), Newsletter subscribers.

## Quick Start (Standalone)

```bash
cp .env.example .env
# Set DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET, TOKEN_SECRET

npm install
npm run db:push
npm run dev
```

Open `http://localhost:5000/admin` and sign in with your `ADMIN_USERNAME` / `ADMIN_PASSWORD`.

## Integration Options

### 1. Full stack (default)

Run this repo as-is. The admin UI and API are served together. Your public website connects to the same database via its own API or directly.

### 2. Frontend only — connect to your backend

Build the admin UI and point it at an external API that implements the same contract:

```bash
VITE_APP_NAME="My Project Admin" \
VITE_API_BASE_URL="https://api.myproject.com" \
VITE_WEBSITE_URL="https://myproject.com" \
npm run build
```

Set `CORS_ORIGIN` on your backend to allow the admin UI origin.

Edit branding in `client/src/config/admin.ts` or via Vite env vars:

| Variable | Description |
|----------|-------------|
| `VITE_APP_NAME` | Admin panel title |
| `VITE_APP_TAGLINE` | Subtitle on login page |
| `VITE_WEBSITE_URL` | Link to public site in sidebar |
| `VITE_API_BASE_URL` | External API base URL (empty = same origin) |

### 3. Backend only — mount in your Express app

Copy `server/routes/admin.ts`, `server/middleware/adminAuth.ts`, `server/storage.ts`, and `shared/schema.ts` into your project. Mount the router:

```ts
import adminRouter from "./routes/admin";
app.use("/api/admin", adminRouter);
```

Implement public-facing endpoints in your app that read/write the same tables.

## API Contract

All admin endpoints are under `/api/admin`.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/login` | No | Returns `{ token }` |
| POST | `/logout` | Yes | Revoke session |
| GET | `/me` | Yes | Check auth |
| GET | `/stats` | Yes | Dashboard counts |
| GET/POST | `/properties` | Yes | List / create |
| PUT/DELETE | `/properties/:id` | Yes | Update / delete |
| GET/POST | `/blog` | Yes | List / create posts |
| PUT/DELETE | `/blog/:id` | Yes | Update / delete |
| GET | `/inquiries` | Yes | List inquiries |
| PATCH | `/inquiries/:id/status` | Yes | Update status |
| DELETE | `/inquiries/:id` | Yes | Delete |
| GET/POST | `/agents` | Yes | List / create team |
| PUT/DELETE | `/agents/:id` | Yes | Update / delete |
| GET | `/subscribers` | Yes | Newsletter list |
| POST | `/upload` | Yes | Image upload (returns base64 data URL) |

Auth: `Authorization: Bearer <token>` header or session cookie.

## Environment Variables

See `.env.example` for the full list.

## Database Schema

Defined in `shared/schema.ts`. Tables: `properties`, `blog_posts`, `inquiries`, `agents`, `newsletter_subscribers`, `favorites`.

```bash
npm run db:push   # apply schema to PostgreSQL
```

## Project Structure

```
client/src/
  components/admin/   # Admin layout
  components/ui/      # shadcn/ui components
  pages/admin/        # Admin pages
  config/admin.ts     # Branding & API config
server/
  routes/admin.ts     # Admin API
  storage.ts          # Database layer
shared/
  schema.ts           # Drizzle schema + Zod validators
```

## License

MIT — see [LICENSE](LICENSE).
