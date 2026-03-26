"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { ExamHistoryTable } from "@/components/dashboard/ExamHistoryTable";
import { DomainProgress } from "@/components/dashboard/DomainProgress";

const mockUser = {
  name: "Ahmed",
  greeting: "Good morning",
  examDate: "AIP-C01",
  daysUntilExam: 47,
};

const mockStats = {
  questionsAnswered: 342,
  averageScore: 74,
  currentStreak: 12,
  weakestDomain: "Security",
  weakestScore: 41,
};

const mockDomainScores = [
  { domain_name: "foundations" as const, correct: 20, total: 25 },
  { domain_name: "bedrock" as const, correct: 9, total: 20 },
  { domain_name: "lifecycle" as const, correct: 6, total: 15 },
  { domain_name: "responsible_ai" as const, correct: 9, total: 15 },
  { domain_name: "security" as const, correct: 5, total: 12 },
];

const mockExamHistory = [
  { date: "Mar 20, 2026", exam: "Practice Test #3", score: 78, passed: true },
  { date: "Mar 15, 2026", exam: "Practice Test #2", score: 65, passed: false },
  { date: "Mar 10, 2026", exam: "Practice Test #1", score: 82, passed: true },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Greeting Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {mockUser.greeting}, {mockUser.name} 👋
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/20 rounded-full">
          <span className="text-base">📅</span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 font-mono">
            {mockUser.daysUntilExam} days until {mockUser.examDate}
          </span>
        </div>
      </motion.div>

      {/* Streak Card */}
      <StreakCard streak={mockStats.currentStreak} lastStudied="today" delay={0.1} />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={mockStats.questionsAnswered} label="Questions Answered" delay={0.15} />
        <StatCard value={`${mockStats.averageScore}%`} label="Average Score" delay={0.2} />
        <StatCard value={mockStats.currentStreak} label="Day Streak" delay={0.25} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-5 hover:border-indigo-500 dark:hover:border-[#6366f1] transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-500 dark:text-[#94a3b8]">Weakest Domain</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{mockStats.weakestDomain}</div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 font-mono">
            {mockStats.weakestScore}%
          </div>
        </motion.div>
      </div>

      {/* Domain Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Domain Readiness</h2>
        <DomainProgress domainScores={mockDomainScores} />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard icon="📚" title="Continue Lessons" href="/lessons" delay={0.45} />
          <QuickActionCard icon="📝" title="Start Mock Exam" href="/exams" delay={0.5} />
          <QuickActionCard icon="⚠️" title="Weak Areas" href="/progress" delay={0.55} />
          <QuickActionCard icon="🗺️" title="View Roadmap" href="/roadmap" delay={0.6} />
        </div>
      </motion.div>

      {/* Recent Exam History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
      >
        <ExamHistoryTable history={mockExamHistory} delay={0.7} />
      </motion.div>
    </div>
  );
}