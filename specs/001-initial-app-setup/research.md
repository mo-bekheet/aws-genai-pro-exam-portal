# Research: Initial App Setup

## Decisions Made

### Framework Selection
- **Decision**: Next.js 15 with React 19
- **Rationale**: Constitution mandates React 19 + Next.js 15. App Router provides server components, streaming, and SSG capabilities ideal for this study portal.
- **Alternatives Considered**: None (constitution-required)

### Authentication
- **Decision**: Clerk with Google + GitHub OAuth
- **Rationale**: Constitution mandates Clerk. Provides 10,000 free MAU, lowest friction (social login only), and seamless integration with Next.js.
- **Alternatives Considered**: None (constitution-required)

### Database
- **Decision**: Supabase (PostgreSQL)
- **Rationale**: Constitution mandates Supabase. Free tier (500MB + 50k requests/month) sufficient for MVP. Provides realtime capabilities.
- **Alternatives Considered**: None (constitution-required)

### Styling
- **Decision**: Tailwind CSS + CSS Variables
- **Rationale**: Constitution mandates Tailwind. CSS Variables enable dark/light theming per constitution design system.
- **Alternatives Considered**: None (constitution-required)

### Animations
- **Decision**: Framer Motion
- **Rationale**: Constitution mandates Framer Motion. Required for flashcard 3D flip animation and page transitions.
- **Alternatives Considered**: None (constitution-required)

### State Management
- **Decision**: Zustand + React Context
- **Rationale**: Constitution mandates Zustand for lightweight client state (exam session, progress). React Context for theme/auth.
- **Alternatives Considered**: None (constitution-required)

### Content Delivery
- **Decision**: GitHub Raw Content (raw.githubusercontent.com)
- **Rationale**: Constitution mandates GitHub JSON/Markdown content. Zero backend, PR-merged content live immediately.
- **Alternatives Considered**: None (constitution-required)

### Deployment
- **Decision**: Vercel
- **Rationale**: Constitution mandates Vercel. Zero-config deployment, unlimited open source, seamless Next.js integration.
- **Alternatives Considered**: None (constitution-required)

## Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  Next.js    │────▶│  Supabase   │
│   (User)    │     │  (Vercel)  │     │  (DB)       │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Clerk     │
                    │   (Auth)    │
                    └─────────────┘
```

## Dependencies Summary

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js | 20.x |
| Framework | Next.js | 15.x |
| UI | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Animation | Framer Motion | 11.x |
| Auth | Clerk | 5.x |
| DB | Supabase | 2.x |
| State | Zustand | 5.x |
| Charts | Recharts | 2.x |
| Mind Maps | React Flow | 11.x |
| Icons | Phosphor React | 2.x |

## Open Questions

None - all technical decisions defined by constitution.
