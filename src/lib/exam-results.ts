import { supabase } from './supabase';
import { getUser } from './auth';

export interface ExamResultInput {
  exam_id: string;
  mode: 'full' | 'quick' | 'domain';
  score: number;
  time_taken: number;
  answers: Record<string, string>;
  questions: Array<{
    id: string;
    domain: string;
    answer: string;
  }>;
}

export async function saveExamResult(result: ExamResultInput): Promise<boolean> {
  const user = await getUser();
  
  if (!user) {
    console.error('No user found for saving exam result');
    return false;
  }

  const { error } = await supabase.from('exam_results').insert({
    user_id: user.id,
    exam_id: result.exam_id,
    mode: result.mode,
    score: result.score,
    time_taken: result.time_taken,
    answers: result.answers,
  });

  if (error) {
    console.error('Error saving exam result:', error);
    return false;
  }

  await updateDomainScores(user.id, result.questions, result.answers);

  return true;
}

async function updateDomainScores(
  userId: string,
  questions: Array<{ id: string; domain: string; answer: string }>,
  answers: Record<string, string>
) {
  const domainScores: Record<string, { correct: number; total: number }> = {};

  questions.forEach((q) => {
    if (!domainScores[q.domain]) {
      domainScores[q.domain] = { correct: 0, total: 0 };
    }
    domainScores[q.domain].total++;
    if (answers[q.id] === q.answer) {
      domainScores[q.domain].correct++;
    }
  });

  for (const [domain_name, data] of Object.entries(domainScores)) {
    const { data: existing } = await supabase
      .from('domain_scores')
      .select('*')
      .eq('user_id', userId)
      .eq('domain_name', domain_name)
      .single();

    if (existing) {
      const newCorrect = existing.correct + data.correct;
      const newTotal = existing.total + data.total;
      
      await supabase
        .from('domain_scores')
        .update({
          correct: newCorrect,
          total: newTotal,
          last_updated: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('domain_name', domain_name);
    } else {
      await supabase
        .from('domain_scores')
        .insert({
          user_id: userId,
          domain_name,
          correct: data.correct,
          total: data.total,
          last_updated: new Date().toISOString(),
        });
    }
  }
}

export async function getExamResults(limit = 10) {
  const user = await getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('exam_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching exam results:', error);
    return [];
  }

  return data || [];
}

export async function getDomainScores() {
  const user = await getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('domain_scores')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching domain scores:', error);
    return [];
  }

  return data || [];
}
