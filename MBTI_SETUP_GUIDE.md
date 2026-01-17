# MBTI System Setup - Step by Step Guide

## လုပ်ရမည့် အဆင့်များ (အစဉ်လိုက်)

### Step 1: Run Database Migrations

Supabase SQL Editor သို့ သွားပါ:
1. https://supabase.com/dashboard → သင့် project
2. SQL Editor → New query

**Migration 1: Add MBTI System**
```sql
-- Copy and paste from: 20260117110000_add_mbti_system.sql
-- This adds mbti_axis, mbti_direction columns and creates mbti_types table
```

**Migration 2: Seed MBTI Types**
```sql
-- Copy and paste from: 20260117110001_seed_mbti_types.sql
-- This inserts 16 MBTI personality types with Myanmar translations
```

**Migration 3: Auto-Categorize Questions**
```sql
-- Copy and paste from: 20260117110002_auto_categorize_questions.sql
-- This automatically categorizes existing questions based on Big Five categories
```

Run လုပ်ပြီးရင် verification query run ပါ:
```sql
SELECT 
  mbti_axis,
  mbti_direction,
  COUNT(*) as count
FROM questions
WHERE mbti_axis IS NOT NULL
GROUP BY mbti_axis, mbti_direction
ORDER BY mbti_axis, mbti_direction;
```

**Expected Result:**
```
mbti_axis | mbti_direction | count
----------|----------------|-------
EI        | negative       | 30-40
EI        | positive       | 30-40
JP        | negative       | 30-40
JP        | positive       | 30-40
SN        | negative       | 30-40
SN        | positive       | 30-40
TF        | negative       | 30-40
TF        | positive       | 30-40
```

---

### Step 2: Verify Question Distribution

```sql
-- Check if we have enough questions per axis
SELECT 
  mbti_axis,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE mbti_direction = 'positive') as positive_count,
  COUNT(*) FILTER (WHERE mbti_direction = 'negative') as negative_count
FROM questions
WHERE mbti_axis IS NOT NULL
GROUP BY mbti_axis
ORDER BY mbti_axis;
```

**Minimum Required:**
- Each axis needs at least 25 questions (to select 12-13 for test)
- Ideally 50-75 questions per axis

---

### Step 3: Manual Review (Optional but Recommended)

Review some questions to ensure categorization is correct:

```sql
-- Check EI axis questions
SELECT id, question_text, mbti_axis, mbti_direction
FROM questions
WHERE mbti_axis = 'EI'
LIMIT 10;

-- Check SN axis questions
SELECT id, question_text, mbti_axis, mbti_direction
FROM questions
WHERE mbti_axis = 'SN'
LIMIT 10;

-- etc...
```

If you find miscategorized questions, update them:
```sql
UPDATE questions
SET mbti_axis = 'SN', mbti_direction = 'negative'
WHERE id = 'specific_question_id';
```

---

### Step 4: Test Question Selection

Test if stratified sampling works:

```sql
-- Simulate question selection
WITH selected_questions AS (
  SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY mbti_axis ORDER BY RANDOM()) as rn
    FROM questions
    WHERE mbti_axis IS NOT NULL AND is_active = true
  ) sub
  WHERE (mbti_axis = 'EI' AND rn <= 12)
     OR (mbti_axis = 'SN' AND rn <= 13)
     OR (mbti_axis = 'TF' AND rn <= 12)
     OR (mbti_axis = 'JP' AND rn <= 13)
)
SELECT 
  mbti_axis,
  COUNT(*) as selected_count
FROM selected_questions
GROUP BY mbti_axis
ORDER BY mbti_axis;
```

**Expected Result:**
```
mbti_axis | selected_count
----------|---------------
EI        | 12
JP        | 13
SN        | 13
TF        | 12
Total     | 50
```

---

### Step 5: Remove (Negative) Prefixes

```sql
-- Copy and paste from: 20260117100000_remove_question_prefixes.sql
UPDATE questions
SET question_text = TRIM(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      question_text,
      '^\(Negative\)\s*',
      '',
      'i'
    ),
    '^\(Positive\)\s*',
    '',
    'i'
  )
)
WHERE question_text LIKE '(Negative)%' OR question_text LIKE '(Positive)%';
```

---

## Troubleshooting

### Problem: Not enough questions for an axis

**Solution:** Manually categorize more questions or adjust distribution:

```sql
-- Find uncategorized questions
SELECT id, question_text, category
FROM questions
WHERE mbti_axis IS NULL
LIMIT 20;

-- Manually categorize them
UPDATE questions
SET mbti_axis = 'EI', mbti_direction = 'positive'
WHERE id IN ('q1', 'q2', 'q3');
```

### Problem: Unbalanced distribution

**Solution:** Re-categorize some questions:

```sql
-- Move some questions from over-represented axis to under-represented
UPDATE questions
SET mbti_axis = 'SN'
WHERE mbti_axis = 'EI' 
  AND id IN (
    SELECT id FROM questions 
    WHERE mbti_axis = 'EI' 
    ORDER BY RANDOM() 
    LIMIT 10
  );
```

---

## Verification Checklist

- [ ] All 3 migrations run successfully
- [ ] 16 MBTI types inserted in `mbti_types` table
- [ ] Questions have `mbti_axis` and `mbti_direction` set
- [ ] Each axis has at least 25 questions
- [ ] Distribution is relatively balanced
- [ ] (Negative) and (Positive) prefixes removed
- [ ] Test query returns 50 questions (12+13+12+13)

---

## Next Steps After Database Setup

1. Update application code (App.tsx, ResultsScreen.tsx)
2. Test with sample data
3. Deploy to production

---

## Quick Commands Summary

```sql
-- 1. Add MBTI system
-- Run: 20260117110000_add_mbti_system.sql

-- 2. Seed MBTI types
-- Run: 20260117110001_seed_mbti_types.sql

-- 3. Auto-categorize questions
-- Run: 20260117110002_auto_categorize_questions.sql

-- 4. Remove prefixes
-- Run: 20260117100000_remove_question_prefixes.sql

-- 5. Verify
SELECT mbti_axis, COUNT(*) FROM questions WHERE mbti_axis IS NOT NULL GROUP BY mbti_axis;
```

**ပြီးပါပြီ!** Database setup ပြီးရင် application code update လုပ်ပါမယ်။
