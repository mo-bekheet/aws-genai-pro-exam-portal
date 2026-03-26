import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface WebhookEvent {
  type: 'user.created' | 'user.updated' | 'user.deleted';
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    username?: string;
    image_url?: string;
  };
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Missing svix headers' },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const event: WebhookEvent = payload;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'user.created':
        await handleUserCreated(event.data);
        break;
      case 'user.updated':
        await handleUserUpdated(event.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(event.data);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Handler failed' },
      { status: 500 }
    );
  }
}

async function handleUserCreated(data: WebhookEvent['data']) {
  const clerkId = data.id;
  const email = data.email_addresses?.[0]?.email_address || '';
  const firstName = data.first_name || '';
  const lastName = data.last_name || '';
  const username = data.username || `${firstName} ${lastName}`.trim() || email.split('@')[0];

  const { error } = await supabase.from('users').insert({
    clerk_id: clerkId,
    email,
    username,
    streak_count: 0,
    last_study_date: null,
  });

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function handleUserUpdated(data: WebhookEvent['data']) {
  const clerkId = data.id;
  const email = data.email_addresses?.[0]?.email_address || '';
  const firstName = data.first_name || '';
  const lastName = data.last_name || '';
  const username = data.username || `${firstName} ${lastName}`.trim() || email.split('@')[0];

  const { error } = await supabase
    .from('users')
    .update({
      email,
      username,
    })
    .eq('clerk_id', clerkId);

  if (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function handleUserDeleted(data: WebhookEvent['data']) {
  const clerkId = data.id;

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('clerk_id', clerkId);

  if (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
