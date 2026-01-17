# Check MBTI Types in Database

Supabase SQL Editor မှာ run ပါ:

```sql
-- Check if mbti_types table exists and has data
SELECT COUNT(*) as total_types FROM mbti_types;

-- View all MBTI types
SELECT type_code, name_mm FROM mbti_types ORDER BY type_code;
```

**Expected Result:**
- total_types: 16
- Should see all 16 types (INTJ, INTP, ENTJ, etc.)

**If no data found:**
Run the seed migration again:
```sql
-- Delete existing and re-insert
DELETE FROM mbti_types;

-- Then run the entire content from:
-- supabase/migrations/20260117110001_seed_mbti_types.sql
```

**If table doesn't exist:**
Run migrations in order:
1. `20260117110000_add_mbti_system.sql`
2. `20260117110001_seed_mbti_types.sql`

---

## Quick Fix

If you haven't run the migrations yet, here's what to do:

### Step 1: Check Current State
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'mbti_types';
```

### Step 2: If table exists but empty
```sql
SELECT COUNT(*) FROM mbti_types;
```

### Step 3: Re-run seed if needed
Copy and paste the entire content from `20260117110001_seed_mbti_types.sql`

---

## Verify Questions Have MBTI Categorization

```sql
-- Check if questions have mbti_axis
SELECT 
  mbti_axis,
  COUNT(*) as count
FROM questions
WHERE mbti_axis IS NOT NULL
GROUP BY mbti_axis
ORDER BY mbti_axis;
```

**Expected:**
- EI: ~60-75
- SN: ~60-75
- TF: ~60-75
- JP: ~60-75

**If all NULL:**
Run `20260117110002_auto_categorize_questions.sql`
