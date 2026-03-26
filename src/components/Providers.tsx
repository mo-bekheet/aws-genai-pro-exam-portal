'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/lib/theme-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}