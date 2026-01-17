-- Add user_name column to test_sessions table if it doesn't exist
ALTER TABLE test_sessions 
ADD COLUMN IF NOT EXISTS user_name text;

-- Create index for faster lookups by user name
CREATE INDEX IF NOT EXISTS idx_test_sessions_user_name ON test_sessions(user_name);
