# FixItNow — Frontend

Customer-facing web app and role-based dashboards for FixItNow, a home services marketplace. Built with Next.js (App Router) and TypeScript.

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, CSS variable-based theming with dark mode (`next-themes`)
- **Data fetching:** Next.js Server Actions + Server Components (`serverFetch` wrapper)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Animation:** Framer Motion
- **State:** Zustand (where needed), React state for local UI
- **File uploads:** Cloudinary (signed direct upload from the browser)
- **Notifications:** Sonner (toast)

## Features

- **Public site** — landing page (hero, categories, services, testimonials, blog highlights, FAQ, CTA), service listing with search/filter/sort/pagination, service detail pages, technician browsing, blog, contact/help/privacy/terms pages
- **Auth** — email/password registration with OTP verification, login, Google sign-in
- **Customer dashboard** — overview with charts (spending trend, booking status), bookings, payments (with filtering, pagination, and a full payment detail page), profile, password change
- **Technician dashboard** — service management (with image uploads), booking management, availability, profile
- **Admin dashboard** — user management, booking oversight, category management, analytics (real charts), blog management (create/edit/delete posts), settings
- **Dark mode** — site-wide theme toggle

## Project Structure

```
app/
  (home)/                  # landing page sections
  (public)/                # services, technicians, blog, static pages
  (auth)/                  # login, register, OTP verification
  (dashboard)/
    dashboard/
      customer/             # customer dashboard pages
      technician/            # technician dashboard pages
      admin/                # admin dashboard pages
    _components/             # shared dashboard UI (sidebar, navbar, charts, tables)
    config/                  # sidebar menu config per role

components/
  shared/                   # Navbar, image uploaders, search bar
  ui/                       # shadcn/ui primitives

lib/
  api/                      # server actions per resource (auth, service, booking, payment, blog, admin, upload, stats, review)
  validations/               # Zod schemas
  type.ts                   # shared TypeScript types

hooks/
  useCloudinaryUpload.ts     # client upload hook
  getMe.ts                  # current user fetch + profile update action
```

## Getting Started

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000` by default.

## Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

> `NEXT_PUBLIC_GOOGLE_CLIENT_ID` must match the backend's `GOOGLE_CLIENT_ID` — it's exposed to the browser intentionally (Google Client IDs are not secret; the secret verification happens server-side).

For Google sign-in to work, add your dev and production origins to **Authorized JavaScript origins** in the Google Cloud Console OAuth client settings (e.g. `http://localhost:3000` and your deployed domain).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |

## Notes

- Images (avatars, blog covers, service photos) upload directly from the browser to Cloudinary using a signed request issued by the backend — the backend never handles raw file bytes.
- All admin and role-specific dashboard routes are protected server-side; the layout redirects unauthenticated users to `/login`.
