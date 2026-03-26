"use client";

import { useState, useEffect } from "react";

interface ExamTimerProps {
  duration: number;
  onTimeUp?: () => void;
}

export function ExamTimer({ duration, onTimeUp }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isWarning = timeLeft <= 600;
  const isCritical = timeLeft <= 300;

  return (
    <div
      className={`px-4 py-2 rounded-lg font-mono text-xl font-bold ${
        isCritical
          ? "bg-[#ef4444] text-white animate-pulse"
          : isWarning
          ? "bg-[#f59e0b] text-white"
          : "bg-[#1e293b] text-white border border-[#334155]"
      }`}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      {isWarning && <span className="ml-2 text-sm">remaining</span>}
    </div>
  );
}
