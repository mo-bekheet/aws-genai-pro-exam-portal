"use client";

import { motion } from "framer-motion";

interface StreakCardProps {
  streak: number;
  lastStudied: string;
  delay?: number;
}

export function StreakCard({ streak, lastStudied, delay = 0 }: StreakCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-white dark:bg-[#1e293b] rounded-xl p-5 before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 before:bg-[length:200%_100%] before:animate-gradient-move"
      style={{
        background: "var(--card-bg)",
      }}
    >
      <div 
        className="absolute inset-[1px] rounded-xl bg-white dark:bg-[#1e293b]"
        style={{ zIndex: -1 }}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {streak} Day Streak
            </div>
            <div className="text-sm text-gray-500 dark:text-[#94a3b8]">
              Last studied: {lastStudied}
            </div>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
          <span className="text-2xl">⚡</span>
        </div>
      </div>
    </motion.div>
  );
}