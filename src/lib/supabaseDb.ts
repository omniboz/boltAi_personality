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
        // Keeping static data for now to reduce DB calls
        return { data: MOCK_PERSONALITY_TYPES, error: null };
    }

    async getQuestions() {
        // Keeping static data for now
        return { data: MOCK_QUESTIONS, error: null };
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
