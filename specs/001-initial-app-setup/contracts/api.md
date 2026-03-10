# API Contracts

This document outlines the application's interface contracts.

## Public Routes (Client-Side)

| Route | Method | Description | Auth Required |
|-------|--------|-------------|---------------|
| `/` | GET | Landing page | No |
| `/sign-in` | GET | Clerk sign-in | No |
| `/sign-up` | GET | Clerk sign-up | No |
| `/dashboard` | GET | User dashboard | Yes |
| `/questions` | GET | Question bank | Yes |
| `/flashcards` | GET | Flashcard study | Yes |
| `/exams` | GET | Mock exam list | Yes |
| `/exams/[id]` | GET | Take exam | Yes |
| `/progress` | GET | User progress | Yes |

## Data Fetching

All content data (questions, flashcards, lessons) is fetched at runtime from GitHub Raw:

```
GET https://raw.githubusercontent.com/mo-bekheet/aws-genai-pro-study-materials/main/questions/all.json
GET https://raw.githubusercontent.com/mo-bekheet/aws-genai-pro-study-materials/main/flashcards/all.json
```

## Supabase Tables

See [data-model.md](./data-model.md) for complete schema.

### Row Level Security (RLS)

All user-specific tables (FlashcardProgress, QuestionInteraction, ExamResult, DomainScore, StreakLog) have RLS enabled:
- Users can only read/write their own records
- Public content (Question, Flashcard) is readable by all authenticated users

## Clerk Webhooks

| Event | Handler | Description |
|-------|---------|-------------|
| `user.created` | `/api/webhooks/clerk` | Create user record in Supabase |
| `user.updated` | `/api/webhooks/clerk` | Update user profile |
| `user.deleted` | `/api/webhooks/clerk` | Handle account deletion |

## Component Contracts

### Flashcard Flip
- Input: Card ID
- Output: 3D rotateY animation (300ms)
- States: front → back (toggle)

### Question Filter
- Input: {domain?, difficulty?, status?, tags?}
- Output: Filtered question array
- Debounce: 150ms

### Exam Timer
- Input: Duration (minutes)
- Output: Countdown display (MM:SS format)
- Warning: Red + pulse at 10 minutes remaining
- Auto-submit: When timer reaches 0
