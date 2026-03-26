"use client";

import { Flashcard, Domain, DOMAIN_LABELS } from '@/types';
import { FlashcardStatus } from '@/lib/flashcard-progress';

interface CardBrowserProps {
  cards: Flashcard[];
  currentIndex: number;
  onSelectCard: (index: number) => void;
  progress: Record<string, FlashcardStatus>;
}

export function CardBrowser({ cards, currentIndex, onSelectCard, progress }: CardBrowserProps) {
  const domains = [...new Set(cards.map(card => card.domain))] as Domain[];
  
  const getStatusColor = (cardId: string): string => {
    const status = progress[cardId];
    switch (status) {
      case 'known':
        return 'bg-[#22c55e]';
      case 'learning':
        return 'bg-[#f59e0b]';
      case 'new':
      default:
        return 'bg-[#334155]';
    }
  };

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
      <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Card Browser</h3>
      
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {domains.map(domain => {
          const domainCards = cards.filter(card => card.domain === domain);
          
          return (
            <div key={domain}>
              <div className="text-xs font-medium text-[#64748b] mb-2 uppercase tracking-wider">
                {DOMAIN_LABELS[domain]}
              </div>
              <div className="grid grid-cols-5 gap-1">
                {domainCards.map((card, idx) => {
                  const globalIndex = cards.indexOf(card);
                  const isActive = globalIndex === currentIndex;
                  
                  return (
                    <button
                      key={card.id}
                      onClick={() => onSelectCard(globalIndex)}
                      className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#6366f1] text-white'
                          : `${getStatusColor(card.id)} text-white hover:bg-[#6366f1]/50`
                      }`}
                      title={card.front.question.substring(0, 30)}
                    >
                      {globalIndex + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-[#334155] flex items-center justify-between text-xs text-[#64748b]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#334155]" />
            <span>New</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
            <span>Learning</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span>Known</span>
          </div>
        </div>
        <div>
          {cards.length} cards
        </div>
      </div>
    </div>
  );
}
