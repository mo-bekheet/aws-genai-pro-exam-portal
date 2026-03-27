import { Flashcard } from "@/types";
import flashcardsData from "@/data/flashcards.json";

interface RawFlashcard {
  question: string;
  answer: string;
  hint: string;
}

function convertRawFlashcard(raw: RawFlashcard, index: number): Flashcard {
  return {
    id: `fc-${index + 1}`,
    domain: 'bedrock',
    type: 'concept',
    difficulty: 'easy',
    front: {
      question: raw.question,
      hint: raw.hint,
      emoji: '🟣',
    },
    back: {
      answer: raw.answer,
      key_points: [],
      mnemonic: '',
      analogy: '',
    },
    exam_tip: null,
    related_cards: [],
    tags: ['bedrock'],
  };
}

export async function fetchFlashcards(): Promise<Flashcard[]> {
  return (flashcardsData as RawFlashcard[]).map((f, i) => convertRawFlashcard(f, i));
}

export function filterFlashcards(
  flashcards: Flashcard[],
  filters: {
    domain?: string;
    difficulty?: string;
    type?: string;
  }
): Flashcard[] {
  return flashcards.filter((card) => {
    if (filters.domain && filters.domain !== "all" && card.domain !== filters.domain) {
      return false;
    }
    if (filters.difficulty && filters.difficulty !== "all" && card.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.type && filters.type !== "all" && card.type !== filters.type) {
      return false;
    }
    return true;
  });
}

export function getFlashcardStats(flashcards: Flashcard[]) {
  const total = flashcards.length;
  const byDomain = flashcards.reduce((acc, card) => {
    acc[card.domain] = (acc[card.domain] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const byType = flashcards.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return { total, byDomain, byType };
}
