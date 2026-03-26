import { supabase } from './supabase';
import { getUser } from './auth';

export type FlashcardStatus = 'new' | 'learning' | 'known';

export async function getFlashcardProgress(cardId: string): Promise<FlashcardStatus | null> {
  const user = await getUser();
  
  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('flashcard_progress')
    .select('status')
    .eq('user_id', user.id)
    .eq('card_id', cardId)
    .single();

  if (error || !data) {
    return null;
  }

  return data.status as FlashcardStatus;
}

export async function updateFlashcardStatus(cardId: string, status: FlashcardStatus): Promise<boolean> {
  const user = await getUser();
  
  if (!user) {
    return false;
  }

  const now = new Date().toISOString();
  
  const { data: existing } = await supabase
    .from('flashcard_progress')
    .select('times_seen')
    .eq('user_id', user.id)
    .eq('card_id', cardId)
    .single();

  const timesSeen = existing ? existing.times_seen + 1 : 1;

  const { error } = await supabase
    .from('flashcard_progress')
    .upsert({
      user_id: user.id,
      card_id: cardId,
      status,
      last_seen: now,
      times_seen: timesSeen,
    }, {
      onConflict: 'user_id,card_id'
    });

  if (error) {
    console.error('Error updating flashcard progress:', error);
    return false;
  }

  return true;
}

export async function getAllFlashcardProgress(): Promise<Record<string, FlashcardStatus>> {
  const user = await getUser();
  
  if (!user) {
    return {};
  }

  const { data, error } = await supabase
    .from('flashcard_progress')
    .select('card_id, status')
    .eq('user_id', user.id);

  if (error || !data) {
    return {};
  }

  return data.reduce((acc, item) => {
    acc[item.card_id] = item.status as FlashcardStatus;
    return acc;
  }, {} as Record<string, FlashcardStatus>);
}

export function calculateNextReview(status: FlashcardStatus, timesSeen: number): Date {
  const now = new Date();
  
  switch (status) {
    case 'known':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    case 'learning':
      return new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    case 'new':
    default:
      return new Date(now.getTime() + 10 * 60 * 1000);
  }
}
