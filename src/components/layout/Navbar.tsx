"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/lessons", label: "Lessons", icon: "📚" },
  { href: "/dashboard/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/dashboard/questions", label: "Questions", icon: "❓" },
  { href: "/dashboard/exams", label: "Exams", icon: "📝" },
  { href: "/dashboard/mind-maps", label: "Mind Maps", icon: "🧠" },
  { href: "/dashboard/compare", label: "Compare", icon: "⚖️" },
  { href: "/dashboard/progress", label: "Progress", icon: "📊" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isLoaded } = useUser();

  return (
    <nav className="h-16 bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-[#334155] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Logo variant="icon" className="!h-10 !w-10" />
        </Link>
        <Link href="/dashboard" className="flex flex-col">
          <span className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
            AWS GenAI
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
            Study Hub
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-gray-600 dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#334155] hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
        <div className="ml-2 pl-2 flex items-center gap-3 border-l border-gray-200 dark:border-[#334155]">
          <ThemeToggle />
          {isLoaded && (
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-[#1e293b]"
                }
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
