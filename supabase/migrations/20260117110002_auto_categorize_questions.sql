-- Automatic categorization based on existing Big Five categories
-- This is a starting point - may need manual review and adjustment

-- Map Extroversion → EI axis
UPDATE questions
SET 
  mbti_axis = 'EI',
  mbti_direction = CASE 
    WHEN question_text LIKE '%Negative%' OR question_text LIKE '%မ%' THEN 'negative'  -- Introvert
    ELSE 'positive'  -- Extrovert
  END
WHERE category = 'extroversion' AND mbti_axis IS NULL;

-- Map Openness → SN axis (Openness relates to abstract thinking vs concrete)
UPDATE questions
SET 
  mbti_axis = 'SN',
  mbti_direction = CASE 
    WHEN question_text LIKE '%Negative%' OR question_text LIKE '%လက်တွေ့%' OR question_text LIKE '%အသေးစိတ%' THEN 'positive'  -- Sensing
    ELSE 'negative'  -- Intuition
  END
WHERE category = 'openness' AND mbti_axis IS NULL;

-- Map Agreeableness → TF axis (Agreeableness relates to empathy vs logic)
UPDATE questions
SET 
  mbti_axis = 'TF',
  mbti_direction = CASE 
    WHEN question_text LIKE '%Negative%' OR question_text LIKE '%ယုတ္တိ%' OR question_text LIKE '%ဆန်းစစ%' THEN 'positive'  -- Thinking
    ELSE 'negative'  -- Feeling
  END
WHERE category = 'agreeableness' AND mbti_axis IS NULL;

-- Map Conscientiousness → JP axis (Conscientiousness relates to organization vs flexibility)
UPDATE questions
SET 
  mbti_axis = 'JP',
  mbti_direction = CASE 
    WHEN question_text LIKE '%Negative%' OR question_text LIKE '%လိုက်လျောညီထွေ%' OR question_text LIKE '%ပြောင်းလဲ%' THEN 'negative'  -- Perceiving
    ELSE 'positive'  -- Judging
  END
WHERE category = 'conscientiousness' AND mbti_axis IS NULL;

-- Emotional Stability can map to multiple axes, but primarily to TF
-- High emotional stability → Thinking, Low → Feeling
UPDATE questions
SET 
  mbti_axis = 'TF',
  mbti_direction = CASE 
    WHEN question_text LIKE '%Negative%' OR question_text LIKE '%ခံစားချက%' OR question_text LIKE '%စိတ်လှုပ်ရှား%' THEN 'negative'  -- Feeling
    ELSE 'positive'  -- Thinking
  END
WHERE category = 'emotional_stability' AND mbti_axis IS NULL;

-- Verify distribution
SELECT 
  mbti_axis,
  mbti_direction,
  COUNT(*) as count
FROM questions
WHERE mbti_axis IS NOT NULL
GROUP BY mbti_axis, mbti_direction
ORDER BY mbti_axis, mbti_direction;

-- Check total categorized
SELECT 
  COUNT(*) as total_categorized,
  COUNT(*) FILTER (WHERE mbti_axis IS NULL) as uncategorized
FROM questions;
