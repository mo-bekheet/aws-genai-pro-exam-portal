"use client";

import Link from 'next/link';
import { ComparisonMeta, DOMAIN_COLORS } from '@/types/comparison';

interface RelatedComparisonsProps {
  comparisons: ComparisonMeta[];
}

export function RelatedComparisons({ comparisons }: RelatedComparisonsProps) {
  if (comparisons.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-[#334155]">
      <h3 className="text-sm font-medium text-gray-500 dark:text-[#64748b] mb-4">
        Related comparisons
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {comparisons.map(comp => {
          const color = DOMAIN_COLORS[comp.domain];
          const firstService = comp.services[0];
          const otherServices = comp.services.slice(1).join(' vs ');
          
          return (
            <Link
              key={comp.slug}
              href={`/dashboard/compare/${comp.slug}`}
              className="block p-4 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-lg hover:border-[#6366f1] transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {comp.domain}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {firstService} vs {otherServices}
              </h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
}