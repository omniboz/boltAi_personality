-- Remove (Negative) and (Positive) prefixes from question texts
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
