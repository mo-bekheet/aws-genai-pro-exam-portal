"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

interface ExamCountdownProps {
  examDate?: string | null;
}

export function ExamCountdown({ examDate }: ExamCountdownProps) {
  if (!examDate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-6 hover:border-indigo-500 dark:hover:border-[#6366f1] transition-all duration-300 hover:shadow-lg dark:hover:shadow-[#6366f1]/10"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📅 Exam Countdown</h3>
        <p className="text-gray-500 dark:text-[#94a3b8] mb-4">Set your exam date to track your preparation</p>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
        >
          Set Exam Date
        </motion.button>
      </motion.div>
    );
  }

  const exam = new Date(examDate);
  const today = new Date();
  const daysRemaining = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const isUrgent = daysRemaining <= 14;
  const isPassed = daysRemaining <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`bg-white dark:bg-[#1e293b] border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${
        isPassed ? "border-red-500 hover:shadow-red-500/10" : isUrgent ? "border-amber-500 hover:shadow-amber-500/10" : "border-gray-200 dark:border-[#334155] hover:border-indigo-500 dark:hover:border-[#6366f1] hover:shadow-[#6366f1]/10"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📅 Exam Countdown</h3>
      {isPassed ? (
        <motion.p 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-red-500 font-medium text-center text-lg"
        >
          Exam date has passed!
        </motion.p>
      ) : (
        <div className="text-center">
          <motion.div 
            className={`text-5xl font-bold mb-2 ${
              isUrgent ? "text-amber-500" : "text-indigo-500"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            <AnimatedCounter value={daysRemaining} />
          </motion.div>
          <div className="text-gray-500 dark:text-[#94a3b8]">days remaining</div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-400 dark:text-[#64748b] mt-2"
          >
            {exam.toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
