-- Migration: Create indexes for common query patterns
-- Depends on: 001_create_chat_tables.sql

-- Composite index for filtering sessions by IP
create index if not exists idx_chat_sessions_ip on chat_sessions(ip);

-- Index for finding sessions without summary (for retry/backfill)
create index if not exists idx_chat_sessions_no_summary on chat_sessions(ended_at)
  where summary is null and ended_at is not null;
