"use client";

import { FlashcardStatus } from '@/lib/flashcard-progress';

interface CardControlsProps {
  currentStatus: FlashcardStatus | null;
  onStatusChange: (status: FlashcardStatus) => void;
}

export function CardControls({ currentStatus, onStatusChange }: CardControlsProps) {
  const statuses: { value: FlashcardStatus; label: string; color: string; description: string }[] = [
    { 
      value: 'new', 
      label: 'New', 
      color: 'bg-[#6366f1]', 
      description: 'Haven\'t seen yet' 
    },
    { 
      value: 'learning', 
      label: 'Learning', 
      color: 'bg-[#f59e0b]', 
      description: 'Need more practice' 
    },
    { 
      value: 'known', 
      label: 'Known', 
      color: 'bg-[#22c55e]', 
      description: 'Got it!' 
    },
  ];

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
      <h3 className="text-sm font-medium text-[#94a3b8] mb-3">How well did you know this?</h3>
      <div className="flex gap-3">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`flex-1 p-3 rounded-lg border transition-all ${
              currentStatus === status.value
                ? `${status.color} border-transparent text-white`
                : 'border-[#334155] text-[#94a3b8] hover:border-[#6366f1]'
            }`}
          >
            <div className="font-medium">{status.label}</div>
            <div className="text-xs opacity-75">{status.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
