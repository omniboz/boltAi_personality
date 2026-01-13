import { supabase, TestSession, TestResponse } from './supabase';
import { MOCK_PERSONALITY_TYPES, MOCK_QUESTIONS } from './localDb';

class SupabaseDatabase {
    async getSessions() {
        const { data, error } = await supabase
            .from('test_sessions')
            .select('*')
            .order('started_at', { ascending: false });

        if (error) {
            console.error('Error fetching sessions:', error);
            return [];
        }
        return data as TestSession[];
    }

    async getResponses() {
        const { data, error } = await supabase
            .from('test_responses')
            .select('*');

        if (error) {
            console.error('Error fetching responses:', error);
            return [];
        }
        return data as TestResponse[];
    }

    async getPersonalityTypes() {
        // Keeping static data for now to reduce DB calls
        return { data: MOCK_PERSONALITY_TYPES, error: null };
    }

    async getQuestions() {
        // Keeping static data for now
        return { data: MOCK_QUESTIONS, error: null };
    }

    async createSession(token: string, userName?: string) {
        const { data, error } = await supabase
            .from('test_sessions')
            .insert([
                {
                    session_token: token,
                    user_name: userName,
                    started_at: new Date().toISOString()
                }
            ])
            .select()
            .single();

        return { data, error };
    }

    async saveResponse(sessionId: string, questionId: string, value: number) {
        const { data, error } = await supabase
            .from('test_responses')
            .insert([
                {
                    session_id: sessionId,
                    question_id: questionId,
                    answer_value: value
                }
            ])
            .select()
            .single();

        return { data, error };
    }

    async updateSession(sessionId: string, updates: Partial<TestSession>) {
        const { data, error } = await supabase
            .from('test_sessions')
            .update(updates)
            .eq('id', sessionId)
            .select()
            .single();

        return { data, error };
    }
}

export const supabaseDb = new SupabaseDatabase();
