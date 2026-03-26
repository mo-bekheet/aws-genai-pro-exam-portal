import { Flashcard } from "@/types";

const GITHUB_RAW_URL = "https://raw.githubusercontent.com/mo-bekheet/aws-genai-pro-study-materials/main";

export async function fetchFlashcards(): Promise<Flashcard[]> {
  try {
    const response = await fetch(`${GITHUB_RAW_URL}/flashcards/all.json`, {
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch flashcards");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return [];
  }
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
