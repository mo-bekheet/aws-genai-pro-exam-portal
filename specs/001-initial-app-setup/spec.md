# Feature Specification: Initial App Setup

**Feature Branch**: `001-initial-app-setup`  
**Created**: 2025-03-11  
**Status**: Draft  
**Input**: User description: "use PRD file to create initial application setup"

## Clarifications

### Session 2025-03-11

- Q: Scalability - How many concurrent users should the system support? → A: 1,000 concurrent users (MVP scope)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Landing Page (Priority: P1)

As a visitor, I want to see a landing page that explains the study hub features, so I can understand what the app offers and get started quickly.

**Why this priority**: First impression determines user conversion. Without a clear landing page, users won't sign up.

**Independent Test**: Can be tested by loading the page and verifying all sections render correctly.

**Acceptance Scenarios**:

1. **Given** a visitor, **When** they load the landing page, **Then** they see the headline "Ace the AWS AI Practitioner Exam — Free, Forever"
2. **Given** a visitor, **When** they view the features section, **Then** they see all 6 features: Flashcards, Mock Exams, Mind Maps, Question Bank, Progress Tracking, Study Roadmap
3. **Given** a visitor, **When** they click "Start Studying Free", **Then** they are redirected to sign-in

---

### User Story 2 - Authentication (Priority: P1)

As a new user, I want to sign in with Google or GitHub, so I can access my progress and track my study journey.

**Why this priority**: All progress tracking, streaks, and personalization require authenticated users. This is foundational to the entire experience.

**Independent Test**: Can be tested by attempting sign-in and verifying user record creation.

**Acceptance Scenarios**:

1. **Given** a new user, **When** they click "Sign in with Google", **Then** they complete OAuth flow and are redirected to dashboard
2. **Given** a new user, **When** they click "Sign in with GitHub", **Then** they complete OAuth flow and are redirected to dashboard
3. **Given** an authenticated user, **When** they return to the app, **Then** they are automatically logged in

---

### User Story 3 - Dashboard (Priority: P1)

As a signed-in user, I want to see my study progress at a glance, so I can understand my readiness for the exam.

**Why this priority**: Dashboard is the first thing users see after login. It motivates continued study through streak visibility and shows weak areas.

**Independent Test**: Can be tested by logging in and verifying all dashboard elements display.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they view the dashboard, **Then** they see their exam countdown (days remaining)
2. **Given** an authenticated user, **When** they view the dashboard, **Then** they see their study streak (number of consecutive days)
3. **Given** an authenticated user, **When** they view the dashboard, **Then** they see progress bars for 5 exam domains (color-coded: green >70%, amber 40-70%, red <40%)
4. **Given** an authenticated user, **When** they view the dashboard, **Then** they see quick action buttons: Continue Studying, Start Mock Exam, View Weak Areas

---

### User Story 4 - Question Bank (Priority: P2)

As a study user, I want to browse and practice questions, so I can learn and verify my knowledge of AWS GenAI topics.

**Why this priority**: The question bank is the core study tool. Without it, users cannot practice for the exam.

**Independent Test**: Can be tested by browsing questions and verifying filtering works.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they open the question bank, **Then** they see questions with domain badges and difficulty indicators
2. **Given** an authenticated user, **When** they select an answer, **Then** they see immediate feedback (correct/incorrect) with explanation
3. **Given** an authenticated user, **When** they filter by domain, **Then** only questions from that domain are shown
4. **Given** an authenticated user, **When** they filter by difficulty, **Then** only questions of that difficulty are shown

---

### User Story 5 - Flashcards (Priority: P2)

As a study user, I want to use spaced-repetition flashcards, so I can memorize key concepts efficiently.

**Why this priority**: Flashcards provide active recall practice, which is scientifically proven to improve retention.

**Independent Test**: Can be tested by starting a flashcard session and verifying flip interaction.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they open flashcards, **Then** they see cards organized by domain
2. **Given** an authenticated user, **When** they click a card, **Then** it flips with 3D animation to reveal the answer
3. **Given** an authenticated user, **When** they mark a card as "known" or "learning", **Then** the card status is saved for spaced repetition

---

### User Story 6 - Mock Exams (Priority: P3)

As a user preparing for the exam, I want to take a timed mock exam, so I can assess my readiness under exam conditions.

**Why this priority**: Mock exams simulate the real exam experience and help users manage time pressure.

**Independent Test**: Can be tested by starting an exam and completing it.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they start a full mock exam, **Then** they have 130 minutes to answer 65 questions
2. **Given** an authenticated user, **When** they start a quick mock exam, **Then** they have 50 minutes to answer 25 questions
3. **Given** an authenticated user, **When** the timer reaches 10 minutes, **Then** it turns red and pulses
4. **Given** an authenticated user, **When** they submit the exam, **Then** they see their score, pass/fail status, and domain heatmap

---

### Edge Cases

- **Visitor without account**: Can view landing page but cannot access dashboard or study features
- **User with no study activity**: Dashboard shows 0% progress and "Start your journey" prompt
- **Network failure during auth**: User sees error message with retry option
- **Exam timer expires**: Auto-submit with all unanswered marked incorrect
- **Question bank with no matching filters**: Show "No questions match your filters" message

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a landing page with feature overview and sign-in CTA
- **FR-002**: System MUST allow users to sign in via Google OAuth
- **FR-003**: System MUST allow users to sign in via GitHub OAuth
- **FR-004**: System MUST persist authenticated user session
- **FR-005**: System MUST display dashboard with exam countdown for users with exam date set
- **FR-006**: System MUST display study streak showing consecutive days of activity
- **FR-007**: System MUST display 5 domain progress bars with color coding
- **FR-008**: System MUST display quick action buttons for main features
- **FR-009**: System MUST allow users to browse questions filtered by domain
- **FR-010**: System MUST allow users to browse questions filtered by difficulty
- **FR-011**: System MUST show immediate answer feedback with explanation
- **FR-012**: System MUST display flashcards organized by domain
- **FR-013**: System MUST animate flashcard flip with 3D rotation
- **FR-014**: System MUST save flashcard status (known/learning/new) per user
- **FR-015**: System MUST support full mock exam (65 questions, 130 minutes)
- **FR-016**: System MUST support quick mock exam (25 questions, 50 minutes)
- **FR-017**: System MUST display countdown timer during exam
- **FR-018**: System MUST show score and domain breakdown after exam submission

### Key Entities

- **User**: id, clerk_id, username, email, exam_date, streak_count, last_study_date, created_at
- **Question**: id, domain, difficulty, stem, options, answer, explanation, distractors, tags
- **Flashcard**: id, domain, type, difficulty, front, back, status, user_progress
- **ExamResult**: id, user_id, mode, score, time_taken, answers, created_at
- **DomainScore**: id, user_id, domain_name, correct, total, last_updated

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can sign in and access dashboard in under 10 seconds
- **SC-002**: Landing page loads in under 2 seconds on standard connection
- **SC-003**: Users can browse and filter question bank with instant response
- **SC-004**: Flashcard flip animation runs at 60fps
- **SC-005**: Mock exam timer accurately counts down and auto-submits
- **SC-006**: 90% of users successfully sign in on first attempt
- **SC-007**: Dashboard displays accurate streak count based on daily activity
- **SC-008**: System supports 1,000 concurrent users without degradation

## Assumptions

- Authentication will use Clerk (as specified in PRD)
- Content (questions, flashcards) will be loaded from GitHub JSON files
- Database will use Supabase for user progress storage
- No payment integration required (free forever model)
