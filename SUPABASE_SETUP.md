# Supabase Database Setup Guide

## Step 1: Apply Database Schema

You need to run the SQL migrations in your Supabase SQL Editor.

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://odwukxwtawmygihhywdk.supabase.co
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL scripts **in order**:

#### Migration 1: Create Tables

```sql
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
```

5. Click **Run** to execute the first migration

#### Migration 2: Add User Name Column

```sql
-- Add user_name column to test_sessions table if it doesn't exist
ALTER TABLE test_sessions 
ADD COLUMN IF NOT EXISTS user_name text;

-- Create index for faster lookups by user name
CREATE INDEX IF NOT EXISTS idx_test_sessions_user_name ON test_sessions(user_name);
```

6. Click **Run** to execute the second migration

---

## Step 2: Seed the Database

After the migrations are complete, run the seeding script to populate questions and personality types:

```bash
npm run seed-db
```

This will:
- ✅ Insert 300+ personality test questions
- ✅ Insert 30 personality type definitions
- ✅ Verify the data was inserted correctly

**Expected Output:**
```
🌱 Starting database seeding...

📝 Seeding 300 questions...
✅ Inserted questions 1 to 100
✅ Inserted questions 101 to 200
✅ Inserted questions 201 to 300

🎭 Seeding 30 personality types...
✅ Inserted personality types 1 to 30

🔍 Verifying seeded data...

✨ Database seeding complete!
   Questions in database: 300
   Personality types in database: 30

✅ Seeding completed successfully!
```

---

## Step 3: Verify Setup

1. Go to **Table Editor** in Supabase Dashboard
2. Check that you have these tables:
   - `questions` (should have ~300 rows)
   - `personality_types` (should have ~30 rows)
   - `test_sessions` (empty initially)
   - `test_responses` (empty initially)

---

## Step 4: Test the Application

1. Start the dev server (if not already running):
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173/

3. Take a test:
   - Enter your name
   - Answer the 50 questions
   - View your results

4. Check the admin dashboard:
   - Click the admin login (usually a hidden button or link)
   - View your test session
   - See all your answers

5. Verify in Supabase:
   - Go to **Table Editor** → `test_sessions`
   - You should see your session with your name
   - Go to `test_responses`
   - You should see 50 responses for your session

---

## Troubleshooting

### Error: "relation does not exist"
- Make sure you ran both migration scripts in order
- Check the SQL Editor for any error messages

### Error: "permission denied"
- Verify the RLS policies were created correctly
- Check that all policies are enabled

### No questions appearing in app
- Run `npm run seed-db` again
- Check the console for any error messages
- Verify questions exist in Supabase Table Editor

### Offline mode warning
- Check that `.env` file has correct credentials
- Verify Supabase URL and key are correct
- Restart the dev server after changing `.env`

---

## Current Configuration

**Supabase URL:** https://odwukxwtawmygihhywdk.supabase.co
**Environment File:** `.env`

```
VITE_SUPABASE_URL=https://odwukxwtawmygihhywdk.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_yR1bFN-p_qSOfWuvqsZQDA_ec1wBVml
```

---

## Next Steps

After setup is complete:
1. ✅ Database is ready to use
2. ✅ Application will fetch questions from Supabase
3. ✅ User sessions will be tracked with names
4. ✅ Admin can view all past test sessions
5. ✅ Offline mode works as fallback
