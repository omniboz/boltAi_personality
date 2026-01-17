# MBTI System - Complete Setup Guide (Myanmar)

## ပြဿနာ
MBTI test ဖြေပြီး results မှာ:
- Type: mbti_type
- Score: 0/0
- Description တိုတာ ပေါ်နေတယ်

## အကြောင်းရင်း
Database မှာ MBTI types data မရှိသေးလို့ပါ။

---

## ဖြေရှင်းနည်း - အဆင့်ဆင့်

### အဆင့် 1: Supabase Dashboard သွားပါ

1. Browser မှာ https://supabase.com/dashboard ဖွင့်ပါ
2. Project: **odwukxwtawmygihhywdk** ကို ရွေးပါ
3. ဘယ်ဘက် menu မှာ **SQL Editor** ကို နှိပ်ပါ
4. **New query** ကို နှိပ်ပါ

---

### အဆင့် 2: Database စစ်ဆေးပါ

အောက်ပါ SQL ကို paste လုပ်ပြီး **Run** နှိပ်ပါ:

```sql
-- Check if mbti_types table exists
SELECT COUNT(*) as mbti_types_count FROM mbti_types;

-- Check if questions have mbti_axis
SELECT COUNT(*) as categorized_questions 
FROM questions 
WHERE mbti_axis IS NOT NULL;
```

**ရလဒ် ဖတ်နည်း:**
- `mbti_types_count = 0` → အဆင့် 3 သို့
- `mbti_types_count = 16` → အဆင့် 4 သို့
- Error ပေါ်ရင် → Table မရှိသေးဘူး → အဆင့် 3 သို့

---

### အဆင့် 3: MBTI System Setup (Table မရှိရင်)

#### 3.1: Create Tables

SQL Editor မှာ အောက်ပါ code ကို paste လုပ်ပြီး Run ပါ:

```sql
-- Add MBTI columns to questions table
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS mbti_axis TEXT CHECK (mbti_axis IN ('EI', 'SN', 'TF', 'JP')),
ADD COLUMN IF NOT EXISTS mbti_direction TEXT CHECK (mbti_direction IN ('positive', 'negative')),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_questions_mbti_axis ON questions(mbti_axis);
CREATE INDEX IF NOT EXISTS idx_questions_active ON questions(is_active);
CREATE INDEX IF NOT EXISTS idx_questions_mbti_axis_active ON questions(mbti_axis, is_active);

-- Add MBTI columns to test_sessions
ALTER TABLE test_sessions
ADD COLUMN IF NOT EXISTS mbti_scores JSONB,
ADD COLUMN IF NOT EXISTS mbti_type TEXT,
ADD COLUMN IF NOT EXISTS mbti_percentages JSONB;

-- Create mbti_types table
CREATE TABLE IF NOT EXISTS mbti_types (
  id TEXT PRIMARY KEY,
  type_code TEXT UNIQUE NOT NULL CHECK (LENGTH(type_code) = 4),
  name_en TEXT NOT NULL,
  name_mm TEXT NOT NULL,
  description_mm TEXT NOT NULL,
  strengths_mm TEXT,
  weaknesses_mm TEXT,
  careers_mm TEXT,
  famous_people TEXT,
  character_number INTEGER CHECK (character_number BETWEEN 1 AND 16),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_mbti_types_code ON mbti_types(type_code);

-- Enable RLS
ALTER TABLE mbti_types ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Allow public read access to mbti_types"
ON mbti_types FOR SELECT
TO public
USING (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated insert to mbti_types"
ON mbti_types FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow authenticated update to mbti_types"
ON mbti_types FOR UPDATE
TO authenticated
USING (true);
```

**Run ပြီးရင်:** Success message ပေါ်ရမယ်။

---

#### 3.2: Seed MBTI Types Data

**အရေးကြီး:** ဒီ code က ရှည်ပါတယ်။ အောက်က file ကနေ ကူးယူပါ:

`d:\bolt personality\boltAi_personality\supabase\migrations\20260117110001_seed_mbti_types.sql`

**သို့မဟုတ်** အောက်ပါ code ကို SQL Editor မှာ paste လုပ်ပါ:

```sql
-- Clear existing data
DELETE FROM mbti_types;

-- Insert 16 MBTI types
INSERT INTO mbti_types (id, type_code, name_en, name_mm, description_mm, strengths_mm, weaknesses_mm, careers_mm, famous_people, character_number) VALUES

('mbti_intj', 'INTJ', 'The Architect', 'ဗိသုကာပညာရှင်', 
'သင်သည် မဟာဗျူဟာချမှတ်သူ၊ ဆန်းသစ်တီထွင်သူတစ်ဦးဖြစ်သည်။ ရှည်လျားသော အမြင်ရှိပြီး ရှုပ်ထွေးသော ပြဿနာများကို ဖြေရှင်းနိုင်စွမ်း ထူးချွန်သည်။ ကိုယ့်ရည်မှန်းချက်များကို အကောင်အထည်ဖော်ရန် စိတ်ပိုင်းဖြတ်ပြီး လုပ်ဆောင်သူဖြစ်သည်။ ဉာဏ်ရည်ထက်မြက်မှုနှင့် လွတ်လပ်စွာ တွေးခေါ်တတ်မှုက သင့်ရဲ့ အဓိက အင်အားစုဖြစ်သည်။',
'မဟာဗျူဟာချမှတ်ခြင်း၊ ဆန်းသစ်တီထွင်ခြင်း၊ လွတ်လပ်စွာ တွေးခေါ်ခြင်း၊ ရှည်လျားသော အမြင်ရှိခြင်း၊ ပြဿနာဖြေရှင်းခြင်း၊ ဉာဏ်ရည်ထက်မြက်ခြင်း',
'ခံစားချက်များကို နားလည်ရခက်ခြင်း၊ ဝေဖန်မှု အလွန်များခြင်း၊ အလွန်ပြီးပြည့်စုံမှု ရှာဖွေခြင်း၊ လူမှုဆက်ဆံရေး အားနည်းခြင်း',
'သိပ္ပံပညာရှင်၊ အင်ဂျင်နီယာ၊ စီမံခန့်ခွဲရေးမှူး၊ ဗိသုကာပညာရှင်၊ ပရိုဂရမ်မာ၊ စီးပွားရေးလုပ်ငန်းရှင်၊ ပါမောက္ခ',
'Elon Musk, Isaac Newton, Mark Zuckerberg', 5),

('mbti_intp', 'INTP', 'The Logician', 'ယုတ္တိဗေဒပညာရှင်', 
'သင်သည် ဆန်းသစ်တီထွင်သူ၊ ဉာဏ်ရည်ထက်မြက်သူတစ်ဦးဖြစ်သည်။ သီအိုရီများနှင့် အယူအဆများကို စူးစမ်းလေ့လာရတာ နှစ်သက်ပြီး၊ ပြဿနာများကို ဆန်းသစ်သော နည်းလမ်းများဖြင့် ဖြေရှင်းတတ်သည်။ ယုတ္တိရှိစွာ ဆင်ခြင်တတ်ပြီး အမြဲတမ်း ဗဟုသုတ ရှာဖွေနေသူဖြစ်သည်။',
'ဆန်းသစ်တီထွင်ခြင်း၊ ယုတ္တိရှိစွာ ဆင်ခြင်ခြင်း၊ ပြဿနာဖြေရှင်းခြင်း၊ လွတ်လပ်စွာ တွေးခေါ်ခြင်း၊ ဗဟုသုတ ကျယ်ပြန့်ခြင်း',
'လက်တွေ့ကျကျ မလုပ်ဆောင်တတ်ခြင်း၊ အချိန်စီမံခန့်ခွဲမှု အားနည်းခြင်း၊ ခံစားချက်များ ထုတ်ဖော်ရခက်ခြင်း၊ လူမှုဆက်ဆံရေး ရှောင်ကြဉ်ခြင်း',
'သုတေသီ၊ ပရိုဂရမ်မာ၊ ပါမောက္ခ၊ သိပ္ပံပညာရှင်၊ ဒီဇိုင်နာ၊ ဒေတာခွဲခြမ်းစိတ်ဖြာသူ',
'Albert Einstein, Bill Gates, Charles Darwin', 9),

('mbti_entj', 'ENTJ', 'The Commander', 'စစ်ဗိုလ်ချုပ်', 
'သင်သည် ခေါင်းဆောင်မှု အစွမ်းထက်သူ၊ ရဲရင့်သော ဆုံးဖြတ်ချက်ချသူတစ်ဦးဖြစ်သည်။ အဖွဲ့အစည်းများကို ထိရောက်စွာ ဦးဆောင်နိုင်ပြီး၊ ရည်မှန်းချက်များကို အောင်မြင်အောင် လုပ်ဆောင်တတ်သည်။ ယုံကြည်မှုရှိပြီး စီမံခန့်ခွဲမှု ကောင်းမွန်သည်။',
'ခေါင်းဆောင်မှု၊ မဟာဗျူဟာချမှတ်ခြင်း၊ ထိရောက်စွာ စီစဉ်ခြင်း၊ ယုံကြည်မှု ရှိခြင်း၊ ဆုံးဖြတ်ချက် မြန်ခြင်း',
'စိတ်ရှည်မှု နည်းခြင်း၊ ခံစားချက်များကို လျစ်လျူရှုခြင်း၊ အလွန်ထိန်းချုပ်လိုခြင်း၊ ဝေဖန်မှု များခြင်း',
'စီအီးအို၊ စီမံခန့်ခွဲရေးမှူး၊ စီးပွားရေးလုပ်ငန်းရှင်၊ ရှေ့နေ၊ နိုင်ငံရေးသမား၊ စစ်ဗိုလ်ချုပ်',
'Steve Jobs, Margaret Thatcher, Napoleon', 3),

('mbti_entp', 'ENTP', 'The Debater', 'အငြင်းပွားသူ', 
'သင်သည် ဉာဏ်ကြီးသော အငြင်းပွားသူ၊ ဆန်းသစ်တီထွင်သူတစ်ဦးဖြစ်သည်။ အသစ်အဆန်းများကို စမ်းသပ်ရတာ နှစ်သက်ပြီး၊ အတွေးအခေါ် အပြောအဆို ကောင်းမွန်သည်။ စိန်ခေါ်မှုများကို ကြိုက်နှစ်သက်သည်။',
'ဆန်းသစ်တီထွင်ခြင်း၊ အငြင်းပွားခြင်း၊ လိမ္မာပါးနပ်ခြင်း၊ လျင်မြန်စွာ သင်ယူခြင်း၊ စွမ်းအင်ပြည့်ဝခြင်း',
'အာရုံစူးစိုက်မှု နည်းခြင်း၊ အစီအစဉ် လိုက်နာရခက်ခြင်း၊ အငြင်းပွားလွန်းခြင်း၊ ပြီးမြောက်အောင် မလုပ်ခြင်း',
'သတင်းထောက်၊ ရှေ့နေ၊ စီးပွားရေးလုပ်ငန်းရှင်၊ တီထွင်သူ၊ အစီအစဉ်ရေးဆွဲသူ၊ စျေးကွက်ရှာဖွေရေး',
'Thomas Edison, Leonardo da Vinci, Mark Twain', 7),

('mbti_infj', 'INFJ', 'The Advocate', 'ထောက်ခံသူ', 
'သင်သည် စိတ်ကူးယဉ်ဆန်သော အတွေးအခေါ်ရှိသူ၊ သူတစ်ပါးကို ကူညီလိုသူတစ်ဦးဖြစ်သည်။ နက်နဲသော ထိုးထွင်းသိမြင်မှုရှိပြီး၊ ကမ္ဘာကြီးကို ပိုမိုကောင်းမွန်အောင် လုပ်ဆောင်လိုသည်။ သူတစ်ပါး၏ ခံစားချက်ကို နားလည်တတ်သည်။',
'ထိုးထွင်းသိမြင်မှု၊ စာရေးခြင်း၊ ကြင်နာမှု၊ ရည်မှန်းချက်ရှိခြင်း၊ စိတ်ကူးယဉ်ဆန်ခြင်း',
'ပြီးပြည့်စုံမှု အလွန်ရှာခြင်း၊ ဝေဖန်မှု ခံစားလွယ်ခြင်း၊ အလွန်ကိုယ်ပိုင်ဖြစ်ခြင်း၊ ကိုယ့်ကို အလွန်တောင်းဆိုခြင်း',
'အကြံပေးပညာရှင်၊ စာရေးဆရာ၊ ဆရာ/ဆရာမ၊ ဆိုရှယ်ဝေါကာ၊ ကျန်းမာရေးပညာရှင်၊ စိတ်ပညာရှင်',
'Nelson Mandela, Mother Teresa, Martin Luther King Jr.', 6),

('mbti_infp', 'INFP', 'The Mediator', 'ညှိနှိုင်းသူ', 
'သင်သည် စိတ်ကူးယဉ်ဆန်သော၊ တန်ဖိုးများကို အလေးထားသူတစ်ဦးဖြစ်သည်။ ဖန်တီးမှု စွမ်းရည်ရှိပြီး၊ သူတစ်ပါးကို နားလည်ပေးတတ်သည်။ အနုပညာနှင့် စာပေကို နှစ်သက်သည်။',
'ဖန်တီးမှု၊ စာရေးခြင်း၊ ကြင်နာမှု၊ လိုက်လျောညီထွေ ဖြစ်ခြင်း၊ တန်ဖိုးများ အလေးထားခြင်း',
'လက်တွေ့ကျကျ မဆောင်ရွက်တတ်ခြင်း၊ ဝေဖန်မှု ခံစားလွယ်ခြင်း၊ ဆုံးဖြတ်ရခက်ခြင်း၊ အလွန်စိတ်ကူးယဉ်ဆန်ခြင်း',
'စာရေးဆရာ၊ အနုပညာရှင်၊ အကြံပေးပညာရှင်၊ ဆရာ/ဆရာမ၊ ဆိုရှယ်ဝေါကာ၊ ဒီဇိုင်နာ',
'William Shakespeare, J.R.R. Tolkien, Princess Diana', 4),

('mbti_enfj', 'ENFJ', 'The Protagonist', 'ဇာတ်ကောင်', 
'သင်သည် ကရုဏာရှိသော ခေါင်းဆောင်တစ်ဦးဖြစ်သည်။ သူတစ်ပါးကို လှုံ့ဆော်ပေးတတ်ပြီး၊ အဖွဲ့အစည်းများကို စည်းလုံးညီညွတ်အောင် လုပ်ဆောင်နိုင်သည်။ လူများ၏ အလားအလာကို မြင်တတ်ပြီး ဖွံ့ဖြိုးအောင် ကူညီတတ်သည်။',
'ခေါင်းဆောင်မှု၊ ဆက်သွယ်ရေး၊ ကြင်နာမှု၊ လှုံ့ဆော်ပေးခြင်း၊ စည်းလုံးညီညွတ်မှု ဖန်တီးခြင်း',
'အလွန်ကူညီလိုခြင်း၊ ဝေဖန်မှု ခံစားလွယ်ခြင်း၊ ကိုယ့်လိုအပ်ချက် လျစ်လျူရှုခြင်း၊ အလွန်စိတ်ပူတတ်ခြင်း',
'ဆရာ/ဆရာမ၊ အကြံပေးပညာရှင်၊ လူ့စွမ်းအားအရင်းအမြစ်၊ နိုင်ငံရေးသမား၊ သတင်းထောက်၊ လူမှုရေးလုပ်သား',
'Barack Obama, Oprah Winfrey, Martin Luther King Jr.', 1),

('mbti_enfp', 'ENFP', 'The Campaigner', 'စည်းရုံးသူ', 
'သင်သည် စွမ်းအင်ပြည့်ဝသော၊ ဖန်တီးမှုရှိသူတစ်ဦးဖြစ်သည်။ အသစ်အဆန်းများကို စူးစမ်းလေ့လာရတာ နှစ်သက်ပြီး၊ သူတစ်ပါးနှင့် ဆက်သွယ်ရတာ ကောင်းမွန်သည်။ ဖြစ်နိုင်ခြေများကို မြင်တတ်သည်။',
'ဖန်တီးမှု၊ စွမ်းအင်ပြည့်ဝခြင်း၊ ဆက်သွယ်ရေး၊ လိုက်လျောညီထွေ ဖြစ်ခြင်း၊ စိတ်လှုပ်ရှားမှု ဖန်တီးခြင်း',
'အာရုံစူးစိုက်မှု နည်းခြင်း၊ အစီအစဉ် လိုက်နာရခက်ခြင်း၊ အလွန်စိတ်လှုပ်ရှားခြင်း၊ ပြီးမြောက်အောင် မလုပ်ခြင်း',
'သတင်းထောက်၊ အနုပညာရှင်၊ အကြံပေးပညာရှင်၊ စျေးကွက်ရှာဖွေရေး၊ ဆရာ/ဆရာမ၊ အစီအစဉ်ရေးဆွဲသူ',
'Robin Williams, Ellen DeGeneres, Walt Disney', 8),

('mbti_istj', 'ISTJ', 'The Logistician', 'ထောက်ပံ့ရေးမှူး', 
'သင်သည် တာဝန်သိတတ်သော၊ စနစ်တကျ လုပ်ဆောင်သူတစ်ဦးဖြစ်သည်။ အသေးစိတ်ကို ဂရုစိုက်ပြီး၊ ယုံကြည်စိတ်ချရသူဖြစ်သည်။ စည်းကမ်းကို လိုက်နာပြီး လုပ်ငန်းတာဝန်များကို ပြီးမြောက်အောင် လုပ်ဆောင်သည်။',
'တာဝန်သိတတ်ခြင်း၊ စနစ်တကျ ဖြစ်ခြင်း၊ ယုံကြည်စိတ်ချရခြင်း၊ အသေးစိတ် ဂရုစိုက်ခြင်း၊ ဂုဏ်သိက္ခာရှိခြင်း',
'ပြောင်းလဲမှုကို လက်မခံခြင်း၊ ခံစားချက်များ ထုတ်ဖော်ရခက်ခြင်း၊ အလွန်တင်းကျပ်ခြင်း၊ ဆန်းသစ်မှု နည်းခြင်း',
'စာရင်းကိုင်၊ စီမံခန့်ခွဲရေးမှူး၊ ရဲအရာရှိ၊ စစ်သား၊ အင်ဂျင်နီယာ၊ ဘဏ်လုပ်ငန်း',
'George Washington, Warren Buffett, Angela Merkel', 11),

('mbti_isfj', 'ISFJ', 'The Defender', 'ကာကွယ်သူ', 
'သင်သည် ကြင်နာသနားတတ်သော၊ ကာကွယ်စောင့်ရှောက်သူတစ်ဦးဖြစ်သည်။ သူတစ်ပါးကို ကူညီရတာ နှစ်သက်ပြီး၊ တာဝန်သိတတ်သည်။ သစ္စာရှိပြီး အနစ်နာခံတတ်သည်။',
'ကြင်နာမှု၊ တာဝန်သိတတ်ခြင်း၊ အသေးစိတ် ဂရုစိုက်ခြင်း၊ ယုံကြည်စိတ်ချရခြင်း၊ သစ္စာရှိခြင်း',
'ပြောင်းလဲမှုကို လက်မခံခြင်း၊ ကိုယ့်လိုအပ်ချက် လျစ်လျူရှုခြင်း၊ ဝေဖန်မှု ခံစားလွယ်ခြင်း၊ ငြင်းဆိုရခက်ခြင်း',
'သူနာပြု၊ ဆရာ/ဆရာမ၊ အကြံပေးပညာရှင်၊ စာကြည့်တိုက်မှူး၊ စီမံခန့်ခွဲရေးမှူး၊ လူမှုရေးလုပ်သား',
'Mother Teresa, Kate Middleton, Rosa Parks', 2),

('mbti_estj', 'ESTJ', 'The Executive', 'အမှုဆောင်', 
'သင်သည် စနစ်တကျ စီမံခန့်ခွဲသူ၊ ခေါင်းဆောင်တစ်ဦးဖြစ်သည်။ စည်းကမ်းကို လိုက်နာပြီး၊ ထိရောက်စွာ လုပ်ဆောင်တတ်သည်။ ရိုးသားပြီး တာဝန်ယူတတ်သည်။',
'စီမံခန့်ခွဲခြင်း၊ ခေါင်းဆောင်မှု၊ စနစ်တကျ ဖြစ်ခြင်း၊ ယုံကြည်စိတ်ချရခြင်း၊ ထိရောက်မှု',
'ပြောင်းလဲမှုကို လက်မခံခြင်း၊ ခံစားချက်များ လျစ်လျူရှုခြင်း၊ အလွန်ထိန်းချုပ်လိုခြင်း၊ တင်းကျပ်လွန်းခြင်း',
'စီမံခန့်ခွဲရေးမှူး၊ ရဲအရာရှိ၊ တရားသူကြီး၊ စီးပွားရေးလုပ်ငန်းရှင်၊ စစ်သား၊ ဘဏ်မန်နေဂျာ',
'Henry Ford, John D. Rockefeller, Judge Judy', 14),

('mbti_esfj', 'ESFJ', 'The Consul', 'ကောင်စစ်', 
'သင်သည် လူမှုရေးအရ ကောင်းမွန်သော၊ ကူညီစောင့်ရှောက်သူတစ်ဦးဖြစ်သည်။ သူတစ်ပါးကို ပျော်ရွှင်စေရတာ နှစ်သက်ပြီး၊ စည်းလုံးညီညွတ်မှု ဖန်တီးတတ်သည်။ လူမှုရေး ကောင်းမွန်သည်။',
'ကူညီစောင့်ရှောက်ခြင်း၊ စည်းလုံးညီညွတ်မှု ဖန်တီးခြင်း၊ တာဝန်သိတတ်ခြင်း၊ ဆက်သွယ်ရေး၊ စည်းကမ်း လိုက်နာခြင်း',
'ဝေဖန်မှု ခံစားလွယ်ခြင်း၊ ပြောင်းလဲမှုကို လက်မခံခြင်း၊ အလွန်ကူညီလိုခြင်း၊ အတည်ပြုချက် လိုအပ်ခြင်း',
'ဆရာ/ဆရာမ၊ သူနာပြု၊ လူ့စွမ်းအားအရင်းအမြစ်၊ အရောင်းကိုယ်စားလှယ်၊ စီမံခန့်ခွဲရေးမှူး၊ ဧည့်ခံရေး',
'Taylor Swift, Bill Clinton, Jennifer Garner', 10),

('mbti_istp', 'ISTP', 'The Virtuoso', 'ကျွမ်းကျင်သူ', 
'သင်သည် လက်တွေ့ကျကျ လုပ်ဆောင်သူ၊ ပြဿနာဖြေရှင်းသူတစ်ဦးဖြစ်သည်။ ကိရိယာများကို ကျွမ်းကျင်စွာ အသုံးပြုတတ်ပြီး၊ လွတ်လပ်မှုကို တန်ဖိုးထားသည်။ စွန့်စားမှုကို နှစ်သက်သည်။',
'ပြဿနာဖြေရှင်းခြင်း၊ လက်တွေ့ကျကျ ဖြစ်ခြင်း၊ လိုက်လျောညီထွေ ဖြစ်ခြင်း၊ ကျွမ်းကျင်မှု၊ စွန့်စားမှု',
'ခံစားချက်များ ထုတ်ဖော်ရခက်ခြင်း၊ ရှည်လျားသော အစီအစဉ် မရှိခြင်း၊ စည်းကမ်း မလိုက်နာခြင်း၊ ပေါ့ဆမှု',
'အင်ဂျင်နီယာ၊ ပြုပြင်သူ၊ ရဲအရာရှိ၊ အားကစားသမား၊ ခြံသမား၊ လေယာဉ်မောင်းသူ',
'Bear Grylls, Clint Eastwood, Michael Jordan', 12),

('mbti_isfp', 'ISFP', 'The Adventurer', 'စွန့်စားသူ', 
'သင်သည် ဖန်တီးမှုရှိသော၊ အနုပညာကို နှစ်သက်သူတစ်ဦးဖြစ်သည်။ လက်ရှိအချိန်ကို နေထိုင်ပြီး၊ လွတ်လပ်မှုကို တန်ဖိုးထားသည်။ သဘာဝနှင့် အလှတရားကို နှစ်သက်သည်။',
'ဖန်တီးမှု၊ လိုက်လျောညီထွေ ဖြစ်ခြင်း၊ ကြင်နာမှု၊ အနုပညာ၊ သဘာဝ နှစ်သက်ခြင်း',
'ရှည်လျားသော အစီအစဉ် မရှိခြင်း၊ ဝေဖန်မှု ခံစားလွယ်ခြင်း၊ ဆုံးဖြတ်ရခက်ခြင်း၊ ယှဉ်ပြိုင်မှု ရှောင်ကြဉ်ခြင်း',
'အနုပညာရှင်၊ ဒီဇိုင်နာ၊ ဆရာ/ဆရာမ၊ သဘာဝပတ်ဝန်းကျင် သိပ္ပံပညာရှင်၊ ဆံပင်ညှပ်ဆရာ၊ ဓာတ်ပုံဆရာ',
'Michael Jackson, Britney Spears, Frida Kahlo', 16),

('mbti_estp', 'ESTP', 'The Entrepreneur', 'စီးပွားရေးလုပ်ငန်းရှင်', 
'သင်သည် စွမ်းအင်ပြည့်ဝသော၊ လက်တွေ့ကျကျ လုပ်ဆောင်သူတစ်ဦးဖြစ်သည်။ စွန့်စားမှုကို နှစ်သက်ပြီး၊ လျင်မြန်စွာ ဆုံးဖြတ်တတ်သည်။ လက်ရှိအချိန်ကို အပြည့်အဝ နေထိုင်သည်။',
'လက်တွေ့ကျကျ ဖြစ်ခြင်း၊ စွန့်စားမှု၊ ပြဿနာဖြေရှင်းခြင်း၊ စွမ်းအင်ပြည့်ဝခြင်း၊ လျင်မြန်စွာ တုံ့ပြန်ခြင်း',
'ရှည်လျားသော အစီအစဉ် မရှိခြင်း၊ စည်းကမ်း မလိုက်နာခြင်း၊ အလွန်စွန့်စားခြင်း၊ ပေါ့ဆမှု',
'စီးပွားရေးလုပ်ငန်းရှင်၊ အရောင်းကိုယ်စားလှယ်၊ ရဲအရာရှင်း၊ အားကစားသမား၊ ပါရာမက်ဒစ်၊ အရောင်းစျေးကွက်',
'Donald Trump, Madonna, Eddie Murphy', 15),

('mbti_esfp', 'ESFP', 'The Entertainer', 'ဖျော်ဖြေသူ', 
'သင်သည် စွမ်းအင်ပြည့်ဝသော၊ ဖျော်ဖြေသူတစ်ဦးဖြစ်သည်။ လူများကို ပျော်ရွှင်စေရတာ နှစ်သက်ပြီး၊ လက်ရှိအချိန်ကို အပြည့်အဝ နေထိုင်သည်။ လူမှုရေး ကောင်းမွန်ပြီး စွမ်းအင်ပြည့်ဝသည်။',
'ဖျော်ဖြေခြင်း၊ စွမ်းအင်ပြည့်ဝခြင်း၊ လိုက်လျောညီထွေ ဖြစ်ခြင်း၊ ဆက်သွယ်ရေး၊ ပျော်ရွှင်မှု ဖန်တီးခြင်း',
'ရှည်လျားသော အစီအစဉ် မရှိခြင်း၊ အာရုံစူးစိုက်မှု နည်းခြင်း၊ ဝေဖန်မှု ခံစားလွယ်ခြင်း၊ ပေါ့ဆမှု',
'အနုပညာရှင်၊ ဖျော်ဖြေသူ၊ အရောင်းကိုယ်စားလှယ်၊ ဧည့်ခံရေး၊ ဆရာ/ဆရာမ၊ အစီအစဉ်ရေးဆွဲသူ',
'Marilyn Monroe, Elvis Presley, Jamie Oliver', 13)

ON CONFLICT (id) DO UPDATE SET
  type_code = EXCLUDED.type_code,
  name_en = EXCLUDED.name_en,
  name_mm = EXCLUDED.name_mm,
  description_mm = EXCLUDED.description_mm,
  strengths_mm = EXCLUDED.strengths_mm,
  weaknesses_mm = EXCLUDED.weaknesses_mm,
  careers_mm = EXCLUDED.careers_mm,
  famous_people = EXCLUDED.famous_people,
  character_number = EXCLUDED.character_number;
```

**Run ပြီးရင်:** 16 rows inserted/updated ပေါ်ရမယ်။

---

#### 3.3: Categorize Questions

```sql
-- Map Big Five to MBTI axes
UPDATE questions
SET 
  mbti_axis = 'EI',
  mbti_direction = CASE 
    WHEN question_text LIKE '%(Negative)%' THEN 'negative'
    ELSE 'positive'
  END
WHERE category = 'extroversion' AND mbti_axis IS NULL;

UPDATE questions
SET 
  mbti_axis = 'SN',
  mbti_direction = CASE 
    WHEN question_text LIKE '%(Negative)%' THEN 'positive'
    ELSE 'negative'
  END
WHERE category = 'openness' AND mbti_axis IS NULL;

UPDATE questions
SET 
  mbti_axis = 'TF',
  mbti_direction = CASE 
    WHEN question_text LIKE '%(Negative)%' THEN 'positive'
    ELSE 'negative'
  END
WHERE category = 'agreeableness' AND mbti_axis IS NULL;

UPDATE questions
SET 
  mbti_axis = 'JP',
  mbti_direction = CASE 
    WHEN question_text LIKE '%(Negative)%' THEN 'negative'
    ELSE 'positive'
  END
WHERE category = 'conscientiousness' AND mbti_axis IS NULL;

UPDATE questions
SET 
  mbti_axis = 'TF',
  mbti_direction = CASE 
    WHEN question_text LIKE '%(Negative)%' THEN 'negative'
    ELSE 'positive'
  END
WHERE category = 'emotional_stability' AND mbti_axis IS NULL;
```

---

#### 3.4: Remove (Negative) Prefixes

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

---

### အဆင့် 4: Verify Setup

```sql
-- Check MBTI types
SELECT COUNT(*) as types_count FROM mbti_types;
-- Should be: 16

-- Check categorized questions
SELECT mbti_axis, COUNT(*) as count
FROM questions
WHERE mbti_axis IS NOT NULL
GROUP BY mbti_axis
ORDER BY mbti_axis;
-- Should see: EI, JP, SN, TF with counts

-- View sample MBTI type
SELECT type_code, name_mm, description_mm 
FROM mbti_types 
WHERE type_code = 'INTJ';
```

---

### အဆင့် 5: Test Application

1. Browser မှာ application refresh လုပ်ပါ
2. Test ဖြေကြည့်ပါ
3. Results မှာ:
   - MBTI Type ပေါ်ရမယ် (ဥပမာ: INTJ)
   - Icon ပေါ်ရမယ်
   - Description အပြည့်အစုံ ပေါ်ရမယ်
   - Percentages ပေါ်ရမယ်

---

## အကူအညီ

**ပြဿနာ ဆက်ရှိနေရင်:**

1. Browser Console (F12) မှာ errors ကြည့်ပါ
2. Network tab မှာ Supabase requests ကြည့်ပါ
3. SQL Editor မှာ:
```sql
-- Check connection
SELECT NOW();

-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

**လိုအပ်ရင် ဆက်သွယ်ပါ!**
