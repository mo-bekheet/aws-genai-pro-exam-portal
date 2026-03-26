"use client";

import { Domain } from '@/types';

type FilterOption = Domain | 'all';

interface LessonFilterProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  lessonCounts: Record<FilterOption, number>;
}

const filters: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'bedrock', label: 'Bedrock' },
  { value: 'foundations', label: 'Foundations' },
  { value: 'lifecycle', label: 'Lifecycle' },
  { value: 'responsible_ai', label: 'Responsible AI' },
  { value: 'security', label: 'Security' },
];

export function LessonFilter({ activeFilter, onFilterChange, lessonCounts }: LessonFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;
        const count = lessonCounts[filter.value];
        
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-indigo-500 text-white'
                : 'bg-transparent border border-gray-300 dark:border-[#334155] text-gray-600 dark:text-[#94a3b8] hover:border-indigo-500 hover:text-indigo-500'
            }`}
          >
            {filter.label}
            <span className={`ml-1.5 text-xs ${isActive ? 'text-indigo-200' : 'text-gray-400'}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}