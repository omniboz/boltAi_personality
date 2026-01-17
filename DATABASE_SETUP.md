# Database Setup Instructions

## Prerequisites

Make sure you have:
1. A Supabase project set up
2. Environment variables configured in `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Running Migrations

### 1. Apply Database Schema

The schema migrations are in `supabase/migrations/`. If using Supabase CLI:

```bash
supabase db push
```

Or manually run the SQL files in your Supabase SQL editor:
- `20260112035121_create_personality_test_schema.sql`
- `20260117063000_add_user_name_to_sessions.sql`

### 2. Seed the Database

Populate the database with questions and personality types:

```bash
npm run seed-db
```

This will:
- Clear existing questions and personality types
- Insert all questions from `questions.json`
- Insert all personality types from `localDb.ts`
- Verify the data was inserted correctly

## Features

### User Tracking
- All test sessions now include user names
- Sessions are stored in `test_sessions` table
- Individual responses are stored in `test_responses` table

### Admin Dashboard
- View all test sessions with user names and dates
- Click on a session to see detailed results
- View all 50 questions and answers for each session
- Export individual sessions or all data to CSV

### Offline Mode
- Application automatically falls back to localStorage when Supabase is unavailable
- Offline sessions are marked with "Offline" badge
- Data syncs when connection is restored

## Database Tables

### questions
- `id`: Unique question identifier
- `question_text`: The question in Myanmar language
- `category`: Personality category (openness, conscientiousness, etc.)
- `created_at`: Timestamp

### personality_types
- `id`: Unique type identifier
- `name`: Type name in Myanmar
- `description`: Detailed description
- `min_score` / `max_score`: Score range for this type
- `category`: Associated personality category
- `created_at`: Timestamp

### test_sessions
- `id`: Unique session identifier
- `session_token`: Random token for session tracking
- `user_name`: Name of the test taker
- `started_at`: When the test started
- `completed_at`: When the test was completed
- `results`: JSON object with personality assessment results

### test_responses
- `id`: Unique response identifier
- `session_id`: Reference to test session
- `question_id`: Reference to question
- `answer_value`: Answer (1-5 scale)
- `created_at`: Timestamp
