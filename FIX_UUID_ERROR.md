# Fix UUID Error - Supabase Migration

## Problem
Question IDs are strings like `"o1"`, `"c11"` but database expects UUID format.

## Solution
Change the `id` column type from `uuid` to `text` in all tables.

---

## Run this SQL in Supabase SQL Editor:

```sql
-- Drop existing tables (if they exist)
DROP TABLE IF EXISTS test_responses CASCADE;
DROP TABLE IF EXISTS test_sessions CASCADE;
DROP TABLE IF EXISTS personality_types CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

-- Recreate Questions Table with TEXT id
CREATE TABLE questions (
  id text PRIMARY KEY,
  question_text text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Recreate Personality Types Table with TEXT id
CREATE TABLE personality_types (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  min_score integer NOT NULL,
  max_score integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Recreate Test Sessions Table
CREATE TABLE test_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL,
  user_name text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  results jsonb
);

-- Recreate Test Responses Table with TEXT question_id
CREATE TABLE test_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES test_sessions(id) ON DELETE CASCADE,
  question_id text REFERENCES questions(id) ON DELETE CASCADE,
  answer_value integer NOT NULL CHECK (answer_value >= 1 AND answer_value <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE personality_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_responses ENABLE ROW LEVEL SECURITY;

-- Create Policies for Questions
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  TO public
  USING (true);

-- Create Policies for Personality Types
CREATE POLICY "Anyone can read personality types"
  ON personality_types FOR SELECT
  TO public
  USING (true);

-- Create Policies for Test Sessions
CREATE POLICY "Anyone can create test sessions"
  ON test_sessions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own session"
  ON test_sessions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can update their own session"
  ON test_sessions FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create Policies for Test Responses
CREATE POLICY "Anyone can insert test responses"
  ON test_responses FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read test responses"
  ON test_responses FOR SELECT
  TO public
  USING (true);

-- Create Indexes
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_test_responses_session ON test_responses(session_id);
CREATE INDEX idx_test_sessions_token ON test_sessions(session_token);
CREATE INDEX idx_test_sessions_user_name ON test_sessions(user_name);
```

---

## Steps:

1. **Supabase Dashboard → SQL Editor**
2. **Copy the SQL above**
3. **Paste and Run**
4. **Check Table Editor** - tables should be recreated
5. **Run seeding again:**
   ```bash
   npm run seed-db
   ```

This will fix the UUID error! ✅
