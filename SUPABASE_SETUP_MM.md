# Supabase Database Setup - Step by Step

## Problem: မေးခွန်းတွေ Supabase မှာ မရှိဘူး

**အကြောင်းရင်း:** Database tables တွေ မရှိသေးလို့ ဖြစ်ပါတယ်။

---

## Solution: အောက်ပါ အဆင့်များကို လိုက်လုပ်ပါ

### Step 1: Supabase Dashboard ကို ဖွင့်ပါ

1. ဒီ link ကို ဖွင့်ပါ: **https://odwukxwtawmygihhywdk.supabase.co**
2. Login ဝင်ပါ
3. ဘယ်ဘက် sidebar မှာ **"SQL Editor"** ကို နှိပ်ပါ

---

### Step 2: Tables များ ဖန်တီးပါ (Migration 1)

1. SQL Editor မှာ **"New Query"** ကို နှိပ်ပါ
2. အောက်က SQL code အားလုံးကို **copy လုပ်ပြီး paste** လုပ်ပါ:

```sql
-- Create Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create Personality Types Table
CREATE TABLE IF NOT EXISTS personality_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  min_score integer NOT NULL,
  max_score integer NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create Test Sessions Table
CREATE TABLE IF NOT EXISTS test_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL,
  user_name text,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  results jsonb
);

-- Create Test Responses Table
CREATE TABLE IF NOT EXISTS test_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES test_sessions(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
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
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_test_responses_session ON test_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_token ON test_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_test_sessions_user_name ON test_sessions(user_name);
```

3. **"Run"** button ကို နှိပ်ပါ
4. အောက်မှာ **"Success"** လို့ ပြရင် အဆင်ပြေပါပြီ

---

### Step 3: Tables များ စစ်ဆေးပါ

1. ဘယ်ဘက် sidebar မှာ **"Table Editor"** ကို နှိပ်ပါ
2. အောက်ပါ tables များ ရှိမရှိ ကြည့်ပါ:
   - ✅ `questions`
   - ✅ `personality_types`
   - ✅ `test_sessions`
   - ✅ `test_responses`

---

### Step 4: မေးခွန်းများ ထည့်ပါ (Seed Database)

Tables များ ဖန်တီးပြီးရင်:

1. Terminal ကို ဖွင့်ပါ
2. အောက်က command ကို run ပါ:

```bash
npm run seed-db
```

3. အောက်ပါ output ကို မြင်ရမယ်:

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

### Step 5: စစ်ဆေးပါ

1. Supabase Dashboard → **Table Editor** → **questions** ကို ဖွင့်ပါ
2. မေးခွန်း 300+ ရှိမရှိ ကြည့်ပါ
3. **personality_types** table မှာလည်း 30 rows ရှိမရှိ ကြည့်ပါ

---

## အကယ်၍ Error ဖြစ်ခဲ့ရင်

### Error: "relation does not exist"
➡️ SQL migration ကို မ run ရသေးဘူး။ Step 2 ကို ပြန်လုပ်ပါ။

### Error: "permission denied"
➡️ RLS policies မှားနေတယ်။ SQL migration ကို အစကနေ ပြန် run ပါ။

### Seeding မအောင်မြင်ဘူး
➡️ Tables များ ရှိမရှိ စစ်ပါ။ Table Editor မှာ ကြည့်ပါ။

---

## အကူအညီ လိုရင်

Screenshot ရိုက်ပြီး ပြပါ:
1. Table Editor မှာ ဘာ tables တွေ ရှိလဲ
2. SQL Editor မှာ run လိုက်တဲ့ result
3. `npm run seed-db` ရဲ့ output

---

## Quick Check

Supabase Dashboard မှာ:
- [ ] SQL Editor ကို ဖွင့်ပြီးပြီလား?
- [ ] Migration SQL ကို run ပြီးပြီလား?
- [ ] Table Editor မှာ 4 tables ရှိပြီလား?
- [ ] `npm run seed-db` run ပြီးပြီလား?
- [ ] questions table မှာ data ရှိပြီလား?
