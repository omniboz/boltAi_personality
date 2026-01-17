import { useState, useEffect } from 'react';
import { Question, PersonalityType, MBTIType } from './lib/supabase';
import { supabaseDb } from './lib/supabaseDb';
import { calculateMBTIResult, formatMBTIPercentages } from './lib/mbtiScoring';
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import AdminDashboard from './components/AdminDashboard';
import { Loader2 } from 'lucide-react';

type Screen = 'start' | 'test' | 'results' | 'loading' | 'admin';

interface Answer {
  questionId: string;
  value: number;
  category: string;
}

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [personalityTypes, setPersonalityTypes] = useState<PersonalityType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');

  const [results, setResults] = useState<Array<{
    category: string;
    name: string;
    description: string;
    score: number;
    maxScore: number;
  }>>([]);

  useEffect(() => {
    loadPersonalityTypes();
  }, []);

  const loadPersonalityTypes = async () => {
    const { data } = await supabaseDb.getPersonalityTypes();

    if (data) {
      setPersonalityTypes(data);
    }
  };

  const generateSessionToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleStart = async (name: string) => {
    setScreen('loading');
    setUserName(name);

    // Use stratified sampling for MBTI questions
    const { data: allQuestions } = await supabaseDb.getStratifiedQuestions();

    if (allQuestions && allQuestions.length > 0) {
      const token = generateSessionToken();

      try {
        const { data: session, error } = await supabaseDb.createSession(token, name);
        if (session && !error) {
          setSessionId(session.id);
        } else {
          console.warn('Offline mode: Could not create session on server');
          setSessionId(`offline-${Date.now()}`);
        }
      } catch (e) {
        console.warn('Offline mode: Error creating session', e);
        setSessionId(`offline-${Date.now()}`);
      }

      setQuestions(allQuestions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setScreen('test');
    }
  };

  const handleAnswer = async (questionId: string, value: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const newAnswer: Answer = {
      questionId,
      value,
      category: question.category
    };

    setAnswers(prev => [...prev, newAnswer]);

    // Fire and forget save response
    supabaseDb.saveResponse(sessionId, questionId, value).catch(err => {
      console.warn('Offline mode: Could not save response', err);
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleComplete = async () => {
    setScreen('loading');

    // Calculate MBTI scores
    const responses = answers.map(answer => ({
      question_id: answer.questionId,
      answer_value: answer.value
    }));

    const mbtiResult = calculateMBTIResult(responses, questions);

    // Fetch MBTI type data
    const { data: mbtiTypes } = await supabaseDb.getMBTITypes();
    const matchingType = mbtiTypes?.find(t => t.type_code === mbtiResult.type);

    // Create result items for display
    const resultItems = [
      {
        category: 'mbti_type',
        name: matchingType?.name_mm || mbtiResult.type,
        description: matchingType?.description_mm || '',
        score: 0,
        maxScore: 0,
        mbtiType: mbtiResult.type,
        mbtiScores: mbtiResult.scores,
        mbtiPercentages: mbtiResult.percentages,
        typeData: matchingType
      }
    ];

    setResults(resultItems as any);

    // Update session with MBTI data
    supabaseDb.updateSession(sessionId, {
      completed_at: new Date().toISOString(),
      results: resultItems as any,
      mbti_scores: mbtiResult.scores,
      mbti_type: mbtiResult.type,
      mbti_percentages: mbtiResult.percentages
    }).catch(err => {
      console.warn('Offline mode: Could not update session', err);
    });

    setScreen('results');
  };

  const handleRestart = () => {
    setScreen('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSessionId('');
    setResults([]);
    setUserName('');

  };

  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">စောင့်ဆိုင်းပေးပါ...</p>
        </div>
      </div>
    );
  }

  if (screen === 'start') {
    return <StartScreen onStart={handleStart} onAdminLogin={() => setScreen('admin')} />;
  }

  if (screen === 'test') {
    return (
      <TestScreen
        questions={questions}
        onAnswer={handleAnswer}
        onComplete={handleComplete}
        currentQuestionIndex={currentQuestionIndex}
      />
    );
  }

  if (screen === 'results') {
    return <ResultsScreen results={results} onRestart={handleRestart} userName={userName} />;
  }

  if (screen === 'admin') {
    return <AdminDashboard onBack={() => setScreen('start')} />;
  }

  return null;
}

export default App;
