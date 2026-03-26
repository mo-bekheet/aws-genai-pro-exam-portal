"use client";

import { useTheme } from "@/lib/theme-context";
import Link from "next/link";
import Image from "next/image";

type LogoVariant = "full" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  href?: string;
  className?: string;
}

export function Logo({ variant = "full", href = "/", className = "" }: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "icon") {
    return (
      <Link href={href} className={`inline-flex ${className}`}>
        <div className="relative w-10 h-10">
          <Image
            src="/logo_tras.png"
            alt="AWS GenAI"
            width={40}
            height={40}
            className="object-contain"
            style={{ filter: isDark ? 'invert(1) brightness(1.5)' : 'none' }}
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative w-9 h-9">
        <Image
          src="/logo_tras.png"
          alt="AWS GenAI"
          width={36}
          height={36}
          className="object-contain"
          style={{ filter: isDark ? 'invert(1) brightness(1.5)' : 'none' }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-gray-900 dark:text-white">
          AWS GenAI
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
          Study Hub
        </span>
      </div>
    </Link>
  );
}