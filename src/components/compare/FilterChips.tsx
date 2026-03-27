"use client";

import { ComparisonMeta, DOMAIN_LABELS } from '@/types/comparison';

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  comparisons: ComparisonMeta[];
}

const filters = ['all', 'bedrock', 'rag', 'security', 'inference', 'storage', 'compute'];

export function FilterChips({ activeFilter, onFilterChange, comparisons }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map(filter => {
        const isActive = activeFilter === filter;
        const label = filter === 'all' ? 'All' : DOMAIN_LABELS[filter as keyof typeof DOMAIN_LABELS] || filter;
        
        const count = filter === 'all' 
          ? comparisons.length 
          : comparisons.filter(c => c.domain === filter).length;

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              isActive
                ? 'bg-[#6366f1] text-white'
                : 'bg-transparent border border-gray-300 dark:border-[#334155] text-gray-600 dark:text-[#94a3b8] hover:border-[#6366f1] hover:text-[#6366f1]'
            }`}
          >
            {label}
            <span className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400 dark:text-[#64748b]'}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}