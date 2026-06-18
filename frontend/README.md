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

**URL:** ...

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
│   │   ├── blogs/               # Blog management page
│   │   └── statistics/          # Statistics dashboard page
│   ├── contact/                  # Contact page
│   ├── history/                  # Club history page
│   ├── live/                     # Live stream page
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
│   │   ├── footer/              # Footer sub-components (brand, links, sponsors, bottom)
│   │   ├── navbar/              # Navbar with scroll-hide behavior and notifications
│   │   │   └── notifications/   # Bell button, popup and notification items
│   │   ├── Footer.tsx           # Footer root component
│   │   ├── wrapper.tsx          # Layout wrapper with max-width constraint
│   │   ├── routes.tsx           # Shared route path constants
│   │   └── useScrollDirection   # Hook — hides navbar on scroll down
│   └── ui/                      # Base UI primitives (button, form, input, label)
│
├── features/                     # Feature-based modules (each owns its components, services, types)
│   ├── admin/                    # Admin panel — blogs view, sidebar, auth guard, auth context
│   ├── auth/                     # Authentication — login, register, forgot password (forms + schemas)
│   ├── contact/                  # Contact page — form, map, HQ card, Zustand store
│   ├── history/                  # Club history — view component and fetch service
│   ├── home/                     # Homepage — hero slideshow, standings, news section, next match countdown
│   │   ├── components/hero/     # Hero image slideshow with player info overlay
│   │   ├── components/league-overview/ # Standings table + season leaders side by side
│   │   ├── components/news/     # Featured and side news cards
│   │   └── components/next-match/ # Next fixture countdown timer
│   ├── live/                     # Live stream page — YouTube embed with polling
│   ├── news/                     # News page — grid, search, hero, cards
│   ├── player/                   # Player detail — hero, career table, stats, transfers, sidebar
│   ├── profile/                  # Fan profile — loyalty XP, tickets, payments, personal info
│   ├── sponsors/                 # Sponsors — fetch from backend and display in footer
│   ├── squad/                    # Squad listing — position groups and player cards
│   └── table/                    # Standings page — table and top scorers section
│
└── lib/                          # Shared utilities and helpers
    ├── api.ts                    # Base API client with auth headers
    ├── identity-auth.ts          # Session user fetching from profiles service
    ├── jwt-payload.ts            # JWT token decoder utility
    └── utils.ts                  # General helpers (cn for Tailwind class merging)
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
