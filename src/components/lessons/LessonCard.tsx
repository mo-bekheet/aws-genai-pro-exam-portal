"use client";

import Link from 'next/link';
import { Lesson, Domain, Difficulty } from '@/types';
import { DOMAIN_LABELS, DOMAIN_COLORS, DOMAIN_BORDER_COLORS } from '@/types';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
}

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
};

const domainLabels: Record<Domain, string> = {
  bedrock: 'Bedrock',
  foundations: 'Foundations',
  lifecycle: 'Lifecycle',
  responsible_ai: 'Responsible AI',
  security: 'Security',
};

export function LessonCard({ lesson, isCompleted }: LessonCardProps) {
  const borderColor = DOMAIN_BORDER_COLORS[lesson.domain];
  
  return (
    <Link href={`/dashboard/lessons/${lesson.slug}`}>
      <div className={`bg-[#1e293b] dark:bg-[#1e293b] border border-[#334155] rounded-lg p-5 hover:border-indigo-500 transition-all duration-300 group cursor-pointer border-l-4 ${borderColor}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-gray-500 dark:text-[#94a3b8]">{lesson.id}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[lesson.difficulty]}`}>
            {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
          </span>
        </div>
        
        <h3 className="text-base font-semibold text-white dark:text-white mb-2 group-hover:text-indigo-400 transition-colors">
          {lesson.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-[#94a3b8] line-clamp-1 mb-4">
          {lesson.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-[#94a3b8]">
              ⏱ {lesson.estimated_time} min
            </span>
            <span className="text-xs text-gray-500 dark:text-[#94a3b8]">
              {lesson.author}
            </span>
          </div>
          
          {isCompleted ? (
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
          )}
        </div>
      </div>
    </Link>
  );
}