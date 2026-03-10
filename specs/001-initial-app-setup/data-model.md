# Data Model: Initial App Setup

## Entities

### User
Represents an authenticated user of the study portal.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | Primary Key | Unique user identifier |
| clerk_id | string | Unique, Not Null | Clerk user ID |
| username | string | Nullable | Display name |
| email | string | Unique, Not Null | User email |
| exam_date | date | Nullable | Target exam date |
| streak_count | integer | Default 0 | Consecutive study days |
| last_study_date | date | Nullable | Last activity date |
| created_at | timestamp | Not Null | Account creation time |

**Relationships**: Has many ExamResult, DomainScore, FlashcardProgress, QuestionInteraction

---

### Question
Represents a practice question from the question bank.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | Primary Key | Unique question ID (e.g., "q001") |
| domain | string | Not Null | Exam domain (foundations/bedrock/lifecycle/responsible_ai/security) |
| subdomain | string | Nullable | Subdomain for finer categorization |
| difficulty | string | Not Null | easy/medium/hard |
| type | string | Not Null | single/multi |
| stem | text | Not Null | Question text |
| options | json | Not Null | {A: "...", B: "...", C: "...", D: "..."} |
| answer | string | Not Null | Correct answer letter |
| explanation | text | Not Null | Why the answer is correct |
| distractors | text | Not Null | Why each wrong answer fails |
| source | string | Nullable | URL reference |
| tags | string[] | Default [] | Searchable tags |
| contributor | string | Not Null | GitHub username |
| date_added | string | Not Null | ISO month (YYYY-MM) |

**Relationships**: Referenced by QuestionInteraction

---

### Flashcard
Represents a study flashcard with front/back content.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | string | Primary Key | Card ID (e.g., "BED-001") |
| domain | string | Not Null | Exam domain |
| type | string | Not Null | concept/comparison/scenario/fact/gotcha |
| difficulty | string | Not Null | easy/medium/hard |
| front | json | Not Null | {question, hint, emoji} |
| back | json | Not Null | {answer, key_points, mnemonic, analogy} |
| exam_tip | text | Nullable | Exam-specific tip |
| related_cards | string[] | Default [] | Related card IDs |
| tags | string[] | Default [] | Searchable tags |

**Relationships**: Referenced by FlashcardProgress

---

### FlashcardProgress
Tracks user's learning progress on each flashcard.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| user_id | UUID | FK → User.id, PK | User reference |
| card_id | string | FK → Flashcard.id, PK | Card reference |
| status | string | Default 'new' | new/learning/known |
| last_seen | timestamp | Nullable | Last review time |
| times_seen | integer | Default 0 | Review count |

**PK**: (user_id, card_id)

---

### QuestionInteraction
Tracks user's interactions with questions.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| user_id | UUID | FK → User.id, PK | User reference |
| question_id | string | FK → Question.id, PK | Question reference |
| is_saved | boolean | Default false | Bookmark status |
| is_flagged | boolean | Default false | Flag for review |
| is_liked | boolean | Default false | Like status |
| user_answer | string | Nullable | User's selected answer |
| is_correct | boolean | Nullable | Correctness flag |
| answered_at | timestamp | Nullable | Answer timestamp |

**PK**: (user_id, question_id)

---

### ExamResult
Stores mock exam attempt results.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | Primary Key | Unique result ID |
| user_id | UUID | FK → User.id | User reference |
| exam_id | string | Not Null | Exam identifier |
| mode | string | Not Null | full/quick/domain |
| score | float | Not Null | Percentage score |
| time_taken | integer | Nullable | Time in seconds |
| answers | json | Not Null | {q1: "A", q2: "B", ...} |
| created_at | timestamp | Not Null | Exam completion time |

---

### DomainScore
Tracks user's performance per exam domain.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| user_id | UUID | FK → User.id, PK | User reference |
| domain_name | string | PK | Domain identifier |
| correct | integer | Default 0 | Correct answers count |
| total | integer | Default 0 | Total questions answered |
| last_updated | timestamp | Not Null | Last update time |

**PK**: (user_id, domain_name)

---

### StreakLog
Daily activity log for streak calculation.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| user_id | UUID | FK → User.id, PK | User reference |
| study_date | date | PK | Activity date |
| minutes_studied | integer | Default 0 | Time spent studying |
| activity_type | string | Nullable | Type of activity |

**PK**: (user_id, study_date)

---

## Validation Rules

1. **User.exam_date**: Must be future date if provided
2. **Question.difficulty**: Must be one of [easy, medium, hard]
3. **Flashcard.type**: Must be one of [concept, comparison, scenario, fact, gotcha]
4. **ExamResult.score**: Must be between 0 and 100
5. **StreakLog.minutes_studied**: Must be >= 0

## State Transitions

### FlashcardProgress.status
```
new → learning → known
known → learning (if marked wrong again)
```

### ExamResult.mode
```
full: 65 questions, 130 minutes
quick: 25 questions, 50 minutes  
domain: all questions from one domain
```
