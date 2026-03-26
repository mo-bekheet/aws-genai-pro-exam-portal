"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/lessons", label: "Lessons", icon: "📚" },
  { href: "/dashboard/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/dashboard/questions", label: "Question Bank", icon: "❓" },
  { href: "/dashboard/exams", label: "Mock Exam", icon: "📝" },
  { href: "/dashboard/mind-maps", label: "Mind Maps", icon: "🧠" },
  { href: "/dashboard/roadmap", label: "Roadmap", icon: "🗺️" },
  { href: "/dashboard/compare", label: "Compare", icon: "⚖️" },
  { href: "/dashboard/progress", label: "Progress", icon: "📊" },
];

const bottomItems = [
  { href: "/support", label: "Support", icon: "☕" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-[#1e293b] border-r border-gray-200 dark:border-[#334155] min-h-screen p-4 flex flex-col">
      <div className="mb-6">
        <Logo variant="full" className="!p-0" />
      </div>
      
      <div className="mb-4">
        <ThemeToggle />
      </div>

      <div className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-gray-600 dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#334155] hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#334155] space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#334155] hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#334155]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 dark:text-white text-sm truncate">Ahmed</div>
            <div className="text-xs text-gray-500 dark:text-[#94a3b8]">Pro Member</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
