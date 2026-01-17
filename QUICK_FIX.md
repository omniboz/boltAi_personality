# Quick Fix - UUID Error ဖြေရှင်းနည်း

## ပြဿနာ
`npm run seed-db` run တိုင်း UUID error ရနေတယ်။

## အကြောင်းရင်း
Supabase database မှာ tables တွေက `id` column ကို `uuid` type နဲ့ ဖန်တီးထားတယ်။
ဒါပေမယ့် questions တွေက `"o1"`, `"c11"` လို text id တွေ သုံးထားတယ်။

## ဖြေရှင်းနည်း - အဆင့်ချင်း

### ✅ အဆင့် 1: Supabase Dashboard ဖွင့်ပါ
https://odwukxwtawmygihhywdk.supabase.co

### ✅ အဆင့် 2: SQL Editor သွားပါ
ဘယ်ဘက် menu မှာ "SQL Editor" ကို click လုပ်ပါ

### ✅ အဆင့် 3: New Query ဖန်တီးပါ
"New Query" button ကို နှိပ်ပါ

### ✅ အဆင့် 4: ဒီ SQL ကို copy & paste လုပ်ပါ

```sql
-- Drop old tables
DROP TABLE IF EXISTS test_responses CASCADE;
DROP TABLE IF EXISTS test_sessions CASCADE;
DROP TABLE IF EXISTS personality_types CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

-- Create new tables with TEXT id
CREATE TABLE questions (
  id text PRIMARY KEY,
  question_text text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE personality_types (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  min_score integer NOT NULL,
  max_score integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE test_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL,
  user_name text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  results jsonb
);

CREATE TABLE test_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES test_sessions(id) ON DELETE CASCADE,
  question_id text REFERENCES questions(id) ON DELETE CASCADE,
  answer_value integer NOT NULL CHECK (answer_value >= 1 AND answer_value <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE personality_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_responses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read questions" ON questions FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can read personality types" ON personality_types FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can create test sessions" ON test_sessions FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can read their own session" ON test_sessions FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can update their own session" ON test_sessions FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can insert test responses" ON test_responses FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can read test responses" ON test_responses FOR SELECT TO public USING (true);

-- Indexes
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_test_responses_session ON test_responses(session_id);
CREATE INDEX idx_test_sessions_token ON test_sessions(session_token);
CREATE INDEX idx_test_sessions_user_name ON test_sessions(user_name);
```

### ✅ အဆင့် 5: Run နှိပ်ပါ
SQL Editor မှာ "Run" button (သို့မဟုတ် Ctrl+Enter) နှိပ်ပါ

### ✅ အဆင့် 6: Success စစ်ဆေးပါ
"Success. No rows returned" လို့ ပြရမယ်

### ✅ အဆင့် 7: Tables စစ်ဆေးပါ
Table Editor သွားပြီး tables 4 ခု ရှိမရှိ ကြည့်ပါ:
- questions
- personality_types  
- test_sessions
- test_responses

### ✅ အဆင့် 8: Seed data ထည့်ပါ
Terminal မှာ:
```bash
npm run seed-db
```

## မျှော်လင့်ထားတဲ့ Result:
```
✅ Inserted questions 1 to 100
✅ Inserted questions 101 to 200
...
✅ Database seeding complete!
   Questions in database: 449
   Personality types in database: 15
```

## အကယ်၍ ပြဿနာရှိနေသေးရင်:
Screenshot ရိုက်ပြပါ:
1. SQL Editor မှာ SQL run လိုက်တဲ့ result
2. Table Editor မှာ tables list
3. Terminal မှာ npm run seed-db ရဲ့ output
