# Implementation Plan: Initial App Setup

**Branch**: `001-initial-app-setup` | **Date**: 2025-03-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-initial-app-setup/spec.md`

## Summary

Build the initial AWS GenAI Pro Study Hub application with React 19 + Next.js 15. Core features: landing page, authentication via Clerk (Google/GitHub), dashboard with progress tracking, question bank, flashcards with spaced repetition, and mock exams. All content loaded from GitHub JSON files with user progress stored in Supabase.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 15, React 19, Clerk, Supabase, Tailwind CSS, Framer Motion, Zustand, Recharts, React Flow, Phosphor Icons  
**Storage**: Supabase (PostgreSQL) + GitHub Raw (static JSON content)  
**Testing**: Jest + React Testing Library  
**Target Platform**: Web (responsive, mobile-friendly)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: <2s page load, <200ms interactions, 60fps animations  
**Constraints**: Free forever (no paid features), MIT license, Vercel deployment  
**Scale/Scope**: 1,000 concurrent users, 6 main features, 12 screens

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Free Forever | ✅ Pass | No paid features, free content access |
| II. Open Source | ✅ Pass | MIT License, public repo |
| III. Auth from Day One | ✅ Pass | Clerk OAuth from initial build |
| IV. Community Supported | ✅ Pass | Ko-fi integration planned |
| V. Responsive Web First | ✅ Pass | Mobile-responsive, touch-friendly |
| VI. Content Grows Continuously | ✅ Pass | JSON/Markdown content via GitHub |
| VII. Fun Learning First | ✅ Pass | Interactive HTML lessons |
| VIII. Easy Contribution | ✅ Pass | JSON/Markdown contribution workflow |
| IX. Commit After Each Task | ✅ Pass | Per-task commits required |

## Project Structure

### Documentation (this feature)

```text
specs/001-initial-app-setup/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (API contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Landing page
│   ├── sign-in/        # Clerk auth
│   ├── (dashboard)/    # Protected routes group
│   │   ├── layout.tsx  # Sidebar + Navbar
│   │   ├── page.tsx    # Dashboard
│   │   ├── questions/  # Question bank
│   │   ├── flashcards/ # Flashcards
│   │   ├── exams/      # Mock exams
│   │   └── progress/   # User progress
│   └── api/            # API routes (if needed)
├── components/
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Navbar, Sidebar
│   ├── questions/      # Question components
│   ├── flashcards/    # Flashcard components
│   └── exam/           # Exam components
├── lib/
│   ├── supabase.ts     # Database client
│   ├── auth.ts         # Clerk helpers
│   └── utils.ts        # Utilities
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
└── data/               # Static JSON (fetched from GitHub)

public/                 # Static assets

tests/
├── unit/               # Component tests
└── integration/       # E2E tests
```

**Structure Decision**: Next.js 15 App Router with App Router conventions. Feature-based organization inside (dashboard)/ group. Reusable UI components in /components/ui.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations. All principles satisfied.
