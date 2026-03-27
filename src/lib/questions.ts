import { Question } from "@/types";
import questionsData from "@/data/questions.json";

export async function fetchQuestions(): Promise<Question[]> {
  return questionsData as Question[];
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
