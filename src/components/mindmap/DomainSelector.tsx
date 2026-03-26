"use client";

import { Domain, DOMAIN_LABELS, DOMAIN_COLORS } from '@/types';

interface DomainSelectorProps {
  currentDomain: Domain;
  onDomainChange: (domain: Domain) => void;
}

const domainColors: Record<Domain, string> = {
  bedrock: '#6366f1',
  foundations: '#38bdf8',
  lifecycle: '#8b5cf6',
  responsible_ai: '#f59e0b',
  security: '#ef4444',
};

export function DomainSelector({ currentDomain, onDomainChange }: DomainSelectorProps) {
  const domains = Object.keys(DOMAIN_LABELS) as Domain[];

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-indigo-200 dark:hover:bg-indigo-500/30 transition-colors"
        style={{ borderColor: domainColors[currentDomain] }}
      >
        <span>{DOMAIN_LABELS[currentDomain]}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <select
        value={currentDomain}
        onChange={(e) => onDomainChange(e.target.value as Domain)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      >
        {domains.map((domain) => (
          <option key={domain} value={domain}>
            {DOMAIN_LABELS[domain]}
          </option>
        ))}
      </select>
    </div>
  );
}