"use client";

import { motion } from "framer-motion";

export type AnswerState = "default" | "hover" | "correct" | "incorrect";

export interface AnswerOptionProps {
  children: React.ReactNode;
  state?: AnswerState;
  onClick?: () => void;
  className?: string;
  letter?: string;
}

export function AnswerOption({
  children,
  state = "default",
  onClick,
  className = "",
  letter,
}: AnswerOptionProps) {
  const baseClasses = "p-4 rounded-lg cursor-pointer transition-all duration-200";

  const stateClasses = {
    default: "border border-gray-200 dark:border-[#334155] bg-transparent",
    hover: "border-2 border-[#6366f1] bg-indigo-50/50 dark:bg-indigo-900/20",
    correct: "border-l-4 border-[#22c55e] bg-green-50/50 dark:bg-green-900/20",
    incorrect: "border-l-4 border-[#ef4444] bg-red-50/50 dark:bg-red-900/20",
  };

  return (
    <motion.div
      whileHover={state === "default" ? { scale: 1.01 } : {}}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`${baseClasses} ${stateClasses[state]} ${className}`}
    >
      <div className="flex items-start gap-3">
        {letter && (
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#334155] text-sm font-mono text-gray-600 dark:text-gray-300">
            {letter}
          </span>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </motion.div>
  );
}