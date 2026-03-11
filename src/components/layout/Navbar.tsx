import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <nav className="h-16 bg-[#1e293b] border-b border-[#334155] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl">🪨</span>
          <span className="font-bold text-white">AWS GenAI Study Hub</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-[#94a3b8] hover:text-white transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/questions"
          className="text-[#94a3b8] hover:text-white transition-colors"
        >
          Questions
        </Link>
        <Link
          href="/flashcards"
          className="text-[#94a3b8] hover:text-white transition-colors"
        >
          Flashcards
        </Link>
        <Link
          href="/exams"
          className="text-[#94a3b8] hover:text-white transition-colors"
        >
          Exams
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
