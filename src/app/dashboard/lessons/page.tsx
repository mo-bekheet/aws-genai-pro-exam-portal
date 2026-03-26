"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LessonCard } from '@/components/lessons/LessonCard';
import { LessonFilter } from '@/components/lessons/LessonFilter';
import { fetchLessons, getLessonsByDomain, getCompletedCount } from '@/lib/lessons';
import { useLessonStore } from '@/stores/lesson-store';
import { Lesson, Domain } from '@/types';

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeFilter, setActiveFilter] = useState<Domain | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { completedLessons } = useLessonStore();

  useEffect(() => {
    const loadLessons = async () => {
      const data = fetchLessons();
      setLessons(data);
      setIsLoading(false);
    };
    loadLessons();
  }, []);

  const completedIds = useMemo(
    () => new Set(completedLessons.map(c => c.lessonId)),
    [completedLessons]
  );

  const filteredLessons = useMemo(
    () => getLessonsByDomain(lessons, activeFilter),
    [lessons, activeFilter]
  );

  const lessonCounts = useMemo(() => {
    const counts: Record<Domain | 'all', number> = {
      all: lessons.length,
      bedrock: lessons.filter(l => l.domain === 'bedrock').length,
      foundations: lessons.filter(l => l.domain === 'foundations').length,
      lifecycle: lessons.filter(l => l.domain === 'lifecycle').length,
      responsible_ai: lessons.filter(l => l.domain === 'responsible_ai').length,
      security: lessons.filter(l => l.domain === 'security').length,
    };
    return counts;
  }, [lessons]);

  const completedCount = getCompletedCount(lessons, completedIds);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Lessons
        </h1>
        <p className="text-gray-600 dark:text-[#94a3b8] mb-4">
          Interactive lessons to master each exam domain
        </p>
        
        {/* Overall Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / lessons.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-[#94a3b8] whitespace-nowrap">
            {completedCount} of {lessons.length} lessons completed
          </span>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <LessonFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          lessonCounts={lessonCounts}
        />
      </motion.div>

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center gap-2 text-gray-500 dark:text-[#94a3b8]">
            <span>No lessons yet for this domain — be the first to contribute</span>
            <span className="text-indigo-500">→</span>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              <LessonCard
                lesson={lesson}
                isCompleted={completedIds.has(lesson.id)}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}