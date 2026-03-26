"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface QuickActionCardProps {
  icon: string;
  title: string;
  href: string;
  delay?: number;
}

export function QuickActionCard({ icon, title, href, delay = 0 }: QuickActionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={href}
        className="flex items-center gap-3 p-4 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl hover:border-indigo-500 dark:hover:border-[#6366f1] hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 group"
      >
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        <span className="ml-auto text-gray-400 group-hover:text-indigo-500 transition-colors">→</span>
      </Link>
    </motion.div>
  );
}