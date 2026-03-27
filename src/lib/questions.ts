import { Question } from "@/types";
import questionsData from "@/data/questions/all.json";

interface RawQuestion {
  type: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

function convertRawQuestion(raw: RawQuestion, index: number): Question {
  const optionsMap = ['A', 'B', 'C', 'D'];
  return {
    id: `q-${index + 1}`,
    domain: 'bedrock',
    subdomain: null,
    difficulty: 'medium',
    type: 'single',
    stem: raw.question,
    options: {
      A: raw.options[0] || '',
      B: raw.options[1] || '',
      C: raw.options[2] || '',
      D: raw.options[3] || '',
    },
    answer: optionsMap[raw.correct] || 'A',
    explanation: raw.explanation,
    distractors: '',
    source: null,
    tags: ['bedrock'],
    contributor: 'mo-bekheet',
    date_added: '2024-01-01',
  };
}

export async function fetchQuestions(): Promise<Question[]> {
  return (questionsData as RawQuestion[]).map((q, i) => convertRawQuestion(q, i));
}

export function filterQuestions(
  questions: Question[],
  filters: {
    domain?: string;
    difficulty?: string;
  }
): Question[] {
  return questions.filter((q) => {
    if (filters.domain && filters.domain !== "all" && q.domain !== filters.domain) {
      return false;
    }
    if (filters.difficulty && filters.difficulty !== "all" && q.difficulty !== filters.difficulty) {
      return false;
    }
    return true;
  });
}

export function getQuestionStats(questions: Question[]) {
  const total = questions.length;
  const byDomain = questions.reduce((acc, q) => {
    acc[q.domain] = (acc[q.domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const byDifficulty = questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return { total, byDomain, byDifficulty };
}
