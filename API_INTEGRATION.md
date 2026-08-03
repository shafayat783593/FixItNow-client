# API Integration Map — FixItNow Client

| Frontend Component | Backend Endpoint |
|---|---|
| `Services.tsx` (Home) | `GET /api/services` |
| `/services` (Browse) | `GET /api/services` |
| `/services` (Browse) | `GET /api/technician` |
| `/services` (Browse) | `GET /api/categories` |
| `/technicians/[id]` | `GET /api/technician/:id` |
| `RegisterForm.tsx` | `POST /api/auth/register` |
| Login form | `POST /api/auth/login` |
| `/dashboard/customer` | `GET /api/bookings` |
| `/dashboard/customer` | `GET /api/payments` |
| `/dashboard/customer` (stats) | `GET /api/bookings/dashboard/stats` |
| `/dashboard/customer/bookings/[id]/pay` | `POST /api/payments/checkout` |
| Booking flow (slot picker) | `GET /api/technician/:id/available-slots` |
| Booking flow (submit) | `POST /api/bookings` |
| Booking cancel button | `PATCH /api/bookings/:id/cancel` |
| Review form | `POST /api/reviews` |
| Review delete | `DELETE /api/reviews/:id` |
| `/dashboard/technician` (stats) | `GET /api/technician/stats` |
| `/dashboard/technician` (availability) | `GET /api/technician/availability` |
| `/dashboard/technician` (availability) | `PUT /api/technician/availability` |
| `/dashboard/technician/bookings` | `GET /api/technician/bookings` |
| `/dashboard/technician/bookings` (actions) | `PATCH /api/technician/bookings/:id` |
| Technician profile form | `PATCH /api/technician` |
| Technician services list | `GET /api/services/my-services` |
| Service create form | `POST /api/services` |
| Service edit form | `PATCH /api/services/:id` |
| Service delete button | `DELETE /api/technician/:id` |
| `/dashboard/admin` (users) | `GET /api/admin/users` |
| `/dashboard/admin` (bookings) | `GET /api/admin/bookings` |
| `/dashboard/admin` (stats) | `GET /api/admin/stats` |
| User table (ban/unban) | `PUT /api/admin/users/:id` |
| `/dashboard/admin/categories` | `GET /api/categories` |
| `/dashboard/admin/categories` (create) | `POST /api/admin/categories` |
| `/dashboard/admin/categories` (edit) | `PUT /api/admin/categories/:id` |
| `/dashboard/admin/categories` (delete) | `DELETE /api/admin/categories/:id` |