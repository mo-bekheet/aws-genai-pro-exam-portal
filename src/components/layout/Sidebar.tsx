import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/questions", label: "Questions", icon: "❓" },
  { href: "/flashcards", label: "Flashcards", icon: "🃏" },
  { href: "/exams", label: "Exams", icon: "🧪" },
  { href: "/progress", label: "Progress", icon: "📈" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1e293b] border-r border-[#334155] min-h-screen p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#6366f1] text-white"
                  : "text-[#94a3b8] hover:bg-[#334155] hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-8 pt-8 border-t border-[#334155]">
        <Link
          href="/support"
          className="flex items-center gap-3 px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white rounded-lg transition-colors"
        >
          <span>☕</span>
          <span className="font-medium">Support</span>
        </Link>
        <a
          href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 text-[#94a3b8] hover:bg-[#334155] hover:text-white rounded-lg transition-colors"
        >
          <span>⭐</span>
          <span className="font-medium">GitHub</span>
        </a>
      </div>
    </aside>
  );
}
