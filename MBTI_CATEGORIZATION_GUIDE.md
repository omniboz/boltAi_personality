# MBTI Question Categorization Guide

## Overview
လက်ရှိ 300 မေးခွန်းတွေကို MBTI 4 axes တွေ categorize လုပ်ရပါမယ်။

## MBTI Axes နဲ့ လက္ခဏာများ

### 1. EI (Energy - စွမ်းအင်ရယူပုံ)
**Extrovert (E) - positive direction:**
- လူများနှင့် ရောနှောခြင်းကနေ စွမ်းအင်ရ
- စကားပြောရတာ နှစ်သက်
- လူမှုပွဲများ တက်ရောက်ခြင်း
- အပြင်သို့ ထွက်ရတာ ကြိုက်
- အဖွဲ့လိုက် လုပ်ဆောင်ခြင်း

**Introvert (I) - negative direction:**
- တစ်ကိုယ်တည်း ရှိခြင်းကနေ စွမ်းအင်ရ
- စကားနည်းပြောခြင်း
- ငြိမ်သက်သော ပတ်ဝန်းကျင် နှစ်သက်ခြင်း
- အတွင်းစိတ် အာရုံစိုက်ခြင်း
- တစ်ဦးချင်း လုပ်ဆောင်ခြင်း

### 2. SN (Information - သတင်းအချက်အလက် ရယူပုံ)
**Sensing (S) - positive direction:**
- အသေးစိတ် ဂရုစိုက်ခြင်း
- လက်တွေ့ကျကျ ဖြစ်ခြင်း
- လက်ရှိအချိန် အာရုံစိုက်ခြင်း
- အတွေ့အကြုံ အခြေခံခြင်း
- အဆင့်ဆင့် လုပ်ဆောင်ခြင်း

**Intuition (N) - negative direction:**
- ပုံကြီး ကြည့်ခြင်း
- အနာဂတ် အာရုံစိုက်ခြင်း
- ဖြစ်နိုင်ခြေများ စဉ်းစားခြင်း
- အယူအဆများ နှစ်သက်ခြင်း
- ဆန်းသစ်တီထွင်ခြင်း

### 3. TF (Decisions - ဆုံးဖြတ်ချက်ချပုံ)
**Thinking (T) - positive direction:**
- ယုတ္တိ အခြေခံခြင်း
- ဓမ္မဓိဋ္ဌာန် ဆန်ခြင်း
- ဆန်းစစ်ခြင်း
- တရားမျှတမှု အာရုံစိုက်ခြင်း
- အမှန်တရား ရှာဖွေခြင်း

**Feeling (F) - negative direction:**
- ခံစားချက် အခြေခံခြင်း
- ကြင်နာမှု ရှိခြင်း
- တန်ဖိုးများ အာရုံစိုက်ခြင်း
- သူတစ်ပါး ထောက်ထားခြင်း
- သဟဇာတ ရှာဖွေခြင်း

### 4. JP (Structure - ဖွဲ့စည်းမှု)
**Judging (J) - positive direction:**
- အစီအစဉ်ကျ ဖြစ်ခြင်း
- စနစ်တကျ ဖြစ်ခြင်း
- ဆုံးဖြတ်ချက် မြန်ခြင်း
- ပြီးမြောက်အောင် လုပ်ခြင်း
- စည်းကမ်း လိုက်နာခြင်း

**Perceiving (P) - negative direction:**
- လိုက်လျောညီထွေ ဖြစ်ခြင်း
- ရွေးချယ်မှု ပွင့်လင်းခြင်း
- အခြေအနေ လိုက်ခြင်း
- စူးစမ်းလေ့လာခြင်း
- အချိန်မရွေး လုပ်ခြင်း

---

## Categorization Process

### Step 1: Review Questions
Database ထဲက မေးခွန်းတွေကို ကြည့်ပါ:
```sql
SELECT id, question_text, category 
FROM questions 
WHERE mbti_axis IS NULL
ORDER BY id
LIMIT 50;
```

### Step 2: Categorize Questions
မေးခွန်းတစ်ခုချင်းစီကို ဖတ်ပြီး:
1. ဘယ် axis နဲ့ သက်ဆိုင်လဲ ဆုံးဖြတ်ပါ (EI, SN, TF, JP)
2. Agreement က ဘယ် direction ကို ညွှန်းလဲ ဆုံးဖြတ်ပါ (positive/negative)

### Step 3: Update Database
```sql
-- Example updates
UPDATE questions 
SET mbti_axis = 'EI', mbti_direction = 'positive'
WHERE id = 'q1';  -- Extrovert question

UPDATE questions 
SET mbti_axis = 'EI', mbti_direction = 'negative'
WHERE id = 'q2';  -- Introvert question

UPDATE questions 
SET mbti_axis = 'SN', mbti_direction = 'positive'
WHERE id = 'q3';  -- Sensing question

-- etc...
```

---

## Sample Categorizations

### EI Examples

**Extrovert (positive):**
- "ပါတီပွဲများတွင် တက်ရောက်ရတာ ကြိုက်သည်" → EI, positive
- "လူအများနှင့် စကားပြောရတာ စွမ်းအင်ရသည်" → EI, positive
- "အဖွဲ့လိုက် လုပ်ဆောင်ရတာ ပိုကောင်းသည်" → EI, positive

**Introvert (negative):**
- "တစ်ကိုယ်တည်း ရှိရတာ နှစ်သက်သည်" → EI, negative
- "ငြိမ်သက်သော နေရာများ ကြိုက်သည်" → EI, negative
- "စကားနည်းပြောသူ ဖြစ်သည်" → EI, negative

### SN Examples

**Sensing (positive):**
- "အသေးစိတ် အချက်အလက်များကို ဂရုစိုက်သည်" → SN, positive
- "လက်တွေ့ကျကျ ဆောင်ရွက်သည်" → SN, positive
- "လက်ရှိအချိန် အာရုံစိုက်သည်" → SN, positive

**Intuition (negative):**
- "အနာဂတ် အကြောင်း တွေးတတ်သည်" → SN, negative
- "ဖြစ်နိုင်ခြေများ စဉ်းစားသည်" → SN, negative
- "ပုံကြီး ကြည့်တတ်သည်" → SN, negative

### TF Examples

**Thinking (positive):**
- "ယုတ္တိနှင့် ဆုံးဖြတ်သည်" → TF, positive
- "ဓမ္မဓိဋ္ဌာန် ဆန်သည်" → TF, positive
- "အမှန်တရား ရှာဖွေသည်" → TF, positive

**Feeling (negative):**
- "သူတစ်ပါး ခံစားချက် ထောက်ထားသည်" → TF, negative
- "ကြင်နာမှုဖြင့် ဆုံးဖြတ်သည်" → TF, negative
- "တန်ဖိုးများ အရေးကြီးသည်" → TF, negative

### JP Examples

**Judging (positive):**
- "အစီအစဉ်ကျ လုပ်ဆောင်သည်" → JP, positive
- "စနစ်တကျ ဖြစ်သည်" → JP, positive
- "အချိန်မီ ပြီးမြောက်အောင် လုပ်သည်" → JP, positive

**Perceiving (negative):**
- "လိုက်လျောညီထွေ ဖြစ်သည်" → JP, negative
- "အခြေအနေ လိုက်သည်" → JP, negative
- "ရွေးချယ်မှု ပွင့်လင်းထားသည်" → JP, negative

---

## Bulk Update Template

```sql
-- EI Axis (Extrovert/Introvert)
UPDATE questions SET mbti_axis = 'EI', mbti_direction = 'positive' WHERE id IN ('q1', 'q5', 'q10', ...);
UPDATE questions SET mbti_axis = 'EI', mbti_direction = 'negative' WHERE id IN ('q2', 'q6', 'q11', ...);

-- SN Axis (Sensing/Intuition)
UPDATE questions SET mbti_axis = 'SN', mbti_direction = 'positive' WHERE id IN ('q3', 'q7', 'q12', ...);
UPDATE questions SET mbti_axis = 'SN', mbti_direction = 'negative' WHERE id IN ('q4', 'q8', 'q13', ...);

-- TF Axis (Thinking/Feeling)
UPDATE questions SET mbti_axis = 'TF', mbti_direction = 'positive' WHERE id IN (...);
UPDATE questions SET mbti_axis = 'TF', mbti_direction = 'negative' WHERE id IN (...);

-- JP Axis (Judging/Perceiving)
UPDATE questions SET mbti_axis = 'JP', mbti_direction = 'positive' WHERE id IN (...);
UPDATE questions SET mbti_axis = 'JP', mbti_direction = 'negative' WHERE id IN (...);
```

---

## Verification

After categorization, verify distribution:

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

**Target Distribution:**
- EI: ~75 questions (37-38 positive, 37-38 negative)
- SN: ~75 questions (37-38 positive, 37-38 negative)
- TF: ~75 questions (37-38 positive, 37-38 negative)
- JP: ~75 questions (37-38 positive, 37-38 negative)

---

## Next Steps

1. Run migrations in Supabase SQL Editor
2. Categorize questions (can be done in batches)
3. Verify distribution
4. Test with sample data
5. Deploy to production

**Note:** Question categorization က manual work ဖြစ်ပါတယ်။ မေးခွန်း 300 ကို categorize လုပ်ဖို့ အချိန် 4-6 နာရီ ခန့် ကြာနိုင်ပါတယ်။
