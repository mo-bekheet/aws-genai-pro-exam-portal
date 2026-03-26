export interface User {
  id: string;
  clerk_id: string;
  username: string | null;
  email: string;
  exam_date: string | null;
  streak_count: number;
  last_study_date: string | null;
  created_at: string;
}

export interface Question {
  id: string;
  domain: 'foundations' | 'bedrock' | 'lifecycle' | 'responsible_ai' | 'security';
  subdomain: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'single' | 'multi';
  stem: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  explanation: string;
  distractors: string;
  source: string | null;
  tags: string[];
  contributor: string;
  date_added: string;
}

export interface Flashcard {
  id: string;
  domain: string;
  type: 'concept' | 'comparison' | 'scenario' | 'fact' | 'gotcha';
  difficulty: 'easy' | 'medium' | 'hard';
  front: {
    question: string;
    hint: string;
    emoji: string;
  };
  back: {
    answer: string;
    key_points: string[];
    mnemonic: string;
    analogy: string;
  };
  exam_tip: string | null;
  related_cards: string[];
  tags: string[];
}

export interface FlashcardProgress {
  user_id: string;
  card_id: string;
  status: 'new' | 'learning' | 'known';
  last_seen: string | null;
  times_seen: number;
}

export interface QuestionInteraction {
  user_id: string;
  question_id: string;
  is_saved: boolean;
  is_flagged: boolean;
  is_liked: boolean;
  user_answer: string | null;
  is_correct: boolean | null;
  answered_at: string | null;
}

export interface ExamResult {
  id: string;
  user_id: string;
  exam_id: string;
  mode: 'full' | 'quick' | 'domain';
  score: number;
  time_taken: number | null;
  answers: Record<string, string>;
  created_at: string;
}

export interface DomainScore {
  user_id: string;
  domain_name: string;
  correct: number;
  total: number;
  last_updated: string;
}

export interface StreakLog {
  user_id: string;
  study_date: string;
  minutes_studied: number;
  activity_type: string | null;
}

export type Domain = 'foundations' | 'bedrock' | 'lifecycle' | 'responsible_ai' | 'security';

export const DOMAIN_LABELS: Record<Domain, string> = {
  foundations: 'AI/ML Foundations',
  bedrock: 'GenAI Development and Bedrock',
  lifecycle: 'GenAI Application Lifecycle',
  responsible_ai: 'Guidelines and Responsible AI',
  security: 'Security, Compliance and Governance',
};

export const DOMAIN_COLORS: Record<Domain, string> = {
  foundations: '#6366f1',
  bedrock: '#22c55e',
  lifecycle: '#f59e0b',
  responsible_ai: '#38bdf8',
  security: '#ef4444',
};

export const DOMAIN_BORDER_COLORS: Record<Domain, string> = {
  foundations: 'border-l-blue-500',
  bedrock: 'border-l-indigo-500',
  lifecycle: 'border-l-purple-500',
  responsible_ai: 'border-l-amber-500',
  security: 'border-l-red-500',
};

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface KnowledgeCheckOption {
  id: string;
  text: string;
}

export interface KnowledgeCheck {
  question: string;
  options: KnowledgeCheckOption[];
  correctAnswer: string;
  explanation: string;
}

export interface LessonSection {
  type: 'text' | 'concept' | 'analogy' | 'exam-tip' | 'warning' | 'reveal' | 'diagram' | 'knowledge-check';
  title?: string;
  content?: string;
  items?: string[];
  tableData?: string[][];
  knowledgeCheck?: KnowledgeCheck;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  domain: Domain;
  difficulty: Difficulty;
  estimated_time: number;
  author: string;
  date: string;
  order: number;
  description: string;
  content: LessonSection[];
  is_completed?: boolean;
}
