"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fetchLessons, getLessonBySlug, getAdjacentLessons } from '@/lib/lessons';
import { useLessonStore } from '@/stores/lesson-store';
import { LessonSectionRenderer } from '@/components/lessons/LessonSectionRenderer';
import { Lesson, Domain, Difficulty } from '@/types';

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
};

const domainLabels: Record<Domain, string> = {
  bedrock: 'Amazon Bedrock',
  foundations: 'AI/ML Foundations',
  lifecycle: 'GenAI Application Lifecycle',
  responsible_ai: 'Responsible AI',
  security: 'Security & Compliance',
};

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [adjacent, setAdjacent] = useState<{ prev: Lesson | null; next: Lesson | null }>({ prev: null, next: null });
  const [isLoading, setIsLoading] = useState(true);
  const [showReveal, setShowReveal] = useState<Record<number, boolean>>({});
  
  const { completedLessons, markLessonComplete, isLessonCompleted } = useLessonStore();

  const completed = lesson ? isLessonCompleted(lesson.id) : false;

  useEffect(() => {
    const data = fetchLessons();
    setAllLessons(data);
    
    const found = getLessonBySlug(data, slug);
    setLesson(found || null);
    
    if (found) {
      const adj = getAdjacentLessons(data, slug);
      setAdjacent(adj);
    }
    
    setIsLoading(false);
  }, [slug]);

  const handleComplete = () => {
    if (lesson) {
      markLessonComplete(lesson.id);
    }
  };

  const toggleReveal = (index: number) => {
    setShowReveal(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
        <Link href="/dashboard/lessons" className="text-indigo-500 hover:text-indigo-400">
          ← Back to Lessons
        </Link>
      </div>
    );
  }

  const completedCount = allLessons.filter(l => isLessonCompleted(l.id)).length;

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-40 bg-[#0a0f1e]/90 backdrop-blur-md border-b border-[#334155]">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back Link */}
            <Link 
              href="/dashboard/lessons" 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span className="hidden sm:inline">Lessons</span>
            </Link>

            {/* Center Title */}
            <h1 className="text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-none">
              {lesson.title}
            </h1>

            {/* Right Info */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                {lesson.id}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[lesson.difficulty]}`}>
                {lesson.difficulty}
              </span>
              <span className="text-xs text-gray-500 hidden sm:inline">
                {completedCount + 1} of {allLessons.length}
              </span>
              {completed ? (
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Area */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full">
              {domainLabels[lesson.domain]}
            </span>
            <span className={`px-3 py-1 text-sm rounded-full ${difficultyColors[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              ⏱ {lesson.estimated_time} min
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {lesson.title}
          </h1>
          
          <p className="text-gray-500">
            by {lesson.author} · {new Date(lesson.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-2">
          {lesson.content.map((section, index) => (
            <LessonSectionRenderer key={index} section={section} />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-[#334155]">
          <div className="flex justify-between items-center">
            {adjacent.prev ? (
              <Link 
                href={`/dashboard/lessons/${adjacent.prev.slug}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm">← Previous</span>
                <p className="text-sm font-medium">{adjacent.prev.title}</p>
              </Link>
            ) : (
              <div />
            )}
            
            {adjacent.next && (
              <Link 
                href={`/dashboard/lessons/${adjacent.next.slug}`}
                className="text-gray-400 hover:text-white transition-colors text-right"
              >
                <span className="text-sm">Next →</span>
                <p className="text-sm font-medium">{adjacent.next.title}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}