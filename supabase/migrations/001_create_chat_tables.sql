-- Migration: Create chat tables for AI customer service conversation logging
-- Run this in Supabase SQL Editor or via `supabase db push`

-- Chat sessions: one per visitor conversation
create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text unique not null,
  ip text,
  user_agent text,
  page_url text,
  started_at timestamptz default now(),
  ended_at timestamptz,
  message_count int default 0,
  summary text
);

-- Chat messages: individual messages within a session
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null references chat_sessions(session_id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_chat_sessions_started on chat_sessions(started_at desc);
create index if not exists idx_chat_messages_session on chat_messages(session_id);

-- Enable Row Level Security (tables only accessed via service_role key from server)
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;

-- No RLS policies needed since we only access via service_role key (bypasses RLS)
