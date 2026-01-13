import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Key. Please check your .env file.');
  alert('Supabase configuration missing. Please check .env file and restart the server.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export interface Question {
  id: string;
  question_text: string;
  category: string;
  created_at: string;
}

export interface PersonalityType {
  id: string;
  name: string;
  description: string;
  min_score: number;
  max_score: number;
  category: string;
  created_at: string;
}

export interface TestSession {
  id: string;
  session_token: string;
  user_name?: string;
  started_at: string;
  completed_at?: string;
  results?: Record<string, unknown>;
}

export interface TestResponse {
  id: string;
  session_id: string;
  question_id: string;
  answer_value: number;
  created_at: string;
}
