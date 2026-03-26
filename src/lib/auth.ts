import { auth } from '@clerk/nextjs/server';
import { supabase } from './supabase';

export async function getSession() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  return { userId };
}

export async function getUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', userId)
    .single();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  return userId;
}
