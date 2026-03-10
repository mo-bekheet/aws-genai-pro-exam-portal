---

description: Task list for Initial App Setup feature
---

# Tasks: Initial App Setup

**Input**: Design documents from `/specs/001-initial-app-setup/`
**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web app: `src/app/`, `src/components/`, `src/lib/`
- Tests: `tests/unit/`, `tests/integration/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Next.js 15 project with TypeScript and Tailwind CSS
- [X] T002 [P] Install dependencies: Clerk, Supabase, Framer Motion, Zustand, Recharts, React Flow, Phosphor Icons
- [X] T003 [P] Configure ESLint and Prettier for code quality
- [X] T004 Configure Tailwind CSS with design tokens from constitution
- [X] T005 Setup folder structure: app/, components/, lib/, hooks/, types/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 [P] Configure environment variables (.env.local) for Clerk, Supabase, App URL
- [X] T007 [P] Setup Supabase client in src/lib/supabase.ts
- [X] T008 Create TypeScript types for User, Question, Flashcard in src/types/index.ts
- [X] T009 Configure Clerk authentication provider in src/app/
- [X] T010 Setup auth middleware for protected routes in src/middleware.ts
- [X] T011 Create database schema SQL for Supabase in supabase/schema.sql
- [X] T012 Build reusable UI components in src/components/ui/ (Button, Card, Badge, Input)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Landing Page (Priority: P1) 🎯 MVP

**Goal**: Public homepage with hero, features, and sign-in CTA

**Independent Test**: Load page and verify all sections render correctly

- [X] T013 [P] [US1] Create landing page layout in src/app/page.tsx
- [X] T014 [P] [US1] Implement Hero section with headline and CTA buttons in src/app/page.tsx
- [X] T015 [US1] Create Features grid component in src/components/landing/Features.tsx
- [X] T016 [US1] Implement "How it works" section in src/components/landing/HowItWorks.tsx
- [X] T017 [US1] Add Footer component with GitHub and Ko-fi links in src/components/layout/Footer.tsx

**Checkpoint**: Landing page functional and publicly accessible

---

## Phase 4: User Story 2 - Authentication (Priority: P1)

**Goal**: Google and GitHub OAuth login flow

**Independent Test**: Sign in and verify user record created in Supabase

- [X] T018 [P] [US2] Create sign-in page in src/app/sign-in/[[...sign-in]]/page.tsx
- [X] T019 [P] [US2] Create sign-up page in src/app/sign-up/[[...sign-up]]/page.tsx
- [ ] T020 [US2] Implement Clerk webhook handler in src/app/api/webhooks/clerk/route.ts
- [ ] T021 [US2] Create user creation handler when Clerk user.created event fires
- [ ] T022 [US2] Implement session persistence check in src/lib/auth.ts

**Checkpoint**: Users can sign in with Google or GitHub

---

## Phase 5: User Story 3 - Dashboard (Priority: P1)

**Goal**: Show exam countdown, streak, domain progress bars, quick actions

**Independent Test**: Log in and verify all dashboard elements display

- [ ] T023 [P] [US3] Create dashboard layout with Sidebar in src/app/(dashboard)/layout.tsx
- [ ] T024 [P] [US3] Create Navbar component in src/components/layout/Navbar.tsx
- [ ] T025 [P] [US3] Create Sidebar component in src/components/layout/Sidebar.tsx
- [ ] T026 [US3] Build dashboard page in src/app/(dashboard)/page.tsx
- [ ] T027 [US3] Implement exam countdown component in src/components/dashboard/ExamCountdown.tsx
- [ ] T028 [US3] Implement study streak component in src/components/dashboard/StreakCounter.tsx
- [ ] T029 [US3] Implement domain progress bars in src/components/dashboard/DomainProgress.tsx
- [ ] T030 [US3] Add quick action buttons in src/app/(dashboard)/page.tsx

**Checkpoint**: Dashboard displays all user progress information

---

## Phase 6: User Story 4 - Question Bank (Priority: P2)

**Goal**: Browse/filter questions with instant feedback

**Independent Test**: Browse questions, filter by domain/difficulty, verify feedback

- [ ] T031 [P] [US4] Create questions page in src/app/(dashboard)/questions/page.tsx
- [ ] T032 [P] [US4] Create QuestionCard component in src/components/questions/QuestionCard.tsx
- [ ] T033 [P] [US4] Create QuestionFilter sidebar in src/components/questions/QuestionFilter.tsx
- [ ] T034 [US4] Implement question fetching from GitHub Raw in src/lib/questions.ts
- [ ] T035 [US4] Add domain badge component in src/components/questions/DomainBadge.tsx
- [ ] T036 [US4] Add difficulty badge component in src/components/questions/DifficultyBadge.tsx
- [ ] T037 [US4] Implement answer selection with feedback in src/components/questions/AnswerOption.tsx
- [ ] T038 [US4] Create explanation panel in src/components/questions/Explanation.tsx

**Checkpoint**: Question bank fully functional with filtering

---

## Phase 7: User Story 5 - Flashcards (Priority: P2)

**Goal**: Spaced-repetition flashcards with 3D flip animation

**Independent Test**: Start flashcard session, flip card, mark status

- [ ] T039 [P] [US5] Create flashcards page in src/app/(dashboard)/flashcards/page.tsx
- [ ] T040 [P] [US5] Create FlipCard component with Framer Motion in src/components/flashcards/FlipCard.tsx
- [ ] T041 [P] [US5] Create CardBrowser component in src/components/flashcards/CardBrowser.tsx
- [ ] T042 [US5] Implement flashcard fetching in src/lib/flashcards.ts
- [ ] T043 [US5] Add flashcard flip animation (3D rotateY, 300ms)
- [ ] T044 [US5] Implement spaced repetition status (known/learning/new) in src/components/flashcards/CardControls.tsx
- [ ] T045 [US5] Save flashcard progress to Supabase in src/lib/flashcard-progress.ts

**Checkpoint**: Flashcards with flip animation and progress tracking

---

## Phase 8: User Story 6 - Mock Exams (Priority: P3)

**Goal**: Timed mock exams with results and domain heatmap

**Independent Test**: Start exam, answer questions, submit, view results

- [ ] T046 [P] [US6] Create exams page in src/app/(dashboard)/exams/page.tsx
- [ ] T047 [P] [US6] Create ExamSetup component in src/components/exam/ExamSetup.tsx
- [ ] T048 [P] [US6] Create ExamTimer component in src/components/exam/ExamTimer.tsx
- [ ] T049 [US6] Build exam taking page in src/app/(dashboard)/exams/[id]/page.tsx
- [ ] T050 [US6] Implement countdown timer with warning state (red + pulse at 10min)
- [ ] T051 [US6] Create question navigator grid in src/components/exam/QuestionNavigator.tsx
- [ ] T052 [US6] Implement auto-submit when timer expires
- [ ] T053 [US6] Create ExamResults component in src/components/exam/ExamResults.tsx
- [ ] T054 [US6] Add score calculation and domain heatmap in src/lib/exam-scoring.ts
- [ ] T055 [US6] Save exam results to Supabase in src/lib/exam-results.ts

**Checkpoint**: Full mock exam flow complete

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T056 [P] Add loading states and skeleton loaders for all async content
- [ ] T057 [P] Implement error boundaries and error pages
- [ ] T058 [P] Add empty states for all list components
- [ ] T059 Add keyboard navigation for flashcard flip
- [ ] T060 Add mobile responsive styles for all pages
- [ ] T061 Implement theme toggle (dark/light) in src/components/layout/ThemeToggle.tsx
- [ ] T062 Add confetti animation on exam pass in src/components/exam/Confetti.tsx

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - US1, US2, US3 (P1) can proceed in parallel after Foundational
  - US4, US5 (P2) can proceed in parallel
  - US6 (P3) depends on US4 (Question Bank)
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 Landing Page**: Can start after Setup - No dependencies on other stories
- **US2 Authentication**: Depends on Foundational - Required for US3+
- **US3 Dashboard**: Depends on US2 Authentication - Required for all study features
- **US4 Question Bank**: Depends on US3 - No dependencies on other stories
- **US5 Flashcards**: Depends on US3 - No dependencies on US4
- **US6 Mock Exams**: Depends on US4 Question Bank (needs question data)

### Parallel Opportunities

- Phase 1 tasks marked [P] can run in parallel
- Phase 2 tasks marked [P] can run in parallel
- US1, US2, US3 can start in parallel after Foundational
- US4 and US5 can run in parallel (both depend only on US3)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: Landing Page (US1)
4. **STOP and VALIDATE**: Test landing page independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 Landing Page → Test independently → Deploy/Demo
3. Add US2 Auth + US3 Dashboard → Test → Deploy (Basic app working!)
4. Add US4 Question Bank → Test → Deploy (Core study features!)
5. Add US5 Flashcards → Test → Deploy
6. Add US6 Mock Exams → Test → Deploy (Full feature set)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Landing Page (US1)
   - Developer B: Authentication (US2)
   - Developer C: Dashboard (US3)
3. After US3 complete:
   - Developer A: Question Bank (US4)
   - Developer B: Flashcards (US5)
   - Developer C: Mock Exams (US6)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task per Constitution IX
- Verify tests pass before moving to next story
- Stop at any checkpoint to validate story independently
