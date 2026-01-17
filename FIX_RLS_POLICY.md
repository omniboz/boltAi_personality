# Fix RLS Policy Error

## ပြဿနာ
"new row violates row-level security policy" - INSERT လုပ်ခွင့် မရှိလို့ ဖြစ်ပါတယ်။

## ဖြေရှင်းနည်း
Supabase SQL Editor မှာ ဒီ SQL run ပါ:

```sql
-- Add INSERT policies for questions table
DROP POLICY IF EXISTS "Anyone can insert questions" ON questions;
CREATE POLICY "Anyone can insert questions"
  ON questions FOR INSERT
  TO public
  WITH CHECK (true);

-- Add INSERT policies for personality_types table
DROP POLICY IF EXISTS "Anyone can insert personality types" ON personality_types;
CREATE POLICY "Anyone can insert personality types"
  ON personality_types FOR INSERT
  TO public
  WITH CHECK (true);
```

ပြီးရင် ပြန် run ပါ:
```bash
npm run seed-db
```

## အောင်မြင်ရင် မြင်ရမယ့် output:
```
✅ Inserted questions 1 to 100
✅ Inserted questions 101 to 200
...
✅ Database seeding complete!
   Questions in database: 449
   Personality types in database: 15
```
