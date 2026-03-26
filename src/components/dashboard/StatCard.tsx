"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  value: string | number;
  label: string;
  delay?: number;
}

export function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-5 hover:border-indigo-500 dark:hover:border-[#6366f1] transition-all duration-300"
    >
      <div className="text-4xl font-bold text-indigo-500 dark:text-[#6366f1] font-mono mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-500 dark:text-[#94a3b8]">{label}</div>
    </motion.div>
  );
}