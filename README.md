⚽ Dinamo tbilisi FC — Platform

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
├── app/                              # Next.js App Router — pages and routes
│   ├── admin/                        # Admin panel (protected route)
│   │   ├── blogs/page.tsx            # Blog management page
│   │   ├── layout.tsx                # Admin layout wrapper
│   │   └── statistics/page.tsx       # Statistics dashboard page
│   ├── contact/page.tsx              # Contact page
│   ├── globals.css                   # Global Tailwind styles
│   ├── history/page.tsx              # Club history page
│   ├── layout.tsx                    # Root layout (navbar + footer wrap)
│   ├── live/page.tsx                 # Live match page
│   ├── login/page.tsx                # Login page
│   ├── news/page.tsx                 # News listing page
│   ├── page.tsx                      # Homepage
│   ├── player/[id]/page.tsx          # Player detail page (dynamic route)
│   ├── profile/page.tsx              # User profile page
│   ├── register/page.tsx             # Registration page
│   ├── robots.ts                     # robots.txt generator
│   ├── sitemap.ts                    # sitemap.xml generator
│   ├── stats/page.tsx                # Statistics page
│   ├── table/page.tsx                # League standings page
│   ├── team/page.tsx                 # Squad page
│   └── titles/page.tsx               # Club titles/trophies page
│
├── components/                       # Shared/reusable UI components
│   ├── shared/
│   │   ├── footer/
│   │   │   ├── ColumnHeading.tsx     # Footer column title
│   │   │   ├── footer.constants.ts   # Static footer data (links, socials)
│   │   │   ├── FooterBottom.tsx      # Copyright bar
│   │   │   ├── FooterBrand.tsx       # Logo + tagline block
│   │   │   ├── FooterLinks.tsx       # Link columns
│   │   │   ├── FooterSponsors.tsx    # Sponsor logos (consumes sponsors feature)
│   │   │   └── SocialIcon.tsx        # Single social icon button
│   │   ├── Footer.tsx                # Footer root component
│   │   ├── navbar/
│   │   │   ├── components/           # AuthAction, DesktopNav, Logo, MobileNav, etc.
│   │   │   ├── navbar-links.ts       # Nav menu items
│   │   │   ├── navbar.tsx            # Navbar root component
│   │   │   └── notifications/        # Bell button, popup, notification service
│   │   ├── routes.tsx                # Shared route path constants
│   │   ├── useScrollDirection.tsx    # Hook for hiding navbar on scroll
│   │   └── wrapper.tsx               # Layout wrapper with max-width
│   └── ui/                           # Base UI primitives (shadcn)
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── select.tsx                # shadcn Select — H2H dropdown-ისთვის ✨
│
├── features/                         # Feature-based modules
│   ├── admin/
│   │   ├── api/blogs.ts              # Blog CRUD requests
│   │   ├── blogs/view/               # Blog management view
│   │   ├── components/               # AdminGuard, AdminSidebar
│   │   ├── lib/auth.context.tsx      # Admin auth context provider
│   │   ├── statistics/view/          # Statistics dashboard view
│   │   └── types/admin.types.ts
│   │
│   ├── auth/
│   │   ├── api/auth.ts               # Login/register requests
│   │   ├── config/registration-context.ts
│   │   ├── forgot-password/          # components + schema
│   │   ├── login/                    # components + schema
│   │   ├── register/                 # components + schema + types
│   │   └── routes.ts                 # auth-specific route paths
│   │
│   ├── contact/
│   │   ├── api/contact.ts            # Submit contact form
│   │   ├── components/               # ContactForm, HQCard, StadiumMap, view
│   │   ├── hooks/useContactForm.ts
│   │   ├── schema/contact.schema.ts  # Zod validation
│   │   ├── store/contact.store.ts    # Zustand store
│   │   └── types/contact.types.ts
│   │
│   ├── history/
│   │   ├── components/               # HistoryCard, HistoryHero, view
│   │   ├── services/history.service.ts  # Backend call (Playwright scraper result)
│   │   ├── types/history.types.ts
│   │   └── utils/history.utils.ts
│   │
│   ├── home/
│   │   ├── components/
│   │   │   ├── hero/                 # HeroBackground, HeroBadge, HeroContent, HeroImage
│   │   │   ├── league-overview/      # leaders/, standings/, SectionHeading
│   │   │   ├── news/                 # FeaturedCard, SideCard
│   │   │   ├── next-match/           # next-match.utils, useCountdown
│   │   │   └── view/                 # Hero, LeagueOverview, NewsSection, NextMatch
│   │   ├── hooks/useHeroImages.ts
│   │   ├── services/                 # next-match, scorers, standings
│   │   └── types/                    # next-match, scorers, standings, topPlayer
│   │
│   ├── live/
│   │   ├── components/view/LiveView.tsx
│   │   ├── services/live.service.ts
│   │   └── types/live.types.ts
│   │
│   ├── news/
│   │   ├── components/               # NewsCard, NewsGrid, NewsHero, NewsSearch, view
│   │   ├── services/news.service.ts  # cheerio scraper, 30min cache
│   │   └── types/news.types.ts
│   │
│   ├── player/
│   │   ├── api/data.ts
│   │   ├── components/               # CareerTable, LastMatches, PlayerHero, PlayerSidebar,
│   │   │                             # SeasonStats, Transfers, ui/, view/
│   │   ├── hooks/usePlayer.ts
│   │   └── types/player.types.ts
│   │
│   ├── profile/
│   │   ├── components/               # LoyaltySection, PaymentMethodsCard, PersonalInfoCard,
│   │   │                             # ProfileHeader, StatsSection, TicketsSection, view
│   │   ├── services/profile.service.ts
│   │   └── types/types.ts
│   │
│   ├── sponsors/
│   │   ├── services/sponsors.service.ts  # no components — consumed by Footer
│   │   └── types/sponsors.types.ts
│   │
│   ├── squad/
│   │   ├── components/               # PlayerCard, PositionGroup, SquadHeader, view
│   │   ├── services/squad.service.ts
│   │   └── types/squad.types.ts
│   │
│   ├── stats/                        # Statistics feature module
│   │   ├── components/
│   │   │   ├── HeadToHead.tsx        # H2H comparator — shadcn Select + count-up animation
│   │   │   ├── OnThisDay.tsx         # დღის ისტორიული მატჩები DB-დან
│   │   │   ├── SeasonProgress.tsx    # სეზონის progress bars — scroll-triggered animation
│   │   │   └── view/
│   │   │       └── StatsView.tsx     # server props → client layout, Wrapper
│   │   ├── hooks/
│   │   │   ├── useCountUp.ts         # animated number count-up (requestAnimationFrame)
│   │   │   ├── useH2H.ts             # H2H fetch hook
│   │   │   └── useInView.ts          # IntersectionObserver — scroll-triggered animations
│   │   ├── services/
│   │   │   └── stats.service.ts      # getSeasonProgress, getOpponents, getH2H, getOnThisDay
│   │   └── types/
│   │       └── stats.types.ts        # SeasonProgress, H2HData, H2HResult, OnThisDayMatch
│   │
│   ├── table/
│   │   ├── components/               # StandingsTable, TopScorers, TopScorersSection, view
│   │   └── types/standings.types.ts
│   │
│   └── titles/
│       ├── components/               # TitleCard, TitleFeatured, TitlesGrid, TitlesHero,
│       │                             # TitlesStats, view
│       ├── services/titles.service.ts   # Playwright scraper
│       ├── types/titles.types.ts
│       └── utils/titles.utils.ts
│
└── lib/                               # Utility functions and shared logic
    ├── routes.ts                      # Route path constants
    ├── api.ts                         # Base API client
    ├── identity-auth.ts               # Identity/session authentication helpers
    ├── jwt-payload.ts                 # JWT token decoder
    └── utils.ts                       # General utility functions (cn, etc.)
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

| Method | Endpoint                       | Description                        |
| ------ | ------------------------------ | ---------------------------------- |
| GET    | `/api/players`                 | Squad list                         |
| GET    | `/api/players/:id`             | Single player detail               |
| GET    | `/api/news`                    | Latest Dinamo news                 |
| GET    | `/api/standings`               | League standings                   |
| GET    | `/api/standings/scorers`       | Top scorers, assists, appearances  |
| GET    | `/api/fixtures`                | Upcoming fixtures                  |
| GET    | `/api/live`                    | Live YouTube stream detection      |
| GET    | `/api/history`                 | Club history (Playwright scraper)  |
| GET    | `/api/titles`                  | Club titles (Playwright scraper)   |
| GET    | `/api/stats/season-progress`   | Realtime season standings          |
| GET    | `/api/stats/h2h/opponents`     | Dynamic opponent list from DB      |
| GET    | `/api/stats/h2h?opponent=X`    | H2H record vs opponent             |
| GET    | `/api/stats/on-this-day`       | Historical matches on today's date |
| POST   | `/api/contact`                 | Contact form submission            |


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
| Titles            | dinamo.ge/club/titles                    | axios + cheerio |

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
