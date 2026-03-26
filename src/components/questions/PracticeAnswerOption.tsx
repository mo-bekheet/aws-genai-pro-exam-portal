"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface AnswerOptionProps {
  letter: string;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  isAnswered: boolean;
  onSelect: () => void;
}

export function AnswerOption({
  letter,
  text,
  isSelected,
  isCorrect,
  isWrong,
  isAnswered,
  onSelect,
}: AnswerOptionProps) {
  const getStyles = () => {
    if (!isAnswered) {
      return isSelected
        ? 'border-indigo-500 bg-indigo-500/20'
        : 'border-[#334155] hover:border-indigo-500 hover:bg-[#1e293b]';
    }
    
    if (isCorrect) {
      return 'border-green-500 bg-green-500/10';
    }
    
    if (isWrong) {
      return 'border-red-500 bg-red-500/10';
    }
    
    return 'border-[#334155] opacity-50';
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={!isAnswered ? onSelect : undefined}
      disabled={isAnswered}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getStyles()}`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm ${
          isSelected && !isAnswered
            ? 'bg-indigo-500 text-white'
            : isCorrect
              ? 'bg-green-500 text-white'
              : isWrong
                ? 'bg-red-500 text-white'
                : 'bg-[#334155] text-[#94a3b8]'
        }`}>
          {isAnswered && isCorrect ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : isAnswered && isWrong ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            letter
          )}
        </div>
        <span className="text-white text-base leading-relaxed">{text}</span>
      </div>
    </motion.button>
  );
}