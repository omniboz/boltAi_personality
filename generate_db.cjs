const fs = require('fs');

// Read questions
const content = fs.readFileSync('Openness.txt', 'utf8');
const lines = content.split('\n');

const questions = [];
let currentCategory = '';

const categoryMap = {
    'Openness': 'openness',
    'Conscientiousness': 'conscientiousness',
    'Extraversion': 'extroversion',
    'Agreeableness': 'agreeableness',
    'Neuroticism': 'emotional_stability'
};

lines.forEach(line => {
    line = line.trim();
    if (!line) return;

    for (const [key, value] of Object.entries(categoryMap)) {
        if (line.startsWith(key)) {
            currentCategory = value;
            return;
        }
    }

    const match = line.match(/^(\d+)\.\s+(.*)/);
    if (match && currentCategory) {
        const id = currentCategory[0] + match[1];
        let text = match[2];
        // Remove "(Negative)" marker from question text
        text = text.replace(/\(Negative\)\s*/g, '').trim();
        questions.push({
            id: id,
            category: currentCategory,
            question_text: text,
            created_at: new Date().toISOString()
        });
    }
});

// Existing Personality Types (kept from previous step)
const MOCK_PERSONALITY_TYPES = [
    // Extroversion
    { id: 'pt1', category: 'extroversion', name: 'Extrovert', description: 'သင်သည် လူမှုဆက်ဆံရေး ကောင်းမွန်ပြီး အပေါင်းအသင်းများကြားတွင် ပျော်ရွှင်တတ်သူဖြစ်သည်။', min_score: 35, max_score: 50, created_at: new Date().toISOString() },
    { id: 'pt2', category: 'extroversion', name: 'Ambivert', description: 'သင်သည် လူမှုဆက်ဆံရေးနှင့် တစ်ကိုယ်တည်းနေထိုင်မှုကြားတွင် မျှတစွာ နေထိုင်တတ်သူဖြစ်သည်။', min_score: 25, max_score: 34, created_at: new Date().toISOString() },
    { id: 'pt3', category: 'extroversion', name: 'Introvert', description: 'သင်သည် တစ်ကိုယ်တည်း နေထိုင်ရခြင်းကို ပိုမိုနှစ်သက်ပြီး တိတ်ဆိတ်ငြိမ်သက်မှုကို မြတ်နိုးသူဖြစ်သည်။', min_score: 10, max_score: 24, created_at: new Date().toISOString() },

    // Agreeableness
    { id: 'pt4', category: 'agreeableness', name: 'High Agreeableness', description: 'သင်သည် သူတစ်ပါးအပေါ် စာနာနားလည်မှုရှိပြီး ကူညီတတ်သူဖြစ်သည်။', min_score: 35, max_score: 50, created_at: new Date().toISOString() },
    { id: 'pt5', category: 'agreeableness', name: 'Moderate Agreeableness', description: 'သင်သည် သူတစ်ပါးနှင့် သင့်မြတ်အောင် နေတတ်သော်လည်း လိုအပ်လျှင် ပြတ်သားတတ်သည်။', min_score: 25, max_score: 34, created_at: new Date().toISOString() },
    { id: 'pt6', category: 'agreeableness', name: 'Low Agreeableness', description: 'သင်သည် ကိုယ့်ကိုယ်ကို ပိုမိုဦးစားပေးတတ်ပြီး သူတစ်ပါး၏ ခံစားချက်ကို သိပ်ဂရုမစိုက်တတ်ပါ။', min_score: 10, max_score: 24, created_at: new Date().toISOString() },

    // Conscientiousness
    { id: 'pt7', category: 'conscientiousness', name: 'High Conscientiousness', description: 'သင်သည် စည်းကမ်းရှိပြီး တာဝန်ယူမှု တာဝန်ခံမှု မြင့်မားသူဖြစ်သည်။', min_score: 35, max_score: 50, created_at: new Date().toISOString() },
    { id: 'pt8', category: 'conscientiousness', name: 'Moderate Conscientiousness', description: 'သင်သည် အလုပ်များကို ပြီးမြောက်အောင် လုပ်ဆောင်နိုင်သော်လည်း တစ်ခါတစ်ရံ ပေါ့ပေါ့ပါးပါး နေတတ်သည်။', min_score: 25, max_score: 34, created_at: new Date().toISOString() },
    { id: 'pt9', category: 'conscientiousness', name: 'Low Conscientiousness', description: 'သင်သည် စည်းကမ်းမဲ့ နေထိုင်တတ်ပြီး အလုပ်များကို အချိန်ဆွဲလေ့ရှိသည်။', min_score: 10, max_score: 24, created_at: new Date().toISOString() },

    // Emotional Stability
    { id: 'pt10', category: 'emotional_stability', name: 'High Stability', description: 'သင်သည် စိတ်တည်ငြိမ်ပြီး ဖိအားများကို ကောင်းစွာ ကိုင်တွယ်ဖြေရှင်းနိုင်သည်။', min_score: 35, max_score: 50, created_at: new Date().toISOString() },
    { id: 'pt11', category: 'emotional_stability', name: 'Moderate Stability', description: 'သင်သည် ယေဘုယျအားဖြင့် စိတ်တည်ငြိမ်သော်လည်း ကြီးမားသော ဖိအားများနှင့် ကြုံလျှင် စိတ်လှုပ်ရှားတတ်သည်။', min_score: 25, max_score: 34, created_at: new Date().toISOString() },
    { id: 'pt12', category: 'emotional_stability', name: 'Low Stability', description: 'သင်သည် စိတ်ခံစားမှု ပြင်းထန်ပြီး အလွယ်တကူ စိတ်ထိခိုက် လွယ်တတ်သည်။', min_score: 10, max_score: 24, created_at: new Date().toISOString() },

    // Openness
    { id: 'pt13', category: 'openness', name: 'High Openness', description: 'သင်သည် အသစ်အဆန်းများကို စူးစမ်းလေ့လာလိုစိတ်ရှိပြီး ဖန်တီးနိုင်စွမ်း မြင့်မားသည်။', min_score: 35, max_score: 50, created_at: new Date().toISOString() },
    { id: 'pt14', category: 'openness', name: 'Moderate Openness', description: 'သင်သည် လက်တွေ့ကျကျ နေထိုင်တတ်သော်လည်း အပြောင်းအလဲအချို့ကို လက်ခံနိုင်သည်။', min_score: 25, max_score: 34, created_at: new Date().toISOString() },
    { id: 'pt15', category: 'openness', name: 'Low Openness', description: 'သင်သည် ရိုးရာဓလေ့များကိုသာ မြတ်နိုးပြီး အပြောင်းအလဲများကို မနှစ်သက်ပါ။', min_score: 10, max_score: 24, created_at: new Date().toISOString() }
];

const fileContent = `import { Question, PersonalityType, TestSession, TestResponse } from './supabase';

// Mock Data
const MOCK_QUESTIONS: Question[] = ${JSON.stringify(questions, null, 2)};

const MOCK_PERSONALITY_TYPES: PersonalityType[] = ${JSON.stringify(MOCK_PERSONALITY_TYPES, null, 2)};

// Local Database Implementation
class LocalDatabase {
  private getSessions(): TestSession[] {
    const sessions = localStorage.getItem('test_sessions');
    return sessions ? JSON.parse(sessions) : [];
  }

  private saveSessions(sessions: TestSession[]) {
    localStorage.setItem('test_sessions', JSON.stringify(sessions));
  }

  private getResponses(): TestResponse[] {
    const responses = localStorage.getItem('test_responses');
    return responses ? JSON.parse(responses) : [];
  }

  private saveResponses(responses: TestResponse[]) {
    localStorage.setItem('test_responses', JSON.stringify(responses));
  }

  async getPersonalityTypes() {
    return { data: MOCK_PERSONALITY_TYPES, error: null };
  }

  async getQuestions() {
    return { data: MOCK_QUESTIONS, error: null };
  }

  async createSession(token: string) {
    const sessions = this.getSessions();
    const newSession: TestSession = {
      id: Math.random().toString(36).substr(2, 9),
      session_token: token,
      started_at: new Date().toISOString()
    };
    sessions.push(newSession);
    this.saveSessions(sessions);
    return { data: newSession, error: null };
  }

  async saveResponse(sessionId: string, questionId: string, value: number) {
    const responses = this.getResponses();
    const newResponse: TestResponse = {
      id: Math.random().toString(36).substr(2, 9),
      session_id: sessionId,
      question_id: questionId,
      answer_value: value,
      created_at: new Date().toISOString()
    };
    responses.push(newResponse);
    this.saveResponses(responses);
    return { data: newResponse, error: null };
  }

  async updateSession(sessionId: string, updates: Partial<TestSession>) {
    const sessions = this.getSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates };
      this.saveSessions(sessions);
      return { data: sessions[index], error: null };
    }
    return { data: null, error: 'Session not found' };
  }
}

export const localDb = new LocalDatabase();
`;

fs.writeFileSync('src/lib/localDb.ts', fileContent);
