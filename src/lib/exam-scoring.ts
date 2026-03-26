import { Domain, DOMAIN_LABELS, DOMAIN_COLORS } from '@/types';

export interface Question {
  id: string;
  domain: Domain;
  answer: string;
}

export interface ExamScoreResult {
  score: number;
  correct: number;
  total: number;
  timeTaken: number;
  domainBreakdown: Array<{
    domain: Domain;
    correct: number;
    total: number;
    percentage: number;
  }>;
}

export function calculateExamScore(
  questions: Question[],
  answers: Record<string, string>,
  timeTaken: number
): ExamScoreResult {
  const domainScores: Record<string, { correct: number; total: number }> = {};
  let correct = 0;

  questions.forEach((q) => {
    if (!domainScores[q.domain]) {
      domainScores[q.domain] = { correct: 0, total: 0 };
    }
    domainScores[q.domain].total++;

    if (answers[q.id] === q.answer) {
      correct++;
      domainScores[q.domain].correct++;
    }
  });

  const total = questions.length;
  const score = total > 0 ? (correct / total) * 100 : 0;

  const domainBreakdown = Object.entries(domainScores).map(([domain, data]) => ({
    domain: domain as Domain,
    correct: data.correct,
    total: data.total,
    percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
  }));

  return {
    score: Math.round(score),
    correct,
    total,
    timeTaken,
    domainBreakdown,
  };
}

export function getPassFailStatus(score: number, passingScore = 70): {
  passed: boolean;
  status: 'passed' | 'failed';
  message: string;
} {
  const passed = score >= passingScore;
  
  return {
    passed,
    status: passed ? 'passed' : 'failed',
    message: passed 
      ? 'Congratulations! You passed the exam!' 
      : 'Keep studying! You\'ll get there.',
  };
}

export function getDomainPerformanceColor(percentage: number): string {
  if (percentage >= 70) return DOMAIN_COLORS.foundations;
  if (percentage >= 40) return DOMAIN_COLORS.lifecycle;
  return DOMAIN_COLORS.security;
}

export function getWeakDomains(domainBreakdown: ExamScoreResult['domainBreakdown']): Domain[] {
  return domainBreakdown
    .filter(d => d.percentage < 70)
    .sort((a, b) => a.percentage - b.percentage)
    .map(d => d.domain);
}
