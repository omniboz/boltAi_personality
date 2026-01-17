-- Add MBTI system columns to questions table
ALTER TABLE questions
ADD COLUMN IF NOT EXISTS mbti_axis TEXT CHECK (mbti_axis IN ('EI', 'SN', 'TF', 'JP')),
ADD COLUMN IF NOT EXISTS mbti_direction TEXT CHECK (mbti_direction IN ('positive', 'negative')),
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Create indexes for faster filtering
CREATE INDEX IF NOT EXISTS idx_questions_mbti_axis ON questions(mbti_axis);
CREATE INDEX IF NOT EXISTS idx_questions_active ON questions(is_active);
CREATE INDEX IF NOT EXISTS idx_questions_mbti_axis_active ON questions(mbti_axis, is_active);

-- Update test_sessions table for MBTI
ALTER TABLE test_sessions
ADD COLUMN IF NOT EXISTS mbti_scores JSONB,
ADD COLUMN IF NOT EXISTS mbti_type TEXT,
ADD COLUMN IF NOT EXISTS mbti_percentages JSONB;

-- Create MBTI types table
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

-- Create index on type_code
CREATE INDEX IF NOT EXISTS idx_mbti_types_code ON mbti_types(type_code);

COMMENT ON TABLE mbti_types IS 'MBTI 16 personality types with Myanmar translations';
COMMENT ON COLUMN questions.mbti_axis IS 'MBTI axis: EI (Energy), SN (Information), TF (Decisions), JP (Structure)';
COMMENT ON COLUMN questions.mbti_direction IS 'positive = first letter (E,S,T,J), negative = second letter (I,N,F,P)';
