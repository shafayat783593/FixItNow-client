# FixItNow — Home Service Marketplace (Frontend)

A Next.js frontend for a home services marketplace. Customers book vetted technicians for plumbing, electrical, cooling, and cleaning; technicians manage their own availability and jobs; admins moderate the platform. This is a **frontend-only** app that consumes a separately-built backend API.

---

## Tech Stack

- **Framework:** Next.js (App Router, Server Components + Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui, themed via CSS variables (light/dark mode support built in — see `globals.css`)
- **State/data fetching:** Server-side `serverFetch` wrapper with `next.tags` for on-demand revalidation
- **Notifications:** `sonner` (toast) — used consistently instead of native `alert()`/`confirm()`
- **Payments:** Stripe Checkout (SSLCommerz UI present, backend integration not yet implemented)
- **Icons:** lucide-react

---

## Roles & Access

| Role | Can do |
|---|---|
| **Customer** | Browse services/technicians, book a time slot, pay via Stripe, track booking status, cancel eligible bookings, leave reviews |
| **Technician** | Set up profile & services, manage availability calendar, accept/decline/complete bookings, view earnings |
| **Admin** | Manage users (ban/unban), view all bookings, manage service categories, view platform stats |

Role is selected at registration. Route protection is expected via Next.js Middleware (confirm this is wired — not verified in this document).

---

---

## Theming

All UI uses CSS variable tokens defined in `globals.css` (`--background`, `--foreground`, `--accent`, `--primary`, `--muted`, `--destructive`, `--success`, etc.), not hardcoded Tailwind colors. This means:

- Every component automatically supports light/dark mode via the `.dark` class
- Brand color is **amber/accent**, not the coral/slate seen in some early scaffolding — if you find components still using `coral-*` or hardcoded `slate-*`, they haven't been migrated to the theme system yet and will look inconsistent, especially in dark mode

---

## Payment Flow

Stripe Checkout is used. Because the backend controls the redirect URLs directly, there are **no standalone `/payment/success` or `/payment/cancel` pages** — despite some spec documents suggesting that pattern. Instead:

- **Success** → redirects to `/dashboard/customer/payments/success?bookingId=${booking.id}` (banner shown inline on the booking detail page)
- **Cancel** → redirects to `/dashboard/customer/payments/cancle?bookingId=${booking.id}` (warning shown inline on the pay page)

Booking status updates are driven by a Stripe **webhook** (`checkout.session.completed`), which is asynchronous and separate from the browser redirect — see Known Issues below for the race condition this creates.

---

## Known Issues / Unresolved

These were identified during development and are documented here rather than silently fixed or hidden, so they don't get lost:

1. **Webhook race condition (payment status).** The success banner can show before the webhook has actually updated `booking.status` to `PAID` in the database, since the redirect and the webhook are two independent async signals. Currently mitigated with a "may take a few moments" disclaimer; a proper fix needs client-side polling or a revalidation trigger tied to webhook completion.
2. **`deleteServiceAction` hits the wrong endpoint.** It calls `DELETE /api/technician/:id` instead of `/api/services/:id`, inconsistent with the rest of the service CRUD actions. Needs backend confirmation — could delete the wrong resource entirely.
3. **`POST /api/auth/login` not confirmed to exist** in the current codebase. Registration is implemented; login was never shown/verified. This blocks the entire authenticated flow if missing.
4. **Return shape inconsistency across server actions.** Some functions return the raw `res` envelope, others unwrap to `res.data`, and a few defensively do `res.data ?? res`. Not a bug per se, but a real source of `undefined` errors if a component assumes the wrong shape. Worth standardizing.
5. **SSLCommerz payment option is selectable in the UI but not functionally wired** — selecting it shows a "coming soon" toast rather than failing silently, but it's still a dead end in the checkout flow if a grader/user picks it expecting it to work.
6. **Stripe webhook requires raw request body**, not JSON-parsed. If `express.json()` is registered globally before the webhook route, signature verification will fail silently. Confirm route-specific raw body middleware is in place ahead of the webhook route.
7. **Review data doesn't include reviewer identity.** `getTechnicianById` returns reviews with only `customerId` (no name/avatar), so the UI currently shows "Verified Customer" as a placeholder rather than the actual reviewer's name. Needs a backend include on the reviews relation if real names are wanted.
8. **Duplicate `getAllCategoriesAction` definitions** with different signatures exist in the codebase — only one can be valid; needs deduplication before this compiles reliably in all contexts.

---

## Environment Variables (expected, not confirmed complete)

```
BACKEND_API_URL= https://fixitnow-api.vercel.app
NEXT_PUBLIC_APP_URL=
```

This list is almost certainly incomplete — Stripe publishable key, any auth secret shared with the frontend, and image host allowlist entries (`next.config.js` `images.remotePatterns`) will also be needed. Fill in against your actual `.env.example` rather than trusting this list as exhaustive, since I don't have visibility into your full env setup.

---

## Getting Started

```bash
npm install
npm run dev
```

Requires the backend API running separately and reachable at `BACKEND_API_URL`. For local Stripe webhook testing, use the Stripe CLI:

```bash
stripe listen --forward-to localhost:PORT/api/payments/webhook
```

Without this, webhook-driven status updates (payment confirmation) will never fire in local development, even if the checkout itself succeeds.