"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flashcard as FlashcardType } from "@/types";

interface FlipCardProps {
  card: FlashcardType;
  onStatusChange?: (status: "new" | "learning" | "known") => void;
}

export function FlipCard({ card, onStatusChange }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full h-80 cursor-pointer perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="absolute w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-[#1e293b] border border-[#334155] rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="text-4xl mb-4">{card.front.emoji}</div>
          <h3 className="text-xl font-semibold text-white text-center mb-4">
            {card.front.question}
          </h3>
          {card.front.hint && (
            <p className="text-sm text-[#64748b]">Hint: {card.front.hint}</p>
          )}
          <p className="text-sm text-[#64748b] mt-4">Click to flip</p>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full backface-hidden bg-[#1e293b] border border-[#6366f1] rounded-xl p-6 flex flex-col"
          style={{ transform: "rotateY(180deg)" }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Answer</h3>
          <p className="text-white mb-4">{card.back.answer}</p>
          
          {card.back.key_points && card.back.key_points.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-[#94a3b8] mb-2">Key Points:</h4>
              <ul className="text-sm text-[#94a3b8] list-disc list-inside">
                {card.back.key_points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {card.exam_tip && (
            <div className="mt-auto pt-4 border-t border-[#334155]">
              <p className="text-sm text-[#f59e0b]">💡 Exam Tip: {card.exam_tip}</p>
            </div>
          )}

          <div className="mt-auto flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange?.("learning");
              }}
              className="px-4 py-2 bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg text-sm"
            >
              Still Learning
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange?.("known");
              }}
              className="px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg text-sm"
            >
              Got It!
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
