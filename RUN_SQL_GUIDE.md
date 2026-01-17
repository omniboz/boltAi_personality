# ဒီ SQL ကို Supabase မှာ Run ပေးပါ

## အဆင့် ၁: Supabase Dashboard ဖွင့်ပါ

1. Browser မှာ ဒီ link ကို ဖွင့်ပါ: **https://odwukxwtawmygihhywdk.supabase.co**
2. Login ဝင်ပါ (ဝင်ပြီးသားဆိုရင် ကျော်ပါ)

---

## အဆင့် ၂: SQL Editor သွားပါ

ဘယ်ဘက် sidebar မှာ **"SQL Editor"** ကို နှိပ်ပါ

---

## အဆင့် ၃: New Query ဖန်တီးပါ

**"New Query"** button ကို နှိပ်ပါ

---

## အဆင့် ၄: ဒီ SQL Code ကို Copy လုပ်ပါ

**အောက်က code အားလုံးကို select လုပ်ပြီး copy (Ctrl+C) လုပ်ပါ:**

```sql
-- Drop existing tables
DROP TABLE IF EXISTS test_responses CASCADE;
DROP TABLE IF EXISTS test_sessions CASCADE;
DROP TABLE IF EXISTS personality_types CASCADE;
DROP TABLE IF EXISTS questions CASCADE;

-- Create Questions Table with TEXT id
CREATE TABLE questions (
  id text PRIMARY KEY,
  question_text text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create Personality Types Table with TEXT id
CREATE TABLE personality_types (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  min_score integer NOT NULL,
  max_score integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create Test Sessions Table
CREATE TABLE test_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL,
  user_name text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  results jsonb
);

-- Create Test Responses Table
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

-- Policies for Questions
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT TO public USING (true);

-- Policies for Personality Types
CREATE POLICY "Anyone can read personality types"
  ON personality_types FOR SELECT TO public USING (true);

-- Policies for Test Sessions
CREATE POLICY "Anyone can create test sessions"
  ON test_sessions FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can read their own session"
  ON test_sessions FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can update their own session"
  ON test_sessions FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Policies for Test Responses
CREATE POLICY "Anyone can insert test responses"
  ON test_responses FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Anyone can read test responses"
  ON test_responses FOR SELECT TO public USING (true);

-- Create Indexes
CREATE INDEX idx_questions_category ON questions(category);
CREATE INDEX idx_test_responses_session ON test_responses(session_id);
CREATE INDEX idx_test_sessions_token ON test_sessions(session_token);
CREATE INDEX idx_test_sessions_user_name ON test_sessions(user_name);
```

---

## အဆင့် ၅: SQL Editor မှာ Paste လုပ်ပါ

SQL Editor ရဲ့ text area ထဲမှာ **Ctrl+V** နှိပ်ပြီး paste လုပ်ပါ

---

## အဆင့် ၆: Run နှိပ်ပါ

ညာဘက်အောက်ထောင့်မှာ **"Run"** button (သို့မဟုတ် **Ctrl+Enter**) နှိပ်ပါ

---

## အဆင့် ၇: Success စစ်ဆေးပါ

အောက်မှာ **"Success. No rows returned"** လို့ ပြရင် အောင်မြင်ပါပြီ။

---

## အဆင့် ၈: Tables စစ်ဆေးပါ

1. ဘယ်ဘက် sidebar မှာ **"Table Editor"** ကို နှိပ်ပါ
2. အောက်ပါ tables များ မြင်ရမယ်:
   - ✅ questions
   - ✅ personality_types
   - ✅ test_sessions
   - ✅ test_responses

---

## အဆင့် ၉: Seed Data ထည့်ပါ

VS Code terminal မှာ:

```bash
npm run seed-db
```

---

## မှန်ကန်သော Output:

```
🌱 Starting database seeding...

📝 Seeding 449 questions...
✅ Inserted questions 1 to 100
✅ Inserted questions 101 to 200
✅ Inserted questions 201 to 300
✅ Inserted questions 301 to 400
✅ Inserted questions 401 to 449

🎭 Seeding 15 personality types...
✅ Inserted personality types 1 to 15

🔍 Verifying seeded data...

✨ Database seeding complete!
   Questions in database: 449
   Personality types in database: 15

✅ Seeding completed successfully!
```

---

## အကယ်၍ ပြဿနာရှိနေသေးရင်:

Screenshot ရိုက်ပြီး ပြပါ:
1. SQL Editor မှာ SQL paste လုပ်ပြီးတဲ့ screenshot
2. Run နှိပ်ပြီးတဲ့အခါ ရလာတဲ့ result
3. Table Editor မှာ tables များ မြင်ရတဲ့ screenshot
