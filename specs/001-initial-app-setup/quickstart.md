# Quickstart: Initial App Setup

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- GitHub account
- Clerk account (for auth)
- Supabase account (for database)
- Vercel account (for deployment)

## Setup Steps

### 1. Clone Repository

```bash
git clone https://github.com/mo-bekheet/aws-genai-pro-exam-portal.git
cd aws-genai-pro-exam-portal
git checkout 001-initial-app-setup
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

1. Create Supabase project
2. Run SQL from `supabase/schema.sql` (TBD - to be created)
3. Get URL and anon key, add to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities and clients
├── hooks/            # Custom hooks
├── types/            # TypeScript definitions
└── data/             # Static content (fetched at runtime)
```

## Key Technologies

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Framework |
| React 19 | UI Library |
| Clerk | Authentication |
| Supabase | Database |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Zustand | State Management |

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint    # Run ESLint
```

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for contribution guidelines.

## Deployment

Push to GitHub and connect to Vercel. Environment variables should be configured in Vercel project settings.
