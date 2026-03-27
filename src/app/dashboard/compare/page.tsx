"use client";

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAllComparisons, getComparisonBySlug, getRelatedComparisons, filterComparisons } from '@/lib/comparisons';
import { FilterChips, ComparisonGrid, ComparisonDetail, RelatedComparisons } from '@/components/compare';

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export default function ComparePage({ params }: PageProps) {
  const router = useRouter();
  const currentParams = useParams();
  const slug = currentParams?.slug as string | undefined;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const allComparisons = useMemo(() => getAllComparisons(), []);
  
  const filteredComparisons = useMemo(() => {
    return filterComparisons(allComparisons, searchQuery, activeFilter);
  }, [allComparisons, searchQuery, activeFilter]);
  
  const currentComparison = slug ? getComparisonBySlug(slug) : null;
  const relatedComparisons = slug ? getRelatedComparisons(slug) : [];
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  // Detail view
  if (currentComparison) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
        <ComparisonDetail comparison={currentComparison} />
        <div className="max-w-6xl mx-auto px-6 pb-8">
          <RelatedComparisons comparisons={relatedComparisons} />
        </div>
      </div>
    );
  }
  
  // Browse view
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-plus-jakarta)]">
            Services & Methods — Compare
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#94a3b8] mb-6 font-[family-name:var(--font-inter)]">
            Side-by-side comparisons to nail the exam scenarios
          </p>
          
          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search comparisons..."
              className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#64748b] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] transition-colors"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Filter Chips */}
          <FilterChips 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange}
            comparisons={allComparisons}
          />
        </div>
        
        {/* Grid */}
        <ComparisonGrid comparisons={filteredComparisons} />
      </div>
    </div>
  );
}