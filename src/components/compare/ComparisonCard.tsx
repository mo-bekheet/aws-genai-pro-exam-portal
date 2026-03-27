"use client";

import Link from 'next/link';
import { ComparisonMeta, DOMAIN_LABELS, DOMAIN_COLORS } from '@/types/comparison';

interface ComparisonCardProps {
  comparison: ComparisonMeta;
}

export function ComparisonCard({ comparison }: ComparisonCardProps) {
  const color = DOMAIN_COLORS[comparison.domain];
  const domainLabel = DOMAIN_LABELS[comparison.domain];
  const serviceCount = comparison.services.length;

  const firstService = comparison.services[0];
  const otherServices = comparison.services.slice(1).join(' vs ');

  return (
    <Link 
      href={`/dashboard/compare/${comparison.slug}`}
      className="block group"
    >
      <div className="h-full p-4 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl hover:border-[#6366f1] transition-all duration-200">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {domainLabel}
          </span>
          <span className="text-xs text-gray-500 dark:text-[#64748b]">
            {serviceCount} {serviceCount === 1 ? 'service' : 'services'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#6366f1] transition-colors">
          {firstService} vs {otherServices}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 dark:text-[#94a3b8] mb-3 line-clamp-1">
          {comparison.subtitle}
        </p>

        {/* Service Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {comparison.services.map((service, idx) => {
            const colors = ['#6366f1', '#8b5cf6', '#38bdf8', '#22c55e'];
            const pillColor = colors[idx % colors.length];
            return (
              <span 
                key={service}
                className="px-2 py-0.5 text-xs rounded-md text-white"
                style={{ backgroundColor: pillColor }}
              >
                {service}
              </span>
            );
          })}
        </div>

        {/* Exam Tip Preview */}
        {comparison.exam_tip && (
          <p className="text-xs text-[#6366f1] mb-3 line-clamp-1">
            🎯 {comparison.exam_tip.split('.')[0]}
          </p>
        )}

        {/* Arrow */}
        <div className="flex items-center text-sm text-[#6366f1] font-medium">
          Open Comparison
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}