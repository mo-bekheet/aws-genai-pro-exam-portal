"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KnowledgeCheckProps {
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export function KnowledgeCheck({ question, options, correctAnswer, explanation }: KnowledgeCheckProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheck = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
    }
  };

  const getOptionStyle = (optionId: string) => {
    if (!isSubmitted) {
      return selectedAnswer === optionId
        ? 'border-indigo-500 bg-indigo-500/20'
        : 'border-gray-600 dark:border-[#334155] hover:border-indigo-500';
    }

    if (optionId === correctAnswer) {
      return 'border-green-500 bg-green-500/20';
    }

    if (selectedAnswer === optionId && optionId !== correctAnswer) {
      return 'border-red-500 bg-red-500/20';
    }

    return 'border-gray-600 dark:border-[#334155]';
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🧠</span>
        <span className="text-sm font-mono text-amber-400 uppercase tracking-wide">
          KNOWLEDGE CHECK
        </span>
      </div>

      <p className="text-lg font-semibold text-white dark:text-white mb-4">
        {question}
      </p>

      <div className="space-y-3 mb-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !isSubmitted && setSelectedAnswer(option.id)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(option.id)}`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-gray-400 dark:text-[#94a3b8]">
                {option.id}
              </span>
              <span className="text-gray-200 dark:text-gray-200">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleCheck}
          disabled={!selectedAnswer}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            selectedAnswer
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              selectedAnswer === correctAnswer
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <p className={`font-semibold mb-2 ${
              selectedAnswer === correctAnswer
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              {selectedAnswer === correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-gray-300 dark:text-gray-300">
              {explanation}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}