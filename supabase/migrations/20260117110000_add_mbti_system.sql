-- MBTI System Setup - Part 1: Create Tables and Columns
-- Run this in Supabase SQL Editor

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

-- Drop existing policies if they exist (to avoid errors)
DROP POLICY IF EXISTS "Allow public read access to mbti_types" ON mbti_types;
DROP POLICY IF EXISTS "Allow authenticated insert to mbti_types" ON mbti_types;
DROP POLICY IF EXISTS "Allow authenticated update to mbti_types" ON mbti_types;

-- Create policies
CREATE POLICY "Allow public read access to mbti_types"
ON mbti_types FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated insert to mbti_types"
ON mbti_types FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated update to mbti_types"
ON mbti_types FOR UPDATE
TO authenticated
USING (true);
