import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://odwukxwtawmygihhywdk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yR1bFN-p_qSOfWuvqsZQDA_ec1wBVml';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase URL or Key. App will run in offline mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Question {
  id: string;
  question_text: string;
  category: string;
  mbti_axis?: string;  // EI, SN, TF, JP
  mbti_direction?: string;  // positive, negative
  is_active?: boolean;
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
  mbti_scores?: Record<string, number>;  // { EI: 5, SN: -2, TF: 0, JP: 3 }
  mbti_type?: string;  // e.g., "INTJ"
  mbti_percentages?: Record<string, number>;  // { E: 65, I: 35, ... }
}

export interface TestResponse {
  id: string;
  session_id: string;
  question_id: string;
  answer_value: number;
  created_at: string;
}

export interface MBTIType {
  id: string;
  type_code: string;  // e.g., "INTJ"
  name_en: string;
  name_mm: string;
  description_mm: string;
  strengths_mm?: string;
  weaknesses_mm?: string;
  careers_mm?: string;
  famous_people?: string;
  character_number?: number;
  created_at: string;
}
