# Remove (Negative) and (Positive) from Questions

## Problem
မေးခွန်းတွေ အစမှာ `(Negative)` နဲ့ `(Positive)` ဆိုတဲ့ စာလုံးတွေ ပါနေပါတယ်။

## Solution
Supabase SQL Editor မှာ အောက်ပါ SQL ကို run ပါ:

```sql
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

## Steps (Myanmar)

1. **Supabase Dashboard သွားပါ**
   - https://supabase.com/dashboard သို့ သွားပါ
   - Project ကို ရွေးပါ

2. **SQL Editor ဖွင့်ပါ**
   - ဘယ်ဘက် menu မှာ "SQL Editor" ကို နှိပ်ပါ
   - "New query" ကို နှိပ်ပါ

3. **SQL Code ကို ကူးထည့်ပါ**
   - အပေါ်က SQL code ကို copy လုပ်ပါ
   - SQL Editor မှာ paste လုပ်ပါ

4. **Run လုပ်ပါ**
   - "Run" button (သို့) `Ctrl+Enter` နှိပ်ပါ
   - Success message ပေါ်လာပါလိမ့်မယ်

5. **စစ်ဆေးပါ**
   - Application မှာ refresh လုပ်ပါ
   - မေးခွန်းတွေ မှာ (Negative) မပါတော့ပါဘူး

## Alternative: Manual Update

သို့မဟုတ် Supabase Table Editor မှာ:
1. "questions" table ကို ဖွင့်ပါ
2. Filter: `question_text` contains `(Negative)`
3. တစ်ခုချင်းစီ edit လုပ်ပြီး `(Negative)` ဖျက်ပါ

## Note
ဒီ update က database မှာပဲ ပြောင်းပါတယ်။ Local files တွေ မပြောင်းပါဘူး။
