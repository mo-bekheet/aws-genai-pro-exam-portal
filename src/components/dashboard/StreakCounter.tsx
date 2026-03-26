"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

interface StreakCounterProps {
  streakCount: number;
  lastStudyDate?: string | null;
}

export function StreakCounter({ streakCount, lastStudyDate }: StreakCounterProps) {
  const isActive = streakCount > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-6 hover:border-indigo-500 dark:hover:border-[#6366f1] transition-all duration-300 hover:shadow-lg dark:hover:shadow-[#6366f1]/10"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔥 Study Streak</h3>
      <div className="text-center">
        <motion.div 
          className={`text-5xl font-bold mb-2 ${isActive ? "text-amber-500" : "text-gray-400"}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        >
          <AnimatedCounter value={streakCount} />
        </motion.div>
        <div className="text-gray-500 dark:text-[#94a3b8]">
          {streakCount === 1 ? "day" : "days"} in a row
        </div>
        {lastStudyDate && (
          <div className="text-sm text-gray-400 dark:text-[#64748b] mt-2">
            Last studied: {new Date(lastStudyDate).toLocaleDateString()}
          </div>
        )}
      </div>
      {!isActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-[#334155]"
        >
          <p className="text-sm text-gray-500 dark:text-[#94a3b8] text-center">
            Start studying today to build your streak!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
