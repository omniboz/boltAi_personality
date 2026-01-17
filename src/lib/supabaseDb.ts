import { supabase, TestSession, TestResponse } from './supabase';
import { MOCK_PERSONALITY_TYPES, MOCK_QUESTIONS } from './localDb';

class SupabaseDatabase {
    private getLocalData<T>(key: string): T[] {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error(`Error reading ${key} from localStorage`, e);
            return [];
        }
    }

    private saveLocalData<T>(key: string, data: T[]) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`Error saving ${key} to localStorage`, e);
        }
    }

    async getSessions() {
        let sessions: TestSession[] = [];

        // Try fetching from Supabase
        const { data, error } = await supabase
            .from('test_sessions')
            .select('*')
            .order('started_at', { ascending: false });

        if (!error && data) {
            sessions = [...data];
        }

        // Fetch local sessions
        const localSessions = this.getLocalData<TestSession>('offline_sessions');

        // Combine and sort
        return [...sessions, ...localSessions].sort((a, b) =>
            new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
        );
    }

    async getResponses() {
        let responses: TestResponse[] = [];

        const { data, error } = await supabase
            .from('test_responses')
            .select('*');

        if (!error && data) {
            responses = [...data];
        }

        const localResponses = this.getLocalData<TestResponse>('offline_responses');
        return [...responses, ...localResponses];
    }

    async getPersonalityTypes() {
        // Try fetching from Supabase first
        const { data, error } = await supabase
            .from('personality_types')
            .select('*')
            .order('category', { ascending: true });

        if (!error && data && data.length > 0) {
            return { data, error: null };
        }

        // Fallback to mock data if Supabase fails
        console.warn('Using mock personality types (offline mode)');
        return { data: MOCK_PERSONALITY_TYPES, error: null };
    }

    async getQuestions() {
        // Try fetching from Supabase first
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .order('category', { ascending: true });

        if (!error && data && data.length > 0) {
            return { data, error: null };
        }

        // Fallback to mock data if Supabase fails
        console.warn('Using mock questions (offline mode)');
        return { data: MOCK_QUESTIONS, error: null };
    }

    async getMBTITypes() {
        // Fetch MBTI types from database
        const { data, error } = await supabase
            .from('mbti_types')
            .select('*')
            .order('type_code', { ascending: true });

        if (!error && data && data.length > 0) {
            return { data, error: null };
        }

        console.warn('No MBTI types found in database');
        return { data: [], error };
    }

    async getStratifiedQuestions() {
        // Fetch all questions with MBTI categorization
        const { data: allQuestions, error } = await supabase
            .from('questions')
            .select('*')
            .not('mbti_axis', 'is', null)
            .eq('is_active', true);

        if (error || !allQuestions || allQuestions.length === 0) {
            console.warn('No MBTI questions found, falling back to random selection');
            return this.getQuestions();
        }

        // Stratified sampling: 12 EI, 13 SN, 12 TF, 13 JP
        const questionsPerAxis = {
            'EI': 12,
            'SN': 13,
            'TF': 12,
            'JP': 13
        };

        const selectedQuestions: any[] = [];

        for (const [axis, count] of Object.entries(questionsPerAxis)) {
            // Filter questions for this axis
            const axisQuestions = allQuestions.filter(q => q.mbti_axis === axis);

            if (axisQuestions.length < count) {
                console.warn(`Not enough questions for axis ${axis}. Need ${count}, have ${axisQuestions.length}`);
                // Take all available
                selectedQuestions.push(...axisQuestions);
            } else {
                // Randomly select required number
                const shuffled = axisQuestions.sort(() => Math.random() - 0.5);
                selectedQuestions.push(...shuffled.slice(0, count));
            }
        }

        // Shuffle final array to mix axes
        const finalQuestions = selectedQuestions.sort(() => Math.random() - 0.5);

        return { data: finalQuestions, error: null };
    }

    async createSession(token: string, userName?: string) {
        // Try Supabase first
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

        if (!error && data) {
            return { data, error };
        }

        // Fallback to local storage
        console.warn('Using offline storage for session');
        const newSession: TestSession = {
            id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            session_token: token,
            user_name: userName,
            started_at: new Date().toISOString()
        };

        const sessions = this.getLocalData<TestSession>('offline_sessions');
        sessions.push(newSession);
        this.saveLocalData('offline_sessions', sessions);

        return { data: newSession, error: null };
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

        if (!error && data) {
            return { data, error };
        }

        // Fallback to local storage
        const newResponse: TestResponse = {
            id: `local-resp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            session_id: sessionId,
            question_id: questionId,
            answer_value: value,
            created_at: new Date().toISOString()
        };

        const responses = this.getLocalData<TestResponse>('offline_responses');
        responses.push(newResponse);
        this.saveLocalData('offline_responses', responses);

        return { data: newResponse, error: null };
    }

    async updateSession(sessionId: string, updates: Partial<TestSession>) {
        const { data, error } = await supabase
            .from('test_sessions')
            .update(updates)
            .eq('id', sessionId)
            .select()
            .single();

        if (!error && data) {
            return { data, error };
        }

        // Fallback to local storage
        const sessions = this.getLocalData<TestSession>('offline_sessions');
        const index = sessions.findIndex(s => s.id === sessionId);

        if (index !== -1) {
            sessions[index] = { ...sessions[index], ...updates };
            this.saveLocalData('offline_sessions', sessions);
            return { data: sessions[index], error: null };
        }

        return { data: null, error: { message: 'Session not found locally' } };
    }
}

export const supabaseDb = new SupabaseDatabase();
