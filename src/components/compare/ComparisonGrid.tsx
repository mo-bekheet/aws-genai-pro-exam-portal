"use client";

import { ComparisonMeta } from '@/types/comparison';
import { ComparisonCard } from './ComparisonCard';

interface ComparisonGridProps {
  comparisons: ComparisonMeta[];
}

export function ComparisonGrid({ comparisons }: ComparisonGridProps) {
  if (comparisons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-[#64748b]">
          No comparisons found. Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {comparisons.map(comparison => (
        <ComparisonCard key={comparison.slug} comparison={comparison} />
      ))}
    </div>
  );
}