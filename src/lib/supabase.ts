import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ojfzwmyfhfkgbtlfttuz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_y_cXbzAFU8NR1iX_cvidaQ_aYXGGphW';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase URL or Key. App will run in offline mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
