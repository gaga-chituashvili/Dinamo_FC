⚽ Dinamo tbilisi FC — Fan Platform

Official fan platform for Dinamo tbilisi FC. Real-time statistics, news, and league standings scraped dynamically from erovnuliliga.ge.

---

## 🏗️ Architecture

```
DinamoFC/
├── frontend/ # Next.js 15 + TypeScript + Tailwind CSS
└── backend/ # NestJS + PostgreSQL (Neon) + Fly.io
```


---

## 🖥️ Frontend

**Stack:** Next.js 15, TypeScript, Tailwind CSS, Zustand

**URL:** https://dinamo-fc.vercel.app

### Setup

```bash
cd frontend
pnpm install
pnpm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://dinamofc.fly.dev
```

### Structure

```
src/
├── app/                          # Next.js App Router — pages and routes
│   ├── admin/                    # Admin panel (protected route)
│   │   ├── blogs/               # Blog management
│   │   └── statistics/          # Statistics dashboard
│   ├── contact/                  # Contact page
│   ├── history/                  # Club history page
│   ├── login/                    # Login page
│   ├── news/                     # News listing page
│   ├── player/[id]/             # Player detail page (dynamic route)
│   ├── profile/                  # User profile page
│   ├── register/                 # Registration page
│   ├── table/                    # League standings page
│   └── team/                     # Squad page
│
├── components/                   # Shared/reusable UI components
│   ├── shared/
│   │   ├── footer/              # Footer sub-components (brand, links, sponsors)
│   │   ├── navbar/              # Navbar with notifications
│   │   ├── Footer.tsx           # Footer root component
│   │   ├── wrapper.tsx          # Layout wrapper with max-width
│   │   ├── routes.tsx           # Shared route constants
│   │   └── useScrollDirection   # Hook for hiding navbar on scroll
│   └── ui/                      # Base UI primitives (button, form, input, label)
│
├── features/                     # Feature-based modules
│   ├── admin/                    # Admin panel logic, guards, sidebar
│   ├── auth/                     # Login, register, forgot password (forms + schemas)
│   ├── contact/                  # Contact form, map, HQ card
│   ├── history/                  # Club history view and service
│   ├── home/                     # Homepage sections (hero, standings, news, next match)
│   ├── news/                     # News page components and service
│   ├── player/                   # Player detail page (career, stats, transfers)
│   ├── profile/                  # Fan profile (loyalty, tickets, payments)
│   ├── sponsors/                 # Sponsors fetching and display
│   ├── squad/                    # Squad listing with position groups
│   └── table/                    # Standings table and top scorers
│
└── lib/                          # Utility functions and shared logic
    ├── api.ts                    # Base API client
    ├── identity-auth.ts          # Identity/session authentication helpers
    ├── jwt-payload.ts            # JWT token decoder
    └── utils.ts                  # General utility functions (cn, etc.)
```

---

## ⚙️ Backend

**Stack:** NestJS, TypeORM, PostgreSQL (Neon), Axios, Cheerio, Playwright, Resend

**URL:** https://dinamofc.fly.dev

### Setup

```bash
cd backend
pnpm install
pnpm run start:dev
```

### API Endpoints

| Method | Endpoint                 | Description                       |
| ------ | ------------------------ | --------------------------------- |
| GET    | `/api/players`           | Squad list                        |
| GET    | `/api/players/fixtures`  | Upcoming fixtures                 |
| GET    | `/api/players/standings` | League standings                  |
| GET    | `/api/players/scorers`   | Top scorers, assists, appearances |
| GET    | `/api/players/news`      | Latest news                       |
| GET    | `/api/players/history`   | Club history                      |
| GET    | `/api/players/:id`       | Single player detail              |
| POST   | `/api/contact`           | Contact form submission           |

### Caching

All scraping endpoints use 5-minute in-memory cache. News returns the first page synchronously while remaining pages load in the background via async void IIFE.

### Deploy

```bash
fly deploy
```

---

## 🔄 Data Sources

| Data              | Source                                   | Method          |
| ----------------- | ---------------------------------------- | --------------- |
| League standings  | erovnuliliga.ge/ge/tables                | axios + cheerio |
| Upcoming fixtures | erovnuliliga.ge/ge/club/torpedo/calendar | axios + cheerio |
| Top scorers       | erovnuliliga.ge/ge/stats                 | axios + cheerio |
| News              | erovnuliliga.ge/ge/news                  | axios + cheerio |
| Club history      | dinamo.ge/ka/page/history                | axios + cheerio |

---

## 🚀 Deployment

| Service  | Platform        | Branch      |
| -------- | --------------- | ----------- |
| Frontend | Vercel          | development |
| Backend  | Fly.io          | development |
| Database | Neon PostgreSQL | —           |

---

## 👤 Authentication

JWT-based auth with access and refresh tokens. State managed via Zustand `useAuthStore`. Tokens stored in cookies with silent refresh on 401.
