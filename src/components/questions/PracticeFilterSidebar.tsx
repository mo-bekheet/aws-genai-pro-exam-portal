"use client";

import { useState } from 'react';
import { Domain, DOMAIN_LABELS } from '@/types';

interface FilterSidebarProps {
  questionCounts: Record<string, number>;
  selectedDomains: string[];
  selectedDifficulty: string[];
  selectedStatus: 'all' | 'saved' | 'flagged' | 'attempted';
  searchQuery: string;
  onDomainChange: (domains: string[]) => void;
  onDifficultyChange: (difficulty: string[]) => void;
  onStatusChange: (status: 'all' | 'saved' | 'flagged' | 'attempted') => void;
  onSearchChange: (search: string) => void;
  onReset: () => void;
}

const domainLabels: Record<string, string> = {
  bedrock: 'Bedrock',
  foundations: 'Foundations',
  lifecycle: 'Lifecycle',
  responsible_ai: 'Responsible AI',
  security: 'Security',
};

const allTags = ['vpc', 'privatelink', 'security', 'rag', 'fine-tuning', 'bedrock', 'lambda', 'iam', 's3', 'kms', 'cloudwatch'];

export function FilterSidebar({
  questionCounts,
  selectedDomains,
  selectedDifficulty,
  selectedStatus,
  searchQuery,
  onDomainChange,
  onDifficultyChange,
  onStatusChange,
  onSearchChange,
  onReset,
}: FilterSidebarProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      onDomainChange(selectedDomains.filter(d => d !== domain));
    } else {
      onDomainChange([...selectedDomains, domain]);
    }
  };

  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulty.includes(difficulty)) {
      onDifficultyChange(selectedDifficulty.filter(d => d !== difficulty));
    } else {
      onDifficultyChange([...selectedDifficulty, difficulty]);
    }
  };

  const displayedTags = showAllTags ? allTags : allTags.slice(0, 6);

  return (
    <div className="w-[22%] min-w-[240px] bg-[#0a0f1e] border-r border-[#334155] p-4 h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Filters</h2>
        <button
          onClick={onReset}
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          Reset
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-[#1e293b] border border-[#334155] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Domain Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Domain</h3>
        <div className="space-y-2">
          {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
            const count = questionCounts[key] || 0;
            const isSelected = selectedDomains.includes(key);
            return (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-[#334155] group-hover:border-indigo-400'}`}>
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => toggleDomain(key)}
                />
                <span className={`text-sm ${isSelected ? 'text-white' : 'text-[#94a3b8]'}`}>
                  {label}
                </span>
                <span className="ml-auto text-xs text-gray-500">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Difficulty Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {['easy', 'medium', 'hard'].map((diff) => {
            const isSelected = selectedDifficulty.includes(diff);
            const colors = {
              easy: 'bg-green-500/20 text-green-400 border-green-500/50',
              medium: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
              hard: 'bg-red-500/20 text-red-400 border-red-500/50',
            };
            return (
              <button
                key={diff}
                onClick={() => toggleDifficulty(diff)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? colors[diff as keyof typeof colors]
                    : 'bg-transparent border-[#334155] text-[#94a3b8] hover:border-[#6366f1]'
                }`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Status</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'saved', label: 'Saved' },
            { value: 'flagged', label: 'Flagged' },
            { value: 'attempted', label: 'Attempted' },
          ].map((status) => (
            <button
              key={status.value}
              onClick={() => onStatusChange(status.value as 'all' | 'saved' | 'flagged' | 'attempted')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedStatus === status.value
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : 'bg-transparent border-[#334155] text-[#94a3b8] hover:border-[#6366f1]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {displayedTags.map((tag) => (
            <button
              key={tag}
              className="px-2.5 py-1 bg-[#1e293b] border border-[#334155] rounded-md text-xs text-[#94a3b8] hover:border-indigo-500 hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
          {!showAllTags && (
            <button
              onClick={() => setShowAllTags(true)}
              className="px-2.5 py-1 text-xs text-indigo-400 hover:text-indigo-300"
            >
              + more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}