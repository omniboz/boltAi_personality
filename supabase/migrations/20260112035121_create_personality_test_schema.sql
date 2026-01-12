/*
  # Personality Test System

  1. New Tables
    - `questions`
      - `id` (uuid, primary key)
      - `question_text` (text) - The question content
      - `category` (text) - Question category (e.g., 'extroversion', 'agreeableness', 'openness', etc.)
      - `created_at` (timestamp)
    
    - `personality_types`
      - `id` (uuid, primary key)
      - `name` (text) - Personality type name
      - `description` (text) - Detailed description
      - `min_score` (integer) - Minimum score for this type
      - `max_score` (integer) - Maximum score for this type
      - `category` (text) - Which category this type belongs to
      - `created_at` (timestamp)
    
    - `test_sessions`
      - `id` (uuid, primary key)
      - `session_token` (text, unique) - Random token to identify session
      - `started_at` (timestamp)
      - `completed_at` (timestamp, nullable)
      - `results` (jsonb) - Stores the calculated results
    
    - `test_responses`
      - `id` (uuid, primary key)
      - `session_id` (uuid, foreign key)
      - `question_id` (uuid, foreign key)
      - `answer_value` (integer) - Answer score (1-5 scale)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Allow public read access to questions and personality_types
    - Allow public insert/read for test_sessions and test_responses (using session_token)
*/

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS personality_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  min_score integer NOT NULL,
  max_score integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS test_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  results jsonb
);

CREATE TABLE IF NOT EXISTS test_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES test_sessions(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  answer_value integer NOT NULL CHECK (answer_value >= 1 AND answer_value <= 5),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE personality_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read personality types"
  ON personality_types FOR SELECT
  TO public
  USING (true);

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

CREATE POLICY "Anyone can insert test responses"
  ON test_responses FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read test responses"
  ON test_responses FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_test_responses_session ON test_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_token ON test_sessions(session_token);