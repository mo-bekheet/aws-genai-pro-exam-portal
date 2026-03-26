"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FilterSidebar } from '@/components/questions/PracticeFilterSidebar';
import { AnswerOption } from '@/components/questions/PracticeAnswerOption';
import { Question, Domain, DOMAIN_LABELS } from '@/types';
import { useQuestionPracticeStore } from '@/stores/question-practice-store';

const mockQuestions: Question[] = Array.from({ length: 128 }, (_, i) => ({
  id: `Q${String(i + 1).padStart(3, '0')}`,
  domain: (['bedrock', 'foundations', 'lifecycle', 'responsible_ai', 'security'] as const)[i % 5],
  subdomain: 'basics',
  difficulty: (['easy', 'medium', 'hard'] as const)[i % 3],
  type: 'single' as const,
  stem: i % 5 === 0 
    ? "A company needs private Bedrock API access with no public internet traversal. Which solution meets this requirement?"
    : i % 5 === 1
    ? "What is the primary purpose of Amazon Bedrock in the AWS AI/ML ecosystem?"
    : i % 5 === 2
    ? "Which of the following is NOT a foundation model provider available on Amazon Bedrock?"
    : i % 5 === 3
    ? "What are the key considerations when implementing Responsible AI in a production system?"
    : "How does the GenAI application lifecycle differ from traditional ML workflows?",
  options: {
    A: i % 5 === 0 ? "VPC endpoint + PrivateLink" : "A fully managed service for building generative AI applications",
    B: i % 5 === 0 ? "NAT Gateway to Bedrock endpoint" : "A database service for storing training data",
    C: i % 5 === 0 ? "Internet Gateway with security groups" : "A container orchestration platform",
    D: i % 5 === 0 ? "Transit Gateway with route tables" : "A serverless computing service",
  },
  answer: 'A',
  explanation: i % 5 === 0 
    ? "VPC endpoints + PrivateLink keep all traffic on the AWS private network, eliminating public internet traversal. This is the recommended pattern for private Bedrock access."
    : "Amazon Bedrock is a fully managed service that offers a choice of high-performing foundation models from leading AI companies.",
  distractors: "The other options either route through public internet (NAT, IGW) or don't provide the required private access pattern.",
  source: null,
  tags: ['vpc', 'privatelink', 'security', 'network'],
  contributor: 'mo-bekheet',
  date_added: '2025-01',
}));

const domainLabels: Record<Domain, string> = {
  bedrock: 'Bedrock',
  foundations: 'Foundations',
  lifecycle: 'Lifecycle',
  responsible_ai: 'Responsible AI',
  security: 'Security',
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  hard: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
};

export default function QuestionPracticePage() {
  const {
    currentIndex,
    selectedAnswer,
    isAnswered,
    mode,
    filters,
    flaggedQuestions,
    savedQuestions,
    toggleFlag,
    toggleSave,
    toggleLike,
    nextQuestion,
    prevQuestion,
    setFilterDomain,
    setFilterDifficulty,
    setFilterStatus,
    setFilterSearch,
    resetFilters,
  } = useQuestionPracticeStore();

  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter((q) => {
      if (filters.domains.length > 0 && !filters.domains.includes(q.domain)) return false;
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(q.difficulty)) return false;
      if (filters.search && !q.stem.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status === 'flagged' && !flaggedQuestions.includes(q.id)) return false;
      if (filters.status === 'saved' && !savedQuestions.includes(q.id)) return false;
      return true;
    });
  }, [filters, flaggedQuestions, savedQuestions]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  
  const questionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockQuestions.forEach((q) => {
      counts[q.domain] = (counts[q.domain] || 0) + 1;
    });
    return counts;
  }, []);

  const activeFilters = useMemo(() => {
    const filterParts: string[] = [];
    if (filters.domains.length > 0) {
      filters.domains.forEach((d) => filterParts.push(DOMAIN_LABELS[d as Domain]));
    }
    if (filters.difficulty.length > 0) {
      filters.difficulty.forEach((d) => filterParts.push(d.charAt(0).toUpperCase() + d.slice(1)));
    }
    if (filters.search) {
      filterParts.push(`"${filters.search}"`);
    }
    return filterParts;
  }, [filters]);

  const removeFilter = (filter: string) => {
    const domainKey = Object.entries(DOMAIN_LABELS).find(([_, label]) => label === filter)?.[0];
    if (domainKey) {
      setFilterDomain(filters.domains.filter(d => d !== domainKey));
      return;
    }
    if (['Easy', 'Medium', 'Hard'].includes(filter)) {
      setFilterDifficulty(filters.difficulty.filter(d => d !== filter.toLowerCase()));
      return;
    }
    if (filter.startsWith('"') && filter.endsWith('"')) {
      setFilterSearch('');
    }
  };

  const handleSelect = (answer: string) => {
    if (!isAnswered) {
      const store = useQuestionPracticeStore.getState();
      store.selectAnswer(answer);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex h-screen">
        <FilterSidebar
          questionCounts={questionCounts}
          selectedDomains={filters.domains}
          selectedDifficulty={filters.difficulty}
          selectedStatus={filters.status}
          searchQuery={filters.search}
          onDomainChange={setFilterDomain}
          onDifficultyChange={setFilterDifficulty}
          onStatusChange={setFilterStatus}
          onSearchChange={setFilterSearch}
          onReset={resetFilters}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">No questions found</h2>
            <p className="text-[#94a3b8] mb-4">Try adjusting your filters</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.answer;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <FilterSidebar
        questionCounts={questionCounts}
        selectedDomains={filters.domains}
        selectedDifficulty={filters.difficulty}
        selectedStatus={filters.status}
        searchQuery={filters.search}
        onDomainChange={setFilterDomain}
        onDifficultyChange={setFilterDifficulty}
        onStatusChange={setFilterStatus}
        onSearchChange={setFilterSearch}
        onReset={resetFilters}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex-shrink-0 bg-[#0a0f1e] border-b border-[#334155] px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">
                {filteredQuestions.length} questions
              </span>
              {activeFilters.length > 0 && (
                <div className="flex items-center gap-2">
                  {activeFilters.map((filter, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm"
                    >
                      {filter}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-[#1e293b] rounded-lg p-1">
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  mode === 'practice' ? 'bg-indigo-500 text-white' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Practice Mode
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  mode === 'timed' ? 'bg-indigo-500 text-white' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                Timed Mode
              </button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-[#94a3b8]">
              Question {currentIndex + 1} of {filteredQuestions.length}
            </span>
            <div className="flex-1 h-1 bg-[#334155] rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Question Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-mono text-gray-500">{currentQuestion.id}</span>
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full">
                {domainLabels[currentQuestion.domain]}
              </span>
              <span className={`px-2.5 py-1 text-sm rounded-full ${difficultyColors[currentQuestion.difficulty as keyof typeof difficultyColors]}`}>
                {currentQuestion.difficulty}
              </span>
              <div className="flex gap-1">
                {currentQuestion.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-[#334155] text-[#94a3b8] text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Question Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-xl text-white leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', lineHeight: '1.7' }}>
                {currentQuestion.stem}
              </h2>
            </motion.div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {Object.entries(currentQuestion.options).map(([letter, text], i) => (
                <AnswerOption
                  key={letter}
                  letter={letter}
                  text={text}
                  isSelected={selectedAnswer === letter}
                  isCorrect={isAnswered && letter === currentQuestion.answer}
                  isWrong={isAnswered && selectedAnswer === letter && letter !== currentQuestion.answer}
                  isAnswered={isAnswered}
                  onSelect={() => handleSelect(letter)}
                />
              ))}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  {/* Correct Answer Explanation */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-5 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-green-400 font-semibold">✅ Why this is correct</span>
                    </div>
                    <p className="text-gray-300">{currentQuestion.explanation}</p>
                  </div>

                  {/* Distractors */}
                  <div className="bg-[#1e293b] rounded-lg p-4">
                    <button className="flex items-center justify-between w-full text-left">
                      <span className="text-[#94a3b8]">View distractors</span>
                      <svg className="w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="mt-3 space-y-2">
                      {Object.entries(currentQuestion.options)
                        .filter(([letter]) => letter !== currentQuestion.answer)
                        .map(([letter, text]) => (
                          <div key={letter} className="text-sm text-[#94a3b8] border-t border-[#334155] pt-2">
                            <span className="text-red-400">❌ {letter}</span> — {currentQuestion.distractors.split(letter)[0] || text}
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex-shrink-0 bg-[#0a0f1e] border-t border-[#334155] px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleFlag(currentQuestion.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  flaggedQuestions.includes(currentQuestion.id)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
                </svg>
                Flag
              </button>
              <button
                onClick={() => toggleSave(currentQuestion.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  savedQuestions.includes(currentQuestion.id)
                    ? 'text-indigo-400 bg-indigo-400/10'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
                Save
              </button>
              <button
                onClick={() => toggleLike(currentQuestion.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  useQuestionPracticeStore.getState().likedQuestions.includes(currentQuestion.id)
                    ? 'text-pink-400 bg-pink-400/10'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                👍 Like
              </button>
              <button className="text-[#94a3b8] hover:text-white px-3 py-2">
                ⚠️ Report Error
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-[#94a3b8] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={nextQuestion}
                disabled={currentIndex >= filteredQuestions.length - 1}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}