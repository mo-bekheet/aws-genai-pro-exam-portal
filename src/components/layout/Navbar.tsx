"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="h-16 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-[#334155] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Link href="/     /" className="flex items-center gap-2">
          <span className="text-xl">🪨</span>
          <span className="font-bold text-gray-900 dark:text-white">AWS GenAI Study Hub</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/questions"
          className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Questions
        </Link>
        <Link
          href="/flashcards"
          className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Flashcards
        </Link>
        <Link
          href="/exams"
          className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Exams
        </Link>
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
