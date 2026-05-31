-- Migration: Add intent field to chat_sessions for filtering high-intent conversations
ALTER TABLE chat_sessions ADD COLUMN IF NOT EXISTS intent text DEFAULT 'low' CHECK (intent IN ('high', 'low'));

CREATE INDEX IF NOT EXISTS idx_chat_sessions_intent ON chat_sessions(intent) WHERE intent = 'high';
