# AWS GenAI Pro Study Hub Constitution

## Core Principles

### I. Free Forever (NON-NEGOTIABLE)
The application must remain free indefinitely with no paywalls, premium tiers, or paid features. No credit card required for any functionality. All core study content (questions, flashcards, lessons, mock exams) must be accessible without payment.

### II. Open Source
The project uses MIT License. Users may fork, improve, and deploy their own instances. All content is贡献-based with clear contribution guidelines. Source code and content must remain publicly accessible.

### III. Auth from Day One
User authentication is required from initial deployment. Clerk handles Google and GitHub OAuth. Progress tracking, streaks, saved questions, and roadmap personalization depend on authenticated identity. No email/password fallback—social login only for lowest friction.

### IV. Community Supported
Voluntary support via Ko-fi. The support button appears subtly in the footer, never in study flows. No nag screens, no pressure, no gating. Contributor credits displayed on support page via GitHub API.

### V. Responsive Web First
The application works on all devices with mobile-readable layouts. Touch-friendly interactions (swipe gestures for flashcards). No native mobile apps unless community explicitly requests them.

### VI. Content Grows Continuously
Application ships first; content added via GitHub PRs. Zero backend knowledge required to contribute. JSON and Markdown-based content workflows. PR merged = content live (via raw.githubusercontent.com).

### VII. Fun Learning First
Lessons use interactive HTML templates—not walls of text. Animated concept reveals, click-to-explore diagrams, inline knowledge checks, AWS architecture walkthroughs with hover states. The learning experience should feel genuinely engaging.

### VIII. Easy Contribution
JSON + Markdown PRs, zero backend knowledge needed. Clear templates for questions, flashcards, and lessons. Every question requires a distractor breakdown. Every lesson requires knowledge check and exam tip. Contribution docs must be beginner-friendly.

## Technology Stack

### Framework & Runtime
- **React 19** with App Router for modern React patterns
- **Next.js 15** for server components, streaming, and SSG
- **TypeScript** for type safety across all components
- **Vercel** for zero-config deployment

### UI & Styling
- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming (dark/light/auto)
- **Framer Motion** for animations (flashcard flip, transitions, confetti)
- **Phosphor Icons** for consistent iconography

### State & Data
- **Zustand** for lightweight client state (exam, progress)
- **React Context** for theme and auth state
- **SWR/TanStack Query** for data fetching with caching

### Storage & Auth
- **Clerk** for authentication (Google + GitHub OAuth)
- **Supabase** for PostgreSQL (user progress, streak data)
- **GitHub Raw Content** for static JSON content delivery

### Visualization
- **Recharts** for radar charts, pie charts, progress bars
- **React Flow** for interactive mind maps
- **React Confetti** for exam pass celebration

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | #6366f1 | Brand, CTAs, active states |
| `--primary-dark` | #4f46e5 | Hover states |
| `--primary-light` | #a5b4fc | Subtle highlights |
| `--success` | #22c55e | Correct answers, pass states |
| `--warning` | #f59e0b | Medium difficulty, alerts |
| `--danger` | #ef4444 | Incorrect answers, hard difficulty |
| `--info` | #38bdf8 | Informational badges |

### Dark Theme
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | #0a0f1e | Page background |
| `--bg-secondary` | #111827 | Card backgrounds |
| `--bg-card` | #1e293b | Elevated surfaces |
| `--border` | #334155 | Borders, dividers |
| `--text-primary` | #f1f5f9 | Headlines, body |
| `--text-muted` | #94a3b8 | Secondary text |

### Light Theme
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | #ffffff | Page background |
| `--bg-secondary` | #f8fafc | Card backgrounds |
| `--bg-card` | #ffffff | Elevated surfaces |
| `--border` | #e2e8f0 | Borders, dividers |
| `--text-primary` | #0f172a | Headlines, body |
| `--text-muted` | #64748b | Secondary text |

### Typography
- **Plus Jakarta Sans** — Headlines, navigation, buttons
- **Inter** — Body text, question content, descriptions
- **JetBrains Mono** — IDs, code, timer, stats numbers

### Component States

**Answer Options:**
- Default: `border: 1px solid var(--border)`
- Hover: `border-color: #6366f1; bg: rgba(99,102,241,0.08)`
- Correct: `border-left: 4px solid #22c55e; bg: rgba(34,197,94,0.08)`
- Incorrect: `border-left: 4px solid #ef4444; bg: rgba(239,68,68,0.08)`

**Difficulty Badges:**
- Easy: `bg: #dcfce7; color: #16a34a`
- Medium: `bg: #fef3c7; color: #d97706`
- Hard: `bg: #fee2e2; color: #dc2626`

### Animations
| Animation | Spec |
|-----------|------|
| Page transition | fade + slide up, 150ms |
| Flashcard flip | rotateY 3D, 300ms |
| Answer reveal | expand down, 200ms |
| Progress bars | count up on mount, 600ms |
| Timer warning | pulse red under 10min |
| Exam pass | confetti burst |

## Development Workflow

### Code Quality
- **TypeScript strict mode** enabled
- **ESLint + Prettier** for code consistency
- **lint-staged** for pre-commit validation
- **Testing Library** for component tests

### Git Strategy
- Main branch: production-ready code
- Feature branches: `feat/description` or `fix/description`
- PRs require review before merge
- All tests must pass before merge

### Content Contribution
1. Contributor creates branch from main
2. Adds/modifies JSON files (questions, flashcards, lessons)
3. Opens PR with clear description
4. Automated checks validate schema
5. Reviewer checks content accuracy
6. Merge → content live via GitHub Pages

### Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90
- Bundle size: < 200KB initial JS

## Governance

### Constitution Authority
This constitution supersedes all other practice documents. All development decisions must align with these principles. When conflicts arise, principles take precedence over implementation convenience.

### Amendment Process
1. Proposer drafts change with rationale
2. Change reviewed for alignment with existing principles
3. Version bump determined (MAJOR/MINOR/PATCH)
4. PR with version bump merged
5. Sync Impact Report generated and attached

### Version Bump Rules
- **MAJOR**: Backward-incompatible changes (removed principles, renamed core concepts)
- **MINOR**: New principles, materially expanded guidance
- **PATCH**: Clarifications, wording fixes, non-semantic refinements

### Compliance
- All PRs must verify compliance with constitution
- New features must declare which principles they serve
- Complexity must be justified against simplicity principle
- Use Vercel React Best Practices and frontend-design skill for UI implementation

**Version**: 1.0.0 | **Ratified**: 2025-03-11 | **Last Amended**: 2025-03-11
